# housies

### To fix

[ ] - session doesnt mantain for some reason.
[x] - need to replace github with facebook, shouldnt be too hard.
[x] - make database for homes. DB - Homes
[x] - make database for reviews. DB - Reviews
[] - relational on id, so you can find all reviews for a house.

### DONE
- User can log in to their facebook account

### To Do
- user can select their house, from a google address drop down box and add a review.
- user can select a house from a drop down google box and see all reviews. if there are no reviews, they are prompted to add one. 


DB SCHEMA: 

CREATE TABLE IF NOT EXISTS Members (
  displayName text,
  id text
);

CREATE TABLE IF NOT EXISTS Homes (
  fullAddress text,
  homeId int,
  hasReview bool,
  suburb text
)

CREATE TABLE IF NOT EXISTS Reviews (
  reviewId int,
  homeId int,
  title text,
  description text,
  rating text
  authorId int
);