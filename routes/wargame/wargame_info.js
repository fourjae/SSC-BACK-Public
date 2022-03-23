const { ReturnUserInfo } = require("../../middleware/ReturnUserInfo");
const permit = require("../../middleware/Returnadmincheck");
const express = require("express");
const wargame_info = require("../../models/wargame_info");
const lecture_comment = require("../../models/lecture_Comment");
const wargameManage = require("./wargameManage.js");
const requestIp = require("request-ip");
const router = express.Router();
const { isLoggedIn } = require("../../middleware/CheckLogin");
const { Returnadmincheck } = require("../../middleware/Returnadmincheck");
const SetUpload = wargameManage.SetMulter();
router.use(isLoggedIn); // 로그인 확인
/// 문제들 목록 데이터 가져오는 API
router.get("/wargamelist", async (req, res, next) => {
    try {
        // if (wargameManage.CheckWrongAccess(req)) {
        //     return res.status(404).send('{"Error" : "Wrong Access"}');
        // }
        // if (await permit.Returnadmincheck(req)){
        //     return res.status(404).send('{"Error" : "Not Page"}');
        // }
        const problems = await wargameManage.datalist();
        // const flag = await wargame_info.findOne({ where: { Chflag: hash } });
        // res.json(flag.ChScore);
        if (problems) {
            res.json(problems);
        } else {
            return res.status(200).send('{"Error":"no data"}');
        }
    } catch (err) {
        return res.status(400).send('{"Error" : "Fail"}');
    }
});

/// 문제 정답 제출 API
router.post("/prosolve", async (req, res, next) => {
    try {
        // if (wargameManage.CheckWrongAccess(req)) {
        //     return res.status(400).send('{"Error" : "Wrong Access"}');
        // }

        if (await wargameManage.submitflag(req)) {
            return res.status(200).send('{"Result":"Correct"}');
        } else {
            return res.status(200).send('{"Result":"Wrong"}');
        }
    } catch (err) {
        return res.status(400).send('{"Error" : "Fail"}');
    }
});

//내가 푼 문제 땡겨오기
router.get("/proinfo", async (req, res, next) => {
    try {
        const proinfo = await wargameManage.proinfo(req);
        if (!proinfo) {
            return res.status(200).send('{"Result":"Null"}');
        } else {
            return res.status(200).send(proinfo);
        }
    } catch (err) {
        return res.status(400).send('{"Error" : "Fail"}');
    }
});

router.get("/solvelist/:ChID", async (req, res, next) => {
    try {
        const { ChID } = req.params;

        if (wargameManage.CheckSolveListNull(req.params)) {
            return res.status(400).send('{"Error" : "Fail"}');
        }
        const data = await wargameManage.GetChallengeSolverList(req.params);
        return res.status(200).send(data);
    } catch (err) {
        return res.status(400).send('{"Error" : "Fail"}');
    }
});

// 아래부터 관리자 기능
// //  문제 업로드 API

router.post("/upload", Returnadmincheck, SetUpload.single("upload"), async (req, res, next) => {
    try {
        if (wargameManage.CheckNull(req)) {
            return res.status(200).send('{"Error" : "Find Null}');
        }
        //      if (wargameManage.CheckWrongAccess(req)) {
        //          return res.status(400).send('{"Error" : "Wrong Access"}');
        //      }
        // else{
        if (await wargameManage.wargame_upload(req, req.file)) {
            return res.status(201).send('{"Result":"OK"}');
        }
        //     }
    } catch (error) {
        console.error(error);
        return res.status(200).send('{"Error":"Fail"}');
    }
});

router.get("/wargameinfo/:ChID", Returnadmincheck, async (req, res, next) => {
    try {
        const { ChID } = req.params;
        if (wargameManage.CheckWrongAccess(req)) {
            return res.status(404).send('{"Error" : "Wrong Access"}');
        }
        if (ChID) {
            const result = await wargameManage.GetWargameInfo(ChID);
            return res.status(200).send(result);
        } else {
            return res.status(400).send('{"Error" : "Fail"}');
        }
    } catch (err) {
        return res.status(400).send('{"Error" : "Fail"}');
    }
});

/// 문제 삭제 API
router.post("/pro_delete", Returnadmincheck, async (req, res, next) => {
    try {
        if (wargameManage.CheckWrongAccess(req)) {
            return res.status(404).send('{"Error" : "Wrong Access"}');
        }
        const idx = req.body.idx; //삭제할 번호
        // 특정 문제 삭제
        if (wargameManage.pdelete(idx)) {
            await wargame_info.update({ deleted: 1 }, { where: { Chid: idx } });
            return res.status(201).send('{"Result":"OK"}');
        } else {
            return res.status(400).send('{"Error" : "no data"}');
        }
    } catch (err) {
        console.log(err);
        return res.status(400).send('{"Error" : "Fail"}');
    }
});

/// 문제 수정 API
router.post("/pro_update", Returnadmincheck, SetUpload.single("upload"), async (req, res, next) => {
    try {
        if (wargameManage.CheckWrongAccess(req)) {
            return res.status(404).send('{"Error" : "Wrong Access"}');
        }
        // if (await permit.Returnadmincheck(req)) {
        //     return res.status(404).send('{"Error" : "Not Page"}');
        // }
        if (wargameManage.CheckNull(req)) {
            return res.status(400).send('{"Error" : "Find Null"}');
        } else {
            if (await wargameManage.wargame_update(req)) {
                return res.status(201).send('{"Result":"OK"}');
            }
        }
    } catch (error) {
        console.error(error);
        return res.status(200).send('{"Error":"Wrong"}');
    }
});

// /// 문제 댓글 추가 API
// router.post("/pro_comment", async (req, res, next) => {
//     try {
//         if (wargameManage.CheckWrongAccess(req)) {
//             return res.status(404).send('{"Error" : "Wrong Access"}');
//         }
//         if (await permit.Returnadmincheck(req)) {
//             return res.status(404).send('{"Error" : "Not Page"}');
//         }
//         if (!wargameManage.CheckNullcomment(req)) {
//             return res.status(400).send('{"Error" : "Find Null"}');
//         } else if (await wargameManage.addcomment(req)) {
//             return res.status(201).redirect("/");
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(200).send('{"Error":"Wrong"}');
//     }
// });

// /// 문제 댓글 수정 API
// router.post("/com_update", async (req, res, next) => {
//     try {
//         if (wargameManage.commentidcheck(req)) {
//             return res.status(400).send('{"Error" : "Find Null"}');
//         }
//         if (wargameManage.CheckWrongAccess(req)) {
//             return res.status(400).send('{"Error" : "Wrong Access"}');
//         } else {
//             wargameManage.commentupdate(req);
//             return res.status(201).redirect("/");
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(200).send('{"Error":"Wrong"}');
//     }
// });

// /// 문제 댓글 삭제 API
// router.post("/com_delete", async (req, res, next) => {
//     const idx2 = req.body.idx; //삭제할 번호
//     try {
//         if (wargameManage.CheckWrongAccess(req)) {
//             return res.status(404).send('{"Error" : "Wrong Access"}');
//         }
//         if (await permit.Returnadmincheck(req)) {
//             return res.status(404).send('{"Error" : "Not Page"}');
//         }
//         if (wargameManage.commentdelete(idx2)) {
//             return res.status(400).send('{"Error" : "Find Null"}');
//         } else {
//             return res.status(201).redirect("/");
//         }
//     } catch (error) {
//         console.error(error);
//         return res.status(200).send('{"Error":"Wrong"}');
//     }
// });

module.exports = router;
