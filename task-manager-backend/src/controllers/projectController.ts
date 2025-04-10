import { Request, Response } from 'express';
import { db } from '../db';
import { RowDataPacket } from 'mysql2';

export const getAllProjects = async (_req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await db.query('SELECT * FROM projects');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch projects' });
  }
};

export const getProject = async (req: Request, res: Response): Promise<void> => {
  try {
    const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM projects WHERE id = ?', [req.params.id]);
    res.json(rows[0]);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch project' });
  }
};

export const createProject = async (req: Request, res: Response): Promise<void> => {
  const { name, description } = req.body;

  if (!name) {
    res.status(400).json({ error: 'Project name is required' });
    return;
  }

  try {
    await db.query('INSERT INTO projects (name, description) VALUES (?, ?)', [name, description]);
    res.status(201).json({ message: 'Project created' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to create project' });
  }
};

export const updateProject = async (req: Request, res: Response): Promise<void> => {
  const { name, description } = req.body;

  try {
    await db.query('UPDATE projects SET name = ?, description = ? WHERE id = ?', [
      name,
      description,
      req.params.id,
    ]);
    res.json({ message: 'Project updated' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to update project' });
  }
};

export const deleteProject = async (req: Request, res: Response): Promise<void> => {
  try {
    await db.query('DELETE FROM projects WHERE id = ?', [req.params.id]);
    res.json({ message: 'Project deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete project' });
  }
};
