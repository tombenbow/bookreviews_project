const { fetchUsers, fetchTopics, fetchThatUser, fetchThatReview, fetchAllReviews, fetchThatReviewsComments, newComment, fetchEndpoints, reviewVotes, commentVotes, deleteComment } = require('../models/model.js');

exports.sendAllUsers = (req, res, next) => {
  fetchUsers().then((users) => {
    res.status(200).send(users);
  })
  .catch(next)
};

exports.sendAllTopics = (req, res, next) => {
  fetchTopics().then((topics) => {
    res.status(200).send(topics);
  })
  .catch(next)
};

exports.getThatUser = (req, res, next) => {
  const id = req.params.username;
  fetchThatUser(id).then((user) => {
    Object.keys(user).length > 0 ?
    res.status(200).send(user) : next({status : 404});
  })
  .catch(next)
};

exports.getThatReview = (req, res, next) => {
  const id = req.params.review_id;
  fetchThatReview(id).then((review) => {
    Object.keys(review).length > 0?
    res.status(200).send(review) : next({status : 404});
  })
  .catch(next)
};

exports.getAllBookReviews = (req, res, next) => {
  const {sort_by, order, username, topic} = req.query
  fetchAllReviews(sort_by, order, username, topic).then((reviews) => {
    res.status(200).send(reviews);
  })
  .catch(next)
};

exports.getThatReviewsComments = (req, res, next) => {
  const id = req.params.review_id;
  const {sort_by, order} = req.query
  fetchThatReviewsComments(id, sort_by, order).then((comments) => {
    res.status(200).send(comments);
  })
  .catch(next)
};

exports.postNewComment = (req, res, next) => {
  newComment(req.params, req.body).then(comment => {
    console.log(999, comment)
    res.status(200).send(comment)
  })
  .catch(next)
};

exports.getEndpoints = (req, res, next) => {
  fetchEndpoints().then(description => {
    res.status(200).send(description)
  })
  .catch(next)
}

exports.changeReviewVotes = (req, res, next) => {
  reviewVotes(req.body, req.params).then(data => {
    console.log(data)
    res.status(200).send(data)
  })
  .catch(next)
}

exports.changeCommentVotes = (req, res, next) => {
  commentVotes(req.body, req.params).then(data => {
    res.status(200).send(data)
  })
  .catch(next)
}

exports.deleteComment = (req, res, next) => {
  deleteComment(req.body, req.params).then(data => {
    console.log(data)
    console.log(data.length)
    data.length > 0 ?
    res.status(204).send("comment deleted") : next({status : 404});
  })
}