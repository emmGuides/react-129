import Header from "./components/Header";
import React from 'react'
import Tasks from "./components/Tasks";
import { useState } from "react"
import AddTask from "./components/AddTask";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([
    {
        id: 1,
        text: "Doctor's appointment",
        day: "Feb 5th at 2:30 pm",
        reminder: true,
    },
    {
        id: 2,
        text: "Meeting at school",
        day: "Feb 6th at 1:30 pm",
        reminder: true,
    },
    {
        id: 3,
        text: "Food Shopping",
        day: "Feb 5th at 2:30 pm",
        reminder: true,
    },
  ])

  // Add task
  const addTask = (task) =>{
    const id = Math.floor((Math.random() * 10000))+1
    
    console.log(id)

    const newTask = {id, ...task}
    setTasks([...tasks, newTask])
  }

  // delete task
  const deleteTask = (id) => {
    console.log('delete', id)
    setTasks(tasks.filter((task) => task.id !== id))
  
  }

  // toggle reminder
  const toggleReminder = (id) => {
    console.log(id, tasks.reminder)
    setTasks(tasks.map((task) => 
                task.id === id ? 
                {...task, reminder: !task.reminder} 
                : task))
  }

  return (
    <div className="container">
      <Header text = 'Add'
              onAdd={() => 
              setShowAddTask(!showAddTask)}
              showAdd={showAddTask}
      />
      {showAddTask && <AddTask onAdd={addTask} />}
      {tasks.length > 0 ? (
        <Tasks tasks={tasks} 
        onDelete = {deleteTask}
        onToggle = {toggleReminder}
        /> ) : ('No tasks to show, maybe add one?'
        )}
    </div>
  );
}



// class App extends React.Component {
//   render() {
//     return <h1>Hello from a class</h1>
//   }
// }

export default App;
