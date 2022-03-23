const { ReturnUserInfo } = require("../../middleware/ReturnUserInfo");
const user_info = require("../../models/user_info");
const lecture = require("../../models/lecture");
const lecture_data = require("../../models/lecture_data");
const lecture_info = require("../../models/lecture_info");
const lecture_comment = require("../../models/lecture_comment");
const multer = require("multer");
const path = require("path");
const { Op } = require("sequelize");
exports.SetMulter = function SetMulter() {
    return multer({
        storage: multer.diskStorage({
            destination(req, file, done) {
                done(null, "/mnt/c/SSC-back-master/uploads");
            },
            filename(req, file, done) {
                const ext = path.extname(file.originalname);
                done(null, path.basename(file.originalname, ext) + Date.now() + ext);
            }
        }),
        limits: { fileSize: 10 * 1024 * 1024 }
    });
};
exports.ThumbnailsMulter = function SetMulter() {
    return multer({
        storage: multer.diskStorage({
            destination(req, file, done) {
                done(null, "/mnt/c/SSC-back-master/lectureimg");
            },
            filename(req, file, done) {
                const ext = path.extname(file.originalname);
                done(null, path.basename(file.originalname, ext) + Date.now() + ext);
            }
        }),
        limits: { fileSize: 10 * 1024 * 1024 }
    });
};
exports.CheckWriteNull = function CheckWriteNull(body) {
    const { LectureInfoID, LectureTitle, LectureContent } = body;

    if (!LectureInfoID || !LectureTitle || !LectureContent) {
        return true;
    } else {
        return false;
    }
};

exports.CheckModifyNull = function CheckModifyNull(body) {
    const { LectureInfoID, LectureID, LectureTitle, LectureContent } = body;

    if (!LectureInfoID || !LectureID || !LectureTitle || !LectureContent) {
        return true;
    } else {
        return false;
    }
};

exports.CheckDeleteNull = function CheckDeleteNull(body) {
    const { LectureID } = body;

    if (!LectureID) {
        return true;
    } else {
        return false;
    }
};

exports.CheckGetLectureListNull = function CheckGetLectureListNull(body) {
    const { LectureInfoID } = body;
    if (!LectureInfoID) {
        return true;
    } else {
        return false;
    }
};

exports.CheckWrtieWrongAccess = function CheckWrtieWrongAccess(req) {
    const { ID } = req.body;
    if (ReturnUserInfo(req).ID != ID) {
        return true;
    } else {
        return false;
    }
};

exports.CheckModifyWrongAccess = async function CheckModifyWrongAccess(body) {
    const { ID, LectureID } = body;

    const Result = await lecture.findOne({ where: { ID, LectureID } });
    if (!Result) {
        return true;
    } else {
        return false;
    }
};

exports.CheckDeleteWrongAccess = async function CheckDeleteWrongAccess(body) {
    const { LectureID } = body;

    const Result = await lecture.findOne({ where: { LectureID } });
    if (!Result) {
        return true;
    } else {
        return false;
    }
};

exports.CheckGetLectureListWrongAccess = async function CheckGetLectureListWrongAccess(body) {
    const { LectureInfoID } = body;
    const Result = await lecture_info.findOne({ where: { LectureInfoID } });
    if (Result) {
        return false;
    } else {
        return true;
    }
    // if (LectureCategory == "REV" || LectureCategory == "WEB" || LectureCategory == "PWN" || LectureCategory == "FOR") {
    //     return false;
    // } else {
    //     return true;
    // }
};

exports.FindUser = async function FindUser(ID, Nick) {
    const Result = await user_info.findOne({
        where: {
            ID: ID,
            Nick: Nick
        }
    });

    if (!Result) {
        return true;
    } else {
        return false;
    }
};

exports.InsertLecture = async function InsertLecture(LectureInfoID, LectureTitle, LectureContent, file, user) {
    const InsertLecture = await lecture.create({
        LectureInfoID: LectureInfoID,
        LectureTitle: LectureTitle,
        ID: user.ID,
        Nick: user.Nick,
        LectureContent: LectureContent,
        created_at: Date.now()
    });

    const InsertResult = JSON.parse(JSON.stringify(InsertLecture));

    if (file) {
        const UploadResult = JSON.parse(JSON.stringify(file));

        await lecture_data.create({
            LectureID: InsertResult.LectureID,
            ID: user.ID,
            FileName: UploadResult.filename,
            URL: UploadResult.filename,
            created_at: Date.now()
        });
    }

    return InsertLecture;
};

