const { DataTypes} = require('sequelize');
const db = require('../db')

const Journal = db.define("journal", {
    drawnCard: {
      type: DataTypes.STRING,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reflection: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date: {
      type: DataTypes.DATEONLY,
    }
  });
  
  module.exports = Journal;