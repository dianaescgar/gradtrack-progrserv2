"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Poblacion = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const zona_1 = require("./zona");
const evaluado_1 = require("./evaluado");
let Poblacion = class Poblacion extends sequelize_typescript_1.Model {
};
exports.Poblacion = Poblacion;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }),
    __metadata("design:type", Number)
], Poblacion.prototype, "id", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Poblacion.prototype, "edad", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: false,
    }),
    __metadata("design:type", String)
], Poblacion.prototype, "nivelSocioeconomico", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => zona_1.Zona),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Poblacion.prototype, "zonaId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => zona_1.Zona),
    __metadata("design:type", zona_1.Zona)
], Poblacion.prototype, "zona", void 0);
__decorate([
    (0, sequelize_typescript_1.HasMany)(() => evaluado_1.Evaluado),
    __metadata("design:type", Array)
], Poblacion.prototype, "evaluados", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Poblacion.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Poblacion.prototype, "updatedAt", void 0);
exports.Poblacion = Poblacion = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "Poblaciones",
    })
], Poblacion);
