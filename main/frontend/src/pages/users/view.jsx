import React, { useEffect, useContext, useState } from "react";
import { getUserByID } from "../../services/users";
import { useParams } from "react-router-dom";
import context from "../../providers/context";

const UsersView = () => {
  const [{ role }] = useContext(context);
  const [state, setState] = useState({
    isLoading: true,
    data: null,
  });
  const { isLoading, data } = state;
  let { id: userID } = useParams();

  useEffect(() => {
    getUserByID(userID)
      .then((result) => {
        let user = {
          id: result?.id,
          name: result?.username,
          created_at: new Date(result?.created_at)?.toString() ?? "N/A",
          role: result?.role?.name,
          tags: result?.tag ?? "N/A",
        };
        setState({
          ...state,
          isLoading: false,
          data: user,
        });
      })
      .catch((e) => console.error(e));
  }, []);

  if (role === "super_user") {
    return (
      <div id="main">
        <div className="content">
          <header>
            <h1>{isLoading ? "Loading..." : "User Details"}</h1>
          </header>
          <div className="view-data">
            <ul>
              <li>
                <span>ID:</span>
                {data?.id}
              </li>
              <li>
                <span>Name:</span>
                {data?.name}
              </li>
              <li>
                <span>Role:</span>
                {data?.role}
              </li>
              <li>
                <span>Tags:</span>
                {data?.tags}
              </li>
              <li>
                <span>Creation Date:</span>
                {data?.created_at}
              </li>
            </ul>
          </div>
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

export default UsersView;
