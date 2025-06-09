import { Router } from 'express';
import questionsController from '../controllers/QuestionsController';

import loginRequired from '../middlewares/Login';

const router = new Router();

router.get('/', questionsController.index);
router.get('/:gamesId', questionsController.show);
router.post('/:gamesId', loginRequired, questionsController.store);
router.put('/:questionsIds', loginRequired, questionsController.update);
router.delete('/:id', loginRequired, questionsController.delete);

export default router;
