const LoginManage = require("../routes/Login/LoginManage");

exports.isLoggedIn = (req, res, next) => {
    if (req.isAuthenticated()) {
        next();
    } else {
        res.status(200).send('{"Error" : "Not Logged in"}');
    }
};

exports.isNotLoggedIn = (req, res, next) => {
    if (!req.isAuthenticated()) {
        next();
    } else {
        return res.status(200).send('{"Error" : "Already Logged in"}');
    }
};
