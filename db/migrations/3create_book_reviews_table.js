exports.up = function (knex) {
    return knex.schema.createTable("book_reviews", book_reviewsTable => {
        book_reviewsTable.increments("review_id").primary();
        book_reviewsTable.string("title").notNullable();
        book_reviewsTable.string("topic_name").references("topics.topic_name");
        book_reviewsTable.string("username").references("users.username");
        book_reviewsTable.text("body_of_review").notNullable();
        book_reviewsTable.integer("year_book_written_in").defaultTo(0);
        book_reviewsTable.integer("book_rating_out_of_5").defaultTo(0);
        book_reviewsTable.integer("review_votes").defaultTo(0);
  })
};

exports.down = function(knex) {
    return knex.schema.dropTable("book_reviews");
};