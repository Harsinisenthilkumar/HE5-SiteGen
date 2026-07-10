import { Router } from 'express';
import { ProjectController } from '../controllers/project.controller.js';

const router = Router();
const controller = new ProjectController();

// Development mode (No Authentication)
router.post('/generate', controller.generate.bind(controller));
router.get('/projects', controller.list.bind(controller));
router.get('/projects/:id', controller.getById.bind(controller));
router.post('/projects/:id/publish', controller.publish.bind(controller));
router.get('/projects/:id/export', controller.export.bind(controller));
router.delete('/projects/:id', controller.remove.bind(controller));
router.get('/projects/:id/preview', controller.preview.bind(controller));

export default router;