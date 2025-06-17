import { useState } from "react"

const View = () => {
    const [tasks, setTasks] = useState([])
    const [newTask, setNewTask] = useState("")

    const AddTask = (e) => {
        e.preventDefault()
        if (newTask.trim() != ""){
            const task = {
                text: newTask,
                isCompleted: false
                }
            setTasks([...tasks, task])
            setNewTask("")
        }
    }
    
    const changeStatus = (index) => {
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
            <form>
                <input type="text" placeholder="Add task" value={newTask} onChange={(e) => setNewTask(e.target.value)} />
                <button onClick={ AddTask }> Add </button>
            </form>

            <p> List of Tasks </p>
            <ul>
                {tasks.map((task, index) =>
                    !task.isCompleted ? (
                        <li key={index}>
                            {task.text}
                            <input type="checkbox" checked={task.isCompleted} onChange={() => changeStatus(index)} />
                            <button onClick={(e) => handleRemove(e, index)}>remove</button>
                        </li>
                    ) : null
                )}
            </ul>

            <p>Completed Tasks</p>
            <ul>
                {tasks.map((task, index) =>
                    task.isCompleted ? <li key={index}>{task.text}</li> : null
                )}
            </ul>

        </>
    )
}

export default View