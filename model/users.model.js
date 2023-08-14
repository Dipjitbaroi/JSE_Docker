import DataTypes from 'sequelize';
import db from '../config/database.js';



export const Users = db.define('users', {
  user_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    allowNull:true,
    autoIncrement:true,
  },
  official_id: {
    type: DataTypes.CHAR(12),
    allowNull: true,
  },
  password: {
    type: DataTypes.CHAR,
    allowNull:true
  },
  project_user_type: {
    type: DataTypes.CHAR(8),
    allowNull: true
  },
  name: {
    type: DataTypes.CHAR(50),
    allowNull: true
  },
  department:{
    type: DataTypes.CHAR(10),
    allowNull:true
  },
  fathers_name:{
    type:DataTypes.CHAR(50),

  },
  mothers_name:{
    type:DataTypes.CHAR(50),
    allowNull: true

  },
  date_of_birth:{
    type:DataTypes.DATE,
    allowNull: true
  },
  nid:{
    type:DataTypes.INTEGER(20),
    allowNull: true
  },
  passport:{
    type:DataTypes.INTEGER,
    allowNull: true

  },
  phone_no:{
    type:DataTypes.CHAR(20),
    allowNull: true
  },
  email:{
    type:DataTypes.CHAR(30),
    allowNull: true
  },
  joining_date:{
    type:DataTypes.DATE,
    allowNull: true
  },
  blood_group:{
    type:DataTypes.CHAR(4),
    allowNull: true
  },
  sex:{
    type:DataTypes.CHAR(7),
    allowNull: true
  },
  religion:{
    type:DataTypes.CHAR(15),
    allowNull: true
  },
  company_name:{
    type:DataTypes.CHAR
  },
  maritial_status:{
    type:DataTypes.CHAR(10),
    allowNull: true

  },
  husband_name:{
    type:DataTypes.CHAR(50),
    allowNull: true
  },
  wife_name:{
    type:DataTypes.CHAR(50),
    allowNull: true

  },
  emergency_contact1:{
    type:DataTypes.CHAR(12),
    allowNull: true

  },
  emergency_contact2:{
    type:DataTypes.CHAR(12),
    allowNull: true
  },
  emergency_contact3:{
    type:DataTypes.CHAR(12),
    allowNull: true

  },
  present_add:{
    type:DataTypes.CHAR(100),
    allowNull: true
  },
  permanent_add:{
    type:DataTypes.CHAR(100),
    allowNull: true

  },
  education:{
    type:DataTypes.CHAR,
    allowNull: true
  },
  employment_history:{
    type:DataTypes.CHAR,
    allowNull: true

  },
  present_sallery:{
    type:DataTypes.INTEGER(7),
    allowNull: true

  },
  bank_account_no:{
    type:DataTypes.INTEGER(15),
    allowNull: true

  },
  bank_name:{
    type:DataTypes.CHAR(30),
    allowNull: true
  },
  branch:{
    type:DataTypes.CHAR(30),
    allowNull: true

  },
  routing_number:{
    type:DataTypes.CHAR(20),
    allowNull: true

  },
  tin_no:{
    type:DataTypes.CHAR(20),
    allowNull: true

  },
  designation: {
    type: DataTypes.CHAR(15),
    allowNull: true
  },
  img: {
    type: DataTypes.BLOB,
    allowNull: true
  },
  type: {
    type:DataTypes.CHAR(10),
    allowNull:true
  }
}, {
  freezeTableName: true,
  timestamps : false
});
// Sync the models with the database using the 'alter' option
db.sync({ alter: true })
  .then(() => {
    console.log('Database synchronized successfully with model definitions.');
  })
  .catch((error) => {
    console.error('Error synchronizing the database:', error);
  });