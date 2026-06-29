import { useState } from "react";
import { useLoaderData } from "react-router";
import "./NewList.css";

function NewList() {
  const loaderData = useLoaderData();
  const [addedTasks, setAddedTasks] = useState([]);
  const [availableTasks, setAvailableTasks] = useState(
    loaderData?.availableTasks,
  );

  const handleAddTaskClick = (e) => {
    const target = e.target;
    const availableTaskElem = target.closest(".available-task");
    const availableTask = availableTasks.find(
      (availTask) => availTask.id == availableTaskElem.dataset.taskid,
    );

    const newAvailableTasksList = availableTasks.filter((availTask) => {
      if (availTask.id == availableTaskElem.dataset.taskid) return false;
      return true;
    });

    setAddedTasks([...addedTasks, availableTask]);
    setAvailableTasks(newAvailableTasksList);
  };

  const handleRemoveTaskClick = (e) => {
    const target = e.target;
    const addedTaskElem = target.closest(".added-task");
    const addedTask = addedTasks.find(
      (addedTask) => addedTask.id == addedTaskElem.dataset.taskid,
    );

    const newAddedTasksList = addedTasks.filter((addedTask) => {
      if (addedTask.id == addedTaskElem.dataset.taskid) return false;
      return true;
    });

    setAvailableTasks([...availableTasks, addedTask]);
    setAddedTasks(newAddedTasksList);
  };

  return (
    <div className="block new-list-page">
      <div className="new-list__header">
        <input className="list-title" placeholder="Title" required />
        <button>Create</button>
      </div>
      {addedTasks.length ? (
        <section className="added-tasks">
          <h2>Added tasks</h2>
          <ul className="added-tasks">
            {addedTasks.map((addedTask) => (
              <div
                className="added-task"
                style={{ border: "solid 2px white" }}
                data-taskid={addedTask.id}
                key={addedTask.id}
              >
                <h3>{addedTask.title}</h3>
                <p>{addedTask.description}</p>
                <button onClick={handleRemoveTaskClick}>Remove</button>
              </div>
            ))}
          </ul>
        </section>
      ) : null}
      <section className="available-tasks">
        <h2>Available tasks</h2>
        <ul className="available-tasks">
          {availableTasks.map((availTask) => (
            <div
              className="available-task"
              style={{ border: "solid 2px white" }}
              data-taskid={availTask.id}
              key={availTask.id}
            >
              <h3>{availTask.title}</h3>
              <p>{availTask.description}</p>
              <button onClick={handleAddTaskClick}>Add</button>
            </div>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default NewList;