exports.ModifyLecture = async function ModifyLecture(req) {
    const { LectureID, LectureInfoID, LectureTitle, LectureContent } = req.body;

    if (req.file) {
        const UploadResult = JSON.parse(JSON.stringify(req.file));
        await lecture.update(
            {
                LectureTitle,
                LectureContent,
                LectureInfoID,
                updated_at: Date.now()
            },
            {
                where: { LectureID }
            }
        );
        if (await lecture_data.findOne({ where: { LectureID }, attributes: ["LectureDataID"] })) {
            await lecture_data.update(
                {
                    FileName: UploadResult.filename,
                    URL: UploadResult.filename
                },

                { where: { LectureID } }
            );
        } else {
            await lecture_data.create(
                {
                    LectureID,
                    ID: req.user.ID,
                    FileName: UploadResult.filename,
                    URL: UploadResult.filename
                },

                { where: { LectureID } }
            );
        }
    } else {
        await lecture.update(
            {
                LectureTitle,
                LectureContent,
                updated_at: Date.now(),
                LectureInfoID
            },
            {
                where: { LectureID }
            }
        );
    }

    return true;
};

exports.DeleteLecture = async function DeleteLecture(LectureID) {
    await lecture.update(
        {
            deleted: 1,
            deleted_at: Date.now()
        },
        {
            where: { LectureID }
        }
    );
    await lecture_data.update(
        {
            deleted: 1,
            deleted_at: Date.now()
        },
        {
            where: { LectureID }
        }
    );
};

exports.GetLectureInfo = async function GetLectureInfo() {
    const Data = await lecture_info.findAll({ where: { deleted: 0 } });
    return Data;
};
exports.GetLectureInfoOne = async function GetLectureInfo(LectureInfoID) {
    const Data = await lecture_info.findAll({ where: { LectureInfoID } });
    return Data;
};
// 해당 강의 번호와 관련된 강의들의 리스트를 뽑아옴
exports.SelectLectureList = async function SelectLectureList(body) {
    const { LectureInfoID } = body;
    const Data = await lecture_info.findAndCountAll({
        where: { LectureInfoID },
        include: [
            {
                model: lecture,
                where: {
                    deleted: 0
                },
                required: false
            }
        ],
        order: [[{ model: lecture }, "LectureID", "DESC"]]
    });
    const DataObject = [];
    DataObject.push(Data);
    return DataObject;
};

