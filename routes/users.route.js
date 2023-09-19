import { Router } from "express";
import { deleteUser, getClients, getEmployees, getUsers, updateUser } from "../controllers/users.controller.js";
import { loginUser, signupUser, updatePassword } from "../controllers/usersAuth.controller.js";
import { uploadUserfiles } from "../middleware/uploader.js";
const router = Router();


router.get('/users',getUsers);
router.get('/clients',getClients);
router.get('/employees',getEmployees);
router.post('/user/signup',signupUser);
router.post('/user/login',loginUser);
router.patch('/user/updateUser',uploadUserfiles.single('img'),updateUser);
router.patch('/user/updatePassword',updatePassword);

// router.post('/employees/add',addUsers);
// router.patch('/employee/update',updateUser);
router.delete('/employees/deleteUser',deleteUser);
export default router;