import { useEffect, useState } from "react"

const View = () => {
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")
  const [isLoaded, setIsLoaded] = useState(false);

  // save to localstorage 
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('todos', JSON.stringify(tasks));
    }
  }, [tasks, isLoaded]);

  // load data from localstorage on reload
  useEffect((() => {
    try {
      const data = JSON.parse(localStorage.getItem('todos'));
      if (data && Array.isArray(data)) {
        setTasks(data)
      }
    } catch (error) {
      console.log("Error loading data from local storage")
    } finally {
      setIsLoaded(true);
    }
  }
  ), [])

  const AddTask = (e) => {
    e.preventDefault()
    if (newTask.trim() != "") {
      const task = {
        text: newTask,
        isCompleted: false
      }
      setTasks([...tasks, task])
      setNewTask("")
    }
  }

  const changeStatus = (e, index) => {
    e.preventDefault()
    const updated = [...tasks]
    updated[index].isCompleted = !updated[index].isCompleted
    setTasks(updated)
  }

  const handleRemove = (e, index) => {
    e.preventDefault()
    const updated = tasks.filter((_, i) => i !== index);
    setTasks(updated);
  }

  return (
    <>
      <form onSubmit={AddTask}>
        <input type="text" placeholder="Add task" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        <button type="submit"> Add </button>
      </form>

      <p> List of Tasks </p>
      <ul>
        {tasks.filter(t => !t.isCompleted).map((task, index) => (
          <li key={index}>
            {task.text}
            <button onClick={(e) => changeStatus(e, index)}>✅</button>
            <button onClick={(e) => handleRemove(e, index)}>❌</button>
          </li>
        ))}
      </ul>

      <p>Completed Tasks</p>
      <ul>
        {tasks.filter(t => t.isCompleted).map((task, index) => (
          <li key={index}>
            {task.text}
            <button onClick={(e) => handleRemove(e, index)}>❌</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default View