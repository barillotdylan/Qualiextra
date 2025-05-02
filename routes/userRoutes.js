import express from 'express';
import {
  getMe,
  updateMe,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from '../controllers/userController.js';
import { authenticate, authorizeRole } from '../middlewares/auth.js';

const router = express.Router();

router.get('/me', authenticate, getMe);
router.put('/me', authenticate, updateMe);

router.get('/', authenticate, authorizeRole('admin'), getAllUsers);
router.get('/:id', authenticate, authorizeRole('admin'), getUserById);
router.put('/:id', authenticate, authorizeRole('admin'), updateUser);
router.delete('/:id', authenticate, authorizeRole('admin'), deleteUser);

export default router;