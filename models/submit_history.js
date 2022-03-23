const Sequelize = require("sequelize");

module.exports = class submit_history extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                SubmitID: {
                    type: Sequelize.INTEGER,
                    autoIncrement: true,
                    primaryKey: true
                },
                ID: {
                    type: Sequelize.STRING(20),
                    allowNull: false
                },
                ChID: {
                    type: Sequelize.INTEGER(20),
                    allowNull: false
                },
                Contents: {
                    type: Sequelize.STRING(100),
                    allowNull: false
                },
                created_at: {
                    type: Sequelize.DATE,
                    allowNull: false
                }
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "submit_history",
                tableName: "submit_history",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci"
            }
        );
    }
};
