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

export const getZonas: RequestHandler = async (_req, res) => {
  try {
    const zonas = await Zona.findAll();

    const zonasFiltradas = zonas.map(zona => ({
      id: zona.id,
      nombre: zona.nombre,
      estado: zona.estado,
    }));

    res.status(200).json({ status: "success", payload: zonasFiltradas });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const getPoblacionesByZona: RequestHandler = async (req, res) => {
  try {
    const poblaciones = await Poblacion.findAll({ where: { zonaId: req.params.zonaId } });

    const filtradas = poblaciones.map(poblacion => ({
      id: poblacion.id,
      edad: poblacion.edad,
      nivelSocioeconomico: poblacion.nivelSocioeconomico,
      zonaId: poblacion.zonaId,
    }));

    res.status(200).json({ status: "success", payload: filtradas });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ status: "error", message: err.message });
  }
};


export const getEdadPoblacion: RequestHandler = async (req, res) => {
  try {
    const poblacion = await Poblacion.findByPk(req.params.poblacionId);
    res.status(200).json({ status: "success", edad: poblacion?.edad });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const getTotalEvaluados: RequestHandler = async (req, res) => {
  try {
    const total = await Evaluado.count({ where: { poblacionId: req.params.poblacionId } });
    res.status(200).json({ status: "success", total });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const getPorcentajeGraduacion: RequestHandler = async (req, res) => {
  try {
    const total = await Evaluado.count({ where: { poblacionId: req.params.poblacionId } });
    const graduados = await Evaluado.count({ where: { poblacionId: req.params.poblacionId, graduado: "SI"} });
    const porcentajeGraduados = total ? (graduados / total) * 100 : 0;
    res.status(200).json({
      status: "success",
      graduados: porcentajeGraduados,
      noGraduados: 100 - porcentajeGraduados,
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const getGraduacionHombres: RequestHandler = async (req, res): Promise<void> => {
  try {
    const hombres = await Evaluado.findAll({
      where: { poblacionId: req.params.poblacionId, genero: 'Hombre' }
    });

    const totalHombres = hombres.length;
    
    if (totalHombres === 0) {
      res.status(200).json({
        status: "success",
        totalHombres,
        porcentajeGraduados: 0,
        porcentajeNoGraduados: 0
      });
      return; 
    }

    const graduados = hombres.filter(e => e.graduado === "SI").length;
    const noGraduados = totalHombres - graduados;

    const porcentajeGraduados = (graduados / totalHombres) * 100 || 0;
    const porcentajeNoGraduados = (noGraduados / totalHombres) * 100 || 0;

    res.status(200).json({
      status: "success",
      totalHombres,
      porcentajeGraduados,
      porcentajeNoGraduados
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ status: "error", message: err.message });
  }
};

export const getGraduacionMujeres: RequestHandler = async (req, res): Promise<void> => {
  try {
    const mujeres = await Evaluado.findAll({
      where: { poblacionId: req.params.poblacionId, genero: 'Mujer' }
    });

    const totalMujeres = mujeres.length;

    if (totalMujeres === 0) {
      res.status(200).json({
        status: "success",
        totalMujeres,
        porcentajeGraduados: 0,
        porcentajeNoGraduados: 0
      });
      return; 
    }

    const graduados = mujeres.filter(e => e.graduado === "SI").length;
    const noGraduados = totalMujeres - graduados;

    const porcentajeGraduados = (graduados / totalMujeres) * 100 || 0;
    const porcentajeNoGraduados = (noGraduados / totalMujeres) * 100 || 0;

    res.status(200).json({
      status: "success",
      totalMujeres,
      porcentajeGraduados,
      porcentajeNoGraduados
    });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ status: "error", message: err.message });
  }
};


export const getNivelAlerta: RequestHandler = async (req, res) => {
  try {
    const total = await Evaluado.count({ where: { poblacionId: req.params.poblacionId } });
    const graduados = await Evaluado.count({ where: { poblacionId: req.params.poblacionId, graduado: "SI" } });
    const porcentaje = total ? (graduados / total) * 100 : 0;

    let nivel = '';
    if (porcentaje < 20) nivel = 'Grave';
    else if (porcentaje < 50) nivel = 'Alto';
    else if (porcentaje < 80) nivel = 'Bajo';
    else nivel = 'Muy Bajo';

    res.status(200).json({ status: "success", nivel });
  } catch (error) {
    const err = error as Error;
    res.status(500).json({ status: "error", message: err.message });
  }
};
