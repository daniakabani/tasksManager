import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import context from "../../providers/context";
import NavBar from "../../components/navbar";

export default function PrivateRoute({ children, ...props }) {
  const [{ allowLogin }] = useContext(context);
  return (
    <>
      <NavBar />
      <Route {...props}>
        {allowLogin ? children : <Redirect to={{ pathname: "/login" }} />}
      </Route>
    </>
  );
}
