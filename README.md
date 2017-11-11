# housies

### To fix

[ ] - session doesnt mantain for some reason.
[x] - need to replace github with facebook, shouldnt be too hard.
[x] - make database for homes. DB - Homes
[x] - make database for reviews. DB - Reviews
[] - relational on id, so you can find all reviews for a house.

### DONE
- User can log in to their facebook account
- user can select their house, from a google address drop down box and add a review.

### To Do
- user can select a house from a drop down google box and see all reviews. if there are no reviews, they are prompted to add one.

MVP V1:
- Basic. User can search for a home, see reviews for that home, post a review.
- Styled.

V2: See recent reviews/feed. Map maybe... 


DB SCHEMA: 

CREATE TABLE IF NOT EXISTS Members (
  id text,
  email text,
  locale text,
  firstName text,
  lastName text
  profilePic text
);

CREATE TABLE IF NOT EXISTS Homes (
  fullAddress text,
  homeId text,
  hasReview bool,
  suburb text
)

CREATE TABLE IF NOT EXISTS Reviews (
  reviewId text,
  homeId text,
  title text,
  description text,
  rating int,
  tips text
  displayName text
);