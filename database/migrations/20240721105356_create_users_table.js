/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  return knex.schema.createTable('users', function (table) {
    table.string('id').primary();
    table.string('firstName');
    table.string('lastName');
    table.string('email').notNullable().index();
    table.string('password').notNullable();
    table.smallint('status').defaultTo(1).comment('1=> active, 2=> inactive');
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function (knex) {
  return knex.schema.dropTableIfExists('users');
};
