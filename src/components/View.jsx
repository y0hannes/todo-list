import { useState } from "react"

const View = () => {
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState("")

    const AddTask = (e) => {
        e.preventDefault()
        if (newTask.trim() != ""){
            setTasks([...tasks, newTask])
            setNewTask("")
        }
    }

    return (
        <>
            <form action="">
                <input type="text" placeholder="Add task" value={newTask} onChange={(e) => setNewTask(e.target.value)}>
                </input>
                <button onClick={ AddTask }> Add </button>
            </form>

            <p> List of tasks </p>
            <ul>
                {tasks.map((task, index) => (<li key={index}> {task} </li>))}
            </ul>
        </>
    )
}

export default View