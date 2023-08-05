import { projects } from "../model/projects.model.js";
import {Users} from "../model/users.model.js";
import { projectsJunction } from "../model/projectsJunction.model.js";

// projects.belongsToMany(Users, {
//   through: projectsJunction,
//   onDelete: "CASCADE",
//   foreignKey: 'project_id',
//   as: 'users'
// });
Users.belongsToMany(projects, {
  through: projectsJunction,
  onDelete: "CASCADE",
  foreignKey: 'user_id',
  projects:'userprojects'
});

export const getUsers = async (req, res) => {
    try {
      const Datas = await Users.findAll();
  
      return res.status(200).json({
        success: true,
        message: 'successfully',
        data: Datas,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
};
export const getClients = async (req, res) => {
  try {
    const Datas = await Users.findAll({where:{type:'client'}});

    return res.status(200).json({
      success: true,
      message: 'successfully',
      data: Datas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
export const getEmployees = async (req, res) => {
  try {
    const Datas = await Users.findAll({where:{type:'employee'}});

    return res.status(200).json({
      success: true,
      message: 'successfully',
      data: Datas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
// Correct getUsersById
export const getUsersById = async (req, res) => {
  const { user_id } = req.params; // Assuming the user_id is passed in the URL parameters
  try {
      const Datas = await Users.findOne({ 
        where: { user_id: user_id },
        include:{model:projects,as:'userprojects'}
       });

      if (!Datas) {
          return res.status(404).json({
              success: false,
              message: 'Employee not found',
              data: null,
          });
      }

      return res.status(200).json({
          success: true,
          message: 'Successfully fetched employee data',
          data: Datas,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
};
// export const addUsers = async (req, res) => {
//     const { user_id, name, designation, img } = req.body;
//     try {
//       const newDatas = await Users.create({ user_id: user_id, name: name, designation: designation, img: img });
//       res.status(201).json({
//         newDatas
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server Error' });
//     }
// };

// Update Users

export const updateUser = async (req, res) => {
  const { user_id } = req.params;
  const updatedData = req.body; // Contains the fields to be updated

  try {
    const existingUser = await Users.findOne({ where: { user_id } });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        data: null,
      });
    }

    // Perform the partial update on the user data
    await existingUser.update(updatedData);

    // Fetch the updated record after the update operation
    const updatedRecord = await Users.findOne({ where: { user_id } });

    res.status(200).json({
      success: true,
      message: 'Successfully updated user data',
      data: updatedRecord,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
//delete Users
export const deleteUser = async (req, res) => {
  const { user_id } = req.params; // Assuming the user_id is passed in the URL parameters
  try {
    const existingData = await Users.findOne({ where: { user_id: user_id } });

    if (!existingData) {
      return res.status(404).json({
        success: false,
        message: 'Employee not found',
        data: null,
      });
    }

    await Users.destroy({ where: { user_id: user_id } });

    return res.status(200).json({
      success: true,
      message: 'Employee data deleted successfully',
      data: existingData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
export const getAllClients = async (req, res) => {
  try {
    const Datas = await Users.findAll({where:{type:'client'}});

    return res.status(200).json({
      success: true,
      message: 'successfully',
      data: Datas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
export const getAllEmployees = async (req, res) => {
  try {
    const Datas = await Users.findAll({where:{type:'employee'}});

    return res.status(200).json({
      success: true,
      message: 'successfully',
      data: Datas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
export const getAllAdmins = async (req, res) => {
  try {
    const Datas = await Users.findAll({where:{type:'admin'}});

    return res.status(200).json({
      success: true,
      message: 'successfully',
      data: Datas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
export const getClientById = async (req, res) => {
  const { client_id } = req.params; // Assuming the user_id is passed in the URL parameters
  try {
      const Datas = await Users.findOne({ where: { id: client_id, type: 'client'} });

      if (!Datas) {
          return res.status(404).json({
              success: false,
              message: 'client not found',
              data: null,
          });
      }

      return res.status(200).json({
          success: true,
          message: 'Successfully fetched client data',
          data: Datas,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
};
export const getEmployeeById = async (req, res) => {
  const { user_id } = req.params; // Assuming the user_id is passed in the URL parameters
  try {
      const Datas = await Users.findOne({ where: { id: user_id, type: 'employee'} });

      if (!Datas) {
          return res.status(404).json({
              success: false,
              message: 'employee not found',
              data: null,
          });
      }

      return res.status(200).json({
          success: true,
          message: 'Successfully fetched employee data',
          data: Datas,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
};
export const getAdminById = async (req, res) => {
  const { admin_id } = req.params; // Assuming the user_id is passed in the URL parameters
  try {
      const Datas = await Users.findOne({ where: { id: admin_id, type: 'admin'} });

      if (!Datas) {
          return res.status(404).json({
              success: false,
              message: 'admin not found',
              data: null,
          });
      }

      return res.status(200).json({
          success: true,
          message: 'Successfully fetched admin data',
          data: Datas,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
};
export const addUsers = async (req, res) => {
  const { user_id, name, designation, img } = req.body;
  try {
    const newDatas = await Users.create({ user_id: user_id, name: name, designation: designation, img: img });
    res.status(201).json({
      newDatas
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};