import { useState } from "react";
import { useLoaderData } from "react-router";
import { updateTask, createTask } from "../utils/api";
import "./Task.css";

function Task({ isNew }) {
  const loaderData = useLoaderData();
  const [task, setTask] = useState(loaderData?.taskData);

  const handleChange = (event) => {
    setTask({ ...task, [event.target.name]: event.target.value });
  };

  const handleSave = () => {
    let save = updateTask;
    if (isNew) {
      save = createTask;
    }

    const response = save(task);

    if (response.ok) {
      console.log("Task saved!");
    } else {
      console.error("An error occured while saving task.");
    }
  };

  return (
    <div className="task block">
      <div className="task__top">
        <input
          className="task__title"
          name="title"
          value={task?.title}
          onChange={handleChange}
        />

        <div className="task__actions">
          <button className="" onClick={handleSave}>
            Save
          </button>
          <button className="danger">Delete</button>
        </div>
      </div>
      <textarea
        className="task__description"
        name="description"
        value={task?.description}
        onChange={handleChange}
      />
    </div>
  );
}

export default Task;
