import { Router } from 'express';
import tokenController from '../controllers/TokenController';

import loginRequired from '../middlewares/Login';

const router = new Router();

router.post('/', tokenController.store);
router.get('/me', loginRequired, tokenController.show);
export default router;
