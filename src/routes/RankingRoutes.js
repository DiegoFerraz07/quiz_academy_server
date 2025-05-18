import { Router } from 'express';
import rankingController from '../controllers/RankingController';

import loginRequired from '../middlewares/Login';

const router = new Router();

router.get('/', rankingController.index);
router.get('/:gamesId', rankingController.show);
router.post('/', loginRequired, rankingController.store);
router.delete('/:id', loginRequired, rankingController.delete);

export default router;
