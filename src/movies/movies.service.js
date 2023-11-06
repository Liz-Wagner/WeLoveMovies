const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

//add nested object in returned data
const addCritic = mapProperties({
    organization_name: "critic.organization_name",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
})

//Get list of all movies
function list() {
    return knex("movies").select("*");
}

//Get list of movies currently showing in theater
function getListOfCurrentShowingMovies() {
    return knex("movies as m")
    .distinct()
    .join("movies_theaters as mt", "mt.movie_id", "m.movie_id")
    .select("m.*")
    .where({ "mt.is_showing": true })
}

//Get individual movie info
function getSpecificMovieInfo(movie_id) {
    return knex("movies")
        .where({ movie_id })
        .first();
}

function getListOfTheatersPlayingAMovie(movieId) {
    return knex("theaters as t")
        .join("movies_theaters as mt", "t.theater_id", "mt.theater_id")
        .select("t.*", "mt.is_showing", "mt.movie_id")
        .where({ "mt.movie_id": movieId })
}

function getReviewsList(movieId) {
    return knex("reviews as r")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .select("*")
        .where({ "r.movie_id": movieId })
        .then((result) => {
           return Object.values(result).map((value) => (addCritic(value)));
    })
}

module.exports = {
    list,
    getSpecificMovieInfo,
    getListOfCurrentShowingMovies,
    getListOfTheatersPlayingAMovie,
    getReviewsList,
}