const fs = require("fs");
const path = require('path');

const readUsers = () => {
    return new Promise((resolve, reject) => {
      let arrayOfUserNames = [];
      fs.readFile(path.join(__dirname,"../db/data/dev-data/users.js"), (err, data) => {
        if(err)reject(err)
       data = JSON.parse(data)
        data.forEach(user => {
            arrayOfUserNames.push(user.username)
        })
        console.log(arrayOfUserNames)
        resolve(arrayOfUserNames)
      });
    });
  };

readUsers()