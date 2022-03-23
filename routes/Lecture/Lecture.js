const express = require("express");
const { isLoggedIn } = require("../../middleware/CheckLogin");
const { isSecurityFirst } = require("../../middleware/checkSecurityFirst");
const { Returnadmincheck } = require("../../middleware/Returnadmincheck");
const LectureManage = require("./LectureManage");
const router = express.Router();

router.use(isLoggedIn); // 로그인 확인
router.use(isSecurityFirst); // 시큐 유저인지 확인
router.get("/", (req, res, next) => {});
const SetUpload = LectureManage.SetMulter();
const ThumbnailsMulter = LectureManage.ThumbnailsMulter();
// 강의 카테고리로 해당 카테고리의 강의 목록 가져오기
router.post("/getlecturelist", async (req, res, next) => {
    let timestampFirst = new Date();
    if (LectureManage.CheckGetLectureListNull(req.body)) {
        return res.status(400).send('{"Error" : "Find Null"}');
    }

    // if (await LectureManage.CheckGetLectureListWrongAccess(req.body)) {
    //     return res.status(400).send('{"Error" : "Wrong Access"}');
    // }
    const Result = await LectureManage.SelectLectureList(req.body);
    let timestampSecond = new Date();

    return res.status(200).send(Result);
});

// 강의 카테고리 데이터 부분
router.get("/getlecturecategoryinfo", async (req, res, next) => {
    const Data = await LectureManage.GetLectureInfo();
    res.send(Data);
});

router.get("/getlecturecategoryinfoone/:LectureInfoID", async (req, res, next) => {
    if (req.params.LectureInfoID) {
        const Data = await LectureManage.GetLectureInfoOne(req.params.LectureInfoID);
        res.send(Data);
    } else {
        res.status(400).send('{"Error" : "Fail"}');
    }
});

router.get("/getlecturedata/:LectureID", async (req, res, next) => {
    const Data = await LectureManage.GetLecture(req.params);
    res.status(200).send(Data);
});

router.get("/getlecturedataall/:LectureID", async (req, res, next) => {
    const Data = await LectureManage.GetLectureDataAll(req.params);
    res.status(200).send(Data);
});

router.get("/getalllecutrelist", async (req, res, next) => {
    const Data = await LectureManage.GetLectureAll();
    res.status(200).send(Data);
});
router.post(
    "/addlecturecomment",
    // ApiLimit.CommentApiLimiter,
    async (req, res, next) => {
        try {
            if (LectureManage.CheckCommentNull(req.body)) {
                return res.status(400).send('{"Error" : "Find Null"}');
            }

            if (await LectureManage.CheckCommentData(req.body)) {
                return res.status(400).send('{"Error" : "Fail"}');
            }

            const Result = await LectureManage.InsertLectureComment(req);
            if (Result) {
                return res.status(200).send(Result);
            } else {
                return res.status(400).send('{"Error" : "Fail"}');
            }
        } catch (error) {
            console.log(error);
            return res.status(400).send('{"Error" : "Fail"}');
        }
    }
);

