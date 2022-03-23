const express = require("express");
const RegisterManage = require("./RegisterManage");
const router = express.Router();

router.post("/", async (req, res, next) => {
    if (RegisterManage.CheckInputAll(req)) {
        return res.status(200).send('{"Result" : "Wrong Input"}');
    }
    try {
        await RegisterManage.CreateUser(req);
        return res.status(201).send('{"Result" : "Success"}');
    } catch (error) {
        console.error(error);
        return res.status(200).send('{"Result" : "Fail"}');
    }
});

router.post("/checkid", async (req, res, next) => {
    const { ID } = req.body;
    const IDRoll = /^[a-z0-9_]{4,20}$/;
    if (!ID) {
        return res.status(200).send('{"Result" : "FindNull"}');
    }
    if (!IDRoll.test(ID)) {
        return res.status(200).send('{"Result" : "WrongInput"}');
    }
    try {
        if (await RegisterManage.CheckAlereadyID(ID)) {
            return res.status(200).send('{"Result" : "Exist"}');
        } else {
            return res.status(200).send('{"Result" : "No"}');
        }
    } catch (error) {
        return res.status(200).send('{"Result" : "Fail"}');
    }
});

router.post("/checkemail", async (req, res, next) => {
    const { Email } = req.body;
    const EmailRoll = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    if (!Email) {
        return res.status(200).send('{"Result" : "FindNull"}');
    }
    if (!EmailRoll.test(Email)) {
        return res.status(200).send('{"Result" : "WrongInput"}');
    }
    try {
        if (await RegisterManage.CheckAlereadyEmail(Email)) {
            return res.status(200).send('{"Result" : "Exist"}');
        } else {
            return res.status(200).send('{"Result" : "No"}');
        }
    } catch (error) {
        console.error(error);
        return res.status(200).send('{"Result" : "Fail"}');
    }
});

router.post("/checknick", async (req, res, next) => {
    const { Nick } = req.body;
    const NickRoll = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/;
    if (!Nick) {
        return res.status(200).send('{"Result" : "FindNull"}');
    }
    if (!NickRoll.test(Nick)) {
        return res.status(200).send('{"Result" : "WrongInput"}');
    }
    try {
        if (await RegisterManage.CheckAlereadyNick(Nick)) {
            return res.status(200).send('{"Result" : "Exist"}');
        } else {
            return res.status(200).send('{"Result" : "No"}');
        }
    } catch (error) {
        console.error(error);
        return res.status(200).send('{"Result" : "Fail"}');
    }
});

module.exports = router;
