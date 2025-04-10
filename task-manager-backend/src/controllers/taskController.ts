import { Request, Response } from 'express';
import { db } from '../db';
import { RowDataPacket } from 'mysql2';

export const getAllTasks = async (_req: Request, res: Response) => {
  try {
    const [rows] = await db.query('SELECT * FROM tasks');
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch tasks' });
  }
};

export const getTask = async (req: Request, res: Response) => {
  try {
    
    const [rows] = await db.query<RowDataPacket[]>('SELECT * FROM tasks WHERE id = ?', [req.params.id]);
    res.json(rows[0]);

  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch task' });
  }
};
const formatDate = (date: any): string | null => {
  if (!date) return null;
  const d = new Date(date);
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`;
};
export const createTask = async (req: Request, res: Response) => {
  const { title, description, status, priority, due_date, project_id } = req.body;

  if (!title || !project_id) {
    res.status(400).json({ error: 'Title and project ID are required' });
    return;
  }

  try {
    // Convert due_date to YYYY-MM-DD format
    

    const formattedDate = formatDate(due_date);

    await db.query(
      'INSERT INTO tasks (title, description, status, priority, due_date, project_id) VALUES (?, ?, ?, ?, ?, ?)',
      [title, description, status, priority, formattedDate, project_id]
    );

    res.status(201).json({ message: 'Task created' });
  } catch (error) {
    console.error('❌ Error inserting task:', error); // 🔍 Debug log
    res.status(500).json({ error: 'Failed to create task' });
  }
};


export const updateTask = async (req: Request, res: Response) => {
  const { title, description, status, priority, due_date, project_id } = req.body;

  try {
    // ✅ Format due_date to MySQL format
    const formattedDate = formatDate(due_date);

    await db.query(
      'UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, due_date = ?, project_id = ? WHERE id = ?',
      [title, description, status, priority, formattedDate, project_id, req.params.id]
    );

    res.json({ message: 'Task updated' });
  } catch (error) {
    console.error('Error updating task:', error); 
    res.status(500).json({ error: 'Failed to update task' });
  }
};


export const deleteTask = async (req: Request, res: Response) => {
  try {
    await db.query('DELETE FROM tasks WHERE id = ?', [req.params.id]);
    res.json({ message: 'Task deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete task' });
  }
};
