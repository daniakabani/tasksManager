import React from "react";
import {
  HandleTaskCreationLogic,
  HandleUsersFetchLogic,
  HandleTasksFetchingLogic,
  HandleSelectionsLogic,
} from "./logic";
import { Redirect } from "react-router-dom";
import InputField from "components/inputField";
import Select from "react-select";
import Button from "components/button";
import { statusData } from "localConstants";
import InfoBox from "components/infoBox";
import { loadingPlaceHolder } from "localConstants";

const CreateSubTask = () => {
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
  const { shouldRedirect, createLoading, createError, handleSubTaskCreation } =
    HandleTaskCreationLogic();

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
            handleSubTaskCreation(
              event,
              selectedUser,
              selectedStatus,
              selectedTask
            )
          }
        >
          <InputField name="title" />
          <textarea name="description" />
          <Select
            options={users ?? loadingPlaceHolder}
            className="select"
            onChange={({ value }) => handleUserSelection(value)}
          />

          <Select
            options={statusData ?? loadingPlaceHolder}
            className="select"
            onChange={({ value }) => handleStatusSelection(value)}
          />
          <Select
            options={mainTasks ?? loadingPlaceHolder}
            className="select"
            onChange={({ value }) => handleTaskSelection(value)}
          />
          <Button>{createLoading ? "Loading..." : "Create"}</Button>
        </form>
        {tasksError && <InfoBox danger>{tasksError}</InfoBox>}
        {usersError && <InfoBox danger>{usersError}</InfoBox>}
        {createError && <InfoBox danger>{createError}</InfoBox>}
      </div>
    </div>
  );
};

export default CreateSubTask;
