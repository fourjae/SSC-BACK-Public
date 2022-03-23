const RateLimit = require("express-rate-limit");

exports.CommentApiLimiter = new RateLimit({
    windowMs: 10000,
    max: 1,
    delayMs: 0,
    handler(req, res) {
        res.status(200).send('{"Result" : "Limit"}');
    }
});
