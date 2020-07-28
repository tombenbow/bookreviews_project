const axios = require("axios");
const fs = require("fs");

const returnRandomUser = () => {
  return axios
    .get("https://randomuser.me/api/")
    .then((response) => {
      let theUser = {};
      theUser.username = response.data.results[0].login.username;
      theUser.name =
        response.data.results[0].name.first +
        " " +
        response.data.results[0].name.last;
      theUser.membership_duration =
        response.data.results[0].registered.age.toString() + " years";
      theUser.profile_picture = response.data.results[0].picture.large;
      return theUser;
    })
    .catch((err) => {
      return err;
    });
};

function writeUsersFile() {
  let theUsers = [];
  for (let i = 1; i < 15; i++) {
    returnRandomUser().then((user) => {
      user.member_id = i;
      theUsers.push(user);
      if (theUsers.length == 10) {
        fs.writeFile("../db/data/dev-data/users.json", JSON.stringify(theUsers), function (err, data) {
          if (err) console.log(err);
        });
      }
    });
  }
}

//writeUsersFile();
