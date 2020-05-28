import Actor from '../models/Actor'; // Importa o Model padrão de Usuário.
import Movie from '../models/Movie';

class ActorController {
  async store(req, res) {

    const actor = req.body;

    const actorCreated = await Actor.create(actor);

    return res.json(actorCreated);
  }

  async index(req, res) {
    const actors = await Actor.findAll({

      attributes: ['id', 'name'],
      include: [
        {
          model: Movie,
          as: 'movies',
          attributes: ['id', 'name'],
          through: { attributes: [] },
        }
      ],
    });

    return res.json(actors);  
  }

  async update(req, res) {

    const { id } = req.params;

    const actor = await Actor.findByPk(id);

    if(!actor) {
      return res.status(400).json({error: 'Actor does not found.'})
    }    

    const { movies, ...data } = req.body;

    if(data.name && !(data.name === actor.name)) {

      const checkActor = await Actor.findOne({ where: { name: data.name }})

      if(checkActor) {
        return res.status(400).json({error: 'Already exists an Actor with this name.'})
      }
    }

    await actor.update(data);

    if(movies && movies.length > 0) {
      actor.setMovies(movies);
    }

    return res.json(actor);
  }

}

export default new ActorController();