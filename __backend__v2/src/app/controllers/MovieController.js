import Movie from '../models/Movie'; // Importa o Model padrão de Usuário.
import File from '../models/File';
import Actor from '../models/Actor';

class MovieController {
  async store(req, res) {

    const { img ,actors, ...data } = req.body;

    if(!data) {
      return res.status(400).json({error: 'No movie has been informed.'});
    }

    const checkMovie = Movie.findOne({ where: { name: data.name }});

    if(checkMovie === null) {
      return res.status(400).json({error: 'The movie already exists.'})
    }

    const movie = await Movie.create(data);

    if(actors && actors.length > 0) {
      movie.setActors(actors);
    }

    if(img && img.length > 0) {
      movie.setImg(img);
    }

    return res.status(201).json({msg: "Movie has been create."});
  }

  async index(req, res) {

    const movie = await Movie.findAll({

      attributes: ['id', 'name', 'sinopse'],
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
          attributes: ['id', 'name'],
          through: { attributes: [] },
        }
      ],
    });

    return res.json(movie);
  }

  async update(req, res) {
    const { id } = req.params;

    const movie = await Movie.findByPk(id);

    if(!movie) {
      return res.status(400).json({error: 'Movie does not found.'})
    }    

    const { img, actors, ...data } = req.body;

    if(data.name && !(data.name === movie.name)) {

      const checkMovie = await Movie.findOne({ where: {name: data.name }})

      if(checkMovie) {
        return res.status(400).json({error: 'Already exists a movie with this name.'})
      }
    }
    await movie.update(data);

    if(actors && actors.length > 0) {
      movie.setActors(actors);
    }

    if(img && img.length > 0) {
      movie.setImg(img);
    }

    return res.json(movie);
  }
}

export default new MovieController();