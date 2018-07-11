import * as React from 'react';

import TodoList from './TodoList';
import AddTodo from './AddTodo';

// const todos = [
//     {id: 0, text: '好好', completed: false},
//     {id: 1, text: '学习', completed: false}
// ]

// const TodoApp = () => (
//     <div>
//         <TodoList todos={todos} toggleTodo={(id:number) => {todos[id].text = '不不'}}></TodoList>
//     </div>
// )

// export default TodoApp

class TodoApp extends React.Component<any, any> {
    constructor(props: any) {
        super(props);
        this.state = {
            todos: [
                {id: 0, text: '好好', completed: false},
                {id: 1, text: '学习', completed: false}
            ]
        }
    }

    toggleHandle(id: number) {
        this.setState((preState: any) => {
            preState.todos[id].completed = !preState.todos[id].completed;
            return preState;
        })
    }

    handleAdd(val: string) {
        this.setState((preState: any) => {
            preState.todos.push({
                id:  preState.todos.length,
                text: val,
                completed: false
            });
            return preState;
        })
    }

    render() {
        return (
            <div>
                <TodoList todos={this.state.todos} toggleTodo={(id:number) => {this.toggleHandle(id)}}></TodoList>
                <AddTodo addAction={(val: string) => this.handleAdd(val)} />
            </div>
        )
    }
}

export default TodoApp