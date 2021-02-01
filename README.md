# bookreviews_project
This repo holds the backend for a book reviews website, Bookreviews.io (links to hosted FE and FE repo are below). The data is stored in a PostgreSQL database and is accessible via a RESTful API. The API and database are hosted on Heroku.

The api itself is hosted on the following url: https://bookreview-project.herokuapp.com/api

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
Data was sourced from APIs, randomly generated, or randomly curated. To see more on data sourcing see the 'populators' folder.

  ### Testing
The project was tested with Mocha, Chai, and Supertest.
Tests can be found in the the specs folder.

  ### Links to Frontend
Link to FE repo: https://github.com/tombenbow/frontend-project

Link to hosted FE: https://tombenbow-br-project.herokuapp.com/ 

  ### ENTER INSTRUCTIONS TO RUN LOCALLY
