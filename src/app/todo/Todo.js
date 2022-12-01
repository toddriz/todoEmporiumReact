
import _ from 'lodash';

import './Todo.scss';

const Todo = ({ todo, updateTodoHandler, users = [] }) => {
    return (
        <div key={todo.id} className="todo">
            <div className="todo-header">
                <div className="description">Description:</div>
                <div className="user-select">
                    <label className="user-label" htmlFor="user">User:</label>
                    <select name="user" defaultValue={_.toNumber(todo.userId)} onChange={(event) => updateTodoHandler({ ...todo, userId: _.toNumber(event.target.value) })}>
                        {users.map((user) => (<option key={user.id} value={user.id}>{user.name}</option>))}
                    </select>
                </div>
            </div>
            <textarea
                required
                autoCorrect="false"
                className="description-textarea"
                rows={5}
                cols={40}
                defaultValue={todo.title}
                onChange={(event) => updateTodoHandler({ ...todo, title: event.target.value })}
            />
            <div className="button-container">
                <span className="checkbox-container">
                    <label htmlFor="completeCheckbox">Complete</label>
                    <input
                        name="completeCheckbox"
                        type="checkbox"
                        checked={todo.completed}
                        onChange={() => updateTodoHandler({ ...todo, completed: !todo.completed })}
                    >
                    </input>
                </span>
            </div>
        </div >
    );
};

export default Todo;
