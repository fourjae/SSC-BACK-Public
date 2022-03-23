const express = require("express");
const passport = require("passport");
const { isNotLoggedIn } = require("../../middleware/CheckLogin");
const LoginManage = require("./LoginManage");
const router = express.Router();

router.post("/", async (req, res, next) => {
    const { ID, PassWord } = req.body;
    if (await LoginManage.CheckNull(ID, PassWord)) {
        return res.status(400).send('{"Result" : "Find Null"}');
    }
    LoginManage.PassPortHandler(req, res, next);
});

module.exports = router;
