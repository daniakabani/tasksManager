import React, { useEffect, useContext, useState } from "react";
import { getAllUsers, deleteUser } from "../../services/users";
import { useHistory, Link } from "react-router-dom";
import context from "../../providers/context";
import Button from "../../components/button";
import ReactPaginate from "react-paginate";
import InputField from "../../components/inputField";
import Toggle from "react-toggle";
import "react-toggle/style.css";
import { confirmMessage } from "../../helpers";

let searchTimeOut;
const UsersList = () => {
  const [{ role }] = useContext(context);
  const history = useHistory();
  const [state, setState] = useState({
    isLoading: true,
    data: null,
    currentPage: 1,
    pageCount: 1,
    nameFilter: "",
    adminsView: false,
    usersView: false,
  });
  const {
    isLoading,
    data,
    currentPage,
    pageCount,
    nameFilter,
    adminsView,
    usersView,
  } = state;
  useEffect(() => {
    setState({
      ...state,
      data: null,
    });
    getAllUsers({
      username: nameFilter,
      page: currentPage,
      admins: adminsView,
      users: usersView,
    })
      .then((response) => {
        setState({
          ...state,
          data: response?.results,
          isLoading: false,
          pageCount: response?.page_count,
        });
      })
      .catch((e) => {
        console.error(e);
      });
  }, [currentPage, nameFilter, adminsView, usersView]);

  const handleRedirects = (location) => {
    history.push(`/${location}`);
  };

  const handlePageChange = (page) => {
    let pageNumber = Number(page + 1);
    if (pageNumber <= pageCount) {
      setState({
        ...state,
        currentPage: pageNumber,
      });
    }
  };

  const handleSearch = (name) => {
    if (searchTimeOut) {
      clearTimeout(searchTimeOut);
    }
    searchTimeOut = setTimeout(() => {
      !isLoading &&
        setState({
          ...state,
          nameFilter: name,
          isLoading: true,
        });
    }, 400);
  };

  const handleToggles = (value, target) => {
    setState({
      ...state,
      [target]: value,
    });
  };

  const handleUserDelete = (id) => {
    let confirm = confirmMessage(`confirm deleting ${id}?`);
    if (confirm) {
      setState({
        ...state,
        isLoading: true,
        currentPage: null,
      });
      Promise.resolve()
        .then(async () => {
          await deleteUser(id);
        })
        .then(() => {
          setState({
            ...state,
            currentPage: 1,
          });
        })
        .catch((e) => console.error(e));
    } else {
      setState({
        ...state,
        isLoading: false,
      });
    }
  };

  if (role === "super_user") {
    return (
      <div id="main">
        <div className="content">
          <header>
            <h1>Available Users</h1>
            <Link to="/users/new">Create new user</Link>
          </header>
          <div className="filters">
            <h3>Filters</h3>
            <div className="actions">
              <InputField
                placeHolder="search for a name"
                name="username"
                onChange={(e) => handleSearch(e?.target?.value)}
              />
              <div className="toggles">
                <h5>Admins Only view</h5>
                <Toggle
                  defaultChecked={false}
                  onChange={(e) =>
                    handleToggles(e.target.checked, "adminsView")
                  }
                />
              </div>
              <div className="toggles">
                <h5>Users Only view</h5>
                <Toggle
                  defaultChecked={false}
                  onChange={(e) => handleToggles(e.target.checked, "usersView")}
                />
              </div>
            </div>
          </div>
          <div className="list-view">
            {isLoading ? (
              <h1>Loading...</h1>
            ) : (
              <ul className="api-data">
                {data?.map((item, key) => (
                  <li key={key}>
                    <h2>{item?.username}</h2>
                    <h3>
                      <span>Role:</span> {item?.role?.name}
                    </h3>
                    <div className="actions">
                      <Button
                        onClick={() => handleRedirects(`users/${item?.id}`)}
                        success
                        content="view"
                      />
                      <Button
                        onClick={() =>
                          handleRedirects(`users/${item?.id}/edit`)
                        }
                        warning
                        content="edit"
                      />
                      <Button
                        danger
                        onClick={() => handleUserDelete(item?.id)}
                        content="delete"
                      />
                    </div>
                  </li>
                ))}
              </ul>
            )}
            {!isLoading && (
              <ReactPaginate
                previousLabel={"previous"}
                nextLabel={"next"}
                breakLabel={"..."}
                pageCount={pageCount}
                marginPagesDisplayed={2}
                pageRangeDisplayed={10}
                activeClassName={"active"}
                containerClassName="pagination"
                onPageChange={({ selected }) => handlePageChange(selected)}
              />
            )}
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div id="main">
        <div className="content">
          <div className="list-view">
            <h1>Access denied.</h1>
          </div>
        </div>
      </div>
    );
  }
};

export default UsersList;
