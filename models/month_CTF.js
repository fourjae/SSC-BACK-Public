const Sequelize = require("sequelize");

module.exports = class month_CTF extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                CTFNumber: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    allowNull: false,
                    autoIncrement: true
                },
                Name: {
                    type: Sequelize.STRING(50),
                    allowNull: false
                },
                Url: {
                    type: Sequelize.STRING(100),
                    allowNull: false
                },
                Date1: {
                    type: Sequelize.STRING(100),
                    allowNull: false
                },
                Date2: {
                    type: Sequelize.STRING(100),
                    allowNull: false
                },
                CTFDescription: {
                    type: Sequelize.STRING(500),
                    allowNull: false
                },
            },
            {
                sequelize,
                timestamps: false,
                underscored: false,
                modelName: "month_CTF",
                tableName: "month_CTF",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci"
            }
        );
    }
    
};
