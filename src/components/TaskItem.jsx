const TaskItem = ({ task, onToggle, onRemove }) => {
  const listItem = {
    backgroundColor: '#f9f9f9',
    border: '1px solid #ddd',
    borderRadius: '8px',
    padding: '12px 16px',
    marginBottom: '10px',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    textDecoration: task.isCompleted ? 'line-through' : 'none',
    color: task.isCompleted ? '#999' : '#333',
  };

  const doneButton = {
    padding: '6px 10px',
    color: 'white',
    backgroundColor: task.isCompleted ? '#777' : 'green',
    border: 'none',
    borderRadius: '4px',
    margin: '0 5px',
    cursor: 'pointer',
  };

  const deleteButton = {
    padding: '6px 10px',
    color: 'white',
    backgroundColor: 'red',
    border: 'none',
    borderRadius: '4px',
    margin: '0 5px',
    cursor: 'pointer',
  };

  return (
    <li style={listItem}>
      {task.text}
      <div>
        <button style={doneButton} onClick={(e) => onToggle(e, task.id)}>
          {task.isCompleted ? 'Undo' : 'Done'}
        </button>
        <button style={deleteButton} onClick={(e) => onRemove(e, task.id)}>
          Delete
        </button>
      </div>
    </li>
  );
};

export default TaskItem;
