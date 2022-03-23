const express = require("express");
const passport = require("passport");
const { isLoggedIn } = require("../../middleware/CheckLogin");
const router = express.Router();

router.get("/", (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.clearCookie("connect.sid");
    const Result = {
        Result: "Fail",
        UserInfo: {
            ID: "",
            Nick: "",
            Email: "",
            ProfileImg: ""
        }
    };
    res.status(200).send(Result);
});
router.get("/init", (req, res, next) => {
    req.logout();
    req.session.destroy();
    res.clearCookie("connect.sid");
    const Result = {
        Result: "Fail",
        UserInfo: {
            ID: "",
            Nick: "",
            Email: "",
            ProfileImg: ""
        }
    };
    res.status(200).send(Result);
});
module.exports = router;
