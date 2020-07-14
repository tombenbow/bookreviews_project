const axios = require("axios");
const fs = require("fs");
const path = require("path");

// const readIDs = () => {
//   //works, returns an array of IDs
//   return new Promise((resolve, reject) => {
//     let arrayOfIds = [];
//     fs.readFile(path.join(__dirname, "../db/bookreviews.json"), (err, data) => {
//       if (err) reject(err);
//       parsedData = JSON.parse(data);
//       parsedData.forEach((review) => {
//         arrayOfIds.push(review.review_id);
//       });
//       resolve(arrayOfIds);
//     });
//   });
// };

// const returnRandomComment = () => {
//   //works, returns a random comment as a string
//   return axios
//     .get("http://api.seazon.org/1-0-1-1-0-0/0-0-1/2-9-10-50-1-2/api.txt")
//     .then((response) => {
//       return response.data;
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// };


const returnRandomComment = () => {
    //works, returns a random comment as a string
    return axios
      .get("http://asdfast.beobit.net/api/")
      .then((response) => {
        return response.data
      })
      .catch((err) => {
        console.log(err);
      });
  };

// function addComments(id, arr) {
//             let randomNum = Math.floor(4 * Math.random())
//             if (randomNum == 1) {
//               randomCommentObject(id)
//               .then(data => {
//                 arr.push(data)
//               })
//             }
//             else {
//               randomCommentObject(id)
//               .then(data => {
//                 arr.push(data)
//               })
//               addComments(randomNum-1, id)
//             }
//           }

//     })
//     .catch((err) => {
//         console.log(err);
//       });
//     }

// function addCommentsToAllIDs(arrayOfIDs) {
//     arrayOfIDs.forEach(id => {

//     })
// }

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
                 created_at: 1,
               };
      })
  })
  .then(arrayOfComments => {
    fs.writeFile("../db/comments.json", JSON.stringify(arrayOfComments), (err, data) => {
        if (err) console.log(err);
      });
})
}




randomCommentObjectFromArray()

//console.log(Math.ceil(Math.random() * 30))
//writeCommentsFile()
