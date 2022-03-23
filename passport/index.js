const passport = require("passport");
const local = require("./localStrategy");
const user_info = require("../models/user_info");

module.exports = () => {
  passport.serializeUser((user, done) => {
    done(null, user.ID);
  });

  passport.deserializeUser((ID, done) => {
    user_info
      .findOne({
        where: { ID }
      })
      .then(user => done(null, user))
      .catch(err => done(err));
  });

  local();
};
