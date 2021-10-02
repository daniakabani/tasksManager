const UsersService = require("daniakabani/services/users"),
  { schemaValidator } = require("daniakabani/helpers"),
  {
    create: usersCreateSchema,
    getByID: usersGetByIDSchema,
    delete: usersDeleteSchema,
    update: usersUpdateSchema,
    login: usersLoginSchema,
    getAll: usersGetAllSchema,
  } = require("daniakabani/schemas/users");

exports.getAll = async (req, res) => {
  const {
    include,
    page_size: pageSize,
    page: pageNumber,
    username,
    admins,
    users,
  } = req.query;
  await schemaValidator(usersGetAllSchema, req.query);
  let getAllUsers = await UsersService.getAll({
    include,
    page: pageNumber,
    page_size: pageSize,
    username,
    admins,
    users,
  });
  res.status(200);
  return {
    ...getAllUsers,
    total: getAllUsers.total,
    page_size: pageSize,
    page: pageNumber,
    page_count: Math.ceil(getAllUsers.total / pageSize),
  };
};

exports.create = async (req, res) => {
  const {
    username = null,
    tag = null,
    role_id = null,
    password = null,
  } = req.body;
  await schemaValidator(usersCreateSchema, req.body);
  let createUser = await UsersService.create({
    username,
    tag,
    role_id,
    password,
  });
  res.status(201);
  return createUser;
};

exports.getByID = async (req, res) => {
  const { id } = req.params;
  await schemaValidator(usersGetByIDSchema, req.params);
  let getUserByID = await UsersService.getByID({
    id,
  });
  res.status(200);
  return getUserByID;
};

exports.login = async (req, res) => {
  const { username, password } = req.body;
  await schemaValidator(usersLoginSchema, req.body);
  let login = await UsersService.login({
    username,
    password,
  });
  res.status(200);
  return login;
};

exports.update = async (req, res) => {
  const { id } = req.params;
  const { username = null, tag = null, role_id = null } = req.body;
  await schemaValidator(usersUpdateSchema, {
    ...req.body,
    ...req.params,
  });
  let updateUser = await UsersService.update({
    id,
    username,
    tag,
    role_id,
  });
  res.status(200);
  return updateUser;
};

exports.delete = async (req, res) => {
  const { id } = req.params;
  await schemaValidator(usersDeleteSchema, req.params);
  await UsersService.delete({ id });
  res.status(200);
  return {
    status: "success",
    message: "successfully deleted car",
  };
};
