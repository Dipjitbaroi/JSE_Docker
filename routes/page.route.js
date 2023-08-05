import { Router } from "express";
import {
    about_container_addData,
    about_addData,
    getAbout,
    getHome,home_addData, getServices, getTeam, getPortfolio, services_addData, team_addData, portfolio_addData, services_container_addData, updateHome, updateAbout, updateServices, updateTeam, updatePortfolio, deleteHome, deleteAbout, deleteServices, deleteTeam, deletePortfolio
} from "../controllers/page.controllers.js";
// import { addEmployees, getEmployees } from "../controllers/users.controller.js";
// import { addProjects, getProjects } from "../controllers/projects.controller.js";
// import { addLocation, getLocation } from "../controllers/company.controller.js";

const router = Router();

router.get('/home',getHome);
router.get('/about',getAbout);
router.get('/services',getServices);
router.get('/team',getTeam);
// router.get('/employees',getEmployees);
router.get('/portfolio',getPortfolio);
// router.get('/projects',getProjects);
// router.get('/location',getLocation);

router.post('/home/add',home_addData);
router.post('/about/add',about_addData);
router.post('/services/add',services_addData);
router.post('/team/add',team_addData);
// router.post('/employees/adddata',addEmployees);
router.post('/portfolio/add',portfolio_addData);
// router.post('/projects/adddata',addProjects);
// router.post('/location',addLocation);

router.post('/about/container/add',about_container_addData);
router.post('/services/container/add',services_container_addData);
// router.post('/login',loginUser);

router.put('/home/update',updateHome);
router.put('/about/update',updateAbout);
router.put('/services/update',updateServices);
router.put('/team/update',updateTeam);
router.put('/portfolio/update',updatePortfolio);
router.put('/about/container/update',updateAbout);
router.put('/services/container/update',updateAbout);

router.delete('/home/delete',deleteHome);
router.delete('/about/delete',deleteAbout);
router.delete('/service/delete',deleteServices);
router.delete('/team/delete',deleteTeam);
router.delete('/portfolio/delete',deletePortfolio);
export default router;