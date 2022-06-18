const jwt = require("jsonwebtoken");
const { SESSION_SECRET } = require("./config");

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === "CastError" && error.kind == "ObjectId") {
    return response.status(400).send({ error: "malformatted id" });
  }

  next(error);
};

const authExactor = (req, res, next) => {
  const token = req.body.token || req.query.token;

  try {
    if (token) {
      const user = jwt.verify(token, SESSION_SECRET);

      if (!user) {
        res.json({ error: "You need to sign in" });
      } else {
        next();
      }
    } else {
      res.json({ error: "You need to sign in" });
    }
  } catch (error) {
    res.json({ error: "You need to sign in" });
  }
};

module.exports = { errorHandler, unknownEndpoint, authExactor };
