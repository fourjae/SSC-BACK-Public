exports.ReturnUserInfo = (req, res) => {
    UserInfo = JSON.parse(JSON.stringify(req.user));
    return UserInfo;
};
