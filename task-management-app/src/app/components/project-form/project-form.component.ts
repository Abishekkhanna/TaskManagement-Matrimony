import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProjectService, Project } from '../../services/project.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  project: Project = { name: '', description: '' };
  isEditMode = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.isEditMode = true;
      this.projectService.getProject(+id).subscribe({
        next: (data) => (this.project = data),
        error: (err) => console.error('Failed to load project', err)
      });
    }
  }

  onSubmit() {
    if (this.isEditMode && this.project.id) {
      this.projectService.updateProject(this.project.id, this.project).subscribe(() => {
        this.router.navigate(['/projects']);
        this.snackBar.open('Project updated successfully!', 'Close', { duration: 3000 });
      });
    } else {
      this.projectService.createProject(this.project).subscribe(() => {
        this.router.navigate(['/projects']);
        this.snackBar.open('Project created successfully!', 'Close', { duration: 3000 });
      });
    }
  }

  onCancel() {
    this.router.navigate(['/projects']);
  }
}
