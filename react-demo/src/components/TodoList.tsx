import * as React from 'react';
import Todo from './Todo';

const TodoList = ({todos, toggleTodo}:  myComponent.TodoListStruct) => (
    <ul>
        {todos.map((todo: myComponent.TodoStruct) => 
            <Todo
                key={todo.id}
                {...todo}
                onClick={() => toggleTodo(todo.id)} 
            />
        )}
    </ul>
)

export default TodoList