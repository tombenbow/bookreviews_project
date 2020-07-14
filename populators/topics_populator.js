const fs = require("fs");
const path = require('path');

const readReviews = () => {
    return new Promise((resolve, reject) => {
      let arrayOfTopics = [];
      fs.readFile(path.join(__dirname,"../db/bookreviews.json"), (err, data) => {
        if(err)reject(err)
        parsedData = JSON.parse(data)
        parsedData.forEach(review => {
            arrayOfTopics.push(review.topic)
        })
        console.log(parsedData)
        resolve(arrayOfTopics)
    });
    });
  };

function removeDuplicates(arr) {
    let arr2 = [];
    for(let i = 0; i < arr.length; i++) {
        if (arr[i] != arr[i+1]) {
            arr2.push(arr[i])
        }
    }
    return arr2
}

function writeTopicsFile() {
    readReviews()
    .then(arrayOfTopics => {
      let alphabetisedTopics = arrayOfTopics.sort();
      let dupesRemoved = removeDuplicates(alphabetisedTopics)
        fs.writeFile("../db/topics.json", JSON.stringify(dupesRemoved), (err, data) => {
            if (err) console.log(err);
          });
    })

}

//writeTopicsFile()