const Model = require("./base");

class Roles extends Model {
  static tableName = "tasks";

  static getTableName() {
    return this.tableName;
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  static get relationMappings() {
    const User = require("./users"),
      SubTask = require("./subTasks");
    return {
      user: {
        relation: Model.HasOneRelation,
        modelClass: User,
        join: {
          from: "user.id",
          to: "tasks.user_id",
        },
      },
      subTasks: {
        relation: Model.HasManyRelation,
        modelClass: SubTask,
        join: {
          from: "tasks.id",
          to: "sub_tasks.parent_task_id",
        },
      },
    };
  }
}

module.exports = Roles;
