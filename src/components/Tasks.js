import Task from "./Task"

const Tasks = ({tasks, onDelete}) => {

    

    return (
        <>
          {tasks.map((task) => (
          <Task key={task.id} 
                onDelete = {onDelete} 
                task={task}/>
          ))}  
        </>
    )
}

export default Tasks