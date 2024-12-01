import express from 'express';
import { verifyToken, isAdmin } from '../middlewares/authmiddleware.js'; // Corrected path
import { getGames, addGame, updateGame, deleteGame, addAchievement, updateAchievement, deleteAchievement } from '../controllers/gameController.js';

const router = express.Router();

router.get('/', getGames);
router.post('/', verifyToken, isAdmin, addGame);
router.put('/:id', verifyToken, isAdmin, updateGame);
router.delete('/:id', verifyToken, isAdmin, deleteGame);
router.post('/:id/achievements', verifyToken, isAdmin, addAchievement);
router.put('/:id/achievements/:achievementId', verifyToken, isAdmin, updateAchievement);
router.delete('/:id/achievements/:achievementId', verifyToken, isAdmin, deleteAchievement);

export default router;