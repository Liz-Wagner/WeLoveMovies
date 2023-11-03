const knex = require("../db/connection");
const mapProperties = require("../utils/map-properties");

const addCritics = mapProperties({
    organization_name: "critic.organization_name",
    preferred_name: "critic.preferred_name",
    surname: "critic.surname",
    //critic_id: "critic.critic_id",
    //created_at: "critics.created_at",
    //updated_at: "critics.updated_at"
});

function read(review_id) {
    return knex("reviews")
        .select("*")
        .where({ review_id })
        .first()
}

function update(updatedReview) {
    return knex("reviews")
        .select("*")
        .where({ review_id: updatedReview.review_id })
        .update(updatedReview) 
}

function addCriticInfo(reviewId) {
    return knex("reviews as r")
        .join("critics as c", "c.critic_id", "r.critic_id")
        .select("*")
        .where({ review_id: reviewId })
        .first()
        .then((result) => {
            const updatedReview = addCritics(result)
            return updatedReview;
    });
}

function destroy(review_id) {
    return knex("reviews")
        .where({ review_id })
        .del();
}


module.exports = {
    read,
    addCriticInfo,
    update,
    delete: destroy, 
}