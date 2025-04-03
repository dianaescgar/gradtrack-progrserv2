import { Sequelize } from "sequelize-typescript";
import { Evaluado } from "../models/evaluado";
import { Poblacion } from "../models/poblacion";
import { Zona } from "../models/zona";

const connection = new Sequelize({
  database: 'gradtrack_db',
  dialect: 'mysql',
  username: 'root',
  password: '123456',
  storage: ':memory:',
  models: [
    Evaluado, 
    Poblacion, 
    Zona
  ]
});

async function connectionDB() {
  try {
    await connection.authenticate();
    console.log("Conexión a la base de datos establecida con éxito.");
    await connection.sync();
  } catch (e) {
    console.log(e);
  }
}

export default connectionDB;