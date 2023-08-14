import { Router } from "express";
import { addProject, deleteProjects, updateProjects, getProjects } from "../controllers/projects.controller.js";
const router = Router();


router.get('/projects',getProjects);
router.post('/projects/addproject',addProject);
router.put('/projects/update',updateProjects);
router.delete('/projects/delete',deleteProjects);
export default router;