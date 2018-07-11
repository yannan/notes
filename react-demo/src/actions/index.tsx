/**
 * action类型
 */

// export const ADD_TODO = 'ADD_TODO';
// export const TOGGLE_TODO = 'TOGGLE_TODO';
// export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER';

// /**
// * 其它的常量
// */

// export const VisibilityFilters = {
//     SHOW_ALL: 'SHOW_ALL',
//     SHOW_COMPLETED: 'SHOW_COMPLETED',
//     SHOW_ACTIVE: 'SHOW_ACTIVE'
// }

// /**
//  * action创建函数
//  */

// export function addTodo(text: string) {
//     return { type: ADD_TODO, text }
// }

// export function toggleTodo(index: number) {
//     return { type: TOGGLE_TODO, index }
// }

// export function setVisibilityFilter(filter:string) {
//     return { type: SET_VISIBILITY_FILTER, filter }
// }

let nextTodoId: number = 0;
export const addTodo = (text: string) => ({
    type: 'ADD_TODO',
    id: nextTodoId++,
    text
});

export const setVisibilityFilter = (filter: string) => ({
    type: 'SET_VISIBILITY_FILTER',
    filter
});

export const toggleTodo = (id: number) => ({
    type: 'TOGGLE_TODO',
    id
});

export const VisibilityFilters = {
    SHOW_ALL: 'SHOW_ALL',
    SHOW_COMPLETED: 'SHOW_COMPLETED',
    SHOW_ACTIVE: 'SHOW_ACTIVE'
};