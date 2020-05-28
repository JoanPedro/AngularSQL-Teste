import Sequelize, { Model } from 'sequelize';

class Actor extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        sinopse: Sequelize.STRING,
        deleted_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );

    return this;
  }

  static associate(models) {
    this.belongsToMany(models.Movie, { 
      through: 'pivot',
      as: 'movies',
      foreignKey: 'actor_id',    
    })
  }
}

export default Actor;