// import {clients} from "../model/clients.model.js";


// export const getClients = async (req, res) => {
//     try {
//       const Datas = await clients.findAll();
  
//       return res.status(200).json({
//         success: true,
//         message: 'successfully',
//         data: Datas,
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server Error' });
//     }
// };
// // Correct getClientsById
// export const getClientsById = async (req, res) => {
//   const { id } = req.params; // Assuming the client_id is passed in the URL parameters
//   try {
//       const Datas = await clients.findOne({ where: { client_id: id } });

//       if (!Datas) {
//           return res.status(404).json({
//               success: false,
//               message: 'Client not found',
//               data: null,
//           });
//       }

//       return res.status(200).json({
//           success: true,
//           message: 'Successfully fetched client data',
//           data: Datas,
//       });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server Error' });
//   }
// };
// export const addClients = async (req, res) => {
//     const { client_id, name, designation, img, comments } = req.body;
//     try {
//       const newDatas = await clients.create({ client_id: client_id, name: name, designation: designation, img: img, comments: comments });
//       res.status(201).json({
//         newDatas
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server Error' });
//     }
// };
// // Update Clients
// export const updateClients = async (req, res) => {
//   const { client_id, name, designation, img, comments } = req.body;
//   try {
//       const existingData = await clients.findOne({ where: { client_id } });

//       if (!existingData) {
//           return res.status(404).json({
//               success: false,
//               message: 'Client not found',
//               data: null,
//           });
//       }

//       const updatedData = await clients.update(
//           { name, designation, img, comments },
//           { where: { client_id } }
//       );

//       res.status(200).json({
//           success: true,
//           message: 'Successfully updated client data',
//           data: updatedData,
//       });
//   } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server Error' });
//   }
// };
// // delete clients
// export const deleteClients = async (req, res) => {
//   const { id } = req.params; // Assuming the client_id is passed in the URL parameters
//   try {
//     const existingData = await clients.findOne({ where: { client_id: id } });

//     if (!existingData) {
//       return res.status(404).json({
//         success: false,
//         message: 'Client not found',
//         data: null,
//       });
//     }

//     await clients.destroy({ where: { client_id: id } });

//     return res.status(200).json({
//       success: true,
//       message: 'Client data deleted successfully',
//       data: existingData,
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: 'Server Error' });
//   }
// };