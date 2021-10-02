const UsersService = require("daniakabani/services/users");

exports.seed = async () => {
  await UsersService.create({
    username: "admin",
    password: "admin123",
    role_id: 1,
  });
};
