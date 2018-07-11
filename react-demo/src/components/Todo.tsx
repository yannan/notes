import * as React from 'react'

const Todo = ({onClick, completed, text}:  myComponent.TodoStruct) => (
    <li
        onClick={onClick}
        style={{
            textDecoration: completed ? 'line-through' : 'none'
        }}
    >
        {text}
    </li>
)

export default Todo;