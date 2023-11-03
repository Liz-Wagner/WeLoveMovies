const serviceTheaters = require("./theaters.service");
const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary")

async function listMoviesPlayingAtTheaters(req, res, next) {
    const result = await serviceTheaters.getListOfTheatersAndCurrentShowingMovies()
    res.json({ data: result })
}

module.exports = {
    list: asyncErrorBoundary(listMoviesPlayingAtTheaters),
}