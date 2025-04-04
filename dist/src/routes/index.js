"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const evaluadoRoutes_1 = __importDefault(require("./evaluadoRoutes"));
const apiRouter = (0, express_1.Router)();
apiRouter.use('/evaluados', evaluadoRoutes_1.default);
apiRouter.get('/', (req, res) => {
    res.send('Estas en la ruta raíz de la API');
});
exports.default = apiRouter;
