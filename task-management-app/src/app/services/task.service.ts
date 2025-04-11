import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

export interface Task {
  id?: number
  title: string
  description?: string
  status?: 'To Do' | 'In Progress' | 'Completed'
  priority?: 'Low' | 'Medium' | 'High'
  due_date?: string
  project_id: number
}

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:3000/api/tasks'

  constructor(private http: HttpClient) {}

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl)
  }

  getTask(id: number): Observable<Task> {
    return this.http.get<Task>(`${this.apiUrl}/${id}`)
  }

  createTask(task: Task): Observable<any> {
    return this.http.post(this.apiUrl, task)
  }

  updateTask(id: number, task: Task): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, task)
  }

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
