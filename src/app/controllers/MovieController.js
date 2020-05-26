import Movie from '../models/Movie'; // Importa o Model padrão de Usuário.

class MovieController {
  async store(req, res) {
    let movieInfo = { ...req.body };

    movieInfo = JSON.parse(
      JSON.stringify(movieInfo, (a, b) => {
        return typeof b === 'string' ? b.toLowerCase() : b;
      })
    );

    const MovieExists = await Movie.findOne({
      where: { name: movieInfo.name },
    });

    if (MovieExists) {
      return res.status(400).json({ error: 'Movie alredy exists.' });
    }

    const { name, sinopses, actors } = await Movie.create(movieInfo);
    const actorsArray = actors.split('; ');

    return res.json({
      name,
      sinopses,
      actors: actorsArray,
    });
  }

  async index(req, res) {
    const checkMovie = await Movie.findAll({
      attributes: ['name', 'sinopses', 'actors'],
    });

    if (!checkMovie) {
      res.status(401).json({ error: 'There are not movies.' });
    }

    return res.json(checkMovie);
  }
}

export default new MovieController();
