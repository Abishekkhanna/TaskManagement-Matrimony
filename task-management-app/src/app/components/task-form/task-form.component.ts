import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { TaskService, Task } from '../../services/task.service';
import { ProjectService, Project } from '../../services/project.service';

@Component({
  selector: 'app-task-form',
  templateUrl: './task-form.component.html',
  styleUrls: ['./task-form.component.css']
})
export class TaskFormComponent implements OnInit {
  task: Task = {
    title: '',
    description: '',
    status: 'To Do',
    priority: 'Medium',
    due_date: '',
    project_id: 0
  };

  isEditMode = false;
  projects: Project[] = [];

  constructor(
    private taskService: TaskService,
    private projectService: ProjectService,
    private route: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadProjects();
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.taskService.getTask(+id).subscribe({
        next: data => this.task = data,
        error: err => console.error('Failed to load task', err)
      });
    }
  }

  loadProjects() {
    this.projectService.getProjects().subscribe({
      next: data => this.projects = data
    });
  }

  onSubmit() {
    if (!this.task.title || !this.task.project_id) {
      this.snackBar.open('Please fill in required fields.', 'Close', { duration: 3000 });
      return;
    }

    const operation = this.isEditMode && this.task.id
      ? this.taskService.updateTask(this.task.id, this.task)
      : this.taskService.createTask(this.task);

    operation.subscribe({
      next: () => {
        this.snackBar.open(
          this.isEditMode ? 'Task updated successfully!' : 'Task created successfully!',
          'Close', { duration: 3000 }
        );
        this.router.navigate(['/tasks']);
      },
      error: () => {
        this.snackBar.open('Failed to save task', 'Dismiss', { duration: 3000 });
      }
    });
  }

  onCancel() {
    this.router.navigate(['/tasks']);
  }
}
