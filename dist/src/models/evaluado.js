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
exports.Evaluado = void 0;
const sequelize_typescript_1 = require("sequelize-typescript");
const poblacion_1 = require("./poblacion");
let Evaluado = class Evaluado extends sequelize_typescript_1.Model {
};
exports.Evaluado = Evaluado;
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    }),
    __metadata("design:type", Number)
], Evaluado.prototype, "id", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Evaluado.prototype, "nombre", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Evaluado.prototype, "apellidos", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Evaluado.prototype, "curp", void 0);
__decorate([
    sequelize_typescript_1.Column,
    __metadata("design:type", String)
], Evaluado.prototype, "genero", void 0);
__decorate([
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.STRING,
        allowNull: true,
    }),
    __metadata("design:type", String)
], Evaluado.prototype, "graduado", void 0);
__decorate([
    (0, sequelize_typescript_1.ForeignKey)(() => poblacion_1.Poblacion),
    (0, sequelize_typescript_1.Column)({
        type: sequelize_typescript_1.DataType.INTEGER,
        allowNull: false,
    }),
    __metadata("design:type", Number)
], Evaluado.prototype, "poblacionId", void 0);
__decorate([
    (0, sequelize_typescript_1.BelongsTo)(() => poblacion_1.Poblacion),
    __metadata("design:type", poblacion_1.Poblacion)
], Evaluado.prototype, "poblacion", void 0);
__decorate([
    sequelize_typescript_1.CreatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Evaluado.prototype, "createdAt", void 0);
__decorate([
    sequelize_typescript_1.UpdatedAt,
    sequelize_typescript_1.Column,
    __metadata("design:type", Date)
], Evaluado.prototype, "updatedAt", void 0);
exports.Evaluado = Evaluado = __decorate([
    (0, sequelize_typescript_1.Table)({
        tableName: "Evaluados",
    })
], Evaluado);
