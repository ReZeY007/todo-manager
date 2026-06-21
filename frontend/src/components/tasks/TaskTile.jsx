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
    <NavLink to={`/tasks/${task.id}`} className="task-tile">
      <div className="block">
        <div className="task-tile__left">
          <Checkbox onChange={handleCompletion} checked={task.isCompleted} />
          <div className="task-tile__info">
            <h3 className="task-tile__title">{task.title}</h3>
            <p className="task-tile__description">{task.description}</p>
          </div>
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
