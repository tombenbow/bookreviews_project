# bookreviews_project
This repo holds the backend for the website Bookreviews.io, which is a book reviews website (links to hosted FE and FE repo are below). The data is stored in a PSQL database and is accessible via a RESTful API. The API is hosted on Heroku.

  ### Endpoints
  ```bash 
  "available_endpoints": {
    "('/api/users/allusers').get": "returns all user objects. Key: all_users",
    "('/api/topics').get": "returns all topics. Key: all_topics",
    "('/api/users/:username').get": "returns the requested username object. Key: requested_user",
    "('/api/bookreviews/:review_id').get": "returns the requested review",
    "('/api/bookreviews/:review_id').patch": "allows you to upvote or downvote the review. Send object with vote key ('up'/'down')",
    "('/api/bookreviews/:review_id/comments').post": "allows you to post a new comment to the specified review",
    "('/api/bookreviews/:review_id/comments').get": "returns the specified reviews comments. This also takes sort_by and order as queries",
    "('/api/bookreviews').get": "returns all book reviews. This also takes sort_by, order, username, and topic as queries",
    "('/api/comments/:comment_id').patch": "allows you to upvote or downvote the specified comment. Send object with vote key ('up'/'down')",
    "('/api/comments/:comment_id'.delete": "deletes the specified comment. Must pass the comment owner's username in the req query under the key 'username'. If         comment is successfully deleted will return error message 204."
}
```

  ### Sourcing of Data
The book reviews themselves were randomly selected from Amazon.

Topics & Topic Descriptions entered manually.

book_rating_out_of_5, year_book_written_in, review_votes values assigned to Book Reviews randomly.

comment_votes value assigned to comments randomly.

API for comment_body: ASDFast Lorem Ipsum API @ asdfast.beobit.net

API for users: Random User Generator @ randomuser.me

  ### Testing
The project was tested with Mocha, Chai, and Supertest.

  ### Links to Frontend
Link to FE repo: https://github.com/tombenbow/frontend-project

LINK to hosted FE: https://tombenbow-br-project.herokuapp.com/ 
