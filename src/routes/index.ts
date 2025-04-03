import { Router, Request, Response } from 'express'; 
import evaluadoRoutes from './evaluadoRoutes'; 
 
const apiRouter:Router = Router(); 
 
apiRouter.use('/evaluados', evaluadoRoutes); 
 
apiRouter.get('/', (req:Request, res: Response) => { 
 res.send('Estas en la ruta raíz de la API') 
}) 
 
export default apiRouter;