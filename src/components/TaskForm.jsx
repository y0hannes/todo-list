const TaskForm = ({ newTask, setNewTask, onAddTask }) => (
  <form onSubmit={onAddTask}>
    <input
      type="text"
      placeholder="Add task"
      value={newTask}
      onChange={(e) => setNewTask(e.target.value)}
    />
    <button type="submit">Add</button>
  </form>
);

export default TaskForm;
