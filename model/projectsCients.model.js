import DataTypes from 'sequelize';
import db from '../config/database.js';



export const projectsClients = db.define('projectsclients', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey:true,
    unique:true,
    allowNull:true,
    autoIncrement:true,
  },
  project_id: {
    type: DataTypes.INTEGER,
  },
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  name: {
    type: DataTypes.CHAR,
  },
  phone_no: {
    type: DataTypes.CHAR,
  },
  email: {
    type: DataTypes.CHAR,
  },
  company_name: {
    type: DataTypes.CHAR
  },
  img: {
    type: DataTypes.BLOB
  },
}, {
  freezeTableName: true,
  timestamps : false
});
// Sync the models with the database using the 'alter' option
// db.sync({ alter: true })
//   .then(() => {
//     console.log('Database synchronized successfully with model definitions.');
//   })
//   .catch((error) => {
//     console.error('Error synchronizing the database:', error);
//   });