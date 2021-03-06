import { useState, useEffect } from "react";
import { getSubTaskById, editSubTask } from "services/subTasks";
import { getAllTasks } from "services/tasks";
import { getAllUsers } from "services/users";
import { defaultErrorMessageInvoker, FormSerializer } from "helpers";

const HandleSubTaskFetchingLogic = (id) => {
  const [subTaskData, setSub] = useState(null);
  const [subError, setError] = useState(null);

  useEffect(() => {
    getSubTaskById(id)
      .then((res) => {
        setSub(res);
      })
      .catch((e) => {
        console.error(e);
        setError(defaultErrorMessageInvoker("Sub-Task"));
      });
  }, []);
  return {
    subTaskData,
    subError,
  };
};

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

const HandleSubTaskUpdatingLogic = () => {
  const [shouldRedirect, setRedirect] = useState(false);
  const [updateLoading, setLoading] = useState(false);
  const [updateError, setError] = useState(null);

  const handleSubTaskUpdate = (
    event,
    selectedUser,
    selectedStatus,
    selectedTask,
    id
  ) => {
    event.preventDefault();
    const { title, description } = FormSerializer(event.currentTarget);
    setLoading(true);
    editSubTask({
      id,
      body: {
        assigned_user: selectedUser,
        status: selectedStatus,
        parent_task_id: selectedTask,
        title,
        description,
      },
    })
      .then(() => {
        setRedirect(true);
      })
      .catch((e) => {
        console.error(e);
        setError("something went wrong while updating");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return { shouldRedirect, updateError, updateLoading, handleSubTaskUpdate };
};

export {
  HandleSubTaskFetchingLogic,
  HandleSubTaskUpdatingLogic,
  HandleUsersFetchLogic,
  HandleTasksFetchingLogic,
  HandleSelectionsLogic,
};
