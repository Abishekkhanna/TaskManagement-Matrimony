import { Component, OnInit } from '@angular/core'
import { TaskService, Task } from '../../services/task.service'
import { ProjectService, Project } from '../../services/project.service'
import { Router, ActivatedRoute } from '@angular/router'

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = []
  filteredTasks: Task[] = []
  paginatedTasks: Task[] = []

  statusFilter: string = ''
  priorityFilter: string = ''
  searchQuery: string = ''

  projects: Project[] = []

  pageSize = 5
  currentPage = 0

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.queryParams.subscribe((params: any) => {
      const projectId = params['project']
      this.loadTasks(projectId)
    })
    this.loadProjects()
  }

  loadTasks(projectId?: number): void {
    this.taskService.getTasks().subscribe({
      next: (data) => {
        this.tasks = projectId ? data.filter(t => t.project_id === +projectId) : data
        this.applyFilters()
      },
      error: (err) => console.error('Error loading tasks', err)
    })
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => (this.projects = data),
      error: (err) => console.error('Error loading projects', err)
    })
  }

  applyFilters(): void {
    const filtered = this.tasks.filter(task =>
      (!this.statusFilter || task.status === this.statusFilter) &&
      (!this.priorityFilter || task.priority === this.priorityFilter) &&
      (!this.searchQuery || task.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    )
    this.filteredTasks = filtered
    this.currentPage = 0
    this.updatePaginatedTasks()
  }

  updatePaginatedTasks(): void {
    const startIndex = this.currentPage * this.pageSize
    const endIndex = startIndex + this.pageSize
    this.paginatedTasks = this.filteredTasks.slice(startIndex, endIndex)
  }

  onPageChange(event: any): void {
    this.pageSize = event.pageSize
    this.currentPage = event.pageIndex
    this.updatePaginatedTasks()
  }

  onCreate(): void {
    this.router.navigate(['/tasks/new'])
  }

  onEdit(id: number): void {
    this.router.navigate(['/tasks/edit', id])
  }

  onDelete(id: number): void {
    if (confirm('Are you sure you want to delete this task?')) {
      this.taskService.deleteTask(id).subscribe(() => this.loadTasks())
    }
  }

  getProjectName(id: number): string {
    const project = this.projects.find(p => p.id === id)
    return project ? project.name : 'Unknown'
  }

  getPriorityColor(priority: string): string {
    switch (priority) {
      case 'High': return 'warn'
      case 'Medium': return 'accent'
      case 'Low': return 'primary'
      default: return ''
    }
  }

  sortTasks(criteria: string): void {
    switch (criteria) {
      case 'title':
        this.filteredTasks.sort((a, b) => (a.title || '').localeCompare(b.title || ''))
        break
      case 'due':
        this.filteredTasks.sort((a, b) => {
          const aDate = a.due_date ? new Date(a.due_date).getTime() : 0
          const bDate = b.due_date ? new Date(b.due_date).getTime() : 0
          return aDate - bDate
        })
        break
      case 'priority':
        const order = { High: 1, Medium: 2, Low: 3 }
        this.filteredTasks.sort((a, b) => (order[a.priority || 'Low'] ?? 4) - (order[b.priority || 'Low'] ?? 4))
        break
    }
    this.currentPage = 0
    this.updatePaginatedTasks()
  }

  getDueDateStatus(task: Task): 'overdue' | 'today' | 'upcoming' | 'completed' {
    if (!task.due_date) return 'upcoming'
    if (task.status === 'Completed') return 'completed'

    const today = new Date()
    const due = new Date(task.due_date)

    today.setHours(0, 0, 0, 0)
    due.setHours(0, 0, 0, 0)

    if (due.getTime() === today.getTime()) return 'today'
    if (due < today) return 'overdue'
    return 'upcoming'
  }
}
