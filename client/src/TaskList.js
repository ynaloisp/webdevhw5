import React, { useState, useEffect } from "react";
import axios from "axios";
import MakeTask from "./MakeTask";
import "./styles/TaskList.css";

const TaskList = () => {
  const [tasks, setTasks] = useState([]);
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskValue, setEditingTaskValue] = useState("");
  const [completedTasks, setCompletedTasks] = useState([]);

  useEffect(() => {
    const getTasks = async () => {
      const response = await axios.get("http://localhost:3001/api/tasks");
      setTasks(response.data.reverse());
    };
    getTasks();
  }, []);

  const handleDelete = async (id) => {
    await axios.delete(`http://localhost:3001/api/tasks/${id}`);
    setTasks(tasks.filter((task) => task._id !== id));
    setCompletedTasks([
      tasks.find((task) => task._id === id),
      ...completedTasks,
    ]);
  };

  const handleEdit = (task) => {
    setEditingTaskId(task._id);
    setEditingTaskValue(task.task);
  };

  const handleInputChange = (e) => {
    setEditingTaskValue(e.target.value);
  };

  const handleSave = async (id) => {
    await axios.put(`https://webdevhw5-wr55.vercel.app/api/tasks/${id}`, {
      task: editingTaskValue,
    });
    setTasks(
      tasks.map((task) =>
        task._id === id ? { ...task, task: editingTaskValue } : task
      )
    );
    setEditingTaskId(null);
  };

  const handleCreate = async (newTask) => {
    const response = await axios.post(
      "http://localhost:3001/api/tasks",
      newTask
    );
    setTasks([response.data, ...tasks]);
  };

  return (
    <div className="notes">
      <h1>To Do</h1>
      <ul>
        <MakeTask onCreate={handleCreate} />
        {tasks.map((task) => (
          <div key={task._id} className="list-item">
            {editingTaskId === task._id ? (
              <input
                type="text"
                value={editingTaskValue}
                onChange={handleInputChange}
              />
            ) : (
              <li>{task.task}</li>
            )}
            <div className="buttons">
              {editingTaskId === task._id ? (
                <button type="button" onClick={() => handleSave(task._id)}>
                  Save
                </button>
              ) : (
                <button type="button" onClick={() => handleEdit(task)}>
                  Edit
                </button>
              )}
              <button type="button" onClick={() => handleDelete(task._id)}>
                Complete
              </button>
            </div>
          </div>
        ))}
        <h1>Completed</h1>
        <p>(This means you're deleting the task)</p>
        {completedTasks.map((task) => (
          <div key={task._id} className="list-item">
            <li>{task.task}</li>
          </div>
        ))}
      </ul>
    </div>
  );
};

export default TaskList;
