const { DataTypes} = require('sequelize');
const db = require('../db')

const Card = db.define("card", {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    keywords: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    deck: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    major: {
      type: DataTypes.BOOLEAN,
    },
    numeral: {
      type: DataTypes.STRING,
    }
  });
  
  module.exports = Card;