import React, { useState } from "react";

const MakeTask = ({ onCreate }) => {
  const [taskValue, setTaskValue] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!taskValue) {
      return;
    }
    onCreate({ task: taskValue });
    setTaskValue("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={taskValue}
        onChange={(e) => setTaskValue(e.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default MakeTask;
