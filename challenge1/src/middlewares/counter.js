let requests = 0;

function counter(req, res, next) {
  requests = requests + 1;

  console.log("Number of requests: " + requests);

  next();
}

module.exports = counter;
