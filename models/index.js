const Sequelize = require("sequelize");

const env = "development";
const config = require("../config/config.json")[env];
const db = {};
const user_info = require("./user_info");
const lecture = require("./lecture");
const lecture_data = require("./lecture_data");
const lecture_info = require("./lecture_info");
const lecture_comment = require("./lecture_comment");
const submit_history = require("./submit_history");
const wargame_info = require("./wargame_info");
const solver_table = require("./solver_table");

const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

db.sequelize = sequelize;

db.lecture = lecture;
db.lecture_data = lecture_data;
db.user_info = user_info;
db.lecture_info = lecture_info;
db.lecture_comment = lecture_comment;
db.wargame_info = wargame_info;
db.solver_table = solver_table;
db.submit_history = submit_history;

user_info.init(sequelize);
lecture.init(sequelize);
lecture_data.init(sequelize);
lecture_info.init(sequelize);
lecture_comment.init(sequelize);
wargame_info.init(sequelize);
solver_table.init(sequelize);
submit_history.init(sequelize);

user_info.associate(db);
lecture_comment.associate(db);
lecture.associate(db);
lecture_data.associate(db);
lecture_info.associate(db);
module.exports = db;
