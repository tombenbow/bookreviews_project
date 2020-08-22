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
  .get(sendAllUsers) //QAd
  .all(send405Error);
app.route("/api/topics")
  .get(sendAllTopics) //QAd
  .all(send405Error);
app.route("/api/users/:username")
  .get(getThatUser) //QAd
  .all(send405Error); 
app
  .route("/api/bookreviews/:review_id")
  .get(getThatReview) //QAd
  .patch(changeReviewVotes) //QAd
  .all(send405Error); 
app
  .route("/api/bookreviews/:review_id/comments")
  .post(postNewComment) //QAd
  .get(getThatReviewsComments) //QAd
  .all(send405Error); 
app
  .route("/api/bookreviews")
  .get(getAllBookReviews) //QAd
  .all(send405Error); 
app.route("/api")
  .get(getEndpoints) //QAd
  .all(send405Error); 
app
  .route("/api/comments/:comment_key")
  .patch(changeCommentVotes) //QAd
  .delete(deleteComment) //QAd
  .all(send405Error);

//ERROR HANDLERS
app.use(send400Error);
app.use(send404Error);
app.use(handleServerErrors);
app.use(send405Error);

module.exports = { app };
