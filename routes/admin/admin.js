const { ReturnUserInfo } = require("../../middleware/ReturnUserInfo");
const { Returnadmincheck } = require("../../middleware/Returnadmincheck");
const express = require("express");
const requestIp = require("request-ip");
const router = express.Router();
const wargameManage = require("./../wargame/wargameManage");
const rankManage = require("./../rank/rankmanage");
const user_info = require("../../models/user_info");
const month_CTF = require("../../models/month_CTF");
const adminManage = require("./adminManage");
const CTFManage = require("./CTFManage");

/// admin 확인 후 입장
router.get("/", Returnadmincheck, async (req, res, next) => {
    try {
        if (wargameManage.CheckWrongAccess(req)) {
            return res.status(400).send('{"Error" : "Wrong Access"}');
        }

        return res.status(200).send('{"Result" : "Hi Admin~"}');
    } catch (error) {
        console.error(error);
        return res.status(200).send('{"Error" : "Wrong"}');
    }
});

router.post("/password/modify/:userId", Returnadmincheck, async (req, res, next) => {
    try {
        await adminManage.changePassword(req);
        return res.status(200).send(JSON.stringify({ Result: "OK" }));
    } catch (err) {
        console.log(err);
        return res.status(200).send(JSON.stringify({ Result: "NO" }));
    }
});
// 유저 정보 목록 테이블
router.get("/userinfo", Returnadmincheck, async (req, res, next) => {
    try {
        if (wargameManage.CheckWrongAccess(req)) {
            return res.status(400).send('{"Error" : "Wrong Access"}');
        }

        userinfo = await user_info.findAll({ attributes: ["UserNumber", "Name"] });
        if (userinfo) {
            return res.status(200).send(JSON.stringify(userinfo));
        } else {
            return res.status(400).send('{"Error" : "No user"}');
        }
    } catch (error) {
        console.error(error);
        return res.status(200).send('{"Error" : "Wrong"}');
    }
});

router.get("/user/:userId", Returnadmincheck, async (req, res, next) => {
    try {
        if (wargameManage.CheckWrongAccess(req)) {
            return res.status(400).send('{"Error" : "Wrong Access"}');
        }

        userinfo = await user_info.findOne({ where: { UserNumber: req.params.userId } });
        if (userinfo) {
            return res.status(200).send(JSON.stringify(userinfo));
        } else {
            return res.status(400).send('{"Error" : "No user"}');
        }
    } catch (error) {
        console.error(error);
        return res.status(200).send('{"Error" : "Wrong"}');
    }
});
// 유저 정보 요청
router.post("/user", Returnadmincheck, async (req, res, next) => {
    try {
        if (wargameManage.CheckWrongAccess(req)) {
            return res.status(400).send('{"Error" : "Wrong Access"}');
        }

        const apimyinfo = await adminManage.user(req);

        if (apimyinfo) {
            const Categories = {
                WEB: 0,
                REV: 0,
                PWN: 0,
                FOR: 0,
                CRY: 0,
                MISC: 0
            };
            for (let key in apimyinfo["solves"]) {
                if ((key, apimyinfo["solves"][key].ChCategory) == "WEB") Categories.WEB += 1;
                else if ((key, apimyinfo["solves"][key].ChCategory) == "REV") Categories.REV += 1;
                else if ((key, apimyinfo["solves"][key].ChCategory) == "PWN") Categories.PWN += 1;
                else if ((key, apimyinfo["solves"][key].ChCategory) == "FOR") Categories.FOR += 1;
                else if ((key, apimyinfo["solves"][key].ChCategory) == "CRY") Categories.CRY += 1;
                else if ((key, apimyinfo["solves"][key].ChCategory) == "MISC") Categories.MISC += 1;
            }
            const myinfo = apimyinfo.userinfo;
            const returnmyinfo = { myinfo, Categories };
            return res.status(200).send(returnmyinfo);
        }
    } catch (error) {
        console.error(error);
        return res.status(200).send('{"Error" : "Wrong"}');
    }
});

// 유저 정보 수정
router.post("/userinfoupdate/:userId", Returnadmincheck, async (req, res, next) => {
    try {
        if (wargameManage.CheckWrongAccess(req)) {
            return res.status(400).send('{"Error" : "Wrong Access"}');
        }

        if (req.body) {
            await adminManage.myinfoupdate(req);
            return res.status(201).send('{"Result":"OK"}');
        }
    } catch (error) {
        console.log(error);
        return res.status(200).send('{"Error" : "Wrong"}');
    }
});

