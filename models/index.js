const db = require('../db')
const UserModel = require('./user');
const CardModel = require('./card');
const ReflectionModel = require('./reflection')

// ReflectionModel.belongsTo(UserModel);
ReflectionModel.hasMany(CardModel);                                                                                                                                                                                                                                                                                                             

module.exports = {
    dbConnection: db,
    UserModel,
    CardModel,
    ReflectionModel
};
