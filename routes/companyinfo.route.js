import { Router } from "express";
import { addCommunicators, addLocation, deleteCommunicators, deleteLocation, getCommunicators, getLocation, updateCommunicators, updateLocation } from "../controllers/company.controller.js";
const router = Router();

router.get('/location',getLocation);
router.post('/location/add',addLocation);
router.put('/location/update',updateLocation);
router.delete('/location/delete',deleteLocation);

router.get('/commiunicators',getCommunicators);
router.post('/commiunicators/add',addCommunicators);
router.put('/commiunicators/update',updateCommunicators);
router.delete('/commiunicators/delete',deleteCommunicators);
export default router;