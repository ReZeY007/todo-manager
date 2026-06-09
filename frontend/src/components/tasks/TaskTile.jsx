import { NavLink, useSubmit } from "react-router";
import "./TaskTile.css";

function TaskTile({ task }) {
  let submitDeletion = useSubmit();

  const handleDeleteButton = async (e) => {
    e.preventDefault();
    submitDeletion(
      {},
      {
        action: `tasks/${task.id}`,
        method: "DELETE",
      },
    );
  };

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
