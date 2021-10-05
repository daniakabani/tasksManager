import { useEffect, useState } from "react";
import { getAllUsers } from "services/users";
import { createTask } from "services/tasks";
import { FormSerializer } from "helpers";

const HandleUsersLoadingLogic = () => {
  const [users, setUsers] = useState(null);
  const [assignedUser, setAssigned] = useState(null);
  useEffect(() => {
    getAllUsers({})
      .then((response) => {
        let tmpUsersArray = [];
        response?.results?.map(({ id, username }) => {
          return tmpUsersArray.push({
            label: username,
            value: id,
          });
        });
        setUsers(tmpUsersArray);
      })
      .catch((e) => console.error(e));
  }, []);

  const handleUserSelection = (value) => {
    return setAssigned(value);
  };

  return { users, handleUserSelection, assignedUser };
};

const HandleFormSubmissionLogic = () => {
  const [allowRedirect, setRedirect] = useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleTaskCreation = (selectedUser = null, e = null) => {
    e.preventDefault();
    setLoading(true);
    const { title, description } = FormSerializer(e.currentTarget);
    createTask({
      title,
      description,
      assigned_user: selectedUser,
    })
      .then(() => {
        setRedirect(true);
      })
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {});
  };

  return { allowRedirect, isLoading, handleTaskCreation };
};

export { HandleUsersLoadingLogic, HandleFormSubmissionLogic };
