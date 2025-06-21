import TaskItem from "./TaskItem";

const TaskList = ({ tasks, onToggle, onRemove }) => (
  <ul>
    {tasks.map((task) => (
      <TaskItem key={task.id} task={task} onToggle={onToggle} onRemove={onRemove} />
    ))}
  </ul>
);

export default TaskList;
