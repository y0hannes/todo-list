const TaskItem = ({ task, onToggle, onRemove }) => (
  <li>
    {task.text}
    <button onClick={(e) => onToggle(e, task.id)}>
      {task.isCompleted ? "Undo" : "Done"}
    </button>
    <button onClick={(e) => onRemove(e, task.id)}>Delete</button>
  </li>
);

export default TaskItem;
