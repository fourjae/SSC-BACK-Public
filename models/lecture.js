const Sequelize = require("sequelize");

module.exports = class lecture extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                LectureID: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true
                },
                LectureInfoID: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                LectureTitle: {
                    type: Sequelize.STRING(45),
                    allowNull: false
                },
                ID: {
                    type: Sequelize.STRING(20),
                    allowNull: false
                },
                Nick: {
                    type: Sequelize.STRING(45),
                    allowNull: false
                },
                LectureContent: {
                    type: Sequelize.STRING(3000),
                    allowNull: false
                },
                LectureViews: {
                    type: Sequelize.INTEGER,
                    allowNull: false,
                    defaultValue: "0"
                },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: true,
                    defaultValue: null
                },
                updated_at: {
                    type: Sequelize.DATE,
                    allowNull: true,
                    defaultValue: null
                },
                deleted: {
                    type: Sequelize.TINYINT,
                    allowNull: false,
                    defaultValue: 0
                },
                deleted_at: {
                    type: Sequelize.DATE,
                    allowNull: true,
                    defaultValue: null
                }
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "lecture",
                tableName: "lecture",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci"
            }
        );
    }
    static associate(db) {
        db.lecture.hasMany(db.lecture_data, { foreignKey: "LectureID", sourceKey: "LectureID" });
        db.lecture_data.belongsTo(db.lecture, { foreignKey: "LectureInfoID", sourceKey: "LectureInfoID" });
    }
};
