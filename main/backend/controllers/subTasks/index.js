const SubTasksService = require("daniakabani/services/subTasks"),
  { statusCodes } = require("daniakabani/constants"),
  { schemaValidator } = require("daniakabani/helpers"),
  {
    getById: getSubTaskByIDSchema,
    create: createSubTaskSchema,
    update: updateSubTaskSchema,
  } = require("daniakabani/schemas/subTasks");

const { OK, created } = statusCodes;

exports.getSubTaskById = async (req, res) => {
  const { id = null } = req.params;
  await schemaValidator(getSubTaskByIDSchema, req.params);
  res.status(OK);
  return SubTasksService.getById({ id });
};

exports.createSubTask = async (req, res) => {
  const {
    parent_task_id: parentTask = null,
    title = "",
    status = "in-progress",
    description = "",
    assigned_user: assignedUser = null,
  } = req.body;
  await schemaValidator(createSubTaskSchema, req.body);
  res.status(created);
  return SubTasksService.createSubTask({
    assigned_user: assignedUser,
    status,
    title,
    description,
    parent_task_id: parentTask,
  });
};

exports.updateSubTask = async (req, res) => {
  const { id } = req.params;
  const {
    parent_task_id: parentTask = null,
    title = "",
    status = "in-progress",
    description = "",
    assigned_user: assignedUser = null,
  } = req.body;
  await schemaValidator(updateSubTaskSchema, { ...req.params, ...req.body });
  res.status(OK);
  return SubTasksService.updateTask({
    id,
    status,
    description,
    title,
    parent_task_id: parentTask,
    assigned_user: assignedUser,
  });
};
