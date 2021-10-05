import React from "react";
import { HandleSubTaskFetchingLogic, HandleSubTaskUpdatingLogic } from "./logic";
import { Redirect, useParams } from "react-router-dom";
import InputField from "components/inputField";
import Select from "react-select";
import Button from "components/button";

const SubTaskView = () => {
  let { id } = useParams();
  const {
    isLoading,
    taskError,
    taskData,
    users,
    handleUserSelection,
    selectedUser,
  } = HandleSubTaskFetchingLogic(id);
  const { shouldRedirect, updateTaskData, updateLoading } =
    HandleSubTaskUpdatingLogic();

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
            updateTaskData(id, e, selectedUser || taskData?.assigned_user)
          }
        >
          <InputField name="title" defaultValue={taskData.title} />
          <textarea name="description" defaultValue={taskData.description} />
          <Select
            options={users}
            defaultValue={users.filter(
              (user) => user?.value === taskData?.assigned_user
            )}
            className="select"
            onChange={({ value }) => handleUserSelection(value)}
          />
          <Button>{updateLoading ? "Loading..." : "Update"}</Button>
        </form>
        {taskError && <h3>Unable to fetch the required task</h3>}
      </div>
    </div>
  );
};

export default SubTaskView;
