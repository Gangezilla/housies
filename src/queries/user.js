const retrieveUser = 'SELECT * FROM Members WHERE id = $1;';

const signUpNewUser = `INSERT INTO Members(id, email, locale, firstName, lastName, profilePic)
values($1, $2, $3, $4, $5, $6)`;

module.exports = {
  retrieveUser,
  signUpNewUser,
};
