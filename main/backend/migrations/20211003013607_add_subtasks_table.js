exports.up = function (knex) {
  return knex.schema.createTable("sub_tasks", (table) => {
    table.increments("id").primary();
    table.string("uuid", 255).notNullable().unique().index();
    table
      .integer("assigned_user")
      .unsigned()
      .references("users.id")
      .onDelete("CASCADE");
    table
      .integer("parent_task_id")
      .unsigned()
      .references("tasks.id")
      .notNullable()
      .onDelete("CASCADE");
    table.string("status", 50);
    table.string("title", 75);
    table.string("description", 255);
    table.timestamp("created_at");
    table.timestamp("updated_at");
    table.timestamp("deleted_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("sub_tasks");
};
