Database Entity Relationship Diagram:

![Entity Relationship Diagram](readme-files/erd_movies_db3.png)

Total of 6 different unique routes to handle and direct database queries from the client:

/movies

/movies/:movieId

/movies/:movieId/reviews

/movies/:movieId/theaters


/reviews/:reviewId

/theaters

Database queries are handled with Knex while the middleware utilizes Express to validate requests and respond with the appropriate data back to the client.