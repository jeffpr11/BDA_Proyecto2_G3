'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bookingdetails extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  bookingdetails.init({
    bookingid: DataTypes.INTEGER,
    passid: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'bookingdetails',
  });
  return bookingdetails;
};