import React, { useContext } from "react";
import { useHistory, Link } from "react-router-dom";
import Context from "providers/context";
import Button from "components/button";
import constants from "localConstants";
import ReactPaginate from "react-paginate";
import { HandleTasksLoadingLogic } from "./logic";

const { statuses } = constants;

const TasksListPage = () => {
  const [{ role }] = useContext(Context);
  const history = useHistory();

  const {
    tasks,
    tasksAreLoading,
    handleTasksPagination,
    pageCount,
    activeStatus,
    handleStatusChange,
  } = HandleTasksLoadingLogic();

  const handleRedirects = (location) => {
    history.push(`/${location}`);
  };

  const handlePageChange = (page) => {
    let pageNumber = Number(page + 1);
    if (pageNumber <= pageCount) {
      handleTasksPagination(pageNumber);
    }
  };

  const handleTaskDelete = () => {
    return null;
  };

  if (tasksAreLoading) {
    return (
      <div id="main">
        <div className="content">
          <header>
            <h1>Current Tasks</h1>
          </header>
          <div className="list-view">
            <h1>Loading...</h1>
          </div>
        </div>
      </div>
    );
  } else if (!tasksAreLoading && tasks) {
    return (
      <div id="main">
        <div className="content">
          <header>
            <h1>Current Tasks</h1>
            <Link to="/tasks/new">Create new task</Link>
          </header>
          <div className="filters">
            <h5>Filters</h5>
            <div className="actions">
              {statuses.map((status) => (
                <span
                  key={status}
                  onClick={() => handleStatusChange(status)}
                  className={activeStatus === status ? "active" : ""}
                >
                  {status}
                </span>
              ))}
            </div>
          </div>
          <div className="list-view">
            <div className="api-data">
              {tasks?.map(
                ({
                  id,
                  uuid,
                  status,
                  description,
                  title,
                  subTasks,
                  assigned_user,
                  user,
                }) => (
                  <div className="task-content" key={id}>
                    <header>
                      <h4>
                        {title} <span>{status}</span>
                      </h4>
                      <h5>
                        Assigned to:{" "}
                        <Link to={`/users/${assigned_user}`}>
                          {user?.username}
                        </Link>
                      </h5>
                    </header>
                    <article>
                      <p>{description}</p>
                    </article>
                    <div className="subs">
                      <h5>Sub tasks dependencies</h5>
                      <ul>
                        {subTasks.map(({ uuid, title, status }) => {
                          return (
                            <li key={uuid}>
                              <Link to={`sub-tasks/${id}`}>
                                {title} - {status}
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                    <div className="actions">
                      <Button
                        onClick={() => handleRedirects(`tasks/${id}`)}
                        success
                      >
                        View
                      </Button>
                      <Button
                        success
                      >
                        Add Sub-Task
                      </Button>
                      {role === "super_user" && (
                        <Button onClick={() => handleTaskDelete(id)} danger>
                          Delete
                        </Button>
                      )}
                    </div>
                  </div>
                )
              )}
            </div>
            <ReactPaginate
              previousLabel={"previous"}
              nextLabel={"next"}
              breakLabel={"..."}
              pageCount={pageCount}
              marginPagesDisplayed={2}
              pageRangeDisplayed={10}
              activeClassName={"active"}
              containerClassName="pagination"
              onPageChange={({ selected }) => handlePageChange(selected)}
            />
          </div>
        </div>
      </div>
    );
  }
};

export default TasksListPage;
