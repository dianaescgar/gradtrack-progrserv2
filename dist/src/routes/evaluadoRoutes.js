"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const evaluadoController = __importStar(require("../controllers/evaluadoController"));
const evaluadoRouter = (0, express_1.Router)();
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
exports.default = evaluadoRouter;
