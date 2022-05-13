import Header from "./components/Header";
import React from 'react'
import Tasks from "./components/Tasks";
import { useState, useEffect } from "react"

import AddTask from "./components/AddTask";
import Footer from "./components/Footer";
import About from "./components/About";

const App = () => {
  const [showAddTask, setShowAddTask] = useState(false)
  const [tasks, setTasks] = useState([])
  useEffect(() => {
    const getTasks = async() => {
      const tasksFromServer = await fetchTasks()
      setTasks(tasksFromServer)
    }
    getTasks()
  }, [])

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()

    return data
  }

  // Fetch tasks
  const fetchTask = async (id) => {
    const res = await fetch(`http://localhost:5000/tasks/${id}`)
    const data = await res.json()

    return data
  }

  // Add task
  const addTask = async (task) =>{
    const res = await fetch('http://localhost:5000/tasks', {
                method: 'POST', 
                headers: {
                  'Content-type': 'application/json',
                },
                body: JSON.stringify(task)
              })
    const data = await res.json()
    setTasks([...tasks, data]) 
    // const id = Math.floor((Math.random() * 10000))+1
    
    // console.log(id)

    // const newTask = {id, ...task}
    // setTasks([...tasks, newTask])
  }

  // delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {method: 'DELETE'})

    console.log('delete', id)
    setTasks(tasks.filter((task) => task.id !== id))
  
  }

  // toggle reminder
  const toggleReminder = async(id) => {
    const taskToToffle = await fetchTask(id)
    const updTask = {...taskToToffle,
    reminder: !taskToToffle.reminder
    }
    const res = await fetch(`http://localhost:5000/tasks/${id}`,{ 
      method: 'PUT',
      headers: {
        'Content-type': 'application/json'
      },
    body: JSON.stringify(updTask)
  })

  const data = await res.json()


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
        
        <Footer/>
    </div>
    
  )
}



// class App extends React.Component {
//   render() {
//     return <h1>Hello from a class</h1>
//   }
// }

export default App;
