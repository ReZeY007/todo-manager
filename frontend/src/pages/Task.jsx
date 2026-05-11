import { useState } from "react";
import { useLoaderData } from "react-router";
import { updateTask, createTask } from "../utils/api/tasks";
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

    const data = await save(task);

    if (data?.error) {
      console.log(data.error);
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
