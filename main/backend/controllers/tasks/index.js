const TasksService = require("daniakabani/services/tasks"),
  { statusCodes } = require("daniakabani/constants"),
  { schemaValidator } = require("daniakabani/helpers"),
  {
    getAll: getAllTasksSchema,
    getByID: getTaskByIdSchema,
    create: createTaskSchema,
    update: updateTaskSchema,
    deleteTask: deleteTaskSchema,
    getByUUID: getTaskByUUIDSchema,
  } = require("daniakabani/schemas/tasks");

const { OK, created } = statusCodes;

exports.getAllTasks = async (req, res) => {
  const { page: pageNumber = 1, page_size: pageSize = 20, status } = req.query;
  await schemaValidator(getAllTasksSchema, req.query);
  const getAllTasks = await TasksService.getAll({
    page: pageNumber,
    page_size: pageSize,
    status,
  });
  res.status(OK);
  return {
    ...getAllTasks,
    total: getAllTasks.total,
    page_size: pageSize,
    page: pageNumber,
    page_count: Math.ceil(getAllTasks.total / pageSize),
  };
};

exports.getTaskById = async (req, res) => {
  const { id } = req.params;
  await schemaValidator(getTaskByIdSchema, req.params);
  res.status(OK);
  return await TasksService.getById({ id });
};

exports.createTask = async (req, res) => {
  const {
    assigned_user: assignedUser = null,
    status = "in-progress",
    title = null,
    description = null,
  } = req.body;
  await schemaValidator(createTaskSchema, req.body);
  res.status(created);
  return TasksService.createTask({
    assigned_user: assignedUser,
    status,
    title,
    description,
  });
};

exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const {
    assigned_user: assignedUser = null,
    status = "in-progress",
    title = null,
    description = null,
  } = req.body;
  await schemaValidator(updateTaskSchema, { ...req.body, ...req.params });
  res.status(OK);
  return TasksService.updateTask({
    assigned_user: assignedUser,
    status,
    title,
    description,
    id,
  });
};

exports.deleteTask = async (req, res) => {
  const { id = null } = req.params;
  await schemaValidator(deleteTaskSchema, req.params);
  res.status(200);
  return TasksService.deleteTask({ id });
};

exports.getTaskByUUID = async (req, res) => {
  const { uuid } = req.params;
  await schemaValidator(getTaskByUUIDSchema, req.params);
  res.status(OK);
  return TasksService.getByUUID({ uuid });
};
