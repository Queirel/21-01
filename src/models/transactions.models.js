const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");

const Transactions = sequelize.define('transactions', {
    trans_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    trans_prod_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    trans_buy_user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    trans_prod_quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
}, { timestamps: true })

module.exports = Transactions