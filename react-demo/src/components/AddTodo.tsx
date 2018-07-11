import * as React from 'react';

const AddTodo = (props: any) => {
    let input: any;

    return (
        <div>
            <form onSubmit={e => {
                e.preventDefault();
                props.addAction(input.value);
                input.value = '';
            }}>
                <input type="text" ref={node => input = node} />
                <button type="submit">
                    Add Todo
                </button>
            </form>
        </div>
    )
}

export default AddTodo