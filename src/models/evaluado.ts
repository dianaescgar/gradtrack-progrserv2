import { Table, Model, Column, CreatedAt, UpdatedAt, DataType, ForeignKey, BelongsTo } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Poblacion } from './poblacion';

interface EvaluadoAttributes {
  id: number;
  nombre: string;
  apellidos: string;
  curp: string;
  genero: string;
  graduado: string;
  poblacionId: number;
}

interface EvaluadoCreationAttributes extends Optional<EvaluadoAttributes, 'id'> {}

@Table({
  tableName: "Evaluados",
})
export class Evaluado extends Model<EvaluadoAttributes, EvaluadoCreationAttributes> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column
  nombre!: string;

  @Column
  apellidos!: string;

  @Column
  curp!: string;

  @Column
  genero!: string;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  graduado!: string;

  @ForeignKey(() => Poblacion)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  poblacionId!: number;

  @BelongsTo(() => Poblacion)
  poblacion!: Poblacion;

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}