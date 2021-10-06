import { useState, useEffect } from "react";
import { getSubTaskById, createSubTask } from "services/subTasks";
import { getAllTasks } from "services/tasks";
import { getAllUsers } from "services/users";
import { defaultErrorMessageInvoker, FormSerializer } from "helpers";

const HandleTasksFetchingLogic = () => {
  const [mainTasks, setTasks] = useState(null);
  const [tasksError, setError] = useState(null);
  const tmpTasksArray = [];

  useEffect(() => {
    getAllTasks({ status: "" })
      .then((res) => {
        res?.results?.map(({ title, id }) => {
          return tmpTasksArray?.push({
            label: title,
            value: id,
          });
        });
        setTasks(tmpTasksArray);
      })
      .catch((e) => {
        console.error(e);
        setError(defaultErrorMessageInvoker("Tasks"));
      });
  }, []);

  return { mainTasks, tasksError };
};

const HandleUsersFetchLogic = () => {
  const [users, setUsers] = useState(null);
  const [usersError, setError] = useState(null);
  const tmpUsersArray = [];

  useEffect(() => {
    getAllUsers({})
      .then((res) => {
        res?.results?.map(({ username, id }) => {
          return tmpUsersArray.push({
            label: username,
            value: id,
          });
        });
        setUsers(tmpUsersArray);
      })
      .catch((e) => {
        console.error(e);
        setError(defaultErrorMessageInvoker("Users"));
      });
  }, []);

  return { users, usersError };
};

const HandleSelectionsLogic = () => {
  const [selectedUser, setSelected] = useState(null);
  const [selectedStatus, setStatus] = useState(null);
  const [selectedTask, setTask] = useState(null);

  const handleUserSelection = (value) => {
    setSelected(value);
  };

  const handleStatusSelection = (value) => {
    setStatus(value);
  };

  const handleTaskSelection = (value) => {
    setTask(value);
  };

  return {
    selectedStatus,
    selectedUser,
    selectedTask,
    handleUserSelection,
    handleStatusSelection,
    handleTaskSelection,
  };
};

const HandleTaskCreationLogic = () => {
  const [shouldRedirect, setRedirect] = useState(false);
  const [createLoading, setLoading] = useState(false);
  const [createError, setError] = useState(null);

  const handleSubTaskCreation = (
    event,
    selectedUser,
    selectedStatus,
    selectedTask,
  ) => {
    event.preventDefault();
    const { title, description } = FormSerializer(event.currentTarget);
    setLoading(true);
    createSubTask({
      assigned_user: selectedUser,
      status: selectedStatus,
      parent_task_id: selectedTask,
      title,
      description,
    })
      .then(() => {
        setRedirect(true);
      })
      .catch((e) => {
        console.error(e);
        setError("something went wrong while creating your subtask");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { shouldRedirect, createError, createLoading, handleSubTaskCreation };
};

export {
  HandleTaskCreationLogic,
  HandleUsersFetchLogic,
  HandleTasksFetchingLogic,
  HandleSelectionsLogic,
};
