const connection = require("../db/connection");
const fs = require("fs");
const path = require("path");

const fetchUsers = () => {
  return connection
    .select("*")
    .from("users")
    .then((allUsers) => {
      return { all_users: allUsers };
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

const fetchTopics = () => {
  return connection
    .select("*")
    .from("topics")
    .then((allTopics) => {
      return { all_topics: allTopics };
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

const fetchThatUser = (id) => {
  return fetchUsers(id)
    .then((allUsers) => {
      let thatUser = [];
      allUsers.all_users.forEach((element) => {
        if (element.username == id) {
          thatUser.push(element);
        }
      });
      return thatUser;
    })
    .then((thatUser) => {
      return thatUser.length > 0 ? { requested_user: thatUser } : {};
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

const fetchThatReview = (id) => {
  return connection
    .select("book_reviews.*", "users.profile_picture")
    .from("book_reviews")
    .where("review_id", "=", id)
    .join("users", "users.username", "=", "book_reviews.username")
    .then((requestedBookReview) => {
      return requestedBookReview.length > 0 ? { requestedBookReview } : {};
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

const fetchAllReviews = (sort_by, order, username, topic) => {
  return new Promise((resolve, reject) => {
    return connection
      .select("book_reviews.*")
      .from("book_reviews")
      .orderBy(sort_by || "review_id", order || "desc")
      .modify((reviews) => {
        if (topic) {
          return reviews.where("topic_name", "=", topic);
        }
        if (username) {
          return reviews.where("username", "=", username);
        }
      })
      .then((allBookReviews) => {
        if (allBookReviews.length > 0) {
          resolve({ all_bookreviews: allBookReviews });
        } else {
          reject({ status: 404 });
        }
      })
      .catch((error) => {
        console.log(error);
        return error;
      });
  });
};

const fetchThatReviewsComments = (id, sort_by, order) => {
  return connection
    .select(
      "comments.comment_key",
      "comments.body",
      "comments.username",
      "comments.comment_votes",
      "users.profile_picture"
    )
    .from("comments")
    .where("review_id", "=", id)
    .join("users", "users.username", "=", "comments.username")
    .orderBy(sort_by || "comment_votes", order || "desc")
    .then((theReviewsComments) => {
      return { theReviewsComments };
    })
    .catch((error) => {
      console.log(error);
      return error;
    });
};

const newComment = (reqParams, reqBody) => {
  return new Promise((resolve, reject) => {
    if (reqBody.hasOwnProperty("body") && reqBody.hasOwnProperty("username")) {
      return connection
        .select("username")
        .from("users")
        .where("username", "=", reqBody.username)
        .then((usernames) => {
          if (usernames.length > 0) {
            return connection
              .select("review_id")
              .from("book_reviews")
              .where("review_id", "=", reqParams.review_id)
              .then((reviewId) => {
                if (reviewId.length > 0) {
                  reqBody.review_id = parseInt(reqParams.review_id);
                  reqBody.comment_votes = 0;
                  return connection
                    .insert(reqBody)
                    .into("comments")
                    .returning("*")
                    .then((insertedComment) => {
                      resolve(insertedComment);
                    });
                } else {
                  reject({ status: 404 });
                }
              });
          } else {
            reject({ status: 400 });
          }
        });
    } else {
      reject({ status: 400 });
    }
  });
};

const fetchEndpoints = () => {
  return new Promise((resolve, reject) => {
    fs.readFile(path.join(__dirname, "../api_descriptor.json"), (err, data) => {
      if (err) reject(err);
      parsedData = JSON.parse(data);
      resolve({ available_endpoints: parsedData });
    });
  }).catch((error) => {
    console.log(error);
    return error;
  });
};

const reviewVotes = (reqBody, reqParams) => {
  return new Promise((resolve, reject) => {
    if (reqBody.hasOwnProperty("vote")) {
      return connection
        .select("*")
        .from("book_reviews")
        .where("review_id", "=", reqParams.review_id)
        .returning("*")
        .then((review) => {
          if (review.length == 0) {
            reject({ status: 404 });
          } else {
            return review;
          }
        })
        .then((review) => {
          if (reqBody.vote == "up") {
            return connection("book_reviews")
              .where("review_id", reqParams.review_id)
              .update("review_votes", review[0].review_votes + 1)
              .returning("*")
              .then((review) => {
                resolve(review);
              });
          } else if (reqBody.vote == "down") {
            return connection("book_reviews")
              .where("review_id", "=", reqParams.review_id)
              .update("review_votes", review[0].review_votes - 1)
              .returning("*")
              .then((review) => {
                resolve(review);
              });
          } else {
            reject({ status: 400 });
          }
        });
    } else {
      reject({ status: 400 });
    }
  });
};

const commentVotes = (reqBody, reqParams) => {
  return new Promise((resolve, reject) => {
    if (reqBody.hasOwnProperty("vote")) {
      return connection
        .select("*")
        .from("comments")
        .where("comment_key", "=", reqParams.comment_key)
        .returning("*")
        .then((comment) => {
          if (comment.length == 0) {
            reject({ status: 404 });
          } else {
            return comment;
          }
        })
        .then((comment) => {
          if (reqBody.vote == "up") {
            return connection("comments")
              .where("comment_key", reqParams.comment_key)
              .update("comment_votes", comment[0].comment_votes + 1)
              .returning("*")
              .then((comment) => {
                resolve(comment);
              });
          } else if (reqBody.vote == "down") {
            return connection("comments")
              .where("comment_key", reqParams.comment_key)
              .update("comment_votes", comment[0].comment_votes - 1)
              .returning("*")
              .then((comment) => {
                resolve(comment);
              });
          } else {
            reject({ status: 400 });
          }
        });
    } else {
      reject({ status: 400 });
    }
  });
};

const deleteComment = (reqParams) => {
  return connection
    .select("*")
    .from("comments")
    .where("comment_key", "=", parseInt(reqParams.comment_key))
    .del("*")
    .then((deletedComment) => {
      if (deletedComment === 0) {
        return []
      }
      else {
        return [deletedComment]
      }
    })
};

module.exports = {
  fetchUsers,
  fetchTopics,
  fetchThatUser,
  fetchThatReview,
  fetchAllReviews,
  fetchThatReviewsComments,
  newComment,
  fetchEndpoints,
  reviewVotes,
  commentVotes,
  deleteComment,
};
