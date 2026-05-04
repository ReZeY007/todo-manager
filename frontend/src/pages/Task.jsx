import { useState } from "react";
import { useLoaderData } from "react-router";
import { updateTask, createTask } from "../utils/api";
import "./Task.css";

function Task() {
  const loaderData = useLoaderData();
  const [editedTask, setEditedTask] = useState(loaderData?.taskData);
  const [lastLoadedId, setLastLoadedId] = useState(loaderData?.taskData?.id);
  const task = { ...loaderData?.taskData, ...editedTask };

  if (loaderData?.taskData?.id !== lastLoadedId) {
    setLastLoadedId(loaderData?.taskData?.id);
    setEditedTask({});
  }

  const handleChange = (event) => {
    setEditedTask({ ...editedTask, [event.target.name]: event.target.value });
  };

  const handleSave = async () => {
    let save = updateTask;
    if (!task.id) {
      save = createTask;
    }

    const response = await save(task);

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
          value={editedTask?.title || ""}
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
        value={editedTask?.description || ""}
        onChange={handleChange}
      />
    </div>
  );
}

export default Task;
