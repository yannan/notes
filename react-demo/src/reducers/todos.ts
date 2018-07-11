/// <reference path="reducers.d.ts" />

const todos: TodoSpace.Reducer<TodoSpace.Todo[]> = (state = [], action) => {
    switch (action.type) {
        case 'ADD_TODO':
            return [
                ...state,
                {
                    id: action.id,
                    text: action.text,
                    completed: false
                }
            ]
        case 'TOGGLE_TODO':
            return state.map((todo, index) => {
                if (index === action.id) {
                    return Object.assign({}, todo, {
                        completed: !todo.completed
                    })
                }
                return todo
            })
        default: 
            return state
    }
}

export default todos