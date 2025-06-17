const API_BASE = 'http://localhost:5000/todo';

function TodoItem(props){
    const {id, title, completed, setItems} = props;
    console.log(1111,props);
    const deleteTodo = async(id) => {
        try {
            const response = await fetch(API_BASE + '/delete/' + id, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            })

            if(!response.ok){
                throw new Error("Faild to delete a task")
            } 

            // const data = await response.json();
            // setItems(items => items.map(item => item._id !== data._id))
            // await response.json();
            setItems(items => items.filter(item => item._id !== id));
        } catch(err){
            console.error('Error updating task status:', err);
        }
    }

    const updateTodo = async(id) => {
        try {
            const response = await fetch(API_BASE + '/update/' + id, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({completed: !completed})
            })

            if(!response.ok){
                throw new Error("Faild to update a task")
            } 

            const data = await response.json();
            console.log(2222,data)
            setItems(items => items.map(item => item._id === data._id ? data : item))
        } catch(err){
            console.error('Error updating task status:', err);
        }
    }
    
    return(
     <div className={"todo" + (completed ? " check-complete" : "")} key = {id}>
        <div className="checkbox" onClick={() => updateTodo(id)}></div>
        <div className="text">{title}</div>
        <div className="delete-todo" onClick = {() => deleteTodo(id)}><span >X</span></div>
      </div>
    )
}

// export default TodoItem;