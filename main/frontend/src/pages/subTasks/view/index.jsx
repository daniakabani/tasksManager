import React from "react";
import {
  HandleSubTaskFetchingLogic,
  HandleSubTaskUpdatingLogic,
  HandleUsersFetchLogic,
  HandleTasksFetchingLogic,
  HandleSelectionsLogic,
} from "./logic";
import { Redirect, useParams } from "react-router-dom";
import InputField from "components/inputField";
import Select from "react-select";
import Button from "components/button";
import { statusData } from "localConstants";
import InfoBox from "components/infoBox";
import { loadingPlaceHolder } from "localConstants";

const SubTaskView = () => {
  let { id } = useParams();
  const { subError, subTaskData } = HandleSubTaskFetchingLogic(id);
  const { tasksError, mainTasks } = HandleTasksFetchingLogic();
  const { users, usersError } = HandleUsersFetchLogic();
  const {
    selectedUser,
    selectedStatus,
    selectedTask,
    handleTaskSelection,
    handleStatusSelection,
    handleUserSelection,
  } = HandleSelectionsLogic();
  const { shouldRedirect, updateLoading, updateError, handleSubTaskUpdate } =
    HandleSubTaskUpdatingLogic();

  if (shouldRedirect) {
    return <Redirect to="/tasks" />;
  }
  return (
    <div id="main">
      <div className="form-wrapper">
        <header>
          <h1>Sub Task Details</h1>
        </header>
        <form
          onSubmit={(event) =>
            handleSubTaskUpdate(
              event,
              selectedUser || subTaskData?.assigned_user,
              selectedStatus || subTaskData?.status,
              selectedTask || subTaskData?.parent_task_id,
              id
            )
          }
        >
          <InputField name="title" defaultValue={subTaskData?.title} />
          <textarea
            name="description"
            defaultValue={subTaskData?.description}
          />
          {users && subTaskData && (
            <Select
              options={users ?? loadingPlaceHolder}
              defaultValue={users?.filter(
                ({ value }) => value === subTaskData?.assigned_user
              )}
              className="select"
              onChange={({ value }) => handleUserSelection(value)}
            />
          )}
          {subTaskData && (
            <Select
              options={statusData ?? loadingPlaceHolder}
              className="select"
              defaultValue={[
                { label: subTaskData?.status, value: subTaskData?.status },
              ]}
              onChange={({ value }) => handleStatusSelection(value)}
            />
          )}
          {subTaskData && mainTasks && (
            <Select
              options={mainTasks ?? loadingPlaceHolder}
              className="select"
              defaultValue={mainTasks?.filter(
                ({ value }) => value === subTaskData?.parent_task_id
              )}
              onChange={({ value }) => handleTaskSelection(value)}
            />
          )}
          <Button>{updateLoading ? "Loading..." : "Update"}</Button>
        </form>
        {tasksError && <InfoBox danger>{tasksError}</InfoBox>}
        {subError && <InfoBox danger>{subError}</InfoBox>}
        {usersError && <InfoBox danger>{usersError}</InfoBox>}
        {updateError && <InfoBox danger>{updateError}</InfoBox>}
      </div>
    </div>
  );
};

export default SubTaskView;
