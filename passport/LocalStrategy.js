const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");
const user_info = require("../models/user_info");

module.exports = () => {
    passport.use(
        new LocalStrategy(
            {
                usernameField: "ID",
                passwordField: "PassWord"
            },
            async (ID, PassWord, done) => {
                try {
                    const exUser = await user_info.findOne({ where: { ID } });
                    if (exUser) {
                        const result = await bcrypt.compare(
                            PassWord,
                            exUser.PassWord
                        );
                        if (result) {
                            done(null, exUser);
                        } else {
                            done(null, false, {
                                message: '{"Result" : "Wrong"}'
                            });
                        }
                    } else {
                        done(null, false, {
                            message: '{"Result" : "Wrong"}'
                        });
                    }
                } catch (error) {
                    console.error(error);
                    done(error);
                }
            }
        )
    );
};
