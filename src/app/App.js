import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Switch } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';

import Todos from './todos/Todos';
import NewTodo from './newTodo/NewTodo';
import './App.scss';


function Header() {
    return (
        <div className="todo-emporium-header">
            <div className="todo-emporium-title">todo emporium</div>
            <Link className="header-link" to="/new">Add Todo</Link>
            <Link className="header-link" to="/">Todos</Link>
        </div>
    );
}

function App() {
    const [users, setUsers] = useState([]);

    // TODO move to a global redux store or context
    const { status: usersStatus, data: usersData } = useQuery(['users'], async () =>
        (await fetch('https://jsonplaceholder.typicode.com/users')).json()
    );

    useEffect(() => {
        if (usersStatus === 'success') {
            setUsers(usersData);
        }
    }, [usersStatus, usersData]);

    return (
        <div className="todo-emporium">
            <div className="body">
                <Router>
                    <Header />
                    <Switch>
                        <Route path="/new">
                            <NewTodo users={users} />
                        </Route>
                        <Route path="/">
                            <Todos users={users} />
                        </Route>
                    </Switch>
                </Router>
            </div>
        </div>
    );
}

export default App;
