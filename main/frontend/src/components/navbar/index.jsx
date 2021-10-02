import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import NavStyle from "./navBar.style";
import { useLocation } from "react-router-dom";
import context from "../../providers/context";

const NavBar = () => {
  const location = useLocation();
  const [{ role }] = useContext(context);
  return (
    <NavStyle>
      <nav>
        <ul>
          {role === "super_user" && (
            <li>
              <NavLink
                className={location.pathname === "/users" ? "active" : ""}
                to="/users"
              >
                Users
              </NavLink>
            </li>
          )}
          <li>
            <NavLink
              className={location.pathname === "/cars" ? "active" : ""}
              to="/cars"
            >
              Cars
            </NavLink>
          </li>
          <li>
            <NavLink
              className={location.pathname === "/tasks" ? "active" : ""}
              to="/listings"
            >
              Listings
            </NavLink>
          </li>
        </ul>
      </nav>
    </NavStyle>
  );
};

export default NavBar;
