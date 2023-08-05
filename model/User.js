// const { DataTypes } = require('sequelize');
import DataTypes from 'sequelize';
// const sequelize = require('./database');
import db from '../config/database.js'; // Assuming you have configured Sequelize and established a database connection

const User = db.define('user', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
    freezeTableName: true,
    timestamps : false
});
db.sync({alter:true});
export default User;

