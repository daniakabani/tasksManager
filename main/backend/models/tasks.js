const Model = require("./base");

class Tasks extends Model {
  static tableName = "tasks";

  static getTableName() {
    return this.tableName;
  }

  $beforeInsert() {
    this.created_at = new Date().toISOString();
  }

  $beforeUpdate() {
    this.updated_at = new Date().toISOString();
  }

  static get relationMappings() {
    const SubTask = require("./subTasks"),
      User = require("./users");
    return {
      subTasks: {
        relation: Model.HasManyRelation,
        modelClass: SubTask,
        join: {
          from: "tasks.id",
          to: "sub_tasks.parent_task_id",
        },
      },
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "users.id",
          to: "tasks.assigned_user",
        },
      },
    };
  }
}

module.exports = Tasks;
