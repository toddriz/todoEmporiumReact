import React from 'react';
import { createRoot } from 'react-dom/client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import App from './app/App';
import './index.css';

const queryClient = new QueryClient();

const root = createRoot(document.getElementById('root'));

root.render(
    <React.StrictMode className="todo-emporium" >
        <QueryClientProvider client={queryClient}>
            <App className="todo-emporium" />
        </ QueryClientProvider>

    </React.StrictMode>
);
