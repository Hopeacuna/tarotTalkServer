const {DataTypes} = require('sequelize')
const db = require('../db')

const User = db.define('user', {
    firstName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING(100),
        // validate:{ isEmail: true},
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING(),
        // validate: {len: [5, 100]},
        allowNull: false
    },
    role: {
        type: DataTypes.ENUM,
        values: ["user", "admin"],
        allownull: false,
        defaultValue: "user"
    }
})

module.exports = User;