import { NavLink } from "react-router";
import { deleteTask } from "../../utils/api/tasks";
import "./TaskTile.css";
import { useState } from "react";

function TaskTile({ task }) {
  const [isDeleted, setIsDeleted] = useState(false);

  const handleDeleteButton = async (e) => {
    e.preventDefault();
    const data = await deleteTask(task.id);

    if (data?.error) {
      console.log(data.error);
    } else {
      setIsDeleted(true);
    }
  };

  if (isDeleted) {
    return null;
  }

  return (
    <NavLink to={`/tasks/${task.id}`} className="task-tile">
      <div className="block">
        <div className="task-tile__info">
          <h3 className="task-tile__title">{task.title}</h3>
          <p className="task-tile__description">{task.description}</p>
        </div>

        <div className="task-tile__actions">
          <button className="danger" onClick={handleDeleteButton}>
            Delete
          </button>
        </div>
      </div>
    </NavLink>
  );
}

export default TaskTile;
