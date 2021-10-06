import { useEffect, useState } from "react";
import { getTaskById, editTask } from "services/tasks";
import { getAllUsers } from "services/users";
import { FormSerializer } from "helpers";

const HandleTaskFetchingLogic = (id = null) => {
  const [isLoading, setLoading] = useState(false);
  const [taskData, setTask] = useState({});
  const [taskError, setError] = useState(null);
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelected] = useState(null);
  const [selectedStatus, setStatus] = useState(null);

  useEffect(() => {
    setLoading(true);
    const promisesArray = [getTaskById(id), getAllUsers({})];
    const tmpUsersArray = [];
    Promise.all(promisesArray)
      .then(([taskData, usersData]) => {
        usersData?.results?.map(({ username, id }) => {
          return tmpUsersArray.push({
            label: username,
            value: id,
          });
        });
        setUsers(tmpUsersArray);
        setTask(taskData);
      })
      .catch((e) => {
        console.error(e);
        setError(
          e?.data?.reason ||
            "Something went wrong fetching the data, please try again later"
        );
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleUserSelection = (value) => {
    setSelected(value);
  };

  const handleStatusSelection = (value) => {
    setStatus(value);
  };

  return {
    taskData,
    isLoading,
    taskError,
    users,
    selectedUser,
    handleUserSelection,
    selectedStatus,
    handleStatusSelection,
  };
};

const HandleTaskUpdatingLogic = () => {
  const [shouldRedirect, setRedirect] = useState(false);
  const [updateLoading, setLoading] = useState(false);
  const [updateError, setError] = useState(null);

  const updateTaskData = (id, event, selectedUser, selectedStatus) => {
    setLoading(true);
    event.preventDefault();
    const { title, description } = FormSerializer(event.currentTarget);
    editTask({
      id,
      body: {
        title,
        description,
        assigned_user: selectedUser,
        status: selectedStatus,
      },
    })
      .then(() => {
        setRedirect(true);
      })
      .catch((e) => {
        setError(
          e?.reason ??
            "Something went wrong while updating your task, please try again later"
        );
        console.error(e);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return { shouldRedirect, updateLoading, updateTaskData, updateError };
};

export { HandleTaskFetchingLogic, HandleTaskUpdatingLogic };
