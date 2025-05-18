import { Router } from 'express';
import gamesController from '../controllers/GamesController';

import loginRequired from '../middlewares/Login';

const router = new Router();

router.get('/', gamesController.index);
router.post('/', loginRequired, gamesController.store);
router.put('/:id', loginRequired, gamesController.update);
router.delete('/:id', loginRequired, gamesController.delete);

export default router;
