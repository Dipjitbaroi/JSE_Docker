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
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
});
projects.hasOne(projectsClients, {
  foreignKey: "project_id",
  as: "client",
  onDelete: "CASCADE",
  onUpdate: "CASCADE"
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
          as: "client",
          attributes: ["user_id", "name", "email", "phone_no", "company_name"],
        },
        {
          model: projectsTeams,
          as: "teams",
          attributes: ["user_id", "name","role", "email", "phone_no", "designation"],
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
    // client,
    // team_leader,
    // team_members,
    started_at,
    deadline,
    status,
    description,
    img,
    link,
  } = req.body;

  try {
    const existingProject = await projects.findByPk(project_id);

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
        data: null,
      });
    }

    // Update main project details
    const updatedData = await existingProject.update({
      project_id,
      project_name,
      project_code,
      started_at,
      deadline,
      status,
      description,
      img,
      link,
    });

    
    // // Update associated client if provided
    // if (client) {
    //   const newClient = await Users.findOne({
    //     where: { user_id: client },
    //     attributes: [
    //       'user_id',
    //       'name',
    //       'phone_no',
    //       'email',
    //       'company_name',
    //       'img'
    //     ]
    //   })
    //   if (!newClient) {
    //     return res.status(404).json({
    //       success: false,
    //       message: "new client not found",
    //       data: null,
    //     });
    //   }
    //   console.log(newClient);
    //   const existingClient = await projectsClients.findOne({
    //     where: { project_id: project_id }
    //   });
    //   console.log(existingClient);
    //   if (!existingClient) {
    //     return res.status(404).json({
    //       success: false,
    //       message: "Client not exist ",
    //       data: null,
    //     });
    //   }
      
    //   const updatedClient = await existingClient.update({
    //     'id':existingClient.id,
    //     'project_id':existingClient.project_id,
    //     'user_id':newClient.user_id,
    //     'name':newClient.name,
    //     'phone_no':newClient.phone_no,
    //     'email':newClient.email,
    //     'company_name':newClient.company_name,
    //     'img':newClient.img
    //   });
      
    //   // console.log(updatedClient);
    //   if (!updatedClient) {
    //     return res.status(404).json({
    //       success: false,
    //       message: " failed to update client ",
    //       data: null,
    //     });
    //   }
    //   // console.log(project_Client);
    //   // project_Client = project_client;
    //   // await project_Client.save();
    // }

    // // Update associated team members if provided
    // if (team_leader && team_members) {
    //   const newLeader = await Users.findOne({
    //     where: { user_id: team_leader, type: "employee" },
    //   });

    //   if (!newLeader) {
    //     return res.status(404).json({
    //       success: false,
    //       message: " new leader not found",
    //       data: null,
    //     });
    //   }
    //   // const existingLeader = await projectsTeams.findOne({
    //   //   where: { project_id: project_id, role: "leader" }
    //   // });
    //   // console.log(existingLeader);
    //   // if (!existingLeader) {
    //   //   return res.status(404).json({
    //   //     success: false,
    //   //     message: " leader not exist ",
    //   //     data: null,
    //   //   });
    //   // }
    //   // const updatedLeader = await existingLeader.update({
    //   //   'id':existingLeader.id,         
    //   //   'project_id':existingLeader.project_id,
    //   //   'user_id':newLeader.user_id,    
    //   //   'name':newLeader.name,
    //   //   'phone_no':newLeader.phone_no,   
    //   //   'email':newLeader.email,
    //   //   'role':newLeader.role,       
    //   //   'designation':newLeader.designation,
    //   //   'department':newLeader.department, 
    //   //   'img':newLeader.img
    //   //   });
    //   // console.log(updatedLeader);
    //   const newMembers = await Users.findAll({
    //     where: { user_id: team_members, type: "employee" },
    //   });

    //   if (!newMembers || newMembers.length !== team_members.length) {
    //     return res.status(404).json({
    //       success: false,
    //       message: "One or more team members not found",
    //       data: null,
    //     });
    //   }

    //   const members = newMembers.map((member) => ({
    //     ...member.dataValues,
    //     role: "member",
    //     project_id,
    //   }));
    //   // const existingMembers = await projectsTeams.findAll({
    //   //   where:{ project_id: project_id, role: "member" }
    //   // });
    //   const leader = {
    //     ...newLeader.dataValues,
    //     role: "leader",
    //     project_id,
    //   };

    //   const fullTeam = [leader, ...members];
    //   console.log(fullTeam);
    //   await existingProject.setTeams(fullTeam);
    //   // const updatedMembers = await existingMembers.update(newMembers);
    // }

    res.status(200).json({
      success: true,
      message: "Successfully updated project data",
      data: {
        updatedProject: updatedData,
        // updatedClient: updatedClient,
        // updatedLeader: updatedLeader,
        // updatedMembers: up
      },
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
    const existingProject = await projects.findOne({
      where: { project_id: project_id },
    });

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: "Project not found",
        data: null,
      });
    }
    const existingClient = await existingProject.getClient();
    const existingTeam = await existingProject.getTeams();
    console.log(existingTeam);
    const deleteProject = await projects.destroy({ where: { project_id: project_id } });
    if (existingClient) {
      await existingClient.destroy();
    }
    if (existingTeam && existingTeam.length > 0) {
      // Iterate through each team and delete
      for (const teamInstance of existingTeam) {
        await teamInstance.destroy();
      }
    }
    // if (existingClient) {
    //   await projectsClients.destroy({
    //     where:{ id : existingClient.id }
    //   })
    // };
    // if (existingTeam) {
    //   await projectsTeams.destroy({
    //     where:{ id : existingTeam }
    //   })
    // };
    return res.status(200).json({
      success: true,
      message: "Project data deleted successfully",
      data: deleteProject,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
};
export const updateTeam = async (req, res) => {
  const { id, project_id, user_id, role } = req.body;

  try {
    const existingProject = await projects.findByPk(project_id);

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
        data: null,
      });
    }

    const existingTeamMember = await projectsTeams.findOne({
      where:{ id:id }
    });

    if (!existingTeamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found in the project',
        data: null,
      });
    }
    const newTeamMember = await Users.findOne({
      where:{ user_id:user_id}
    });
    // Update the team member's data
    const updatedTeamMember = await existingTeamMember.update({
      id: id,
      project_id:project_id,
      user_id:user_id,
      name:newTeamMember.name,
      phone_no:newTeamMember.phone_no,
      email:newTeamMember.email,
      role:role,
      designation:newTeamMember.description,
      department:newTeamMember.department,
      img:newTeamMember.img
    });

    if (!updatedTeamMember) {
      return res.status(404).json({
        success: false,
        message: 'failed to update team member',
        data: null,
      });
    }
    return res.status(200).json({
      success: true,
      message: 'Team member data updated successfully',
      data: updatedTeamMember,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
export const addTeamMember = async (req, res) => {
  const { project_id, user_id, role } = req.body;

  try {
    const existingProject = await projects.findByPk(project_id);

    if (!existingProject) {
      return res.status(404).json({
        success: false,
        message: 'Project not found',
        data: null,
      });
    }

    const existingUser = await Users.findOne({
      where: { user_id: user_id }
    });

    if (!existingUser) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
        data: null,
      });
    }

    const newTeamMember = await projectsTeams.create({
      project_id: project_id,
      user_id: user_id,
      name: existingUser.name,
      phone_no: existingUser.phone_no,
      email: existingUser.email,
      role: role,
      designation: existingUser.designation,
      department: existingUser.department,
      img: existingUser.img
    });

    return res.status(201).json({
      success: true,
      message: 'Team member added successfully',
      data: newTeamMember,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
export const removeTeamMember = async (req, res) => {
  const { id } = req.params; // Assuming the team member's ID is passed in the URL parameters

  try {
    const existingTeamMember = await projectsTeams.findOne({
      where: { id: id }
    });

    if (!existingTeamMember) {
      return res.status(404).json({
        success: false,
        message: 'Team member not found',
        data: null,
      });
    }

    // Delete the team member
    await existingTeamMember.destroy();

    return res.status(200).json({
      success: true,
      message: 'Team member removed successfully',
      data: null,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};
