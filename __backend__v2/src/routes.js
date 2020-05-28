import { Router } from 'express'; // Importa o padrão Router do Express.
import multer from 'multer';
import multerConfig from './config/multer';

const routes = new Router(); // Cria uma nova instância de Router do Express.
const upload = multer(multerConfig);

import MovieController from './app/controllers/MovieController'
import FileController from './app/controllers/FileController'
import ActorController from './app/controllers/ActorController'
//

routes.post('/movies', MovieController.store);
routes.get('/movies', MovieController.index);
//

routes.post('/actors', ActorController.store);

//

routes.post(
  '/files',
  upload.single('file'),
  FileController.store
);

export default routes;