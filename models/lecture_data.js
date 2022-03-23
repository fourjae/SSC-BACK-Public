const Sequelize = require("sequelize");

module.exports = class lecture_data extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                LectureDataID: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true
                },
                LectureID: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                ID: {
                    type: Sequelize.STRING(20),
                    allowNull: false
                },
                FileName: {
                    type: Sequelize.STRING(255),
                    allowNull: false
                },
                URL: {
                    type: Sequelize.STRING(500),
                    allowNull: false
                },
                deleted: {
                    type: Sequelize.TINYINT,
                    allowNull: false,
                    defaultValue: 0
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
                modelName: "lecture_data",
                tableName: "lecture_data",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci"
            }
        );
    }
    static associate(db) {
        db.lecture_data.belongsTo(db.lecture, { foreignKey: "LectureID", sourceKey: "LectureID" });
    }
};
