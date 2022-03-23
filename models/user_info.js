const Sequelize = require("sequelize");

module.exports = class user_info extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                UserNumber: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    autoIncrement: true
                },
                ID: {
                    type: Sequelize.STRING(20),
                    primaryKey: true,
                    allowNull: false
                },
                PassWord: {
                    type: Sequelize.STRING(255),
                    allowNull: false
                },
                Nick: {
                    type: Sequelize.STRING(45),
                    allowNull: false,
                    unique: true
                },
                Name: {
                    type: Sequelize.STRING(50),
                    allowNull: false
                },
                Belong: {
                    type: Sequelize.STRING(50),
                    allowNull: false
                },
                StudentID: {
                    type: Sequelize.STRING(50),
                    allowNull: false
                },
                Email: {
                    type: Sequelize.STRING(50),
                    allowNull: false,
                    unique: true
                },
                Name: {
                    type: Sequelize.STRING(50),
                    allowNull: false,
                    unique: true
                },
                StudentID: {
                    type: Sequelize.STRING(50),
                    allowNull: false,
                    unique: true
                },
                Belong: {
                    type: Sequelize.STRING(50),
                    allowNull: true,
                    unique: true
                },
                profilepicture: {
                    type: Sequelize.STRING(1000),
                    allowNull: false,
                    defaultValue: "/default.png"
                },
                LastIp: {
                    type: Sequelize.STRING(50),
                    allowNull: false
                },
                Comment: {
                    type: Sequelize.STRING(200),
                    allowNull: true,
                    defaultValue: "자기 소개를 해주세요."
                },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: true,
                    defaultValue: "0"
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
                },
                Score: {
                    type: Sequelize.INTEGER,
                    allownull: false,
                    defaultValue: 0
                },
                permit: {
                    type: Sequelize.INTEGER,
                    allownull: false,
                    defaultValue: 0
                },
                solved_at: {
                    type: Sequelize.DATE,
                    allowNull: true,
                    defaultValue: null
                }
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "user_info",
                tableName: "user_info",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci"
            }
        );
    }
    static associate(db) {
        db.user_info.hasOne(db.lecture_comment, {
            foreignKey: "ID",
            sourceKey: "ID"
        });
        db.user_info.hasMany(db.solver_table, {
            foreignKey: "ID",
            sourceKey: "ID"
        });
    }
};
