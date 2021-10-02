const RolesService = require("daniakabani/services/roles"),
  { schemaValidator } = require("daniakabani/helpers"),
  { getByID: getRoleByIDSchema } = require("daniakabani/schemas/roles");

exports.getRoleByID = async (req, res) => {
  const { id } = req.params;
  await schemaValidator(getRoleByIDSchema, req.params);
  let role = RolesService.getByID({
    id,
  });
  res.status(200);
  return role;
};

exports.getAll = async (req, res) => {
  let roles = RolesService.getAll();
  res.status(200);
  return roles;
};
