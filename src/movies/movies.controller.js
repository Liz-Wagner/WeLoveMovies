const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary")

async function list(req, res) {
    const { is_showing } = req.query;

    if (is_showing) {
        const data = await moviesService.getListOfCurrentShowingMovies();
        res.status(200).json({ data: data })
    } else {
        const result = await moviesService.list();
        res.status(200).json({ data: result });
    }
}

async function getMovieDetails(req, res, next) {
    res.json({ data: res.locals.movie })
}

async function movieIdExists(req, res, next) {
    const movie = await moviesService.getSpecificMovieInfo(req.params.movieId)
    if (movie) {
        res.locals.movie = movie;
        console.log("movie", movie)
        return next();
    }
    next({
        status: 404,
        message: "Movie cannot be found."
    })
}

async function getTheatersShowingAMovieById(req, res, next) {
    const { movieId } = req.params
    result = await moviesService.getListOfTheatersPlayingAMovie(movieId)
    res.json({ data: result })
}

async function getCriticReviews(req, res, next) {
    const movieId = req.params.movieId
    const result = await moviesService.getReviewsList(movieId)
    res.json({ data: result })
}

  module.exports = {
    list: asyncErrorBoundary(list),
    read: [asyncErrorBoundary(movieIdExists), getMovieDetails],
    getTheaters: [
        asyncErrorBoundary(movieIdExists), 
        asyncErrorBoundary(getTheatersShowingAMovieById)
    ],
    getReviews: [
        asyncErrorBoundary(movieIdExists),
        asyncErrorBoundary(getCriticReviews)
    ],
  }