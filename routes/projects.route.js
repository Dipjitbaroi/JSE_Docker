import { Router } from "express";
import { getAllProjects,addProjects, deleteProjects, updateProjects } from "../controllers/projects.controller.js";
const router = Router();


router.get('/projects',getAllProjects);
router.post('/projects/add',addProjects);
router.put('/projects/update',updateProjects);
router.delete('/projects/delete',deleteProjects);
export default router;