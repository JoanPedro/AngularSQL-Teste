import Sequelize, { Model } from 'sequelize';

class Movies extends Model {
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        sinopses: Sequelize.STRING,
        actors: Sequelize.STRING,
        deleted_at: Sequelize.DATE,
      },
      {
        sequelize,
      }
    );
    return this;
  }
}

export default Movies;
