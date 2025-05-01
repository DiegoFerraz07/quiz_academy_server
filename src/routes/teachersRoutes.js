import { Router } from 'express';
import teacherController from '../controllers/TeacherController';

import loginRequired from '../middlewares/Login';

const router = new Router();

router.get('/', teacherController.index);
router.post('/', teacherController.store);
router.put('/:id', loginRequired, teacherController.update);
router.delete('/:id', loginRequired, teacherController.delete);

export default router;
