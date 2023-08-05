// import DataTypes from 'sequelize';
// import db from '../config/database.js';

// export const clients = db.define('clients', {
//     client_id: {
//       type: DataTypes.INTEGER,
//       primaryKey: true,
//       allowNull: false,
//       unique: true
//     },
//     name: {
//       type: DataTypes.CHAR,
//       allowNull: false
//     },
//     designation: {
//       type: DataTypes.CHAR,
//       allowNull: true
//     },
//     img: {
//       type: DataTypes.BLOB,
//       allowNull: true
//     },
//     comments: {
//       type: DataTypes.TEXT,
//       allowNull:true
//     }
//   }, {
//     freezeTableName: true,
//     timestamps : false
//   });
//   db.sync({alter:true});
