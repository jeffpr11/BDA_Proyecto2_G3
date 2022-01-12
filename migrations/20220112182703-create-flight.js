'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('flights', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      flightid: {
        type: Sequelize.INTEGER
      },
      flightsource: {
        type: Sequelize.STRING
      },
      flightdest: {
        type: Sequelize.STRING
      },
      flightdate: {
        type: Sequelize.DATE
      },
      flightseat: {
        type: Sequelize.INTEGER
      },
      ticketcost: {
        type: Sequelize.DOUBLE
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('flights');
  }
};