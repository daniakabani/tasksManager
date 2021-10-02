const TasksModel = require("daniakabani/models/tasks");

exports.getAll = () => {
  return TasksModel.query().whereNull("roles.deleted_at");
};

exports.getById = ({ id }) => {
  return TasksModel.query()
    .findById(id)
    .whereNull("deleted_at")
    .throwIfNotFound();
};

exports.createTask = () => {
  return "ok";
}