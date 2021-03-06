const TasksModel = require("daniakabani/models/tasks"),
  SubTasksService = require("daniakabani/services/subTasks"),
  { errorHandler } = require("daniakabani/utilities"),
  { v4: uuidV4 } = require("uuid");

exports.getAll = ({
  page = 1,
  page_size: pageSize = 20,
  status = "in-progress",
  title = null,
}) => {
  const result = TasksModel.query()
    .allowGraph("[subTasks, user]")
    .withGraphFetched("[subTasks, user]")
    .whereNull("tasks.deleted_at");
  status && result.where("status", "like", status);
  title && result.where("title", "like", title);
  result.orderBy("created_at", "desc");
  result.page(Number(page) - 1, pageSize);
  return result;
};

exports.getById = async ({ id }) => {
  return TasksModel.query()
    .findById(id)
    .allowGraph("[user, subTasks]")
    .withGraphFetched("[user, subTasks]")
    .whereNull("tasks.deleted_at")
    .throwIfNotFound();
};

exports.getByUUID = ({ uuid }) => {
  return TasksModel.query()
    .findOne({ uuid })
    .whereNull("tasks.deleted_at")
    .throwIfNotFound();
};

exports.createTask = ({
  assigned_user: assignedUser = null,
  status = "in-progress",
  title = null,
  description = null,
}) => {
  return TasksModel.query().insert({
    assigned_user: assignedUser,
    status,
    title,
    description,
    uuid: uuidV4(),
  });
};

exports.updateTaskPropagate = async ({
  assigned_user: assignedUser = null,
  status = "in-progress",
  title = null,
  description = null,
  id = null,
}) => {
  const requiredTask = await TasksModel.query()
    .findById(id)
    .allowGraph("subTasks")
    .withGraphFetched("subTasks")
    .whereNull("tasks.deleted_at")
    .throwIfNotFound();
  if (
    (requiredTask.status === "done" || requiredTask.status === "completed") &&
    status === "in-progress"
  ) {
    throw errorHandler({
      status: "Failed to update task",
      message: "Enable to update the requested task",
      reason:
        "A main task can't be reverted back to in-progress after it is marked as done",
    });
  }
  requiredTask.subTasks.map(async (subTask) => {
    await SubTasksService.updateTask({ ...subTask, status });
  });

  return TasksModel.query()
    .whereNull("tasks.deleted_at")
    .patchAndFetchById(id, {
      assigned_user: assignedUser,
      status: "completed",
      title,
      description,
    })
    .throwIfNotFound();
};

exports.updateTask = ({
  assigned_user: assignedUser = null,
  status = "in-progress",
  title = null,
  description = null,
  id = null,
}) => {
  return TasksModel.query()
    .whereNull("tasks.deleted_at")
    .patchAndFetchById(id, {
      assigned_user: assignedUser,
      status,
      title,
      description,
    })
    .throwIfNotFound();
};

exports.deleteTask = async ({ id = null }) => {
  return TasksModel.query()
    .whereNull("tasks.deleted_at")
    .patchAndFetchById(id, {
      deleted_at: new Date(),
    })
    .throwIfNotFound();
};
