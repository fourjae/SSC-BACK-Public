const express = require("express");
const router = express.Router();

router.get("/", (req, res, next) => {
    // console.log(req.headers["x-forwarded-for"]);
    if (req.isAuthenticated()) {
        res.status(200).send('{"Result" : "OK"}');
    } else {
        res.status(200).send('{"Result" : "NO"}');
    }
});

module.exports = router;
