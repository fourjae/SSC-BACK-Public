const user_info = require("../models/user_info");

exports.Returnadmincheck = async function submitflag(req, res, next) {
    const { ID } = req.user;
    const returnadmin = await user_info.findOne({ where: { ID } });
    if (returnadmin.permit) {
        next();
    } else return res.status(200).send('{"Error" : "Error"}');
};
