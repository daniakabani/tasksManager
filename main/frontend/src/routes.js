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
import TasksListPage from "./pages/tasks/list";
import CreateTask from "./pages/tasks/create";
import TaskView from "./pages/tasks/view";
import SubTaskView from "./pages/subTasks/view";
import CreateSubTask from "./pages/subTasks/create";

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
        <PrivateRoute exact path="/tasks">
          <TasksListPage />
        </PrivateRoute>
        <PrivateRoute exact path="/tasks/new">
          <CreateTask />
        </PrivateRoute>
        <PrivateRoute exact path="/tasks/:id">
          <TaskView />
        </PrivateRoute>
        <PrivateRoute exact path="/sub-tasks/:id">
          <SubTaskView />
        </PrivateRoute>
        <PrivateRoute exact path="/sub-tasks">
          <CreateSubTask />
        </PrivateRoute>
        <Route>
          <NotFount />
        </Route>
      </Switch>
    </Router>
  );
};

export default Routes;
