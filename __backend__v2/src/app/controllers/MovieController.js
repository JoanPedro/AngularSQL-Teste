import Movie from '../models/Movie'; // Importa o Model padrão de Usuário.
import File from '../models/File';
import Actor from '../models/Actor';

class MovieController {
  async store(req, res) {

    const { img ,actors, ...data } = req.body;
    const movie = await Movie.create(data);

    if(actors && actors.length > 0) {
      movie.setActors(actors);
    }

    if(img && img.length > 0) {
      movie.setImg(img)
    }

    return res.status(201).json({msg: "Movie has been create."});
  }

  async index(req, res) {

    const movie = await Movie.findAll({

      attributes: ['id', 'name', 'sinopse', 'img_id'],
      include: [
        {
          model: File,
          as: 'img',
          // Retorna somente name e path do model File.
          /* Como a url depende da variável 'path', é obrigatório incluir o
          retorno de 'path'. */
          attributes: ['name', 'path', 'url'],
        },
        {
          model: Actor,
          as: 'actors',
          through: { attributes: [] },
        }
      ],
    });

    return res.json(movie);
  }
}

export default new MovieController();