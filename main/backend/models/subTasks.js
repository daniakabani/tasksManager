const Model = require("./base");

class SubTasks extends Model {
  static tableName = "sub_tasks";

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
    const Task = require("./tasks");
    return {
      task: {
        relation: Model.BelongsToOneRelation,
        modelClass: Task,
        join: {
          from: "tasks.id",
          to: "sub_tasks.parent_task_id",
        },
      },
    };
  }
}

module.exports = SubTasks;
