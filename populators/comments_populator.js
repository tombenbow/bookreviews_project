const axios = require("axios");
const fs = require("fs");
const path = require("path");

const returnRandomComment = () => {
    //works, returns a random comment as a string
    return axios
      .get("http://asdfast.beobit.net/api/?type=word&length=10")
      .then((response) => {
        return response.data.text
      })
      .catch((err) => {
        console.log(err);
      });
  };


function randomCommentObjectFromArray() {
  let arrayOfComments = [];
  for (let i = 0; i < 100; i++) {
      arrayOfComments.push(returnRandomComment());
  }
  return Promise.all(arrayOfComments).then(array => {
      return array.map(comment =>{
          return {
                 body: comment,
                 review_comment_belongs_to: Math.ceil(Math.random() * 30),
                 comment_votes : -5 + Math.floor(Math.random()*11)
               };
      })
  })
  .then(arrayOfComments => {
    fs.writeFile(path.join(__dirname, "../db/data/dev-data/comments.js"), JSON.stringify(arrayOfComments), (err, data) => {
        if (err) console.log(err);
      });
})
}



randomCommentObjectFromArray()

