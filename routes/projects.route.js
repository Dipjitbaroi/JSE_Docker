import { Router } from "express";
import { addProject, deleteProjects, updateProjects, getProjects, updateTeam, addTeamMember, removeTeamMember } from "../controllers/projects.controller.js";
const router = Router();


router.get('/projects',getProjects);
router.post('/projects/addproject',addProject);
router.put('/projects/updateproject',updateProjects);
router.delete('/projects/deleteproject/:project_id',deleteProjects);
router.put('/projects/updateTeamMember',updateTeam);
router.post('/projects/addTeamMember',addTeamMember);
router.delete('/projects/removeTeamMember/:id',removeTeamMember);
export default router;