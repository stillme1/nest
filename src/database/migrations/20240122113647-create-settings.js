'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.createTable('settings', {
      id: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      name: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      data_type: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      value: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      account_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: { model: 'accounts', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
      },
      deletedAt: {
        type: Sequelize.DATE,
        allowNull: true,
      },
    });
  },

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  down: async (queryInterface, Sequelize) => {
    return queryInterface.dropTable('settings');
  },
};
