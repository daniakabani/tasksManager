const Model = require("./base");

class Roles extends Model {
  static tableName = "roles";

  static getTableName() {
    return this.tableName;
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  static get relationMappings() {
    const User = require("./users");
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: "roles.id",
          to: "users.roles_id",
        },
      },
    };
  }
}

module.exports = Roles;
