const Sequelize = require("sequelize");

module.exports = class lecture_comment extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                LectureCommentID: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                LectureID: {
                    type: Sequelize.INTEGER,
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
                LectureCommentContent: {
                    type: Sequelize.STRING(1000),
                    allowNull: true
                },
                LectureCommentType: {
                    type: Sequelize.STRING(100),
                    allowNull: true
                },
                LectureCommentGroup: {
                    type: Sequelize.INTEGER(100),
                    allowNull: true
                },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: true
                },
                updated_at: {
                    type: Sequelize.DATE,
                    allowNull: true
                },
                deleted: {
                    type: Sequelize.TINYINT(10),
                    allowNull: true
                },
                deleted_at: {
                    type: Sequelize.DATE,
                    allowNull: true
                }
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "lecture_comment",
                tableName: "lecture_comment",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci"
            }
        );
    }

    static associate(db) {
        db.lecture_comment.belongsTo(db.lecture, {
            foreignKey: "LectureID",
            sourceKey: "LectureID"
        });
        db.lecture_comment.belongsTo(db.user_info, {
            foreignKey: "ID",
            sourceKey: "ID"
        });
    }
};
