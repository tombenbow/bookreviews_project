const {app} = require("../app")

//listen on port
let port = 9090;
app.listen(port, () => {
    console.log(`Listening on 9090 for requests - backend project`);
  });