const { DataTypes } = require("sequelize");
const sequelize = require("../database/db");
const Transactions = require("./transactions.models");

const Products = sequelize.define('products', {
    prod_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        unique: true
    },
    prod_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate:{
            isAlpha:{
                args: true,
                msg: "must be only letters"
            }
        },
        defaultValue: 1
    },
    prod_user_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
    },
    prod_price: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate:{
            min: {
                args: 1,
                msg: "must be more than 0"
            },
        },
        defaultValue: 1
    },
    prod_stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
            min: {
                args: 1,
                msg: "there has to be at least 1"
            }
        }
    },
    prod_category: {
        type: DataTypes.ENUM('electronics', 'toys', 'tools', 'fashion'),
        allowNull: false
    }
}, { timestamps: true })

Products.hasMany(Transactions, {
    foreignKey: 'trans_sell_user_id',
    sourceKey: 'prod_user_id'
})

Transactions.belongsTo(Products, {
    foreignKey: 'trans_sell_user_id',
    targetId: 'prod_user_id'
})

Products.hasMany(Transactions, {
    foreignKey: 'trans_prod_id',
    sourceKey: 'prod_id'
})

Transactions.belongsTo(Products, {
    foreignKey: 'trans_prod_id',
    targetId: 'prod_id'
})

module.exports = Products