import { useState } from "react";
import { useLoaderData } from "react-router";
import "./NewList.css";

function NewList() {
  const [addedTasks, setAddedTasks] = useState([]);
  const loaderData = useLoaderData();
  const availableTasks = loaderData?.availableTasks;
  console.log(availableTasks);

  return (
    <div className="block new-list-page">
      <input className="list-title" placeholder="Title" required />
      {addedTasks && <section className="added-tasks"></section>}
      <section className="available-tasks">
        <h2>Available tasks</h2>
      </section>
    </div>
  );
}

export default NewList;
