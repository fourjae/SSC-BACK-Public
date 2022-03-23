const user_info = require("../../models/user_info");
const solver_table = require("../../models/solver_table");
const LoginManage = require("./../Login/LoginManage");
const wargame_info = require("../../models/wargame_info");
const { QueryTypes } = require("sequelize");
const Sequelize = require("sequelize");
const multer = require("multer");
const path = require("path");
const randomstring = require("randomstring");
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
exports.SetMulter = function SetMulter(res, req, next) {
    return multer({
        storage: multer.diskStorage({
            destination(req, file, done) {
                done(null, "/mnt/c/SSC-back-master/profilepicture");
            },
            filename(req, file, done) {
                const ext = path.extname(file.originalname);
                done(null, randomstring.generate(32) + ext);
            }
        }),
        fileFilter: function (req, file, callback) {
            var ext = path.extname(file.originalname);
            if (ext !== ".png" && ext !== ".jpg" && ext !== ".gif" && ext !== ".jpeg") {
                return callback(null, false);
            }
            callback(null, true);
        },
        limits: { fileSize: 10 * 1024 * 1024 }
    });
};

exports.myinfomanage = async function myinfomanage(req) {
    try {
        ID = req.user.ID;
        const myinfo = await user_info.findOne({
            where: { ID },
            attributes: ["Nick", "profilepicture", "Comment", "Name", "StudentID", "Email", "belong", "Score"]
        });
        const solves = await solver_table.findAll({
            where: { ID },
            attributes: ["ChID", "ChCategory"]
        });
        if (!solves) {
            return {
                myinfo: myinfo,
                solves: 0
            };
        }

        const solvelist = await sequelize.query("SELECT ChTitle,ChCategory,ChScore FROM wargame_info WHERE ChID in (SELECT ChID FROM solver_table where ID = ?)", {
            replacements: [req.user.ID],
            type: QueryTypes.SELECT
        });

        return {
            myinfo: myinfo,
            solves: solves,
            solvelist: solvelist
        };
    } catch (err) {
        console.log(err);
    }
};
exports.myinfoupdate = async function myinfoupdate(req) {
    try {
        const ID = req.user.ID;
        //await LoginManage.WriteLastIP(req); 합병하면 푸셈
        // const { Nick, Comment, Name, StudentID, Email, Belong } = req.body;
        const { Comment } = req.body;

        await user_info.update(
            {
                Comment
            },
            { where: { ID } }
        );
        return true;
    } catch (err) {
        console.log(err);
        return false;
    }
};
exports.myinfoupdatepw = async function myinfoupdatepw(req) {
    const { PassWord } = req.body;
};

exports.myinfoprofileimgupdate = async function myinfoprofileimgupdate(req) {
    if (req.file) {
        const UploadResult = JSON.parse(JSON.stringify(req.file));
        const result = await user_info.update(
            {
                profilepicture: "/" + UploadResult.filename
            },
            { where: { ID: req.user.ID } }
        );
        const updateresult = await user_info.findOne({
            where: { ID: req.user.ID }
        });

        if (result) {
            const Result = {
                Result: "Success",
                UserInfo: {
                    ID: req.user.dataValues.ID,
                    Nick: req.user.dataValues.Nick,
                    Email: req.user.dataValues.Email,
                    ProfileImg: updateresult.dataValues.profilepicture
                },
                ChangeResult: "Success"
            };

            return Result;
        } else {
            return false;
        }
    }
};
exports.myinfoprofileimginit = async function myinfoprofileimginit(req) {
    const result = await user_info.update(
        {
            profilepicture: "/default.png"
        },
        { where: { ID: req.user.ID } }
    );

    if (result) {
        const Result = {
            Result: "Success",
            UserInfo: {
                ID: req.user.dataValues.ID,
                Nick: req.user.dataValues.Nick,
                Email: req.user.dataValues.Email,
                ProfileImg: "/default.png"
            },
            ChangeResult: "Success"
        };
        return Result;
    } else {
        return false;
    }
};
