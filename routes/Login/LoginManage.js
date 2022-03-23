const passport = require("passport");
const user_info = require("../../models/user_info");

async function WriteLastIP(req) {
    await user_info.update(
        {
            LastIp: req.headers["x-forwarded-for"]
        },
        {
            where: {
                ID: req.user.dataValues.ID
            }
        }
    );
}
exports.CheckNull = async function CheckNull(ID, PassWord) {
    //삭제 당하였을 경우
    // const deleted = await user_info.findOne({
    //     where: { ID },
    //     attributes: ["deleted"]
    // });
    if (!ID || !PassWord) {
        return true;
    } else {
        return false;
    }
};

exports.PassPortHandler = async function PassPortHandler(req, res, next) {
    passport.authenticate("local", async (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.status(200).send(`${info.message}`);
        }
        return req.login(user, async loginError => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            } else {
                const Result = {
                    Result: "Success",
                    UserInfo: {
                        ID: req.user.dataValues.ID,
                        Nick: req.user.dataValues.Nick,
                        Email: req.user.dataValues.Email,
                        Belong: req.user.dataValues.Belong,
                        ProfileImg: req.user.dataValues.profilepicture
                    }
                };
                await WriteLastIP(req);
                return res.status(200).send(Result);
            }
        });
    })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};
exports.AlreadyLoginHandler = async function AlreadyLoginHandler(req, res, next) {
    passport.authenticate("local", async (authError, user, info) => {
        if (authError) {
            console.error(authError);
            return next(authError);
        }
        if (!user) {
            return res.status(200).send(`${info.message}`);
        }
        return req.login(user, async loginError => {
            if (loginError) {
                console.error(loginError);
                return next(loginError);
            } else {
                const Result = {
                    Result: "Success",
                    LoginAfterAlready: true,
                    UserInfo: {
                        ID: req.user.dataValues.ID,
                        Nick: req.user.dataValues.Nick,
                        Email: req.user.dataValues.Email,
                        ProfileImg: req.user.dataValues.profilepicture
                    }
                };

                await WriteLastIP(req);
                return res.status(200).send(Result);
            }
        });
    })(req, res, next); // 미들웨어 내의 미들웨어에는 (req, res, next)를 붙입니다.
};
