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
const sequelize_typescript_1 = require("sequelize-typescript");
const evaluado_1 = require("../models/evaluado");
const poblacion_1 = require("../models/poblacion");
const zona_1 = require("../models/zona");
const connection = new sequelize_typescript_1.Sequelize({
    database: 'gradtrack_db',
    dialect: 'mysql',
    username: 'root',
    password: '123456',
    storage: ':memory:',
    models: [
        evaluado_1.Evaluado,
        poblacion_1.Poblacion,
        zona_1.Zona
    ]
});
function connectionDB() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            yield connection.authenticate();
            console.log("Conexión a la base de datos establecida con éxito.");
            yield connection.sync();
        }
        catch (e) {
            console.log(e);
        }
    });
}
exports.default = connectionDB;
