import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { TaskService } from 'src/app/services/task.service'
import { ProjectService } from 'src/app/services/project.service'
import { Task } from 'src/app/models/task.model'
import { Project } from 'src/app/models/project.model'

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  taskForm!: FormGroup
  taskId!: number
  isEdit = false
  projects: Project[] = []

  constructor(
    private fb: FormBuilder,
    private taskService: TaskService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.taskForm = this.fb.group({
      title: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', [Validators.maxLength(1000)]],
      status: ['To Do'],
      priority: ['Medium'],
      due_date: ['', [Validators.required]],
      project_id: ['', [Validators.required]]
    })

    this.loadProjects()

    const idParam = this.route.snapshot.paramMap.get('id')
    if (idParam) {
      this.isEdit = true
      this.taskId = +idParam
      this.taskService.getTaskById(this.taskId).subscribe({
        next: (task) => this.taskForm.patchValue(task),
        error: () => alert('Failed to load task')
      })
    }
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (data) => (this.projects = data),
      error: () => alert('Failed to load projects')
    })
  }

  onSubmit(): void {
    if (this.taskForm.invalid) return

    const task: Task = this.taskForm.value
    const today = new Date()
    const due = task.due_date ? new Date(task.due_date) : null;

    if (due && due < today) {
      alert('Due date cannot be in the past')
      return
    }

    if (this.isEdit) {
      this.taskService.updateTask(this.taskId, task).subscribe({
        next: () => {
          alert('Task updated successfully')
          this.router.navigate(['/tasks'])
        },
        error: () => alert('Failed to update task')
      })
    } else {
      this.taskService.createTask(task).subscribe({
        next: () => {
          alert('Task created successfully')
          this.router.navigate(['/tasks'])
        },
        error: () => alert('Failed to create task')
      })
    }
  }
}
