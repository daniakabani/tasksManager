import React from "react";
import { NavLink } from "react-router-dom";
import NavStyle from "./navBar.style";
import { useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  return (
    <NavStyle>
      <nav>
        <ul>
          <li>
            <NavLink
              className={location.pathname === "/tasks" ? "active" : ""}
              to="/tasks"
            >
              Tasks
            </NavLink>
          </li>
        </ul>
      </nav>
    </NavStyle>
  );
};

export default NavBar;
