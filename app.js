const express = require("express");
const app = express();
const {
  sendAllUsers,
  sendAllTopics,
  getThatUser,
  getThatReview,
  getAllBookReviews,
  getThatReviewsComments,
  postNewComment,
  getEndpoints,
  changeReviewVotes,
  changeCommentVotes,
  deleteComment,
} = require("./controllers/controller.js");
const {
  send405Error,
  handleServerErrors,
  send400Error,
  send404Error
} = require("./error_messages.js");

app.use(express.json());

app
  .route("/api/users/allusers")
  .get(sendAllUsers) //completed with error handler
  .all(send405Error);
app.route("/api/topics")
  .get(sendAllTopics) //completed with error handler
  .all(send405Error);
app.route("/api/users/:username")
  .get(getThatUser) //completed with error handler
  .all(send405Error); 
app
  .route("/api/bookreviews/:review_id")
  .get(getThatReview) //completed with error handler
  .patch(changeReviewVotes) //done with error handlers
  .all(send405Error); 
app
  .route("/api/bookreviews/:review_id/comments")
  .post(postNewComment) //completed, with EH
  .get(getThatReviewsComments) //completed, no need for error handler
  .all(send405Error); 
app
  .route("/api/bookreviews")
  .get(getAllBookReviews) //completed w EH
  .all(send405Error); 
app.route("/api")
  .get(getEndpoints) //completed w EH
  .all(send405Error); 
app
  .route("/api/comments/:comment_key")
  .patch(changeCommentVotes) //done with error handlers
  .delete(deleteComment) //done with error handlers
  .all(send405Error);

//ERROR HANDLERS
app.use(send400Error);
app.use(send404Error);
app.use(handleServerErrors);
app.use(send405Error);

module.exports = { app };
