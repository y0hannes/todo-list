const TaskForm = ({ newTask, setNewTask, onAddTask }) => {
  const formStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px',
  };

  const inputStyle = {
    padding: '8px 12px',
    fontSize: '1rem',
    border: '1px solid #ccc',
    borderRadius: '4px',
    flex: '1',
    maxWidth: '300px',
  };

  const buttonStyle = {
    padding: '8px 14px',
    fontSize: '1rem',
    backgroundColor: '#4caf50',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
  };

  return (
    <form style={formStyle} onSubmit={onAddTask}>
      <input
        type="text"
        placeholder="Add task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
        style={inputStyle}
      />
      <button type="submit" style={buttonStyle}>
        Add
      </button>
    </form>
  );
};

export default TaskForm;
