const express = require("express"),
  { expressCallback } = require("daniakabani/helpers");

const APIV1Routes = express.Router(),
  UsersController = require("daniakabani/controllers/users"),
  TasksController = require("daniakabani/controllers/tasks"),
  RolesController = require("daniakabani/controllers/roles");

// users routes here
APIV1Routes.get("/users", expressCallback(UsersController.getAll));
APIV1Routes.post("/users/login", expressCallback(UsersController.login));
APIV1Routes.get("/users/:id", expressCallback(UsersController.getByID));
APIV1Routes.post("/users", expressCallback(UsersController.create));
APIV1Routes.post("/users/:id", expressCallback(UsersController.update));
APIV1Routes.delete("/users/:id", expressCallback(UsersController.delete));

// roles routes here
APIV1Routes.get("/roles", expressCallback(RolesController.getAll));
APIV1Routes.get("/roles/:id", expressCallback(RolesController.getRoleByID));

// Tasks routes here
APIV1Routes.get("/tasks", expressCallback(TasksController.getAllTasks));
APIV1Routes.get("/tasks/:id", expressCallback(TasksController.getTaskById));
APIV1Routes.get("/tasks/uuid/:uuid", expressCallback(TasksController.getTaskByUUID));
APIV1Routes.post("/tasks", expressCallback(TasksController.createTask));
APIV1Routes.post("/tasks/:id", expressCallback(TasksController.updateTask));
APIV1Routes.delete("/tasks/:id", expressCallback(TasksController.deleteTask));

module.exports = APIV1Routes;
