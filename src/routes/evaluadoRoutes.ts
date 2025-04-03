import { Router, Request, Response } from 'express'; 
const evaluadoRouter:Router = Router(); 

evaluadoRouter.get('/getallevaluados', (req:Request, res:Response) => { 
    res.send('Obtener lista con todos los evaluados') 
}) 

evaluadoRouter.post('/crearevaluado', (req:Request, res:Response) => {
    res.send(`Crear nuevo evaluado con id ${req.body.id}`)
})

evaluadoRouter.patch('/updateevaluado/:id', (req:Request, res:Response) => {
    res.send(`Actualizar el evaluado con id ${req.params.id} con el nombre "${req.body.nombre}"`)
})

evaluadoRouter.delete('/deleteevaluado', (req:Request, res:Response) => {
    res.send(`Borrar el evaluado con id ${req.body.id}`) 
}) 

evaluadoRouter.get('/getevaluado/:id', (req:Request, res:Response) => { 
    res.send(`Obtener evaluado con id ${req.params.id}`) 
}) 

export default evaluadoRouter;