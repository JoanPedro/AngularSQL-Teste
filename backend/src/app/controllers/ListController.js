import Movie from '../models/Movie'; // Importa o Model padrão de Usuário.

class ListController {
  async index(req, res) {
    const movie = req.params.name;
    // movie = movie.toLowerCase();

    const checkMovie = await Movie.findOne({
      where: { name: movie },
      attributes: ['sinopses', 'actors'],
    });

    if (!checkMovie) {
      res.status(303).json({ error: 'Sorry, movie does not found.' });
    }

    return res.json(checkMovie);
  }
}

export default new ListController();
