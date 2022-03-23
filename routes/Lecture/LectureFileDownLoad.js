var express = require("express");
var router = express.Router();

var fs = require("fs");

router.get("/:file_name", function (req, res, next) {
    var upload_folder = "/mnt/c/SSC-back-master/uploads/";
    var file = upload_folder + req.params.file_name; // ex) /upload/files/sample.txt
    try {
        if (fs.existsSync(file)) {
            // 파일이 존재하는지 체크
            res.status(200).download(file, req.params.file_name);
        } else {
            res.send("해당 파일이 없습니다.");
            return;
        }
    } catch (e) {
        // 에러 발생시
        console.log(e);
        res.send("파일을 다운로드하는 중에 에러가 발생하였습니다.");
        return;
    }
});

module.exports = router;
