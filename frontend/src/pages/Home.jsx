import { Suspense } from "react";
import { useLoaderData, Await } from "react-router";
import TasksList from "../components/tasks/TasksList";
import LoadingMessage from "../components/common/LoadingMessage";
import "./Home.css";

function Home() {
  const data = useLoaderData();

  return (
    <ul className="tasks-list">
      <Suspense fallback={<LoadingMessage />}>
        <Await
          resolve={data.lists}
          errorElement={
            <b style={{ color: "var(--danger)", textAlign: "center" }}>
              An error occured when fetching tasks...
            </b>
          }
        >
          {(lists) =>
            lists.map((list, index) => <TasksList list={list} key={index} />)
          }
        </Await>
      </Suspense>
    </ul>
  );
}

export default Home;
