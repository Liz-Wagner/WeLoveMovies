const knex = require("../db/connection");
const reduceProperties = require("../utils/reduce-properties");

const reduceMoviesPlusMTInfo = reduceProperties("theater_id", {
    movie_id: ["movies", null, "movie_id"],
    title: ["movies", null, "title"],
    rating: ["movies", null, "rating"],
    runtime_in_minutes: ["movies", null, "runtime_in_minutes"],
    description: ["movies", null, "description"],
    image_url: ["movies", null, "image_url"],
    is_showing: ["movies", null, "is_showing"],
    theater_id: ["movies", null, "theater_id"]
})

function getListOfTheatersAndCurrentShowingMovies(movieId) {
    return knex("theaters as t")
        .join("movies_theaters as mt", "mt.theater_id", "t.theater_id")
        .join("movies as m", "mt.movie_id", "m.movie_id")
        .select("*")
        .then(reduceMoviesPlusMTInfo)
    //     .where({ "mt.is_showing": true})
    //     .then((result) => {
    //         const fullList = reduceMoviesPlusMTInfo(result)
    //         return fullList;
    // });
}

module.exports = {
    getListOfTheatersAndCurrentShowingMovies,
}