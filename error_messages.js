exports.handleServerErrors = (err, req, res, next) => {
  console.log(err)
  res.status(500).send({ msg: "Internal Server Error" });
};

exports.send405Error = (req, res, next) => {
  res.status(405).send({ msg: '405 method not allowed' });
};

exports.send400Error = (err, req, res, next) => {
  if (err.status == "400") {
    res.status(400).send({ msg: '400 bad request' });
  }
  else{
    next(err)
  }
};

exports.send404Error = (err, req, res, next) => {
  if (err.status == "404") {
    res.status(404).send({ msg: '404 not found' });
  }
  else{
    next(err)
  }
};