// 워게임 추가
router.post("/api/wargameadd", Returnadmincheck, async (req, res, next) => {
    try {
        if (wargameManage.CheckWrongAccess(req)) {
            return res.status(400).send('{"Error" : "Wrong Access"}');
        }

        if (wargameManage.CheckNull(req)) {
            return res.status(400).send('{"Error" : "Find Null"}');
        }
        if (await wargameManage.wargame_upload(req)) {
            return res.status(201).redirect("/");
        }
    } catch (error) {
        console.error(error);
        return res.status(200).send('{"Error" : "Wrong"}');
    }
});
// 워게임 수정
router.post("/api/wargamemodify", Returnadmincheck, async (req, res, next) => {
    try {
        if (wargameManage.CheckWrongAccess(req)) {
            return res.status(400).send('{"Error" : "Wrong Access"}');
        }

        if (wargameManage.CheckNull(req)) {
            return res.status(400).send('{"Error" : "Find Null"}');
        }
        if (await wargameManage.wargame_update(req)) {
            return res.status(201).redirect("/");
        }
    } catch (error) {
        console.error(error);
        return res.status(200).send('{"Error" : "Wrong"}');
    }
});
// 워게임 삭제
router.post("/api/wargamedelete", Returnadmincheck, async (req, res, next) => {
    try {
        if (wargameManage.CheckWrongAccess(req)) {
            return res.status(400).send('{"Error" : "Wrong Access"}');
        }

        if (wargameManage.pdelete(req)) {
            return res.status(400).send('{"Error" : "Find Null"}');
        }
        if (await wargameManage.wargame_update(req)) {
            return res.status(201).redirect("/");
        }
    } catch (error) {
        console.error(error);
        return res.status(200).send('{"Error" : "Wrong"}');
    }
});

// CTF 정보 목록 테이블
router.post("/CTF", Returnadmincheck, async (req, res, next) => {
    try {
        if (wargameManage.CheckWrongAccess(req)) {
            return res.status(400).send('{"Error" : "Wrong Access"}');
        }

        userinfo = await user_info.findAll();

        month = await month_CTF.findAll();

        if (month) {
            return res.status(200).send(JSON.stringify(month));
        } else {
            return res.status(400).send('{"Error" : "No CTF"}');
        }
    } catch (error) {
        console.error(error);
        return res.status(200).send('{"Error" : "Wrong"}');
    }
});
// CTF 정보 추가
router.post("/api/CTFadd", Returnadmincheck, async (req, res, next) => {
    try {
        if (wargameManage.CheckWrongAccess(req)) {
            return res.status(400).send('{"Error" : "Wrong Access"}');
        }

        if (CTFManage.CheckNull(req)) {
            return res.status(400).send('{"Error" : "Find Null"}');
        }
        if (await CTFManage.CTF_upload(req)) {
            return res.status(201).redirect("/");
        }
    } catch (error) {
        console.error(error);
        return res.status(200).send('{"Error" : "Wrong"}');
    }
});
// CTF 수정
router.post("/api/CTFmodify", Returnadmincheck, async (req, res, next) => {
    try {
        if (wargameManage.CheckWrongAccess(req)) {
            return res.status(400).send('{"Error" : "Wrong Access"}');
        }

        if (CTFManage.CheckNull(req)) {
            return res.status(400).send('{"Error" : "Find Null"}');
        }
        if (await CTFManage.CTFupdate(req)) {
            return res.status(201).redirect("/");
        }
    } catch (error) {
        console.error(error);
        return res.status(200).send('{"Error" : "Wrong"}');
    }
});
// CTF 삭제
router.post("/api/CTFdelete", Returnadmincheck, async (req, res, next) => {
    try {
        if (wargameManage.CheckWrongAccess(req)) {
            return res.status(400).send('{"Error" : "Wrong Access"}');
        }

        if (CTFManage.pdelete(req)) {
            return res.status(400).send('{"Error" : "Find Null"}');
        }
    } catch (error) {
        console.error(error);
        return res.status(200).send('{"Error" : "Wrong"}');
    }
});

module.exports = router;
