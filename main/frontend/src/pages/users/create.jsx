import React, { useEffect, useContext, useState } from "react";
import context from "../../providers/context";
import InputField from "../../components/inputField";
import { getAllRoles } from "../../services/roles";
import { createUser } from "../../services/users";
import Button from "../../components/button";
import Select from "react-select";
import Tags from "@yaireo/tagify/dist/react.tagify";
import { FormSerializer } from "../../helpers";
import "@yaireo/tagify/dist/tagify.css";
import { useHistory } from "react-router-dom";

const UsersCreate = () => {
  const [{ role }] = useContext(context);
  const [state, setState] = useState({
    roles: [],
  });
  const [selectState, setSelect] = useState({
    selectedRole: null,
    tags: [],
  });
  const { roles } = state;
  const { selectedRole, tags } = selectState;
  const history = useHistory();

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const { username, password } = FormSerializer(e.currentTarget);
    createUser({
      username,
      password,
      role_id: selectedRole,
      tag: JSON.stringify(tags) ?? "",
    })
      .then(() => {
        history.push("/users");
      })
      .catch((e) => console.error(e));
  };

  useEffect(() => {
    getAllRoles()
      .then((response) => {
        let tmpRolesArray = [];
        response?.map((role) => {
          return tmpRolesArray.push({
            label: `${role?.id}- ${role?.name}`,
            value: role?.id,
          });
        });
        setState({
          ...state,
          roles: tmpRolesArray,
        });
      })
      .catch((e) => console.error(e));
  }, []);

  const handleRolesSelect = (e) => {
    setSelect({
      ...selectState,
      selectedRole: Number(e.value),
    });
  };

  const handleTagsSelect = (e) => {
    let parsedTags = JSON.parse(e.target.value);
    let array = [];
    parsedTags.map((tag) => {
      array.push(tag.value);
    });
    setSelect({
      ...selectState,
      tags: array,
    });
  };

  if (role === "super_user") {
    return (
      <div id="main">
        <div className="form-wrapper">
          <h1>Register a new user</h1>
          <form onSubmit={(e) => handleFormSubmit(e)}>
            <InputField name="username" placeHolder="Your Username" required />
            <InputField
              name="password"
              placeHolder="Your Password"
              type="password"
              required
            />
            <Select
              placeholder="Roles"
              options={roles ?? []}
              onChange={(e) => handleRolesSelect(e)}
              className="select"
            />
            <Tags
              label="Tags"
              placeholder="User Tags"
              name="tags"
              onChange={(e) => handleTagsSelect(e)}
              className="tags"
            />
            <Button content="Create" />
          </form>
        </div>
      </div>
    );
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

export default UsersCreate;
