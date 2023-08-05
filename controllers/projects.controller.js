import {projects} from "../model/projects.model.js";
import { Users } from "../model/users.model.js";
import { projectsJunction } from "../model/projectsJunction.model.js";
// export const getProjects = async (req, res) => {
  
//     try {
//       const Datas = await projects.findAll();
//       const project_members = Datas.
//       newDatas = {
//         project_id:, 
//         project_name:,
//         project_client:{},
//         project_leader:{},
//         team:{
//           project_leader:{},
//           members:[{},{},{}]
//         },
//         started_at:,
//         deadline:,
//         status:,
//         description:,
//         img:,
//         link:
//       }
//       return res.status(200).json({
//         success: true,
//         message: 'successfully',
//         data: Datas,
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server Error' });
//     }
// // };
// import { projects, Users } from '../models'; // Import your models here

// // Define associations between projects and users
// projects.belongsTo(Users, { foreignKey: 'project_leader_id', as: 'project_leader' });
// projects.belongsToMany(Users, {
//   through: 'project_members',
//   foreignKey: 'project_id',
//   otherKey: 'user_id',
//   as: 'members',
// });

// export async function getAllProjects() {
//   try {
//     const allProjects = await projects.findAll({
//       include: [
//         { model: Users, as: 'project_leader', attributes: ['user_id', 'name', 'email'] },
//         { model: Users, as: 'members', attributes: ['user_id', 'name', 'email'] },
//       ],
//       attributes: [
//         'project_id',
//         'project_name',
//         'project_client_id',
//         'project_leader_id',
//         'project_memeber_ids',
//         'started_at',
//         'deadline',
//         'status',
//         'description',
//         'img',
//         'link',
//       ],
//     });

//     // Map the projects data to the desired response structure
//     const response = allProjects.map((project) => ({
//       project_id: project.project_id,
//       project_name: project.project_name,
//       project_client: {}, // Add logic to fetch and populate client information here if needed
//       project_leader: project.project_leader,
//       team: {
//         project_leader: project.project_leader,
//         members: project.members,
//       },
//       started_at: project.started_at,
//       deadline: project.deadline,
//       status: project.status,
//       description: project.description,
//       img: project.img,
//       link: project.link,
//     }));

//     return response;
//   } catch (error) {
//     throw new Error('Error while fetching all projects: ' + error.message);
//   }
// }
// import { projects, Users } from '../models'; // Import your models here

// Define associations between projects and users
projects.belongsToMany(Users, {
  through: projectsJunction,
  onDelete: "CASCADE",
  foreignKey: 'project_id',
  as: 'users'
});
Users.belongsToMany(projects, {
  through: projectsJunction,
  onDelete: "CASCADE",
  foreignKey: 'user_id',
  projects:'projects'
});
// projects.belongsTo(Users, { foreignKey: 'client_id', as: 'project_client' });
// projects.belongsTo(Users, { foreignKey: 'project_leader_id', as: 'project_leader' });
// projects.belongsToMany(Users, {
//   through: projectsJunction,
//   foreignKey: 'assi_id',
//   otherKey: 'user_id',
//   as: 'members',
// });

// // export async function getAllProjects() 
// export const getAllProjects = async (req, res) =>{
//   try {
//     const allProjects = await projects.findAll({
//       include: [{model:all,include:[

//         { model: Users, as: 'client', attributes: ['user_id', 'name', 'email'] },
//         { model: Users, as: 'project_leader', attributes: ['user_id', 'name', 'email'] },
//         { model: Users, as: 'assigned', attributes: ['user_id', 'name', 'email'] },
//       ]}
//       ],
      // attributes: [
      //   'project_id',
      //   'project_name',
      //   'project_client_id',
      //   'project_leader_id',
      //   'project_memeber_ids',
      //   'started_at',
      //   'deadline',
      //   'status',
      //   'description',
      //   'img',
      //   'link',
      // ],
//     });
//     return res.status(200).json({
//       success: true,
//       message: 'Successfully fetched project data',
//       data: allProjects,
//     })
//   } catch (error) {
//     throw new Error('Error while fetching all projects: ' + error.message);
//   }
// };
//     // Map the projects data to the desired response structure
//     const response = allProjects.map((project) => ({
//       project_id: project.project_id,
//       project_name: project.project_name,
//       project_client: project.project_client,
//       project_leader: project.project_leader,
//       team: {
//         project_leader: project.project_leader,
//         members: project.members,
//       },
//       started_at: project.started_at,
//       deadline: project.deadline,
//       status: project.status,
//       description: project.description,
//       img: project.img,
//       link: project.link,
//     }));

//     return response;
//   } catch (error) {
//     throw new Error('Error while fetching all projects: ' + error.message);
//   }
// }
// Define Associations between projects and users
// Users.belongsToMany(projects,{
//   through: projectsJunction,
//   foreignKey: 'user_sl_no'
// });
// projects.belongsToMany(Users,{
//   through: projectsJunction,
//   foreignKey: 'project_sl_no'
// });
// export const getAllProjects1 = async (req, res) =>{
//   try {
//     const allProjects = await projects.findAll();

