DROP DATABASE IF EXISTS book_database;
CREATE DATABASE book_database;
\c book_database;

CREATE TABLE topics (
  topic_name TEXT PRIMARY KEY,
  topic_description TEXT
);

CREATE TABLE users (
  username TEXT PRIMARY KEY,
  name_of_user TEXT,
  membership_duration TEXT,
  profile_picture TEXT
);

CREATE TABLE book_reviews (
  review_id INT PRIMARY KEY,
  title TEXT,
  topic_name TEXT REFERENCES topics (topic_name) NOT NULL,
  username TEXT REFERENCES users (username) NOT NULL,
  body_of_review TEXT,
  year_book_written_in INT,
  book_rating_out_of_5 INT,
  review_votes INT
);

CREATE TABLE comments (
    comment_key SERIAL PRIMARY KEY,
    body TEXT,
    review_id INT REFERENCES book_reviews (review_id) NOT NULL,
    comment_votes INT,
    username TEXT REFERENCES users (username) NOT NULL
);


