import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import _ from 'lodash';

import Todo from '../todo/Todo';

import './NewTodo.scss';

export default function NewTodo({ users }) {
    const queryClient = useQueryClient();
    const history = useHistory();

    const [isSaving, setIsSaving] = useState(false);

    const [state, setState] = useState({
        title: '',
        userId: 0,
        completed: false
    });

    const addTodoMutation = useMutation({
        mutationFn: async (newTodo) =>
            await fetch('https://jsonplaceholder.typicode.com/todos', {
                method: 'POST',
                body: JSON.stringify(newTodo)
            }),
        onMutate: () => {
            setIsSaving(true);
        },
        onSuccess: (response) => {
            setIsSaving(false);
            queryClient.invalidateQueries({ queryKey: ['todos'] });
            history.push('/');
        }
    });

    const onSubmit = (e) => {
        e.preventDefault();

        if (_.isEmpty(state.title) || _.isNil(state.userId)) {
            return;
        }

        addTodoMutation.mutate(state);
    };

    return (
        <form className="new-todo" onSubmit={onSubmit}>
            <Todo
                users={users}
                todo={state}
                updateTodoHandler={(updatedTodo) => setState(updatedTodo)}
            />
            <button type="submit" className='add-button' disabled={isSaving}>{isSaving ? 'Saving' : 'Save'}</button>
        </form>
    );
}
