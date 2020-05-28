module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('pivot', {
      id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      movie_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'movies', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      actor_id: {
        type: Sequelize.INTEGER,
        allowNull: true,
        references: { model: 'actors', key: 'id' },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },
      created_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updated_at: {
        type: Sequelize.DATE,
        allowNull: false,
      },
    });
  },

  down: (queryInterface) => {
    return queryInterface.dropTable('pivot');
  },
};