import { Table, Model, Column, CreatedAt, UpdatedAt, DataType, HasMany } from 'sequelize-typescript';
import { Optional } from 'sequelize';
import { Poblacion } from './poblacion';

interface ZonaAttributes {
  id: number;
  nombre: string;
  estado: string;
  tipoZona: string;
  ubicacionGeografica: string;
}

interface ZonaCreationAttributes extends Optional<ZonaAttributes, 'id'> {}

@Table({
  tableName: "Zonas",
})
export class Zona extends Model<ZonaAttributes, ZonaCreationAttributes> {

  @Column({
    type: DataType.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  })
  id!: number;

  @Column
  nombre!: string;

  @Column
  estado!: string;

  @Column
  tipoZona!: string;

  @Column
  ubicacionGeografica!: string;

  @HasMany(() => Poblacion)
  poblaciones!: Poblacion[];

  @CreatedAt
  @Column
  createdAt!: Date;

  @UpdatedAt
  @Column
  updatedAt!: Date;
}
