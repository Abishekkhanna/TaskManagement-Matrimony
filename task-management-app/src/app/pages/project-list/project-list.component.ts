import { Component, OnInit } from '@angular/core'
import { Router } from '@angular/router'
import { ProjectService } from 'src/app/services/project.service'
import { Project } from 'src/app/models/project.model'

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = []

  constructor(private projectService: ProjectService, private router: Router) {}

  ngOnInit(): void {
    this.loadProjects()
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => (this.projects = data),
      error: (err) => alert('Failed to load projects')
    })
  }

  editProject(id: number): void {
    this.router.navigate(['/projects/edit', id])
  }

  deleteProject(id: number): void {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id).subscribe({
        next: () => this.loadProjects(),
        error: () => alert('Failed to delete project')
      })
    }
  }

  addProject(): void {
    this.router.navigate(['/projects/new'])
  }
}
