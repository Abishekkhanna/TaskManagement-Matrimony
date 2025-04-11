import { Component, OnInit } from '@angular/core';
import { ProjectService, Project } from '../../services/project.service';
import { TaskService, Task } from '../../services/task.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-project-list',
  templateUrl: './project-list.component.html',
  styleUrls: ['./project-list.component.css']
})
export class ProjectListComponent implements OnInit {
  projects: Project[] = [];
  tasks: Task[] = [];

  constructor(private projectService: ProjectService, private router: Router, private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadProjects();
  }

  loadProjects(): void {
    this.projectService.getProjects().subscribe({
      next: (projectData) => {
        this.projects = projectData;

        this.taskService.getTasks().subscribe({
          next: (taskData) => {
            this.tasks = taskData;
            this.projects.forEach(project => {
              const projectTasks = this.tasks.filter(t => t.project_id === project.id);
              const completedTasks = projectTasks.filter(t => t.status === 'Completed').length;
              const totalTasks = projectTasks.length;

              const progress = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

              let color = 'warn';
              if (progress === 100) {
                color = 'primary';
              } else if (progress >= 50) {
                color = 'accent';
              }

              project['progress'] = progress;
              project['completedCount'] = completedTasks;
              project['totalCount'] = totalTasks;
              project['progressColor'] = color;
            });
          }
        });
      },
      error: (err) => console.error('Error loading projects', err),
    });
  }

  onEdit(id: number) {
    this.router.navigate(['/projects/edit', id]);
  }

  onDelete(id: number) {
    if (confirm('Are you sure you want to delete this project?')) {
      this.projectService.deleteProject(id).subscribe(() => {
        this.loadProjects();
      });
    }
  }

  onCreate() {
    this.router.navigate(['/projects/new']);
  }

  viewTasks(projectId: number) {
    this.router.navigate(['/tasks'], { queryParams: { project: projectId } });
  }
}
