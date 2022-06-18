const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const app = express();

//routers
const productRouter = require("./routers/product");
const orderRouter = require("./routers/order");

const middleware = require("./utils/middleware");

app.use(helmet());

if (process.env.NODE_ENV === "production") {
  app.set("trust proxy", 1);
  // app.enable('trust proxy');
}

app.use(
  cors({
    //   origin: process.env.NODE_ENV !== "production" ? ['http://localhost:3000']: ['https://www.ombayus.com'],
    //   credentials: true
  })
);

app.use(express.json());

// app.use(express.static('build'))

//connect database
require("./utils/mongo");

app.get("/", (req, res) => {
  res.send("Hello");
});

//using outers
app.use("/api/order", orderRouter);
app.use("/api/product", productRouter);

app.use(middleware.unknownEndpoint);

app.use(middleware.errorHandler);

const PORT = process.env.PORT || 80;

app.listen(PORT, () => {
  console.log("listening the server on " + PORT);
});
