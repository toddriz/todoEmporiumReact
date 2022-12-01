import _ from 'lodash';
import { useEffect, useState } from 'react';
import { useQuery } from '@tanstack/react-query';

import Todo from '../todo/Todo';

import './Todos.scss';

const renderTodoLists = (todos, updateTodoHandler, users) => {
    const [completedTodos, pendingTodos] = _.partition(todos, 'completed');

    if (_.isEmpty(todos)) {
        return <p>No Todos</p>;
    }

    return (
        <div className="todo-lists">
            <div className="todos pending">
                {pendingTodos.length === 0 ? <p>No Todos</p> : pendingTodos.map((todo) => <Todo key={todo.id} todo={todo} updateTodoHandler={updateTodoHandler} users={users} />)}
            </div>
            <div className="todos complete">
                <div>COMPLETE</div>
                {completedTodos.length === 0 ? <p>No Todos</p> : completedTodos.map((todo) => <Todo key={todo.id} todo={todo} updateTodoHandler={updateTodoHandler} users={users} />)}
            </div>
        </div>
    );
};

const Todos = ({ users }) => {
    const [todos, setTodos] = useState([]);

    const { status: todosStatus, error: todosError, data: todosData } = useQuery(['todos'], async () =>
        (await fetch('https://jsonplaceholder.typicode.com/todos')).json()
    );

    useEffect(() => {
        if (todosStatus === 'success') {
            setTodos(todosData);
        }
    }, [todosStatus, todosData]);

    const updateTodoHandler = (updatedTodo) => {
        const indexOfTodoToUpdate = _.findIndex(todos, (todo) => todo.id === updatedTodo.id);

        const updatedTodos = _.cloneDeep(todos);

        if (indexOfTodoToUpdate !== -1) {
            updatedTodos[indexOfTodoToUpdate] = updatedTodo;
        }

        setTodos(updatedTodos);
    };

    switch (todosStatus) {
        case 'loading':
            // TODO replace with better loading state (Loading spinner)
            return <p>Loading...</p>;
        case 'error':
            return <p>{todosError}</p>;
        case 'success':
            return renderTodoLists(todos, updateTodoHandler, users);
        default:
            return <p>No Todos</p>;
    }
};

export default Todos;
