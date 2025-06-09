import { Router } from 'express';
import StudentController from '../controllers/StudentController';

import loginRequired from '../middlewares/Login';

const router = new Router();

router.get('/', StudentController.index);
router.get('/:studentsId', StudentController.show);
router.post('/', StudentController.store);
router.put('/', loginRequired, StudentController.update);
router.delete('/', loginRequired, StudentController.delete);

export default router;
