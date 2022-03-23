const user_info = require("../../models/user_info");
const bcrypt = require("bcrypt");
const requestIp = require("request-ip");

exports.CheckInputAll = function CheckInputAll(req) {
    const { ID, PassWord, Nick, Email, Name, StudentID, Belong } = req.body;
    const IDRoll = /^[a-z0-9_]{4,20}$/;
    const PassWordRoll = /^[\w\W]{8,20}$/;
    const NickRoll = /^[\w\Wㄱ-ㅎㅏ-ㅣ가-힣]{2,20}$/;
    const EmailRoll = /^[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_\.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i;
    const StudentIDRoll = /^[0-9]{2}$/;

    if (!IDRoll.test(ID) || !PassWordRoll.test(PassWord) || !NickRoll.test(Nick) || !EmailRoll.test(Email) || !StudentIDRoll.test(StudentID) || !Name || !Belong) {
        return true;
    } else {
        return false;
    }
};

exports.CheckAlereadyID = async function CheckAlereadyID(ID) {
    const result = await user_info.findOne({ where: { ID } });

    if (result) {
        return true;
    } else {
        return false;
    }
};

exports.CheckAlereadyEmail = async function CheckAlereadyEmail(Email) {
    const result = await user_info.findOne({ where: { Email } });

    if (result) {
        return true;
    } else {
        return false;
    }
};

exports.CheckAlereadyNick = async function CheckAlereadyNick(Nick) {
    const result = await user_info.findOne({ where: { Nick } });

    if (result) {
        return true;
    } else {
        return false;
    }
};

exports.CreateUser = async function CreateUser(req) {
    const { ID, PassWord, Nick, Email, Name, StudentID, Belong } = req.body;

    const hash = await bcrypt.hash(PassWord, 12);

    await user_info.create({
        ID: ID,
        PassWord: hash,
        Name,
        StudentID,
        Belong,
        Nick: Nick,
        Email: Email,
        LastIp: requestIp.getClientIp(req),
        created_at: Date.now()
    });
};
