"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getNivelAlerta = exports.getGraduacionMujeres = exports.getGraduacionHombres = exports.getPorcentajeGraduacion = exports.getTotalEvaluados = exports.getEdadPoblacion = exports.getPoblacionesByZona = exports.getZonas = exports.deleteEvaluado = exports.modifyEvaluado = exports.getEvaluadoById = exports.getAllEvaluados = exports.createEvaluado = void 0;
const evaluado_1 = require("../models/evaluado");
const poblacion_1 = require("../models/poblacion");
const zona_1 = require("../models/zona");
const createEvaluado = (req, res) => {
    if (!req.body) {
        res.status(400).json({
            status: "error",
            message: "El contenido no puede estar vacío",
            payload: null,
        });
        return;
    }
    const evaluado = Object.assign({}, req.body);
    evaluado_1.Evaluado.create(evaluado)
        .then((data) => {
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
exports.createEvaluado = createEvaluado;
const getAllEvaluados = (req, res) => {
    evaluado_1.Evaluado.findAll({
        include: [
            {
                model: poblacion_1.Poblacion,
                include: [{
                        model: zona_1.Zona,
                    }],
            },
        ],
    })
        .then((data) => {
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
exports.getAllEvaluados = getAllEvaluados;
const getEvaluadoById = (req, res) => {
    evaluado_1.Evaluado.findByPk(req.params.id, {
        include: [
            {
                model: poblacion_1.Poblacion,
                include: [{
                        model: zona_1.Zona
                    }],
            },
        ],
    })
        .then((data) => {
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
exports.getEvaluadoById = getEvaluadoById;
const modifyEvaluado = (req, res) => {
    if (!req.body) {
        res.status(400).json({
            status: "error",
            message: "El contenido no puede estar vacío.",
            payload: null,
        });
        return;
    }
    evaluado_1.Evaluado.update(Object.assign({}, req.body), { where: { id: req.params.id } })
        .then(([affectedRows]) => {
        if (affectedRows > 0) {
            res.status(200).json({
                status: "success",
                message: "Evaluado actualizado con éxito",
                payload: Object.assign({}, req.body),
            });
        }
        else {
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
exports.modifyEvaluado = modifyEvaluado;
const deleteEvaluado = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.body;
    try {
        yield evaluado_1.Evaluado.destroy({ where: { id } });
        res.status(200).json({ message: "Evaluado eliminado con éxito" });
    }
    catch (error) {
        res.status(500).json({
            message: "Error al eliminar el evaluado",
            error,
        });
    }
});
exports.deleteEvaluado = deleteEvaluado;
const getZonas = (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const zonas = yield zona_1.Zona.findAll();
        const zonasFiltradas = zonas.map(zona => ({
            id: zona.id,
            nombre: zona.nombre,
            estado: zona.estado,
        }));
        res.status(200).json({ status: "success", payload: zonasFiltradas });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ status: "error", message: err.message });
    }
});
exports.getZonas = getZonas;
const getPoblacionesByZona = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poblaciones = yield poblacion_1.Poblacion.findAll({ where: { zonaId: req.params.zonaId } });
        const filtradas = poblaciones.map(poblacion => ({
            id: poblacion.id,
            edad: poblacion.edad,
            nivelSocioeconomico: poblacion.nivelSocioeconomico,
            zonaId: poblacion.zonaId,
        }));
        res.status(200).json({ status: "success", payload: filtradas });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ status: "error", message: err.message });
    }
});
exports.getPoblacionesByZona = getPoblacionesByZona;
const getEdadPoblacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const poblacion = yield poblacion_1.Poblacion.findByPk(req.params.poblacionId);
        res.status(200).json({ status: "success", edad: poblacion === null || poblacion === void 0 ? void 0 : poblacion.edad });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ status: "error", message: err.message });
    }
});
exports.getEdadPoblacion = getEdadPoblacion;
const getTotalEvaluados = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const total = yield evaluado_1.Evaluado.count({ where: { poblacionId: req.params.poblacionId } });
        res.status(200).json({ status: "success", total });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ status: "error", message: err.message });
    }
});
exports.getTotalEvaluados = getTotalEvaluados;
const getPorcentajeGraduacion = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const total = yield evaluado_1.Evaluado.count({ where: { poblacionId: req.params.poblacionId } });
        const graduados = yield evaluado_1.Evaluado.count({ where: { poblacionId: req.params.poblacionId, graduado: "SI" } });
        const porcentajeGraduados = total ? (graduados / total) * 100 : 0;
        res.status(200).json({
            status: "success",
            graduados: porcentajeGraduados,
            noGraduados: 100 - porcentajeGraduados,
        });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ status: "error", message: err.message });
    }
});
exports.getPorcentajeGraduacion = getPorcentajeGraduacion;
const getGraduacionHombres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const hombres = yield evaluado_1.Evaluado.findAll({
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
    }
    catch (error) {
        const err = error;
        res.status(500).json({ status: "error", message: err.message });
    }
});
exports.getGraduacionHombres = getGraduacionHombres;
const getGraduacionMujeres = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const mujeres = yield evaluado_1.Evaluado.findAll({
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
    }
    catch (error) {
        const err = error;
        res.status(500).json({ status: "error", message: err.message });
    }
});
exports.getGraduacionMujeres = getGraduacionMujeres;
const getNivelAlerta = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const total = yield evaluado_1.Evaluado.count({ where: { poblacionId: req.params.poblacionId } });
        const graduados = yield evaluado_1.Evaluado.count({ where: { poblacionId: req.params.poblacionId, graduado: "SI" } });
        const porcentaje = total ? (graduados / total) * 100 : 0;
        let nivel = '';
        if (porcentaje < 20)
            nivel = 'Grave';
        else if (porcentaje < 50)
            nivel = 'Alto';
        else if (porcentaje < 80)
            nivel = 'Bajo';
        else
            nivel = 'Muy Bajo';
        res.status(200).json({ status: "success", nivel });
    }
    catch (error) {
        const err = error;
        res.status(500).json({ status: "error", message: err.message });
    }
});
exports.getNivelAlerta = getNivelAlerta;
