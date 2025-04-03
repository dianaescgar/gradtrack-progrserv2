import { Router } from 'express';
import * as evaluadoController from '../controllers/evaluadoController';

const evaluadoRouter: Router = Router();

evaluadoRouter.get('/getallevaluados', evaluadoController.getAllEvaluados);
evaluadoRouter.post('/crearevaluado', evaluadoController.createEvaluado);
evaluadoRouter.patch('/updateevaluado/:id', evaluadoController.modifyEvaluado);
evaluadoRouter.delete('/deleteevaluado', evaluadoController.deleteEvaluado);
evaluadoRouter.get('/getevaluado/:id', evaluadoController.getEvaluadoById);

export default evaluadoRouter;