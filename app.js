const express = require("express");
const dotenv = require("dotenv");
const requestIp = require("request-ip");
dotenv.config();

const session = require("express-session");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const { sequelize } = require("./models/index");
const passportConfig = require("./passport");
const redis = require("redis");
const RedisStore = require("connect-redis")(session);
const cors = require("cors");
const app = express();
passportConfig();

/* 라우터 임포트 */
const Register = require("./routes/Register/Register");
const Login = require("./routes/Login/Login");
const Logout = require("./routes/Logout/Logout");
const Lecture = require("./routes/Lecture/Lecture");
const Auth = require("./routes/Auth/Auth");
const wargame_info = require("./routes/wargame/wargame_info");
const admin = require("./routes/admin/admin");
const rank = require("./routes/rank/ranking");
const myinfo = require("./routes/myinfo/myinfo");
const users = require("./routes/users/users");
const LectureFiledownload = require("./routes/Lecture/LectureFileDownLoad");
const wargameFileDownLoad = require("./routes/wargame/wargameFileDownLoad");
/* 라우터 임포트 */

/* redis 설정 */
const redisClient = redis.createClient({
    url: `redis://${process.env.REDIS_HOST}:${process.env.REDIS_PORT}`,
    password: process.env.REDIS_PASSWORD
});
/* redis 설정 */

/* 미들웨어 적용 */
app.set("port", process.env.SERVER_PORT);
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(
    session({
        resave: false,
        saveUninitialized: false,
        secret: process.env.COOKIE_SECRET,
        cookie: {
            httpOnly: true,
            secure: false,
            sameSite: false
        },
        store: new RedisStore({ client: redisClient })
    })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(
    cors({
        origin: true,
        credentials: true
    })
);
/* 미들웨어 적용 */

/* 데이터베이스 연결 */
sequelize
    .sync({ force: false })
    .then(() => {
        console.log("데이터베이스 연결 성공");
    })
    .catch(err => {
        console.error(err);
    });
/* 데이터베이스 연결 */

/* ROUTERS */
app.use("/api/register", Register);
app.use("/api/login", Login);
app.use("/api/logout", Logout);
app.use("/api/lecture", Lecture);
app.use("/api/auth", Auth);
app.use("/api/uploads", express.static("uploads"));
app.use("/api/profile", express.static("profilepicture"));
app.use("/api/lectureimg", express.static("lectureimg"));
app.use("/api/wargame", wargame_info);
app.use("/api/admin", admin);
app.use("/api/rank", rank);
app.use("/api/lecturefiledownload", LectureFiledownload);
app.use("/api/wargamefiledownload", wargameFileDownLoad);
app.use("/api/myinfo", myinfo);
app.use("/api/users", users);
app.use("/api/LectureFiledownload", LectureFiledownload);

//testasdadsasasdasdasd
/* ROUTERS */

app.use((err, req, res, next) => {
    console.log(err);
    res.status(400).send('{"Error" : "Fail"}');
});
module.exports = app;
