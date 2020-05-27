import Movie from '../models/Movie'; // Importa o Model padrão de Usuário.

class MovieController {
  async store(req, res) {
    const movieInfo = { ...req.body };
    // console.log(movieInfo);
    // movieInfo = JSON.parse(
    //   JSON.stringify(movieInfo, (a, b) => {
    //     return typeof b === 'string' ? b.toLowerCase() : b;
    //   })
    // );

    const MovieExists = await Movie.findOne({
      where: { name: movieInfo.name, deleted_at: null },
    });

    if (MovieExists) {
      return res.status(400).json({ error: 'Movie alredy exists.' });
    }

    const { id, name, sinopses, actors } = await Movie.create(movieInfo);
    const actorsArray = actors.split('; ');

    return res.json({
      id,
      name,
      sinopses,
      actors: actorsArray,
    });
  }

  async index(req, res) {
    const checkMovie = await Movie.findAll({
      where: { deleted_at: null },
      attributes: ['id', 'name', 'sinopses', 'actors'],
    });

    if (checkMovie.length === 0) {
      res.status(303).json({ error: 'There are not movies.' });
    }

    return res.json(checkMovie);
  }

  async update(req, res) {
    const oldMovie = { ...req.body };

    const movie = await Movie.findOne({
      where: { name: oldMovie.name, deleted_at: null },
    });

    if (oldMovie.name !== movie.name) {
      const movieExists = await Movie.findOne({
        where: { name: oldMovie.name },
      });

      if (movieExists) {
        return res.status(400).json({ error: 'Movie alredy exists.' });
      }
    }

    const { id, name, sinopses, actors } = await movie.update(oldMovie);

    return res.json({
      id,
      name,
      sinopses,
      actors,
    });
  }
}

export default new MovieController();
