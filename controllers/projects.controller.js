import {projects} from "../model/projects.model.js";
import { Users } from "../model/users.model.js";
import { projectsJunction } from "../model/projectsJunction.model.js";
import { projectsTeams } from "../model/projectsTeam.model.js";
import { projectsClients } from "../model/projectsCients.model.js";
// Define associations between projects and users
projects.belongsToMany(Users, {
  through: projectsJunction,
  onDelete: "CASCADE",
  foreignKey: 'project_id',
  as: 'users'
});
projects.hasMany(projectsTeams,{
  foreignKey:'project_id'
});
projects.hasMany(projectsClients,{
  foreignKey:'project_id'
});

Users.belongsToMany(projects, {
  through: projectsJunction,
  onDelete: "CASCADE",
  foreignKey: 'user_id',
  projects:'projects'
});

projectsTeams.belongsTo(projects);
projectsClients.belongsTo(projects);

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
export const addProject = async (req, res) => {
  // const { client_id } = req.params;
  const { project_name,client,team_leader,team_members,started_at,deadline,status,description, img, link } = req.body;

  try {
    // Check if any required field is missing in the request body
    // if (!client_id) {
    //   return res.status(400).json({ message:"required params are missing"});
    // }
    if ( !project_name || !started_at  || !description || !status || !deadline) {
      return res.status(400).json({ message: "Required fields are missing" });
    }

    const project_client = await Users.findOne({ where: { user_id: client, type: 'client' } });
    const project_leader = await Users.findOne({where:{ user_id: team_leader, type: 'employee'}});
    const project_members = await Users.findAll({where:{ user_id: team_members, type:'employee'}})

    if (!project_client || !project_leader || !project_members) {
      return res.status(404).json({ message: "users doesn't exist" });
    } else {
      const newProject = await projects.create({
        project_name: project_name,
        started_at: started_at,
        deadline:deadline,
        status: status,
        description: description,
        img: img,
        link: link,
      });
      console.log(newProject);

      const project_id = newProject.project_id;
      console.log(project_id);

      const addteam = newProject.addprojectsTeams(project_leader,project_client);
      console.log(addteam);

      const addclient = newProject.addprojectsClients(project_client);
      console.log(addclient);


      res.status(201).json({ newDatas,addteam,addclient });
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