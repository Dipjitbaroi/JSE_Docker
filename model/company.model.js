// Import Sequelize and the database connection (assuming you have already set up the connection)
// const { Sequelize, DataTypes } = require('sequelize');
// const sequelize = require('../path/to/your/database/connection');
import { DataTypes } from "sequelize";
import db from '../config/database.js';

// Define the 'location' model
export const location = db.define('locations', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
  
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email2: {
      type: DataTypes.STRING,
    },
    map: {
      type: DataTypes.STRING,
    },
    
});

// Define the 'communicators' model
export const communicators = db.define('communicators', {
    contact_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
  
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    company_name: {
      type: DataTypes.STRING,
    },
    message: {
      type: DataTypes.STRING,
    },
    
});


// db.sync({ alter: true })
//   .then(() => {
//     console.log('Database synchronized successfully with model definitions.');
//   })
//   .catch((error) => {
//     console.error('Error synchronizing the database:', error);
//   });