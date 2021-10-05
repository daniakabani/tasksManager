import React from "react";
import InputField from "components/inputField";
import Button from "components/button";
import { Redirect } from "react-router-dom";
import { HandleUsersLoadingLogic, HandleFormSubmissionLogic } from "./logic";
import Select from "react-select";

const CreateTask = () => {
  const { assignedUser, users, handleUserSelection } =
    HandleUsersLoadingLogic();
  const { handleTaskCreation, allowRedirect, isLoading } =
    HandleFormSubmissionLogic();
  if (allowRedirect) {
    return <Redirect to="/tasks" />;
  }
  return (
    <div id="main">
      <div className="form-wrapper">
        <header>
          <h1>Create a new Task</h1>
        </header>
        <form onSubmit={(e) => handleTaskCreation(assignedUser, e)}>
          <InputField name="title" placeHolder="title" type="string" required />
          <textarea name="description" placeholder="description" />
          <Select
            placeholder="Assigned user"
            options={users ?? []}
            onChange={({ value }) => handleUserSelection(value)}
            className="select"
          />
          <Button>{isLoading ? "Loading..." : "Create"}</Button>
        </form>
      </div>
    </div>
  );
};

export default CreateTask;
