import DataTypes from 'sequelize';
import db from '../config/database.js';



export const projects = db.define('projects', {
  project_id: {
    type: DataTypes.INTEGER,
    primaryKey:true,
    unique:true,
    allowNull:true,
    autoIncrement:true,
  },
  project_code: {
    type: DataTypes.CHAR,
    allowNull: false
  },
  project_name: {
    type: DataTypes.CHAR,
    allowNull: false
  },
  started_at: {
    type: DataTypes.DATE,

  },
  deadline: {
    type: DataTypes.DATE

  },
  status:{
    type: DataTypes.CHAR
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  img: {
    type: DataTypes.BLOB,
    allowNull: true
  },
  link: {
    type: DataTypes.CHAR,
    allowNull:true
  }
}, {
  freezeTableName: true,
  timestamps : false
});
// Sync the models with the database using the 'alter' option
// db.sync({ alter: true,force: false })
//   .then(() => {
//     console.log('Database synchronized successfully with model definitions.');
//   })
//   .catch((error) => {
//     console.error('Error synchronizing the database:', error);
//   });