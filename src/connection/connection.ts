import { Sequelize } from "sequelize-typescript";


const connection = new Sequelize({
  database: 'gradtrack_db',
  dialect: 'mysql',
  username: 'root',
  password: '123456',
  storage: ':memory:',
  models: [

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