import {Router} from 'express';
import {createGame, getAllGames, getGameById} from '../../../client/src/services/gameController.js';

const router = Router();

router.get('/all', getAllGames);
router.get('/:gameId', getGameById);
router.post('/', createGame); 

export default router;

