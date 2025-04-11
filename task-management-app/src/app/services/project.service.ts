import { Injectable } from '@angular/core'
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs'

export interface Project {
  id?: number
  name: string
  description?: string
  created_at?: string
  progress?: number
  completedCount?: number
  totalCount?: number
  progressColor?: string
}

@Injectable({
  providedIn: 'root'
})
export class ProjectService {
  private apiUrl = 'http://localhost:3000/api/projects'

  constructor(private http: HttpClient) {}

  getProjects(): Observable<Project[]> {
    return this.http.get<Project[]>(this.apiUrl)
  }

  getProject(id: number): Observable<Project> {
    return this.http.get<Project>(`${this.apiUrl}/${id}`)
  }

  createProject(project: Project): Observable<any> {
    return this.http.post(this.apiUrl, project)
  }

  updateProject(id: number, project: Project): Observable<any> {
    return this.http.put(`${this.apiUrl}/${id}`, project)
  }

  deleteProject(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`)
  }
}
