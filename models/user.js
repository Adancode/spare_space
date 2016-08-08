'use strict';
module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    googleId: DataTypes.STRING,
    token: DataTypes.STRING,
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    pic: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        User.hasMany(models.Space);
      }
    }
  });
  return User;
};