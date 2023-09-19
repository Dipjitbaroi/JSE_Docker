import dotenv from "dotenv";
import { Sequelize } from "sequelize";
dotenv.config({ path: './.env'});

const db = new Sequelize(

    process.env.DATABASE, process.env.DATABASE_USER, process.env.DATABASE_PASSWORD, {

  host: process.env.DATABASE_HOST,
  dialect: 'mysql',
  port: process.env.DATABASE_PORT,

});
(async () => {
    try {
      await sequelize.authenticate();
      console.log('Connected to the database');
    } catch (error) {
      console.error('Unable to connect to the database:', error);
    }
  });
export default db;