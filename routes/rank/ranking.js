const express = require("express");
const rankManage = require("./rankmanage");
const router = express.Router();
const { isLoggedIn } = require("../../middleware/CheckLogin");
router.use(isLoggedIn); // 로그인 확인
router.get("/getrank", async (req, res, next) => {
    try {
        const rank = await rankManage.rank();
        return res.status(200).send(rank);
    } catch (err) {
        return res.status(400).send('{"Error" : "Fail"}');
    }
});

router.get("/myrank", async (req, res, next) => {
    try {
        const myrank = await rankManage.myrank();
        return res.status(200).send(myrank);
    } catch (err) {
        return res.status(400).send('{"Error" : "Fail"}');
    }
});

router.get("/", async (req, res, next) => {});
module.exports = router;
