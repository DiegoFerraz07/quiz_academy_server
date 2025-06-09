import { Router } from 'express';
import choicesController from '../controllers/ChoicesController';

import loginRequired from '../middlewares/Login';

const router = new Router();

router.get('/', choicesController.index);
router.get('/:questionsId', choicesController.show);
router.post('/:questionsId', loginRequired, choicesController.store);
router.put('/:questionsId', loginRequired, choicesController.update);
router.delete('/:id', loginRequired, choicesController.delete);

export default router;
