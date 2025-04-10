import { Component, OnInit } from '@angular/core'
import { TaskService } from 'src/app/services/task.service'
import { Task } from 'src/app/models/task.model'
import { ProjectService } from 'src/app/services/project.service'
import { Project } from 'src/app/models/project.model'

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = []
  filteredTasks: Task[] = []
  projects: Project[] = []

  statusFilter = ''
  priorityFilter = ''

  constructor(private taskService: TaskService, private projectService: ProjectService) {}

  ngOnInit(): void {
    this.loadProjects()
    this.loadTasks()
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => (this.projects = data),
      error: () => alert('Failed to load projects')
    })
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = data
        this.applyFilters()
      },
      error: () => alert('Failed to load tasks')
    })
  }

  getProjectName(id: number): string {
    const project = this.projects.find((p) => p.id === id)
    return project ? project.name : 'Unknown'
  }

  applyFilters(): void {
    this.filteredTasks = this.tasks.filter((task) => {
      const statusMatch = this.statusFilter ? task.status === this.statusFilter : true
      const priorityMatch = this.priorityFilter ? task.priority === this.priorityFilter : true
      return statusMatch && priorityMatch
    })
  }

  clearFilters(): void {
    this.statusFilter = ''
    this.priorityFilter = ''
    this.applyFilters()
  }

  editTask(id: number): void {
    window.location.href = `/tasks/edit/${id}`
  }

  deleteTask(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe({
        next: () => this.loadTasks(),
        error: () => alert('Failed to delete task')
      })
    }
  }
}
