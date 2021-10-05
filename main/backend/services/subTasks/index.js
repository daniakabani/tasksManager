const SubTasksModel = require("daniakabani/models/subTasks"),
  { v4: uuidV4 } = require("uuid");

exports.getAll = () => {
  return SubTasksModel.query().whereNull("deleted_at");
};

exports.getById = ({ id }) => {
  return SubTasksModel.query()
    .findById(id)
    .whereNull("sub_tasks.deleted_at")
    .throwIfNotFound();
};

exports.createSubTask = ({
  parent_task: parentTask = null,
  title = null,
  status = "in-progress",
  description = null,
  assigned_user: assignedUser = null,
}) => {
  return SubTasksModel.query().insert({
    parent_task_id: parentTask,
    title,
    description,
    status,
    uuid: uuidV4(),
    assigned_user: assignedUser,
  });
};

exports.getByUUID = ({ uuid }) => {
  return SubTasksModel.query()
    .findOne({ uuid })
    .whereNull("sub_tasks.deleted_at")
    .throwIfNotFound();
};

exports.updateTask = ({
  title = "",
  description = "",
  assigned_user: assignedUser = null,
  status = "in-progress",
}) => {
  return SubTasksModel.query().patchAndFetchById(id, {
    assigned_user: assignedUser,
    title,
    status,
    description,
  });
};
