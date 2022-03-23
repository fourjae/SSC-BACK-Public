const user_info = require("../../models/user_info");
const solver_table = require("../../models/solver_table");
const LoginManage = require("../Login/LoginManage");
const bcrypt = require("bcrypt");
exports.user = async function user(req) {
    try {
        const ID = req.body.ID;
        const userinfo = await user_info.findOne({
            where: { ID },
            attributes: ["UserNumber", "ID", "Belong", "StudentID", "Name", "Nick", "Email", "LastIp", "Comment", "Score", "created_at", "solved_at"]
        });
        const usersolves = await solver_table.findAll({
            where: { ID },
            attributes: ["ChID", "ChCategory"]
        });
        if (!usersolves) {
            return {
                userinfo: userinfo,
                solves: 0
            };
        }

        return {
            userinfo: userinfo,
            solves: usersolves
        };
    } catch (err) {
        console.log(err);
    }
};

exports.changePassword = async function changePassword(req) {
    const password = await bcrypt.hash(req.body.password, 12);
    await user_info.update({ PassWord: password }, { where: { UserNumber: req.params.userId } });
    console.log("ok");
};

exports.myinfoupdate = async function myinfoupdate(req) {
    try {
        //await LoginManage.WriteLastIP(req); 합병하면 푸셈
        await user_info.update(req.body, { where: { UserNumber: req.params.userId } });
    } catch (err) {
        console.log(err);
    }
};