exports.GetLecture = async function GetLecture(body) {
    const { LectureID } = body;
    const Data = await lecture.findOne({
        where: {
            LectureID,
            deleted: 0
        },
        include: [
            {
                model: lecture_data,
                attributes: ["URL"],
                where: {
                    deleted: 0
                },
                required: false
            }
        ],
        attributes: ["LectureContent", "LectureTitle"]
    });
    return Data;
};
exports.GetLectureDataAll = async function GetLectureDataAll(body) {
    const { LectureID } = body;
    const Data = await lecture.findOne({
        where: {
            LectureID,
            deleted: 0
        },
        include: [
            {
                model: lecture_data,
                where: {
                    deleted: 0
                },
                required: false,
                attributes: ["FileName"]
            }
        ]
    });
    return Data;
};
exports.CheckCommentData = async function CheckCommentData(body) {
    const { LectureID } = body;
    const Result = await lecture.findOne({
        where: {
            LectureID
        }
    });
    if (Result) {
        return false;
    } else {
        return true;
    }
};
exports.CheckCommentNull = function CheckCommentNull(body) {
    const { LectureID, LectureCommentContent } = body;
    if (!LectureID || !LectureCommentContent) {
        return true;
    } else {
        return false;
    }
};
exports.InsertLectureComment = async function InsertLectureComment(req) {
    const { LectureID, LectureCommentContent, LectureCommentGroup } = req.body;
    if (LectureCommentContent.match(new RegExp("<iframe>", "i"))) {
        return false;
    }
    if (LectureCommentGroup) {
        const Check = await lecture_comment.findOne({
            where: {
                LectureID,
                LectureCommentID: LectureCommentGroup,
                deleted: 0
            }
        });
        if (Check) {
            let time = Date.now();
            const ReplyResult = await lecture_comment.create({
                LectureID,
                ID: req.user.ID,
                Nick: req.user.Nick,
                LectureCommentContent,
                LectureCommentType: 1,
                LectureCommentGroup,
                created_at: time
            });
            let date = new Date(time);
            // Hours part from the timestamp
            let year = date.getFullYear().toString(); //년도 뒤에 두자리
            let month = ("0" + (date.getMonth() + 1)).slice(-2); //월 2자리 (01, 02 ... 12)
            let day = ("0" + date.getDate()).slice(-2); //일 2자리 (01, 02 ... 31)
            let hour = ("0" + date.getHours()).slice(-2); //시 2자리 (00, 01 ... 23)
            let minute = ("0" + date.getMinutes()).slice(-2); //분 2자리 (00, 01 ... 59)
            let second = ("0" + date.getSeconds()).slice(-2); //초 2자리 (00, 01 ... 59)
            // Will display time in 10:30:23 format
            let returnDate = year + "-" + month + "-" + day + " " + hour + ":" + minute + ":" + second;

            const Final = {
                Result: "OK",
                LectureCommentID: ReplyResult.dataValues.LectureCommentID,
                Nick: ReplyResult.dataValues.Nick,
                LectureCommentContent: ReplyResult.dataValues.LectureCommentContent,
                LectureCommentGroup: ReplyResult.dataValues.LectureCommentGroup,
                LectureCommentType: ReplyResult.dataValues.LectureCommentType,
                created_at: returnDate,
                deleted: 0
            };

            return Final;
        } else {
            return false;
        }
    } else {
        const Group = await lecture_comment.create({
            LectureID,
            ID: req.user.ID,
            Nick: req.user.Nick,
            LectureCommentContent,
            LectureCommentType: 0,
            created_at: Date.now()
        });
        await lecture_comment.update(
            {
                LectureCommentGroup: Group.dataValues.LectureCommentID
            },
            {
                where: {
                    LectureCommentID: Group.dataValues.LectureCommentID
                }
            }
        );
        const CommentResult = await lecture_comment.findOne({
            where: {
                LectureCommentID: Group.dataValues.LectureCommentID
            }
        });
        const Final = {
            Result: "OK",
            LectureCommentID: CommentResult.dataValues.LectureCommentID,
            Nick: CommentResult.dataValues.Nick,
            LectureCommentContent: CommentResult.dataValues.LectureCommentContent,
            LectureCommentGroup: CommentResult.dataValues.LectureCommentGroup,
            LectureCommentType: CommentResult.dataValues.LectureCommentType,
            created_at: CommentResult.dataValues.created_at,
            deleted: 0
        };

        return Final;
    }
    return false;
};
exports.CheckLectureID = async function CheckLectureID(params) {
    const { LectureID } = params;
    const Count = await lecture.findOne({
        where: {
            LectureID,
            deleted: 0
        }
    });
    if (Count) {
        return false;
    } else {
        return true;
    }
};
exports.GetLectureComment = async function GetLectureComment(params) {
    const { LectureID } = params;

    let Data = await lecture_comment.findAll({
        where: { LectureID },
        order: [
            ["LectureCommentGroup", "DESC"],
            ["LectureCommentID", "ASC"]
        ],
        include: [
            {
                model: user_info,
                required: false,
                attributes: ["profilepicture"]
            }
        ]
    });

    const FinalData = [];
    Data.map(data => {
        let current = data.LectureCommentID;

        if (data.deleted == 0) {
            let manage = {
                LectureCommentID: data.LectureCommentID,
                Nick: data.Nick,
                LectureCommentContent: data.LectureCommentContent,
                LectureCommentGroup: data.LectureCommentGroup,
                LectureCommentType: data.LectureCommentType,
                ProfileImg: data.user_info.dataValues.profilepicture,
                created_at: data.created_at,
                deleted: data.deleted
            };
            FinalData.push(manage);
        } else {
            if (data.LectureCommentType == 0) {
                for (let i = 0; i < Data.length; i++) {
                    if (Data[i].LectureCommentType == 1 && Data[i].LectureCommentGroup == current && Data[i].deleted == 0) {
                        data.LectureCommentContent = "삭제 된 댓글입니다";
                        let manage = {
                            LectureCommentID: data.LectureCommentID,
                            Nick: data.Nick,
                            LectureCommentContent: data.LectureCommentContent,
                            LectureCommentGroup: data.LectureCommentGroup,
                            ProfileImg: data.user_info.dataValues.profilepicture,
                            LectureCommentType: data.LectureCommentType,
                            created_at: data.created_at,
                            deleted: data.deleted
                        };
                        FinalData.push(manage);
                        break;
                    }
                }
            }
        }
    });

    return FinalData;
};
exports.DeleteLectureComment = async function DeleteLectureComment(req) {
    const { LectureCommentID } = req.body;

    const Check = lecture_comment.findOne({
        where: {
            LectureCommentID,
            Nick: req.user.Nick
        }
    });
    if (Check) {
        await lecture_comment.update(
            {
                deleted: 1,
                deleted_at: Date.now()
            },
            {
                where: { LectureCommentID }
            }
        );
        return true;
    } else {
        return false;
    }
};
exports.CheckDeleteCommnetNull = function CheckDeleteCommnetNull(body) {
    const { LectureCommentID } = body;
    if (!LectureCommentID) {
        return true;
    } else {
        return false;
    }
};
exports.UpdateLectureComment = async function UpdateLectureComment(req) {
    const { LectureCommentID, LectureCommentContent } = req.body;

    const Check = lecture_comment.findOne({
        where: {
            LectureCommentID,
            Nick: req.user.Nick
        }
    });
    if (Check) {
        await lecture_comment.update(
            {
                LectureCommentContent,
                updated_at: Date.now()
            },
            {
                where: { LectureCommentID }
            }
        );
        return true;
    } else {
        return false;
    }
};
exports.CheckUpdateCommnetNull = function CheckUpdateCommnetNull(body) {
    const { LectureCommentID, LectureCommentContent } = body;
    if (!LectureCommentID || !LectureCommentContent) {
        return true;
    } else {
        return false;
    }
};
exports.CheckAddLectureCategoryNull = function CheckAddLectureCategoryNull(body) {
    const { LectureTitle, LectureDescription, LectureAuthor } = body;
    if (!LectureTitle || !LectureDescription || !LectureAuthor) {
        return true;
    } else {
        return false;
    }
};
exports.AddLectureCategory = async function AddLectureCategory(body, img) {
    const { LectureTitle, LectureDescription, LectureAuthor } = body;
    await lecture_info.create({
        LectureTitle,
        LectureDescription,
        LectureAuthor,
        LectureImg: img
    });
};
exports.DeleteLectureCategory = async function DeleteLectureCategory(LectureInfoID) {
    try {
        await lecture_info.update(
            {
                deleted: 1
            },
            {
                where: { LectureInfoID }
            }
        );
        return true;
    } catch (err) {
        return false;
    }
};
exports.CheckDeleteLectureCategoryNull = async function CheckDeleteLectureCategoryNull(LectureInfoID) {
    if (LectureInfoID == null) {
        return true;
    } else {
        return false;
    }
};
exports.CheckUpdateLectureCategoryNull = function CheckUpdateLectureCategoryNull(req) {
    const { LectureInfoID, LectureTitle, LectureDescription, LectureAuthor } = req.body;
    if (!LectureInfoID || !LectureTitle || !LectureDescription || !LectureAuthor) {
        return true;
    } else {
        return false;
    }
};
exports.UpdateLectureCategory = async function UpdateLectureCategory(req) {
    if (req.file) {
        const UploadResult = JSON.parse(JSON.stringify(req.file));
        const result = await lecture_info.update(
            {
                LectureTitle: req.body.LectureTitle,
                LectureDescription: req.body.LectureDescription,
                LectureAuthor: req.body.LectureAuthor,
                LectureImg: "/" + UploadResult.filename
            },
            { where: { LectureInfoID: req.body.LectureInfoID } }
        );

        return result;
    } else {
        const result = await lecture_info.update(
            {
                LectureTitle: req.body.LectureTitle,
                LectureDescription: req.body.LectureDescription,
                LectureAuthor: req.body.LectureAuthor
            },
            { where: { LectureInfoID: req.body.LectureInfoID } }
        );

        return result;
    }
};

exports.GetLectureAll = async function GetLectureAll() {
    const data = await lecture.findAll({ where: { deleted: 0 } });
    return data;
};
