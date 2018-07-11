declare namespace myComponent {
    interface Props { }
    interface State { userName: string; passWord: string; [x:number]: any; loginStatus?: string; }
    interface Option { method: string; url: string; data: any; }

    interface TodoStruct {
        onClick:any;
        completed: boolean;
        text: string;
        id?: number;
    }

    interface TodoListStruct {
        todos: any;
        toggleTodo: Function;
    }

    interface LinkStruct {
        active: boolean;
        children: Node;
        onClick: any;
    }
}