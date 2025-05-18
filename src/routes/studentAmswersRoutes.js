import { Router } from 'express';
import studentAnswers from '../controllers/StudentAnswersController';

import loginRequired from '../middlewares/Login';

const router = new Router();

router.get('/', studentAnswers.index);
router.get('/:choiceId', studentAnswers.show);
router.post('/:choiceId', loginRequired, studentAnswers.store);
router.put('/:id', loginRequired, studentAnswers.update);
router.delete('/:id', loginRequired, studentAnswers.delete);

export default router;
