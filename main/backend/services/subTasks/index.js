const SubTasksModel = require("daniakabani/models/subTasks"),
  { v4: uuidV4 } = require("uuid");

exports.getAll = ({
  page = 1,
  page_size: pageSize = 20,
  status = "in-progress",
}) => {
  const result = SubTasksModel.query()
    .allowGraph("task")
    .withGraphFetched("task")
    .whereNull("deleted_at");
  status && result.where("status", "like", status);
  result.orderBy("created_at", "desc");
  result.page(Number(page) - 1, pageSize);
  return result;
};

exports.getById = ({ id }) => {
  return SubTasksModel.query()
    .findById(id)
    .allowGraph("task")
    .withGraphFetched("task")
    .whereNull("sub_tasks.deleted_at")
    .throwIfNotFound();
};

exports.createSubTask = ({
  parent_task_id: parentTask = null,
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
  id = null,
  parent_task_id: parentTask = null,
}) => {
  return SubTasksModel.query().patchAndFetchById(id, {
    assigned_user: assignedUser,
    title,
    status,
    description,
    parent_task_id: parentTask,
  });
};
