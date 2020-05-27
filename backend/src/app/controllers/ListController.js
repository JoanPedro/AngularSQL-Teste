import Movie from '../models/Movie'; // Importa o Model padrão de Usuário.

class ListController {
  async index(req, res) {
    const movie = req.params.name;
    // movie = movie.toLowerCase();

    const checkMovie = await Movie.findOne({
      where: { name: movie },
      attributes: ['id', 'name', 'sinopses', 'actors'],
    });

    if (!checkMovie) {
      res.status(303).json({ error: 'Sorry, movie does not found.' });
    }

    return res.json(checkMovie);
  }

  async update(req, res) {
    const movieId = req.params.id;
    const movie = await Movie.findByPk(movieId);

    if (!movie) {
      return res.status(400).json({ error: 'Movie does not exists' });
    }

    const { id, name, sinopses, actors } = await movie.update(req.body, {
      returning: true,
      plain: true,
    });

    return res.json({
      id,
      name,
      sinopses,
      actors,
    });
  }
}

export default new ListController();