//     return res.status(200).json({
//       success: true,
//       message: 'Successfully fetched project data',
//       data: allProjects,
//   })
//   } catch (error) {
//     throw new Error('Error while fetching all projects: ' + error.message);
//   }
// };
// projects.belongsTo(Users, { foreignKey: 'user_sl_no', as: 'client' });
// projects.belongsTo(Users, { foreignKey: 'user_sl_no', as: 'project_leader' });

// projects.belongsToMany(Users, {
//   through: projectsJunction,
//   foreignKey: 'assigned',
//   as: 'assigned',
// });
// Users.belongsToMany(projects,{
//   foreignKey: 'assigned',
//   as: 'user_sl_no'
// });

export const getProjects = async (req, res) => {
  try {
    const allProjects = await projects.findAll({
      include: [
        {
          model: Users,
          as:'users',
          attributes: ['user_id', 'name', 'email', 'phone_no','designation'],
        },
      ],
    });

    return res.status(200).json({
      success: true,
      message: 'Successfully fetched project data',
      data: allProjects,
    });
  } catch (error) {
    throw new Error('Error while fetching all projects: ' + error);
  }
};
// Correct getProjectsById
export const getProjectById = async (req, res) => {
  const { project_id } = req.params; // Assuming the project_id is passed in the URL parameters
  try {
      const Datas = await projects.findOne({ where: { project_id: project_id } });

      if (!Datas) {
          return res.status(404).json({
              success: false,
              message: 'Project not found',
              data: null,
          });
      }

      return res.status(200).json({
          success: true,
          message: 'Successfully fetched project data',
          data: Datas,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
};
export const getProjectsByUserId = async (req, res) => {
  const { user_id } = req.params; // Assuming the user_id is passed in the URL parameters
  try {
    const user = await Users.findByPk(user_id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        data: null,
      });
    }

    const projectsOfUser = await user.getProjects({
      attributes: [
        'project_id',
        'project_name',
        'started_at',
        'deadline',
        'status',
        'description',
        'img',
        'link',
      ],
      include: [
        { model: Users, as: 'users', attributes: ['user_id', 'name', 'email', 'phone_no', 'designation'] },
      ],
    });

    return res.status(200).json({
      success: true,
      message: 'Successfully fetched projects of the user',
      data: projectsOfUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
export const addProjects = async (req, res) => {
  // const { client_id } = req.params;
  const { project_id, project_name,client_id,leader_id,member_ids,started_at,deadline,status,description, img, link } = req.body;

  try {
    // Check if any required field is missing in the request body
    // if (!client_id) {
    //   return res.status(400).json({ message:"required params are missing"});
    // }
    if (!project_id || !project_name || !client_id || !leader_id || !member_ids || !started_at  || !description || !status || !deadline) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const client_info = await employees.findOne({ where: { id: client_id, type: 'client' } });

    if (!client_info) {
      return res.status(404).json({ message: "Client doesn't exist" });
    } else {
      const newDatas = await projects.create({
        project_id: project_id,
        project_name: project_name,
        project_client: client_id,
        project_leader:leader_id,
        started_at:started_at,
        deadline:deadline,
        status:status,
        description: description,
        img: img,
        link: link,
      });

      res.status(201).json({ newDatas });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
// export const addProjects = async (req, res) => {

//   const { client_id } = req.params;
//   const { project_id, name, description, img, link } = req.body;

//   const client_info = await employees.findOne({where: { id:client_id, type:'client'}})

//   if (!client_info){
//     console.error(error);
//     res.status(500).json({ message: "Client doesn't exist" });
//   }else{
    
//     try {
//       const newDatas = await projects.create({ project_id: project_id,client:client_info, name: name, description: description, img: img, link: link });
//       res.status(201).json({
//         newDatas
//       });
//     } catch (error) {
//       console.error(error);
//       res.status(500).json({ message: 'Server Error' });
//     }
//   }
// };
// Update Projects
export const updateProjects = async (req, res) => {
  const { project_id, name, description, img, link } = req.body;
  try {
      const existingData = await projects.findOne({ where: { project_id:project_id } });

      if (!existingData) {
          return res.status(404).json({
              success: false,
              message: 'Project not found',
              data: null,
          });
      }
      const updatedData = await projects.update(
          { name, description, img, link },
          { where: { project_id } }
      );

      res.status(200).json({
          success: true,
          message: 'Successfully updated project data',
          data: updatedData,
      });
  } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
  }
};
// delete projects
export const deleteProjects = async (req, res) => {
  const { project_id } = req.params; // Assuming the project_id is passed in the URL parameters
  try {
    const existingData = await projects.findOne({ where: { project_id: project_id } });

    if (!existingData) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
        data: null,
      });
    }

    await projects.destroy({ where: { project_id: project_id } });

    return res.status(200).json({
      success: true,
      message: 'Project data deleted successfully',
      data: existingData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};