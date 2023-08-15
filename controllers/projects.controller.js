import { projects } from "../model/projects.model.js";
import { Users } from "../model/users.model.js";
// import { projectsJunction } from "../model/projectsJunction.model.js";
import { projectsTeams } from "../model/projectsTeam.model.js";
import { projectsClients } from "../model/projectsCients.model.js";
// Define associations between projects and users
// projects.belongsToMany(Users, {
//   through: projectsJunction,
//   foreignKey: 'project_id',
//   as: 'users'
// });
projects.hasMany(projectsTeams, {
  foreignKey: "project_id",
  as: "teams",
  // onDelete: "CASCADE",
  // onUpdate: "CASCADE"
});
projects.hasOne(projectsClients, {
  foreignKey: "project_id",
  as: "clients",
  // onDelete: "CASCADE",
  // onUpdate: "CASCADE"
});

// Users.belongsToMany(projects, {
//   through: projectsJunction,
//   foreignKey: 'user_id',
//   projects:'projects'
// });

projectsTeams.belongsTo(projects,{
  foreignKey: "project_id",
});
projectsClients.belongsTo(projects,{
  foreignKey: "project_id",
});

export const getProjects = async (req, res) => {
  try {
    const allProjects = await projects.findAll({
      include: [
        {
          model: projectsClients,
          as: "clients",
          attributes: ["user_id", "name", "email", "phone_no", "company_name"],
        },
        {
          model: projectsTeams,
          as: "teams",
          attributes: ["user_id", "name", "email", "phone_no", "designation"],
        },
      ],
    });

    return res.status(200).json({
      success: true,
      message: "Successfully fetched project data",
      data: allProjects,
    });
  } catch (error) {
    throw new Error("Error while fetching all projects: " + error);
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
        message: "Project not found",
        data: null,
      });
    }

    return res.status(200).json({
      success: true,
      message: "Successfully fetched project data",
      data: Datas,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const getProjectsByUserId = async (req, res) => {
  const { user_id } = req.params; // Assuming the user_id is passed in the URL parameters
  try {
    const user = await Users.findByPk(user_id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
        data: null,
      });
    }

    const projectsOfUser = await user.getProjects({
      attributes: [
        "project_id",
        "project_name",
        "started_at",
        "deadline",
        "status",
        "description",
        "img",
        "link",
      ],
      include: [
        {
          model: Users,
          as: "users",
          attributes: ["user_id", "name", "email", "phone_no", "designation"],
        },
      ],
    });

    return res.status(200).json({
      success: true,
      message: "Successfully fetched projects of the user",
      data: projectsOfUser,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
// export const addProject = async (req, res) => {
//   const {
//     project_name,
//     project_code,
//     client,
//     team_leader,
//     team_members,
//     started_at,
//     deadline,
//     status,
//     description,
//     img,
//     link,
//   } = req.body;

//   try {
//     const project_client = await Users.findOne({
//       where: { user_id: client, type: "client" },
//     });
//     const project_leader = await Users.findOne({
//       where: { user_id: team_leader, type: "employee" },
//     });
//     const project_members = await Users.findAll({
//       where: { user_id: team_members, type: "employee" },
//     });
//     const members_data = project_members.map((member) => {
//       const plainMember = member.get({ plain: true });
//       return plainMember;
//     });
//     console.log(members_data);
//     if (!project_name || !started_at || !description || !status || !deadline) {
//       return res.status(400).json({ message: "Required fields are missing" });
//     }
//     else if (!project_client || !project_leader || !project_members) {
//       return res.status(404).json({ message: "users doesn't exist" });
//     } else {
//       const newProject = await projects.create({
//         project_name: project_name,
//         project_code: project_code,
//         started_at: started_at,
//         deadline: deadline,
//         status: status,
//         description: description,
//         img: img,
//         link: link,
//       });
//       const project_id = newProject.project_id;
//       console.log(project_id);
//       const Client = () => {
//         const Project_client = project_client.dataValues;
//         Project_client.project_id= project_id;
//         return Project_client;
//       };
//       console.log(Client());
//       const members = members_data.map((member) => {
//         member.project_id =project_id ;
//         member.role = "member";
//         return member;
//       });
//       console.log(members);
//       const leader = () => {
//         // Assign properties to the existing project_leader object
//         const Project_leader = project_leader.dataValues;
//         Project_leader.project_id = project_id;
//         Project_leader.role = "leader";
//         return Project_leader;
//       };
//       // Call the leader function to update the project_leader object
//       console.log(leader());
//       // Output the updated project_leader object
//       const fullTeam = [leader(),...members];
//       console.log(fullTeam);
//       const newClient = await projectsClients.create(Client());
//       const newTeam = await projectsTeams.bulkCreate(fullTeam);

//       res.status(201).json({ 
//         message: "Successfuly added project",
//         data:{
//           "project_name":newProject.project_name,
//           "project_code":newProject.project_code,
//           "client":Client(),
//           "team_leader":leader(),
//           "team_members":members,
//           "started_at":newProject.started_at,
//           "deadline":newProject.deadline,
//           "status":newProject.status,
//           "description":newProject.description,
//           "img":newProject.img,
//           "link":newProject.link
//       }
//       });

//     }
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };
export const addProject = async (req, res) => {
  const {
    project_name,
    project_code,
    client,
    team_leader,
    team_members,
    started_at,
    deadline,
    status,
    description,
    img,
    link,
  } = req.body;

  try {
    const project_client = await Users.findOne({
      where: { user_id: client, type: "client" },
    });

    const project_leader = await Users.findOne({
      where: { user_id: team_leader, type: "employee" },
    });

    const project_members = await Users.findAll({
      where: { user_id: team_members, type: "employee" },
    });

    const members_data = project_members.map((member) => member.get({ plain: true }));

    if (!project_name || !started_at || !description || !status || !deadline) {
      return res.status(400).json({ message: "Required fields are missing" });
    } else if (!project_client || !project_leader || !project_members) {
      return res.status(404).json({ message: "Users don't exist" });
    } else {
      const newProject = await projects.create({
        project_name,
        project_code,
        started_at,
        deadline,
        status,
        description,
        img,
        link,
      });

      const project_id = newProject.project_id;

      const Client = () => {
        const Project_client = { ...project_client.dataValues, project_id };
        return Project_client;
      };

      const members = members_data.map((member) => ({
        ...member,
        project_id,
        role: "member",
      }));

      const leader = () => ({
        ...project_leader.dataValues,
        project_id,
        role: "leader",
      });

      const fullTeam = [leader(), ...members];

      await projectsClients.create(Client());
      await projectsTeams.bulkCreate(fullTeam);

      res.status(201).json({ 
        message: "Successfully added project",
        data: {
          project_id: newProject.project_id,
          project_name: newProject.project_name,
          project_code: newProject.project_code,
          client: Client(),
          team_leader: leader(),
          team_members: members,
          started_at: newProject.started_at,
          deadline: newProject.deadline,
          status: newProject.status,
          description: newProject.description,
          img: newProject.img,
          link: newProject.link
        }
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};

// export const updateProjects = async (req, res) => {
//   const { 
//     project_id,
//     project_name,
//     project_code,
//     client,
//     team_leader,
//     team_members,
//     started_at,
//     deadline,
//     status,
//     description,
//     img,
//     link,} = req.body;
//   try {
//     let updatedClient;
//     let updatedTeam;
//     const existingData = await projects.findOne({
//       where: { project_id: project_id },
//     });

//     if (!existingData) {
//       return res.status(404).json({
//         success: false,
//         message: "Project not found",
//         data: null,
//       });
//     }

//     if (client) {
//       // Find the project client
//       const project_client = await Users.findOne({
//         where: { user_id: client, type: 'client' },
//       });
//       console.log(project_client);
//       const Client = () => {
//         const Project_client = { ...project_client.dataValues, project_id };
//         return Project_client;
//       };
//       console.log(Client());
//       // Update the project's associated client
//       updatedClient = await existingData.setClients([Client()]);
//     }
//     if (team) {
//       const project_leader = await Users.findOne({
//         where: { user_id: team_leader, type: "employee" },
//       });
  
//       const project_members = await Users.findAll({
//         where: { user_id: team_members, type: "employee" },
//       });
//       const members_data = project_members.map((member) => member.get({ plain: true }));

//       const members = members_data.map((member) => ({
//         ...member,
//         project_id,
//         role: "member",
//       }));

//       const leader = () => ({
//         ...project_leader.dataValues,
//         project_id,
//         role: "leader",
//       });

//       const fullTeam = [leader(), ...members];
//       updatedTeam = await existingData.setTeams(fullTeam);
//     }
//     const updatedData = await projects.update(
//       { 
//         project_name,
//         project_code,
//         started_at,
//         deadline,
//         status,
//         description,
//         img,
//         link
//       },
//       { where: { project_id } }
//     );

//     res.status(200).json({
//       success: true,
//       message: "Successfully updated project data",
//       data: updatedData,updatedClient,updatedTeam
//     });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ message: "Server Error" });
//   }
// };
export const updateProjects = async (req, res) => {
  const {
    project_id,
    project_name,
    project_code,
    client,
    team_leader,
    team_members,
    started_at,
    deadline,
    status,
    description,
    img,
    link,
  } = req.body;

  try {
    const existingData = await projects.findOne({
      where: { project_id: project_id },
      include: [
        {
          model: projectsClients,
          as: "clients",
        },
        {
          model: projectsTeams,
          as: "teams",
        },
      ],
    });
    console.log(existingData);
    if (!existingData) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
        data: null,
      });
    }

    // Update main project details
    const updatedData = await existingData.update({
      project_name,
      project_code,
      started_at,
      deadline,
      status,
      description,
      img,
      link,
    });

    // Update associated clients if provided
    if (client) {
      const project_client = await Client.findByPk(client);
      // console.log(project_client);
      console.log(project_id);
      const Client = () => {
        const Project_client = project_client;
        Project_client.project_id= project_id;
        return Project_client;
      };
      console.log(Client());
      if (Client()) {
        await existingData.setClients(Client());
      }
    }

    // Update associated team members if provided
    if (team_leader && team_members) {
      const projectLeader = await Users.findOne({
        where: { user_id: team_leader, type: "employee" },
      });

      const projectMembers = await Users.findAll({
        where: { user_id: team_members, type: "employee" },
      });
      
      const members = projectMembers.map((member) => ({
        ...member.dataValues,
        role: "member",
        project_id:project_id,
      }));

      const leader = {
        ...projectLeader.dataValues,
        role: "leader",
        project_id:project_id,
      };

      const fullTeam = [leader, ...members];
      await existingData.setTeams(fullTeam);
    }

    res.status(200).json({
      success: true,
      message: "Successfully updated project data",
      data: updatedData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
// delete projects
export const deleteProjects = async (req, res) => {
  const { project_id } = req.params; // Assuming the project_id is passed in the URL parameters
  try {
    const existingData = await projects.findOne({
      where: { project_id: project_id },
    });

    if (!existingData) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
        data: null,
      });
    }

    await projects.destroy({ where: { project_id: project_id } });

    return res.status(200).json({
      success: true,
      message: "Project data deleted successfully",
      data: existingData,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
