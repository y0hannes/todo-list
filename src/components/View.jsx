import { useEffect, useMemo, useRef, useState } from "react"

const View = () => {
  const idCounter = useRef(0)
  const [tasks, setTasks] = useState([])
  const [newTask, setNewTask] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [filter, setFilter] = useState("active")

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

        const maxId = data.reduce((max, task) => (task.id > max ? task.id : max), 0)
        idCounter.current = maxId + 1
      }
    } catch (error) {
      console.log("Error loading data from local storage")
    } finally {
      setIsLoaded(true);
    }
  }
  ), [])

  // check if all tasks are completed
  useEffect(() => {
    const allDone = tasks.length > 0 && tasks.every(task => task.isCompleted);
    if (allDone) {
      alert('You’re all done! 🎉');
    }
  }, [tasks]);

  // filtering tasks
  const filteredTasks = useMemo(() => {
    if (filter === "active") return tasks.filter(task => !task.isCompleted)
    if (filter === "completed") return tasks.filter(task => task.isCompleted)
    return tasks
  }, [filter, tasks])

  const changeFilter = (e) => {
    setFilter(e.target.value)
  }


  const AddTask = (e) => {
    e.preventDefault()
    if (newTask.trim() != "") {
      const task = {
        id: idCounter.current++,
        text: newTask,
        isCompleted: false
      }
      setTasks([...tasks, task])
      setNewTask("")
    }
  }

  const changeStatus = (e, id) => {
    e.preventDefault()
    const updated = [...tasks]
    const index = updated.findIndex((task) => task.id === id)
    if (index !== -1) {
      updated[index] = { ...updated[index], isCompleted: !updated[index].isCompleted }
    }
    setTasks(updated)
  }

  const handleRemove = (e, id) => {
    e.preventDefault();
    const updated = tasks.filter(task => task.id !== id);
    setTasks(updated);
  };

  return (
    <>
      <form onSubmit={AddTask}>
        <input type="text" placeholder="Add task" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
        <button type="submit"> Add </button>
      </form>

      <select name="filter" value={filter} onChange={(e) => changeFilter(e)}>        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      <p> List of Tasks </p>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            {task.text}
            <button onClick={(e) => changeStatus(e, task.id)}>Done</button>
            <button onClick={(e) => handleRemove(e, task.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </>
  )
}

export default View