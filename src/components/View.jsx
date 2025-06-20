import { useEffect, useMemo, useRef, useState } from "react"

const View = () => {
  const idCounter = useRef(0)
  const [newTask, setNewTask] = useState("")
  const [isLoaded, setIsLoaded] = useState(false)
  const [filter, setFilter] = useState("active")
  const [history, setHistory] = useState({
    past: [],
    present: [],
    future: [],
  })
  const tasks = history.present

  // Save to localStorage
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("todos", JSON.stringify(history.present))
      localStorage.setItem("history", JSON.stringify(history))
    }
  }, [history, isLoaded])

  // Load from localStorage
  useEffect(() => {
    try {
      const savedTasks = JSON.parse(localStorage.getItem("todos"))
      const savedHistory = JSON.parse(localStorage.getItem("history"))

      if (Array.isArray(savedTasks)) {
        const maxId = savedTasks.reduce((max, task) => (task.id > max ? task.id : max), 0)
        idCounter.current = maxId + 1
      }

      if (savedHistory?.present) {
        setHistory(savedHistory)
      } else if (Array.isArray(savedTasks)) {
        setHistory({
          past: [],
          present: savedTasks,
          future: [],
        })
      }
    } catch (error) {
      console.error("Error loading from local storage", error)
    } finally {
      setIsLoaded(true)
    }
  }, [])

  // Alert when all tasks are completed
  useEffect(() => {
    const allDone = tasks.length > 0 && tasks.every((task) => task.isCompleted)
    if (allDone) {
      alert("You're all done! 🎉")
    }
  }, [tasks])

  // Filtered task list
  const filteredTasks = useMemo(() => {
    if (filter === "active") return tasks.filter((task) => !task.isCompleted)
    if (filter === "completed") return tasks.filter((task) => task.isCompleted)
    return tasks
  }, [filter, tasks])

  // Add new task
  const AddTask = (e) => {
    e.preventDefault()
    if (newTask.trim()) {
      const newEntry = {
        id: idCounter.current++,
        text: newTask,
        isCompleted: false,
      }
      const newPresent = [...tasks, newEntry]

      setHistory((prev) => ({
        past: [...prev.past, prev.present],
        present: newPresent,
        future: [],
      }))

      setNewTask("")
    }
  }

  // Toggle task completion
  const changeStatus = (e, id) => {
    e.preventDefault()
    const newPresent = tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    )

    setHistory((prev) => ({
      past: [...prev.past, prev.present],
      present: newPresent,
      future: [],
    }))
  }

  // Delete task
  const handleRemove = (e, id) => {
    e.preventDefault()
    const newPresent = tasks.filter((task) => task.id !== id)

    setHistory((prev) => ({
      past: [...prev.past, prev.present],
      present: newPresent,
      future: [],
    }))
  }

  // Undo
  const undo = () => {
    setHistory((prev) => {
      if (prev.past.length === 0) return prev
      const previous = prev.past[prev.past.length - 1]
      const newPast = prev.past.slice(0, -1)
      return {
        past: newPast,
        present: previous,
        future: [prev.present, ...prev.future],
      }
    })
  }

  // Redo
  const redo = () => {
    setHistory((prev) => {
      if (prev.future.length === 0) return prev
      const next = prev.future[0]
      const newFuture = prev.future.slice(1)
      return {
        past: [...prev.past, prev.present],
        present: next,
        future: newFuture,
      }
    })
  }

  return (
    <>
      <form onSubmit={AddTask}>
        <input
          type="text"
          placeholder="Add task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button type="submit">Add</button>
      </form>

      <select name="filter" value={filter} onChange={(e) => setFilter(e.target.value)}>
        <option value="all">All</option>
        <option value="active">Active</option>
        <option value="completed">Completed</option>
      </select>

      <p>List of Tasks</p>
      <ul>
        {filteredTasks.map((task) => (
          <li key={task.id}>
            {task.text}
            <button onClick={(e) => changeStatus(e, task.id)}>Done</button>
            <button onClick={(e) => handleRemove(e, task.id)}>Delete</button>
          </li>
        ))}
      </ul>

      <button onClick={undo} disabled={history.past.length === 0}>
        Undo
      </button>
      <button onClick={redo} disabled={history.future.length === 0}>
        Redo
      </button>
    </>
  )
}

export default View
