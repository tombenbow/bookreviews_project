exports.up = function(knex) {
    return knex.schema.createTable("users", usersTable => {
      usersTable.string("username").notNullable().primary();
      usersTable.string("name_of_user").notNullable();
      usersTable.string("membership_duration").notNullable();
      usersTable.string("profile_picture").notNullable();
    });
  };
  
  exports.down = function(knex) {
    return knex.schema.dropTable("users");
  };