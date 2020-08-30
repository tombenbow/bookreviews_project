exports.up = function(knex) {
    return knex.schema.createTable("comments", commentsTable => {
        commentsTable.increments("comment_key").primary();
        commentsTable.text("body").notNullable();
        commentsTable.integer("review_id").references("book_reviews.review_id");
        commentsTable.integer("comment_votes").defaultTo(0);
        commentsTable.text("username").references("users.username")
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable("comments");
};