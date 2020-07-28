const fs = require("fs");
const path = require('path');

const readUsers = () => {
    return new Promise((resolve, reject) => {
      let arrayOfUserNames = [];
      fs.readFile(path.join(__dirname,"../db/data/dev-data/users.json"), (err, data) => {
        if(err)reject(err)
       data = JSON.parse(data)
        data.forEach(user => {
            arrayOfUserNames.push(user.username)
        })
        resolve(arrayOfUserNames)
      });
    });
  };

function writeReviewsFile() {
    readUsers()
    .then(data => {
        let arrayOfReviews = [];
        for (let i = 1; i < 31; i++) {
            let review = {
                "title" : "",
                "topic" : "",
                "reviewer_username" : data[Math.floor(data.length * Math.random())],
                "body_of_review" : ``,
                "year_book_written_in" : 2020 - Math.floor(10 * Math.random()),
                "book_rating_out_of_5" : "",
                "review_id" : i,
                "review_votes" : -5 + Math.floor(Math.random()*11)
            }
            arrayOfReviews.push(review)
        }
        return arrayOfReviews;
    })
    .then(arrayOfReviews => {
      console.log(arrayOfReviews)
        fs.writeFile("../db/data/dev-data/bookreviews.json", JSON.stringify(arrayOfReviews), (err, data) => {
            if (err) console.log(err);
          });
    })

}

// writeReviewsFile()

