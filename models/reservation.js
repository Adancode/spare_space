'use strict';
module.exports = function(sequelize, DataTypes) {
  var Reservation = sequelize.define('Reservation', {
    address: DataTypes.STRING,
    ownerFirst: DataTypes.STRING,
    ownerLast: DataTypes.STRING,
    ownerEmail: DataTypes.STRING,
    city: DataTypes.STRING,
    state: DataTypes.STRING,
    zipcode: DataTypes.STRING,
    description: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    from: DataTypes.DATE,
    to: DataTypes.DATE,
    status: DataTypes.BOOLEAN,
    name: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        Reservation.belongsTo(models.User);
        // associations can be defined here
      }
    }
  });
  return Reservation;
};