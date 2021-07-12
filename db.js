const Sequelize = require('sequelize');

const sequelize = new Sequelize("postgres://postgres:password@localhost:5432/tarot");

// const sequelize = new Sequelize(process.env.DATABASE_URL, {
//     dialect: 'postgres',
//     ssl: process.env.ENVIRONMENT === 'production'
// });



module.exports = sequelize;