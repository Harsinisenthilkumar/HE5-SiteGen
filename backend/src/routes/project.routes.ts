import { Router } from 'express';
import { ProjectController } from '../controllers/project.controller.js';
import { authMiddleware } from '../middleware/auth.js';

const router = Router();
const controller = new ProjectController();

router.post('/generate', controller.generate.bind(controller));
router.get('/projects', authMiddleware, controller.list.bind(controller));
router.get('/projects/:id', authMiddleware, controller.getById.bind(controller));
router.post('/projects/:id/publish', authMiddleware, controller.publish.bind(controller));
router.get('/projects/:id/export', authMiddleware, controller.export.bind(controller));
router.delete('/projects/:id', authMiddleware, controller.remove.bind(controller));
router.get('/projects/:id/preview', authMiddleware, controller.preview.bind(controller));

export default router;
