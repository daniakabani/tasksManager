import React, { useEffect, useContext, useState } from "react";
import context from "../../providers/context";
import InputField from "../../components/inputField";
import { getAllRoles } from "../../services/roles";
import { updateUser, getUserByID } from "../../services/users";
import Button from "../../components/button";
import Select from "react-select";
import Tags from "@yaireo/tagify/dist/react.tagify";
import { FormSerializer } from "../../helpers";
import "@yaireo/tagify/dist/tagify.css";
import { useHistory, useParams } from "react-router-dom";

const UserEdit = () => {
  const [{ role }] = useContext(context);
  const [state, setState] = useState({
    userData: null,
    roles: [],
    isLoading: true,
    defaultRole: null,
  });
  const [selectState, setSelect] = useState({
    selectedRole: null,
    tags: [],
  });
  const { roles, userData, isLoading, defaultRole } = state;
  const { selectedRole, tags } = selectState;
  const history = useHistory();
  const { id } = useParams();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { username } = FormSerializer(e.currentTarget);
    updateUser(id, {
      username,
      role_id: selectedRole ?? userData.role_id,
      tag: tags.length ? JSON.stringify(tags) : userData.tags,
    })
      .then(() => {
        history.push(`/users/${id}`);
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    let userInfo, rolesData;
    Promise.resolve()
      .then(async () => {
        let user = await getUserByID(id);
        userInfo = {
          name: user?.username,
          role_id: user?.role_id,
          tags: user?.tag,
        };
      })
      .then(async () => {
        let roles = await getAllRoles();
        let tmpRolesArray = [];
        roles?.map((role) => {
          return tmpRolesArray.push({
            label: `${role?.id}- ${role?.name}`,
            value: role?.id,
          });
        });
        rolesData = tmpRolesArray;
      })
      .catch((e) => console.error(e))
      .finally(() => {
        setState({
          ...state,
          userData: userInfo,
          roles: rolesData,
          isLoading: false,
        });
      });
  }, []);

  const handleRolesSelect = (e) => {
    setSelect({
      ...selectState,
      selectedRole: Number(e.value),
    });
  };

  const handleTagsSelect = (e) => {
    if (e.target.value.length) {
      let parsedTags = JSON.parse(e.target.value);
      let array = [];
      parsedTags.map((tag) => {
        array.push(tag.value);
      });
      setSelect({
        ...selectState,
        tags: array,
      });
    }
  };

  if (role === "super_user") {
    if (isLoading) {
      return (
        <div id="main">
          <div className="form-wrapper">
            <h1>Loading...</h1>
          </div>
        </div>
      );
    } else {
      return (
        <div id="main">
          <div className="form-wrapper">
            <h1>update user info</h1>
            <form onSubmit={(e) => handleFormSubmit(e)}>
              <InputField
                name="username"
                defaultValue={userData?.name}
                required
              />
              <Select
                placeholder="Roles"
                options={roles ?? []}
                onChange={(e) => handleRolesSelect(e)}
                className="select"
                defaultValue={roles[userData?.role_id - 1] ?? []}
              />
              <Tags
                label="Tags"
                placeholder="User Tags"
                name="tags"
                onChange={(e) => handleTagsSelect(e)}
                className="tags"
                value={userData?.tags ?? ""}
              />
              <Button content="Update" />
            </form>
          </div>
        </div>
      );
    }
  } else {
    return (
      <div id="main">
        <div className="content">
          <header>
            <h1>Access Denied.</h1>
          </header>
        </div>
      </div>
    );
  }
};

export default UserEdit;
