import express from 'express';
import MyUserController from '../controllers/MyUserController';
import { Request, Response } from 'express';
import {
  validateMyUserRequest,
  validateUserLoginRequest,
} from '../middlewares/validation';
import verifyToken from '../middlewares/auth';

const router = express.Router();

router.post(
  '/register',
  validateMyUserRequest,
  MyUserController.createCurrentUser
);
router.post('/login', validateUserLoginRequest, MyUserController.loginUser);
router.get('/validate-token', verifyToken, MyUserController.validateToken);
router.post('/logout', MyUserController.userLogout);

export default router;
