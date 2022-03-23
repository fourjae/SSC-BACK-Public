const Sequelize = require("sequelize");

module.exports = class wargame_info extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                ChID: {
                    type: Sequelize.INTEGER(20),
                    autoIncrement: true,
                    primaryKey: true,
                    allowNull: true
                },
                ChCategory: {
                    type: Sequelize.STRING(45),
                    allowNull: false
                },
                ChTitle: {
                    type: Sequelize.STRING(100),
                    allowNull: false
                },
                ChDescription: {
                    type: Sequelize.STRING(2000),
                    allowNull: false
                },
                ChDirectory: {
                    type: Sequelize.STRING(1000),
                    allowNull: true
                },
                ChScore: {
                    type: Sequelize.INTEGER(20),
                    allowNull: false
                },
                ChSolver: {
                    type: Sequelize.INTEGER(20),
                    allowNull: true
                    //defaultValue: 0,
                },
                ChLevel: {
                    type: Sequelize.INTEGER,
                    allowNull: false
                },
                ChAuthor: {
                    type: Sequelize.STRING(45),
                    allowNull: false
                },
                ChFlag: {
                    type: Sequelize.STRING(200),
                    allowNull: false
                },
                ChSalt: {
                    type: Sequelize.STRING(200),
                    allowNull: false
                },
                deleted: {
                    type: Sequelize.INTEGER,
                    defaultValue: 0
                },
                deleted_at: {
                    type: Sequelize.DATE,
                    defaultValue: 0
                },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: true
                }
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "wargame_info",
                tableName: "wargame_info",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci"
            }
        );
    }

    //   static associate(db) {
    //     db.User.hasMany(db.Comment, { foreignKey: 'commenter', sourceKey: 'id' });
    //   }
};
