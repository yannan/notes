declare namespace TodoSpace {
    interface Todo {
        text: string,
        completed: boolean
    }
    
    interface Action {type: string; filter?: string; text?: string; id?: number}
    
    interface initialState  {
        visibilityFilter: string,
        todos: Todo[]
    }
    
    interface Reducer<T> {
        (state: T, action: Action): T
    }
}