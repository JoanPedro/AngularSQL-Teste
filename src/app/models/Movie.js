import Sequelize, { Model } from 'sequelize';

class Movies extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        sinopses: Sequelize.STRING,
        actors: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Movies;
