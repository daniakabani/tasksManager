exports.up = function (knex) {
  return knex.schema.createTable("users", function (table) {
    table.increments("id").primary();
    table.string("uuid", 65).notNullable().unique().index();
    table.string("username", 255).notNullable().unique().index();
    table.string("password", 65);
    table
      .integer("role_id")
      .unsigned()
      .references("roles.id")
      .onDelete("CASCADE");
    table.string("tag");
    table.timestamp("created_at");
    table.timestamp("updated_at");
    table.timestamp("deleted_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("users");
};
