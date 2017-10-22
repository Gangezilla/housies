# housies

### To fix

[ ] - session doesnt mantain for some reason.
[ ] - need to replace github with facebook, shouldnt be too hard.
[] - make database for homes. DB - Homes
[] - make database for reviews. DB - Reviews
[] - relational on id, so you can find all reviews for a house.

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