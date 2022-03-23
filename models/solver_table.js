const Sequelize = require("sequelize");

module.exports = class solver_table extends Sequelize.Model {
    static init(sequelize) {
        return super.init(
            {
                SolverID: {
                    type: Sequelize.INTEGER,
                    primaryKey: true,
                    allowNull: true
                },
                ChID: {
                    type: Sequelize.INTEGER(20),
                    allowNull: false
                },
                ID: {
                    type: Sequelize.STRING(30),
                    allowNull: false
                },
                Nick: {
                    type: Sequelize.STRING(45),
                    allowNull: false,
                    unique: true
                },
                ChCategory: {
                    type: Sequelize.STRING(45),
                    allowNull: false
                },
                ChIDNick :{
                    type:Sequelize.STRING(50),
                    allowNull:false
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
                modelName: "solver_table",
                tableName: "solver_table",
                paranoid: false,
                charset: "utf8mb4",
                collate: "utf8mb4_general_ci"
            }
        );
    }

    static associate(db) {
        db.solver_table.belongsTo(db.user_info, {
            foreignKey: "ID",
            sourceKey: "ID"
        });
    }
};
