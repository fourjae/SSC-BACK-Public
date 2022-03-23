exports.isSecurityFirst = (req, res, next) => {
    if (req.user.Belong === "SecurityFirst" || req.user.Belong === "SecurityFirst OB") {
        next();
    } else {
        res.status(200).send('{"Error" : "No"}');
    }
};
