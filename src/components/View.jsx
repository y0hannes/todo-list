import { useEffect, useMemo, useRef, useState } from "react";
import TaskForm from "./TaskForm";
import TaskList from "./TaskList";
import FilterControl from "./FilterControl";
import UndoRedoControls from "./UndoRedoControls";
import Notification from "./Notification";

const View = () => {
  const idCounter = useRef(0);
  const [newTask, setNewTask] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [filter, setFilter] = useState("active");
  const [history, setHistory] = useState({
    past: [],
    present: [],
    future: [],
  });
  const [message, setMessage] = useState('')

  const tasks = history.present;

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("todos", JSON.stringify(history.present));
      localStorage.setItem("history", JSON.stringify(history));
    }
  }, [history, isLoaded]);

  useEffect(() => {
    try {
      const savedTasks = JSON.parse(localStorage.getItem("todos"));
      const savedHistory = JSON.parse(localStorage.getItem("history"));

      if (Array.isArray(savedTasks)) {
        const maxId = savedTasks.reduce((max, task) => (task.id > max ? task.id : max), 0);
        idCounter.current = maxId + 1;
      }

      if (savedHistory?.present) {
        setHistory(savedHistory);
      } else if (Array.isArray(savedTasks)) {
        setHistory({
          past: [],
          present: savedTasks,
          future: [],
        });
      }
    } catch (error) {
      console.error("Error loading from local storage", error);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  useEffect(() => {
    const allDone = tasks.length > 0 && tasks.every((task) => task.isCompleted);
    if (allDone) {
      alert("You're all done! 🎉");
    }
  }, [tasks]);

  const filteredTasks = useMemo(() => {
    if (filter === "active") return tasks.filter((task) => !task.isCompleted);
    if (filter === "completed") return tasks.filter((task) => task.isCompleted);
    return tasks;
  }, [filter, tasks]);

  const AddTask = (e) => {
    e.preventDefault();
    if (newTask.trim()) {
      const newEntry = {
        id: idCounter.current++,
        text: newTask,
        isCompleted: false,
      };
      setMessage('note added')
      setTimeout(() => setMessage(''), 3000)
      const newPresent = [...tasks, newEntry];

      setHistory((prev) => ({
        past: [...prev.past, prev.present],
        present: newPresent,
        future: [],
      }));

      setNewTask("");
    }
  };

  const changeStatus = (e, id) => {
    e.preventDefault();
    const newPresent = tasks.map((task) =>
      task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
    );

    setHistory((prev) => ({
      past: [...prev.past, prev.present],
      present: newPresent,
      future: [],
    }));
  };

  const handleRemove = (e, id) => {
    e.preventDefault();
    const newPresent = tasks.filter((task) => task.id !== id);

    setHistory((prev) => ({
      past: [...prev.past, prev.present],
      present: newPresent,
      future: [],
    }));
  };

  const undo = () => {
    setHistory((prev) => {
      if (prev.past.length === 0) return prev;
      const previous = prev.past[prev.past.length - 1];
      const newPast = prev.past.slice(0, -1);
      return {
        past: newPast,
        present: previous,
        future: [prev.present, ...prev.future],
      };
    });
  };

  const redo = () => {
    setHistory((prev) => {
      if (prev.future.length === 0) return prev;
      const next = prev.future[0];
      const newFuture = prev.future.slice(1);
      return {
        past: [...prev.past, prev.present],
        present: next,
        future: newFuture,
      };
    });
  };

  return (
    <>
      <Notification message={message} />
      <TaskForm newTask={newTask} setNewTask={setNewTask} onAddTask={AddTask} />
      <FilterControl filter={filter} onChange={setFilter} />
      <TaskList tasks={filteredTasks} onToggle={changeStatus} onRemove={handleRemove} />
      <UndoRedoControls
        onUndo={undo}
        onRedo={redo}
        canUndo={history.past.length > 0}
        canRedo={history.future.length > 0}
      />
    </>
  );
};

export default View;
