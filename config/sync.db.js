// import sequelize from 'database.js';
// import fs from 'fs/promises';
// import path from 'path';

// async function syncModels() {
//   try {
//     await sequelize.transaction(async (t) => {
//       const modelsDir = path.join(__dirname, '..', 'model');
//       const files = await fs.readdir(modelsDir);
//       const modelPromises = [];

//       for (const file of files) {
//         if (file.endsWith('.js')) {
//           const { default: model } = await import(path.join(modelsDir, file));
//           modelPromises.push(model.sync({ alter: true, transaction: t }));
//         }
//       }

//       await Promise.all(modelPromises);
//     });

//     console.log('All models synchronized successfully with the database.');
//   } catch (error) {
//     console.error('Error synchronizing models:', error);
//   }
// }

// syncModels();
