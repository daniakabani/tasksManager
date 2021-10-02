const RolesService = require("daniakabani/services/roles");

exports.seed = async () => {
  const rolesArray = ["super_user", "user_read", "user"];
  for (let start = 0; start < rolesArray.length; start++) {
    await RolesService.create({
      name: rolesArray[start],
    });
  }
};
