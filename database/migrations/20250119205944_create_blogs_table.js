/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  return knex.schema.createTable('blogs', function (table) {
    table.string('id').primary();
    table.text('title');
    table.string('slug');
    table.string('userId').index();
    table.smallint('status').defaultTo(1).comment('1=> active, 2=> inactive').index();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('blogs');
};
