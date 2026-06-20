import { useState } from "react";
import { useLoaderData, Form } from "react-router";
import "./Task.css";

function Task() {
  const loaderData = useLoaderData();
  const [editedTask, setEditedTask] = useState(loaderData?.taskData);
  const [lastLoadedId, setLastLoadedId] = useState(loaderData?.taskData?.id);

  if (loaderData?.taskData?.id !== lastLoadedId) {
    setLastLoadedId(loaderData?.taskData?.id);
    setEditedTask(loaderData?.taskData);
  }

  const handleChange = (event) => {
    setEditedTask({ ...editedTask, [event.target.name]: event.target.value });
  };

  return (
    <div className="task block">
      <Form action="/tasks/" method="PUT" className="task-form">
        <div className="task__top">
          <input
            className="task__title"
            name="title"
            value={editedTask?.title || ""}
            onChange={handleChange}
            required
          />

          <div className="task__actions">
            <button className="" type="submit">
              Create
            </button>
          </div>
        </div>
        <textarea
          className="task__description"
          name="description"
          value={editedTask?.description || ""}
          onChange={handleChange}
        />
      </Form>
    </div>
  );
}

export default Task;
