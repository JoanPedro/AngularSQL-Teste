import express from 'express';
import MovieController from './app/controllers/MovieController';
import ListController from './app/controllers/ListController';

const routes = express.Router();

// Configurar as rotas

routes.post('/movies', MovieController.store);
routes.get('/movies', MovieController.index);
routes.put('/movies', MovieController.update);

routes.get('/movie/:name', ListController.index);
export default routes;
