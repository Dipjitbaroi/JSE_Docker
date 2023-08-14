import DataTypes from 'sequelize';
import db from '../config/database.js';

export const projectsJunction = db.define('projectsjunction', {
  junction_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  project_id: { // Foreign key for projects model
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  user_id: { // Foreign key for Users model
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  freezeTableName: true,
  timestamps: false
});
// Sync the models with the database using the 'alter' option
db.sync({ alter: true })
  .then(() => {
    console.log('Database synchronized successfully with model definitions.');
  })
  .catch((error) => {
    console.error('Error synchronizing the database:', error);
  });