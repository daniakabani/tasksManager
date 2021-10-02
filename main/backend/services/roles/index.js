const RolesModel = require("daniakabani/models/roles"),
  { randomGenerator } = require("daniakabani/helpers");

exports.getAll = () => {
  return RolesModel.query().whereNull("roles.deleted_at");
};

exports.getByID = ({ id }) => {
  return RolesModel.query()
    .findById(id)
    .whereNull("roles.deleted_at")
    .throwIfNotFound();
};

exports.create = ({ name }) => {
  return RolesModel.query().insert({
    name,
  });
};

exports.delete = async ({ id }) => {
  const role = await RolesModel.query()
    .whereNull("roles.deleted_at")
    .findById(id)
    .throwIfNotFound();
  return RolesModel.query()
    .whereNull("roles.deleted_at")
    .findById(id)
    .patch({
      name: `${role.name}_DELETED_${await randomGenerator()}`,
      deleted_at: new Date(),
    });
};

exports.update = ({ id, name }) => {
  return RolesModel.query()
    .whereNull("roles.deleted_at")
    .patchAndFetchById(id, {
      name,
    })
    .throwIfNotFound();
};
