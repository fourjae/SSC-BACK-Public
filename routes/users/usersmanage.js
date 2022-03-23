const user_info = require("../../models/user_info");
const solver_table = require("../../models/solver_table");
const LoginManage = require("../Login/LoginManage");
const wargame_info = require("../../models/wargame_info");
const { QueryTypes, Op } = require("sequelize");
const Sequelize = require("sequelize");
const { myrank } = require("../rank/rankmanage");

const sequelize = new Sequelize("#", "#", "#", {
    host: "211.229.250.147",
    dialect: "mysql",
    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    logging: false,
    operatorsAliases: false
});

exports.myinfomanage = async function myinfomanage(req) {
    try {
        let rankme = 0;
        const name = req.params.name;
        ID = req.user.id;

        const myinfo = await user_info.findOne({
            where: { Nick: name },
            attributes: ["Nick", "profilepicture", "Comment", "Name", "StudentID", "Email", "belong", "Score"]
        });
        const solves = await solver_table.findAll({
            where: { Nick: name },
            attributes: ["ChID", "ChCategory"]
        });

        if (!solves) {
            return {
                myinfo: myinfo,
                solves: 0
            };
        }
        const rankorder = await user_info.findAll({
            where: { permit: 0, Score: { [Op.ne]: 0 } },
            attributes: ["Nick", "Score", "solved_at"],
            order: [
                ["Score", "DESC"],
                ["solved_at", "ASC"]
            ]
        });

        for (i = 0; i < rankorder.length; i++) {
            if (rankorder[i]["Nick"] == myinfo.Nick) {
                rankme = i + 1;
            }
        }

        const solvelist = await sequelize.query("SELECT ChTitle,ChCategory,ChScore FROM wargame_info WHERE ChID in (SELECT ChID FROM solver_table where Nick = ?)", {
            replacements: [name],
            type: QueryTypes.SELECT
        });

        return {
            myinfo: myinfo,
            solves: solves,
            solvelist: solvelist,
            rankme: rankme
        };
    } catch (err) {
        console.log(err);
    }
};
