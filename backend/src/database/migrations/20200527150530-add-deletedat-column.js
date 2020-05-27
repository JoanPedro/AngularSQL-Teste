module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.addColumn('movies', 'deleted_at', {
      type: Sequelize.DATE,
      allowNull: true,
      default: null,
    });
  },

  down: (queryInterface) => {
    return queryInterface.removeColumn('movies', 'deleted_at');
  },
};