router.post("/deletelecturecomment", async (req, res, next) => {
    try {
        if (LectureManage.CheckDeleteCommnetNull(req.body)) {
            return res.status(400).send('{"Error" : "Find Null"}');
        }
        const DeleteResult = LectureManage.DeleteLectureComment(req);

        if (DeleteResult) {
            return res.status(200).send('{"Result" : "OK"}');
        } else {
            return res.status(200).send('{"Result" : "Fail"}');
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send('{"Error" : "Fail"}');
    }
});

router.post("/updatelecturecomment", async (req, res, next) => {
    try {
        if (LectureManage.CheckUpdateCommnetNull(req.body)) {
            return res.status(400).send('{"Error" : "Find Null"}');
        }
        const UpdateResult = LectureManage.UpdateLectureComment(req);

        if (UpdateResult) {
            return res.status(200).send('{"Result" : "OK"}');
        } else {
            return res.status(200).send('{"Result" : "Fail"}');
        }
    } catch (error) {
        console.log(error);
        return res.status(400).send('{"Error" : "Fail"}');
    }
});

router.get("/getlecturecomment/:LectureID", async (req, res, next) => {
    if (await LectureManage.CheckLectureID(req.params)) {
        return res.status(400).send('{"Error" : "Fail"}');
    }
    const Result = await LectureManage.GetLectureComment(req.params);

    res.status(200).send(Result);
});

// 아래부턴 관리자 기능

router.post("/write", Returnadmincheck, SetUpload.single("upload"), async (req, res, next) => {
    try {
        const { LectureInfoID, LectureTitle, LectureContent } = req.body;

        if (LectureManage.CheckWriteNull(req.body)) {
            return res.status(400).send('{"Error" : "Find Null"}');
        }

        // if (LectureManage.CheckWrtieWrongAccess(req)) {
        //     return res.status(400).send('{"Error" : "Wrong Access"}');
        // }

        // if (await LectureManage.FindUser(ID, Nick)) {
        //     return res.status(400).send('{"Error" : "Wrong User"}');
        // }

        await LectureManage.InsertLecture(LectureInfoID, LectureTitle, LectureContent, req.file, req.user);
        return res.status(201).send('{"Result" : "OK"}');
        // return res.status(201).redirect("/");
    } catch (err) {
        console.log(err);
        return res.status(400).send('{"Error" : "Fail"}');
    }
});

router.post("/modify", Returnadmincheck, SetUpload.single("upload"), async (req, res, next) => {
    try {
        if (LectureManage.CheckModifyNull(req.body)) {
            return res.status(400).send('{"Error" : "Find Null"}');
        }

        if (await LectureManage.ModifyLecture(req)) {
            return res.status(201).send('{"Result" : "OK"}');
        }
    } catch (err) {
        console.log(err);
        return res.status(400).send('{"Error" : "Fail"}');
    }
});

router.post("/delete", Returnadmincheck, async (req, res, next) => {
    try {
        const { LectureID } = req.body;
        if (LectureManage.CheckDeleteNull(req.body)) {
            return res.status(400).send('{"Error" : "Find Null"}');
        }

        if (await LectureManage.CheckDeleteWrongAccess(req.body)) {
            return res.status(400).send('{"Error" : "Wrong Access"}');
        }
        await LectureManage.DeleteLecture(LectureID);

        return res.status(201).send('{"Result" : "OK"}');
    } catch (err) {
        console.log(err);
        return res.status(400).send('{"Error" : "Fail"}');
    }
});

router.post("/addcategory", Returnadmincheck, SetUpload.single("LectureImg"), async (req, res, next) => {
    try {
        if (LectureManage.CheckAddLectureCategoryNull(req.body)) {
            return res.status(200).send('{"Error" : "Find Null"}');
        }
        await LectureManage.AddLectureCategory(req.body, "/" + req.file.filename);
        return res.status(201).send('{"Result" : "OK"}');
    } catch (err) {
        console.log(err);
        return res.status(400).send('{"Error" : "Fail"}');
    }
});

router.post("/uploadimage", Returnadmincheck, SetUpload.single("upload"), async (req, res, next) => {
    try {
        res.send("http://localhost:9821/uploads/" + req.file.filename);
    } catch (err) {
        res.send("Fail");
    }
});
router.post("/deletecategory", Returnadmincheck, async (req, res, next) => {
    try {
        if (await LectureManage.CheckDeleteLectureCategoryNull(req.body.LectureInfoID)) {
            return res.status(200).send('{"Result" : "Fail"}');
        } else {
            if (await LectureManage.DeleteLectureCategory(req.body.LectureInfoID)) {
                return res.status(200).send('{"Result" : "OK"}');
            } else {
                return res.status(200).send('{"Result" : "Fail"}');
            }
        }
    } catch (err) {
        res.send("Fail");
    }
});

router.post("/updatecategory", Returnadmincheck, ThumbnailsMulter.single("LectureImg"), async (req, res, next) => {
    try {
        if (LectureManage.CheckUpdateLectureCategoryNull(req)) {
            return res.status(200).send('{"Result" : "Fail"}');
        } else {
            if (LectureManage.UpdateLectureCategory(req)) {
                return res.status(200).send('{"Result" : "OK"}');
            }
        }
    } catch (err) {
        console.log(err);
        return res.status(200).send('{"Result" : "Fail"}');
    }
});

router.use((err, req, res, next) => {
    console.error(err);
    res.status(400).send('{"Error" : "Error"}');
});

module.exports = router;
