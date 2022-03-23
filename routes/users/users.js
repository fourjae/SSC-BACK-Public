const express = require("express");
const router = express.Router();
const rankManage = require("../rank/rankmanage");
const usersmanage = require("./usersmanage");

router.get("/", async (req, res, next) => {
    try {
        return res.status(200).send('{"Error":"not user"}');
    } catch (err) {
        return res.status(400).send('{"Error" : "Fail"}');
    }
});

router.get("/:name", async (req, res, next) => {
    try {
        if (!req.user.ID || !req.params.name) {
            //방어
        }
        if (req.user.ID) {
            const apimyinfo = await usersmanage.myinfomanage(req);

            if (apimyinfo) {
                //              myinfo["solves"][0].ChCategory
                const Categories = {
                    WEB: 0,
                    REV: 0,
                    PWN: 0,
                    FOR: 0,
                    CRYPTO: 0,
                    MISC: 0
                };
                for (let key in apimyinfo["solves"]) {
                    if ((key, apimyinfo["solves"][key].ChCategory) == "WEB") Categories.WEB += 1;
                    else if ((key, apimyinfo["solves"][key].ChCategory) == "REV") Categories.REV += 1;
                    else if ((key, apimyinfo["solves"][key].ChCategory) == "PWN") Categories.PWN += 1;
                    else if ((key, apimyinfo["solves"][key].ChCategory) == "FOR") Categories.FOR += 1;
                    else if ((key, apimyinfo["solves"][key].ChCategory) == "CRYPTO") Categories.CRYPTO += 1;
                    else if ((key, apimyinfo["solves"][key].ChCategory) == "MISC") Categories.MISC += 1;
                }
                const myinfo = apimyinfo.myinfo;
                const solvelist = apimyinfo.solvelist;
                const rankme = apimyinfo.rankme;
                const returnmyinfo = { myinfo, Categories, solvelist, rankme };

                return res.status(200).send(returnmyinfo);
            } else {
                return res.status(200).send('{"Error":"no data"}');
            }
        } else {
            return res.status(200).send('{"Error":"not user"}');
        }
    } catch (err) {
        return res.status(400).send('{"Error" : "Fail"}');
    }
});

module.exports = router;
