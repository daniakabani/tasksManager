import React from "react";
import {
  HandleTaskCreationLogic,
  HandleUsersFetchLogic,
  HandleSelectionsLogic,
} from "./logic";
import { Redirect, useLocation } from "react-router-dom";
import InputField from "components/inputField";
import Select from "react-select";
import Button from "components/button";
import { statusData } from "localConstants";
import InfoBox from "components/infoBox";
import { loadingPlaceHolder } from "localConstants";

const CreateSubTask = () => {
  const { users, usersError } = HandleUsersFetchLogic();
  const {
    selectedUser,
    selectedStatus,
    handleStatusSelection,
    handleUserSelection,
  } = HandleSelectionsLogic();
  const { shouldRedirect, createLoading, createError, handleSubTaskCreation } =
    HandleTaskCreationLogic();

  const { state } = useLocation();
  const { id: taskId } = state;

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
              taskId
            )
          }
        >
          <label>
            Title:
            <InputField name="title" placeHolder="Title" required />
          </label>
          <label>
            Description:
            <textarea name="description" placeholder="Description" />
          </label>
          <Select
            options={users ?? loadingPlaceHolder}
            className="select"
            onChange={({ value }) => handleUserSelection(value)}
            placeholder="Select assigned user"
          />
          <Select
            options={statusData ?? loadingPlaceHolder}
            className="select"
            onChange={({ value }) => handleStatusSelection(value)}
            placeholder="Select status"
          />
          <Button>{createLoading ? "Loading..." : "Create"}</Button>
        </form>
        {usersError && <InfoBox danger>{usersError}</InfoBox>}
        {createError && <InfoBox danger>{createError}</InfoBox>}
      </div>
    </div>
  );
};

export default CreateSubTask;
