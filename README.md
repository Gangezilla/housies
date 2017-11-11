# housies

### DONE
- User can log in to their facebook account
- user can select their house, from a google address drop down box and add a review.
- if there are no reviews, they are prompted to add one.

### To Do
[x] user can select a house from a drop down google box
[ ] and see all reviews.
[ ] We'll handle retrieving reviews on the front end.
[ ] Error handling.
[ ] Change client to pool on all db calls.
[ ] geolocation influenced address selection.
[ ] Figuring out what styling looks like lel.
[ ] STYLING 
[ ] Figuring out why FB doesn't work on live.
[ ] See all recent reviews maybe? (V2 possibly)
[ ] Try to figure out how to convert your DB stuff into promises, but its not compulsory. Just messy atm.
[x] Handle returning reviews if a house has reviews.
[ ] Update reviews to replace displayName with memberId
[ ] You can only post a review if you're logged in.

MVP V1:
- Basic. User can search for a home, see reviews for that home, post a review.
- Styled.

V2: See recent reviews/feed. Map maybe... Photos of property.


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