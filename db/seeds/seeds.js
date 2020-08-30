const  data  = require('../data/index');

/*will have to rewrite the below functions - these functions will seed the data from the 
dev-data/test-data folders into your sql files. */

  exports.seed = function(knex) {
    return knex.migrate
      .rollback()
      .then(() => {
        return knex.migrate.latest();
      })
      .then(() => {
        return knex
        .insert(data.topics.topics)
        .into('topics')
        .returning('*')
      })
      .then(() =>{
        return knex
        .insert(data.users.users)
        .into('users')
        .returning('*')
      })
      .then(() =>{
        return knex
        .insert(data.bookreviews.bookreviews)
        .into('book_reviews')
        .returning('*')
      })
      .then(() => {
        return knex
        .insert(data.comments.comments)
        .into('comments')
        .returning('*')
      })
  };