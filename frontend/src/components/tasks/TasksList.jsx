import TaskTile from "./TaskTile";

function TasksList({ list }) {
  return (
    <div className="tasks-list">
      <h2 className="tasks-list__title">{list.title}</h2>
      {list.tasks.map((task, index) => (
        <TaskTile task={task} key={index} />
      ))}
    </div>
  );
}

export default TasksList;
