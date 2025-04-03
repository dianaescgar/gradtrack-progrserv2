import { Table, Model, Column, CreatedAt, UpdatedAt, DataType, ForeignKey, HasMany, BelongsTo } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Zona } from './zona';
import { Evaluado } from './evaluado';

interface PoblacionAttributes {
  id: number;
  edad: number;
  nivelSocioeconomico: string;
  zonaId: number;
}

interface PoblacionCreationAttributes extends Optional<PoblacionAttributes, 'id'> {}

@Table({
  tableName: "Poblaciones",
})
export class Poblacion extends Model<PoblacionAttributes, PoblacionCreationAttributes> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  edad!: number;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  nivelSocioeconomico!: string;

  @ForeignKey(() => Zona)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  zonaId!: number;

  @BelongsTo(() => Zona)
  zona!: Zona;

  @HasMany(() => Evaluado)
  evaluados!: Evaluado[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}