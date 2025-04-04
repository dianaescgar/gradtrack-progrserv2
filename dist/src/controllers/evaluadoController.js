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
exports.deleteEvaluado = exports.modifyEvaluado = exports.getEvaluadoById = exports.getAllEvaluados = exports.createEvaluado = void 0;
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
