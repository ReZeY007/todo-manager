import { Suspense } from "react";
import { useLoaderData, Await } from "react-router";
import TaskTile from "../components/tasks/TaskTile";
import LoadingMessage from "../components/common/LoadingMessage";
import "./Home.css";

function Home() {
  const data = useLoaderData();

  return (
    <ul className="tasks-list">
      <Suspense fallback={<LoadingMessage />}>
        <Await
          resolve={data.tasks}
          errorElement={
            <b style={{ fontSize: 18, textAlign: "center", color: "red" }}>
              Error
            </b>
          }
        >
          {(tasks) =>
            tasks.map((task, index) => <TaskTile key={index} task={task} />)
          }
        </Await>
      </Suspense>
    </ul>
  );
}

export default Home;
