const moviesService = require("./movies.service");
const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary")


async function list(req, res) {
    const { is_showing } = req.query;

    //show list of all currently showing movies
    if (is_showing) {
        const data = await moviesService.getListOfCurrentShowingMovies();
        res.status(200).json({ data: data })
    } else {
        //show list of all movies in database
        const result = await moviesService.list();
        res.status(200).json({ data: result });
    }
}

//show single movie
async function getMovieDetails(req, res, next) {
    res.json({ data: res.locals.movie })
}

//validate movieId connects to a movie in database
async function movieIdExists(req, res, next) {
    const movie = await moviesService.getSpecificMovieInfo(req.params.movieId)
    if (movie) {
        res.locals.movie = movie;
        return next();
    }
    next({
        status: 404,
        message: "Movie cannot be found."
    })
}

async function getTheatersShowingAMovieById(req, res, next) {
    result = await moviesService.getListOfTheatersPlayingAMovie(req.params.movieId)
    res.json({ data: result })
}

async function getCriticReviews(req, res, next) {
    const result = await moviesService.getReviewsList(req.params.movieId)
    res.json({ data: result })
}

  module.exports = {
    list: asyncErrorBoundary(list),
    read: [
        asyncErrorBoundary(movieIdExists), 
        getMovieDetails,
    ],
    theaters: [
        asyncErrorBoundary(movieIdExists), 
        asyncErrorBoundary(getTheatersShowingAMovieById)
    ],
    reviews: [
        asyncErrorBoundary(movieIdExists),
        asyncErrorBoundary(getCriticReviews)
    ],
  }