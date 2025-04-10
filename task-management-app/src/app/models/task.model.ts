export type TaskStatus = 'To Do' | 'In Progress' | 'Completed'
export type TaskPriority = 'Low' | 'Medium' | 'High'

export interface Task {
  id?: number
  title: string
  description?: string
  status: TaskStatus
  priority: TaskPriority
  due_date?: string
  project_id: number
}
