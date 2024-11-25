import {Router} from 'express';
import {loginUser, registerUser, getUserProfile} from '../controllers/userController.js';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getUserProfile);

export default router;
