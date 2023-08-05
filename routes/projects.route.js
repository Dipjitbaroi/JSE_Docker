import { Router } from "express";
import { addProjects, deleteProjects, updateProjects, getProjects } from "../controllers/projects.controller.js";
const router = Router();


router.get('/projects',getProjects);
router.post('/projects/add',addProjects);
router.put('/projects/update',updateProjects);
router.delete('/projects/delete',deleteProjects);
export default router;