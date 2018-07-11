import todos from './todos'
import visibilityFilter from './visibilityFilter'
import { combineReducers } from 'redux'

// let todoApp: TodoSpace.Reducer<TodoSpace.initialState> = (state, action) => ({
//     visibilityFilter: visibilityFilter(state.visibilityFilter, action),
//     todos: todos(state.todos, action)
// })

// export default todoApp

export default combineReducers({
    todos,
    visibilityFilter
})