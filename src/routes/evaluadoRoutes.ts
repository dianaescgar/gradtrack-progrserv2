import { Router } from 'express';
import * as evaluadoController from '../controllers/evaluadoController';

const evaluadoRouter: Router = Router();

evaluadoRouter.get('/getallevaluados', evaluadoController.getAllEvaluados);
evaluadoRouter.post('/crearevaluado', evaluadoController.createEvaluado);
evaluadoRouter.patch('/updateevaluado/:id', evaluadoController.modifyEvaluado);
evaluadoRouter.delete('/deleteevaluado', evaluadoController.deleteEvaluado);
evaluadoRouter.get('/getevaluado/:id', evaluadoController.getEvaluadoById);

evaluadoRouter.get('/zonas', evaluadoController.getZonas);
evaluadoRouter.get('/poblaciones/:zonaId', evaluadoController.getPoblacionesByZona);
evaluadoRouter.get('/edadpoblacion/:poblacionId', evaluadoController.getEdadPoblacion);
evaluadoRouter.get('/totalEvaluados/:poblacionId', evaluadoController.getTotalEvaluados);
evaluadoRouter.get('/graduacion/:poblacionId', evaluadoController.getPorcentajeGraduacion);
evaluadoRouter.get('/graduacion/hombres/:poblacionId', evaluadoController.getGraduacionHombres);
evaluadoRouter.get('/graduacion/mujeres/:poblacionId', evaluadoController.getGraduacionMujeres);
evaluadoRouter.get('/nivelAlerta/:poblacionId', evaluadoController.getNivelAlerta);


export default evaluadoRouter;