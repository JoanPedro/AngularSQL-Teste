import Sequelize, { Model } from 'sequelize';

class Movie extends Model {
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

    this.belongsTo(models.File, { foreignKey: 'img_id', as: 'img' });
    this.belongsToMany(models.Actor, { 
      through: 'pivot',
      as: 'actors',
      foreignKey: 'movie_id',    
    })
  }
}

export default Movie;