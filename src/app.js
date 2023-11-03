if (process.env.USER) require("dotenv").config();
const express = require("express");
const cors = require("cors");

const errorHandler = require("./utils/errors/errorHandler");
const notFound = require("./utils/errors/notFound");
const moviesRouter = require("../src/movies/movies.router");
const reviewsRouter = require("../src/reviews/reviews.router");
const theatersRouter = require("../src/theaters/theaters.router");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/movies", moviesRouter);
app.use("/reviews", reviewsRouter);
app.use("/theaters", theatersRouter);

app.use(notFound);
app.use(errorHandler);

module.exports = app;
