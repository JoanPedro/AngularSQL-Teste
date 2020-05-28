import Actor from '../models/Actor'; // Importa o Model padrão de Usuário.

class ActorController {
  async store(req, res) {

    const actor = req.body;

    const actorCreated = await Actor.create(actor);

    return res.json(actorCreated);
  }
}

export default new ActorController();