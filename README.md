# housies

### DONE
- User can log in to their facebook account
- user can select their house, from a google address drop down box and add a review.
- if there are no reviews, they are prompted to add one.

### To Do
[x] user can select a house from a drop down google box
[x] and see all reviews.
[x] We'll handle retrieving reviews on the front end.
[x] Make sure that receiving reviews actually works...
[ ] Error handling on server. http://expressjs.com/en/guide/error-handling.html
[x] Error handling on FE
[x] Change client to pool on all db calls.
[x] Surprise refactor all your db calls.
[x] geolocation influenced address selection.
[ ] Figuring out what styling looks like lel.
[ ] STYLING 
[ ] Figuring out why FB doesn't work on live.
[ ] See all recent reviews maybe? (V2 possibly)
[ ] Try to figure out how to convert your DB stuff into promises, but its not compulsory. Just messy atm.
[x] Handle returning reviews if a house has reviews.
[x] Update reviews to replace displayName with memberId
[x] You can only post a review if you're logged in.
[ ] Make somewhere with more info on the project, an about page? or something like that.
[x] pool.end somewhere/somehow. 
[x] checking if user is logged in should be in app.js, not elsewhere.
[x] Reviews
[x] Get location based on users current location.
[x] Probably PropTypes in FE. it's getting a bit out of hand on some components. will be easy, can just take them from what we're passing in.
[x] Loader on searching for address
[x] in postNewReview models/home, you need to do an additional query to Homes to say it exists, otherwise we'll never get any reviews down.
[x] if we have reviews for a house, how do you write another one?
[x] in newHome query, need to do a 'insert if not exists' kinda dealio.
[ ] do a big old sweep for weirdness on the front end cos theres heaps.
[x] in getting reviews, need to do a join with members on memberid, and get firstname and last name.
[x] Review, get a timestamp when it gets created.

### BUGS
[ ] say you want to write a review, then log into fb, the alertish box asking if you want to is still there. 

MVP V1:
- Basic. User can search for a home, see reviews for that home, post a review.
- Styled.

V2: See recent reviews/feed. Map maybe... Photos of property.
