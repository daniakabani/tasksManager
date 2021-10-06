import React from "react";
import { HandleTaskFetchingLogic, HandleTaskUpdatingLogic } from "./logic";
import { Redirect, useParams } from "react-router-dom";
import InputField from "components/inputField";
import Select from "react-select";
import Button from "components/button";
import statusData from "./data";
import InfoBox from "components/infoBox";

const TaskView = () => {
  let { id } = useParams();
  const {
    isLoading,
    taskError,
    taskData,
    users,
    handleUserSelection,
    selectedUser,
    selectedStatus,
    handleStatusSelection,
  } = HandleTaskFetchingLogic(id);
  const { shouldRedirect, updateTaskData, updateLoading, updateError } =
    HandleTaskUpdatingLogic();

  if (isLoading) {
    return <h1>Loading...</h1>;
  } else if (shouldRedirect) {
    return <Redirect to="/tasks" />;
  }
  return (
    <div id="main">
      <div className="form-wrapper">
        <header>
          <h1>Task Details</h1>
        </header>
        <form
          onSubmit={(e) =>
            updateTaskData(
              id,
              e,
              selectedUser || taskData?.assigned_user,
              selectedStatus || taskData?.status
            )
          }
        >
          <label>
            Title:
            <InputField name="title" defaultValue={taskData.title} />
          </label>
          <label>
            Description:
            <textarea name="description" defaultValue={taskData.description} />
          </label>
          <label>
            Assigned user:
            <Select
              options={users}
              defaultValue={users.filter(
                (user) => user?.value === taskData?.assigned_user
              )}
              className="select"
              onChange={({ value }) => handleUserSelection(value)}
            />
          </label>
          <label>
            Status:
            <Select
              options={statusData}
              className="select"
              defaultValue={statusData.filter(
                (status) => status.value === taskData.status
              )}
              onChange={({ value }) => handleStatusSelection(value)}
            />
          </label>
          <Button>{updateLoading ? "Loading..." : "Update"}</Button>
        </form>
        {updateError && <InfoBox danger>{updateError}</InfoBox>}
        {taskError && <h3>Unable to fetch the required task</h3>}
      </div>
    </div>
  );
};

export default TaskView;
