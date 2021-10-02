import React from "react";
import {
  Route,
  Switch,
  BrowserRouter as Router,
  Redirect,
} from "react-router-dom";
import PrivateRoute from "./pages/privateRoute";
import NotFount from "./pages/404";
import LoginPage from "./pages/login";
import UsersList from "./pages/users/list";
import UsersCreate from "./pages/users/create";
import UsersEdit from "./pages/users/edit";
import UsersView from "./pages/users/view";
import CarAvailabilityList from "./pages/tasks/list";
import CreateListing from "./pages/tasks/create";
import ListingView from "./pages/tasks/view";
import EditListing from "./pages/tasks/edit";

const Routes = () => {
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Redirect to="/login" />
        </Route>
        <Route exact path="/login">
          <LoginPage />
        </Route>
        <PrivateRoute exact path="/users">
          <UsersList />
        </PrivateRoute>
        <PrivateRoute exact path="/users/new">
          <UsersCreate />
        </PrivateRoute>
        <PrivateRoute exact path="/users/:id">
          <UsersView />
        </PrivateRoute>
        <PrivateRoute exact path="/users/:id/edit">
          <UsersEdit />
        </PrivateRoute>
        <PrivateRoute exact path="/tasks">
          <CarAvailabilityList />
        </PrivateRoute>
        <PrivateRoute exact path="/tasks/new">
          <CreateListing />
        </PrivateRoute>
        <PrivateRoute exact path="/tasks/:id/edit">
          <EditListing />
        </PrivateRoute>
        <PrivateRoute exact path="/tasks/:id">
          <ListingView />
        </PrivateRoute>
        <Route>
          <NotFount />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
