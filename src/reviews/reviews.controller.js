const asyncErrorBoundary = require("../utils/errors/asyncErrorBoundary");
const reviewsService = require("./reviews.service");

//Check validity of ReviewId
async function reviewExists(req, res, next) {
    const review = await reviewsService.read(req.params.reviewId)
    if (review) {
        res.locals.review = review
        return next();
    }
    next({
        status: 404,
        message: "Review cannot be found."
    })
}

//PUT
async function update(req, res, next) {
    const updatedReview = {
        ...res.locals.review,
        ...req.body.data
      };
        await reviewsService.update(updatedReview);
        
        const update = await reviewsService.addCriticInfo(res.locals.review.review_id)
        //console.log("update", update)
        res.json({ data: update})
    }

//DELETE
async function destroy(req, res, next) {
    const { review } = res.locals
    await reviewsService.delete(review.review_id)
    res.sendStatus(204);
}

module.exports = {
    update: [
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(update)
    ],
    delete: [
        asyncErrorBoundary(reviewExists),
        asyncErrorBoundary(destroy)
    ],    
}