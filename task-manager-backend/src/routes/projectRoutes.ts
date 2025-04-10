import express from 'express';
import {
    createProject,
    getAllProjects,
    getProject,
    
    updateProject,
    deleteProject,
  } from '../controllers/projectController';

const router = express.Router();

router.get('/', getAllProjects);
router.get('/:id', getProject);
router.post('/', createProject);
router.put('/:id', updateProject);
router.delete('/:id', deleteProject);

export default router;
