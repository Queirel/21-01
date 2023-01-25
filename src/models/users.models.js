const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const Products = require("./products.models");
const Transactions = require("./transactions.models");

const Users = sequelize.define('users', {
    user_id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        unique: true,
        primaryKey: true
    },
    user_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isAlpha: {
                msg: "User name must only contain letters"
            },
            len:{
                args:[2,255],
                msg: "User name lenght must be between 2 and 255 characters"
            }
        }
    },
    user_password: {
        type: DataTypes.STRING,
        allowNull: false,
        len:{
            args:[2,255],
            msg: "Password must be between 2 and 255 characters"
        }
    },
    user_role: {
        type: DataTypes.ENUM('admin', 'user'),
        allowNull: false
    }
}, { timestamps: true })

Users.hasMany(Products, {
    foreignKey: 'prod_user_id',
    sourceKey: 'user_id'
})

Products.belongsTo(Users, {
    foreignKey: 'prod_user_id',
    targetId: 'user_id'
})

Users.hasMany(Transactions, {
    foreignKey: 'trans_buy_user_id',
    sourceKey: 'user_id'
})

Transactions.belongsTo(Users, {
    foreignKey: 'trans_buy_user_id',
    targetId: 'user_id'
})

module.exports = Users