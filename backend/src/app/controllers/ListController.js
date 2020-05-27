import Movie from '../models/Movie'; // Importa o Model padrão de Usuário.

class ListController {
  async index(req, res) {
    const movieId = req.params.id;
    // movie = movie.toLowerCase();

    const checkMovie = await Movie.findByPk(movieId, {
      where: { deleted_at: null },
    });

    if (!checkMovie) {
      res.status(303).json({ error: 'Sorry, movie does not found.' });
    }

    return res.json(checkMovie);
  }

  async update(req, res) {
    const movieId = req.params.id;
    const movie = await Movie.findByPk(movieId, {
      where: { deleted_at: null },
    });

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

  async delete(req, res) {
    const movieId = req.params.id;
    const movie = await Movie.findByPk(movieId, {
      where: { deleted_at: null },
    });

    if (!movie) {
      return res.status(404).json({ error: 'Movie does not exists' });
    }

    movie.deleted_at = new Date();

    const { name, deleted_at } = await movie.save();

    return res.json({
      name,
      deleted_at,
    });
  }
}

export default new ListController();
