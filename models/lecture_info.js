const Sequelize = require("sequelize");

module.exports = class lecture_info extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                LectureInfoID: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true
                },
                LectureTitle: {
                    type: Sequelize.STRING(50),
                    allowNull: false
                },
                LectureDescription: {
                    type: Sequelize.STRING(1000),
                    allowNull: false
                },
                LectureAuthor: {
                    type: Sequelize.STRING(45),
                    allowNull: false
                },
                LectureImg: {
                    type: Sequelize.STRING(200),
                    allowNull: false
                },
                deleted: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: 0
                }
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "lecture_info",
                tableName: "lecture_info",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci"
            }
        );
    }
    static associate(db) {
        db.lecture_info.hasMany(db.lecture, {
            foreignKey: "LectureInfoID",
            sourceKey: "LectureInfoID"
        });
    }
};
