exports.up = function (knex) {
  return knex.schema.createTable("roles", function (table) {
    table.increments("id").primary();
    table.string("name").notNullable();
    table.timestamp("created_at");
    table.timestamp("deleted_at");
  });
};

exports.down = function (knex) {
  return knex.schema.dropTable("roles");
};
