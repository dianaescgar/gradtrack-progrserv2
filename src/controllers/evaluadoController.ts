import { RequestHandler, Request, Response } from 'express'; 
import { Evaluado } from '../models/evaluado'; 
import { Poblacion } from '../models/poblacion'; 
import { Zona } from '../models/zona'; 

export const createEvaluado: RequestHandler = (req: Request, res: Response): void => {
  if (!req.body) {
      res.status(400).json({
      status: "error",
      message: "El contenido no puede estar vacío",
      payload: null,
    });
    return;
  }

  const evaluado = { ...req.body };
  Evaluado.create(evaluado)
    .then((data: Evaluado | null) => {
      res.status(201).json({
        status: "success",
        message: "Evaluado creado con éxito",
        payload: data,
      });
    })
    .catch((err) => {
      res.status(500).json({
        status: "error",
        message: "Algo ocurrió al crear el evaluado. " + err.message,
        payload: null,
      });
    });
};

export const getAllEvaluados: RequestHandler = (req: Request, res: Response) => {
  Evaluado.findAll({
    include: [
      {
        model: Poblacion,
        include: [{
          model: Zona,
        }],
      },
    ],
  })
    .then((data: Evaluado[]) => {
      return res.status(200).json({
        status: "success",
        message: "Evaluados obtenidos con éxito",
        payload: data,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        message: "Algo ocurrió al obtener los evaluados. " + err.message,
        payload: null,
      });
    });
};

export const getEvaluadoById: RequestHandler = (req: Request, res: Response) => {
  Evaluado.findByPk(req.params.id, {
    include: [
      {
        model: Poblacion,
        include: [{
          model: Zona
        }],
      },
    ],
  })
    .then((data: Evaluado | null) => {
      return res.status(200).json({
        status: "success",
        message: "Evaluado obtenido con éxito",
        payload: data,
      });
    })
    .catch((err) => {
      return res.status(500).json({
        status: "error",
        message: "Algo ocurrió al obtener el evaluado. " + err.message,
        payload: null,
      });
    });
};


export const modifyEvaluado: RequestHandler = (req: Request, res: Response): void => {
if (!req.body) {
  res.status(400).json({
    status: "error",
    message: "El contenido no puede estar vacío.",
    payload: null,
  });
  return;  
}


Evaluado.update({ ...req.body }, { where: { id: req.params.id } })
  .then(([affectedRows]) => {  
    if (affectedRows > 0) {  
      res.status(200).json({
        status: "success",
        message: "Evaluado actualizado con éxito",
        payload: { ...req.body },
      });    
    } else {
      res.status(500).json({
        status: "error",
        message: "Algo ocurrió al actualizar el evaluado.",
        payload: null,
      });
    }
  })
  .catch((err) => {
    res.status(500).json({
      status: "error",
      message: "Algo ocurrió al actualizar el evaluado. " + err.message,
      payload: null,      
    });
  });
};


export const deleteEvaluado: RequestHandler = async (req: Request, res: Response): Promise<void> => {
const { id } = req.body;
try {
  await Evaluado.destroy({ where: { id } });
  res.status(200).json({ message: "Evaluado eliminado con éxito" });
} catch (error) {
  res.status(500).json({
    message: "Error al eliminar el evaluado",
    error,
  });
}
};
