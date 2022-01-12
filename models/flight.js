'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class flight extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  flight.init({
    flightid: DataTypes.INTEGER,
    flightsource: DataTypes.STRING,
    flightdest: DataTypes.STRING,
    flightdate: DataTypes.DATE,
    flightseat: DataTypes.INTEGER,
    ticketcost: DataTypes.DOUBLE
  }, {
    sequelize,
    modelName: 'flight',
  });
  return flight;
};