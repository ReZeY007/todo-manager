import { NavLink, useSubmit } from "react-router";
import Checkbox from "../common/formFields/Checkbox";
import "./TaskTile.css";

function TaskTile({ task }) {
  const submit = useSubmit();

  const handleCompletion = (next, e) => {
    e.preventDefault();

    submit(
      {
        isCompleted: !task.isCompleted,
      },
      {
        action: `tasks/${task.id}`,
        method: "PATCH",
        navigate: false,
      },
    );
  };

  const handleDeleteButton = (e) => {
    e.preventDefault();
    submit(
      {},
      {
        action: `tasks/${task.id}`,
        method: "DELETE",
      },
    );
  };

  return (
    <NavLink
      to={`/tasks/${task.id}`}
      className={
        task.isCompleted ? "task-tile task-tile--completed" : "task-tile"
      }
    >
      <div className="block hv">
        <div className="task-tile__left">
          <Checkbox onChange={handleCompletion} checked={task.isCompleted} />
          <div className="task-tile__info">
            <h3 className="task-tile__title">{task.title}</h3>
            <p className="task-tile__description">{task.description}</p>
          </div>
        </div>

        <div className="task-tile__actions">
          <button className="danger" onClick={handleDeleteButton}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              id="Outline"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path d="M21,4H17.9A5.009,5.009,0,0,0,13,0H11A5.009,5.009,0,0,0,6.1,4H3A1,1,0,0,0,3,6H4V19a5.006,5.006,0,0,0,5,5h6a5.006,5.006,0,0,0,5-5V6h1a1,1,0,0,0,0-2ZM11,2h2a3.006,3.006,0,0,1,2.829,2H8.171A3.006,3.006,0,0,1,11,2Zm7,17a3,3,0,0,1-3,3H9a3,3,0,0,1-3-3V6H18Z" />
              <path d="M10,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,10,18Z" />
              <path d="M14,18a1,1,0,0,0,1-1V11a1,1,0,0,0-2,0v6A1,1,0,0,0,14,18Z" />
            </svg>
          </button>
        </div>
      </div>
    </NavLink>
  );
}

export default TaskTile;
