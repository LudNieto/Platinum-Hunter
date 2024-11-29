import {Router} from 'express';
import {login, register, getProfile} from '../controllers/authContrller';

const router = Router();

router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', getUserProfile);

export default router;
