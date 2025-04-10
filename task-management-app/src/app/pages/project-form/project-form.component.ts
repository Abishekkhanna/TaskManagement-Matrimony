import { Component, OnInit } from '@angular/core'
import { FormBuilder, FormGroup, Validators } from '@angular/forms'
import { ActivatedRoute, Router } from '@angular/router'
import { ProjectService } from 'src/app/services/project.service'
import { Project } from 'src/app/models/project.model'

@Component({
  selector: 'app-project-form',
  templateUrl: './project-form.component.html',
  styleUrls: ['./project-form.component.css']
})
export class ProjectFormComponent implements OnInit {
  projectForm!: FormGroup
  projectId!: number
  isEdit = false

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private projectService: ProjectService
  ) {}

  ngOnInit(): void {
    this.projectForm = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)]],
      description: ['', [Validators.maxLength(1000)]]
    })

    const idParam = this.route.snapshot.paramMap.get('id')
    if (idParam) {
      this.isEdit = true
      this.projectId = +idParam
      this.projectService.getProjectById(this.projectId).subscribe({
        next: (project) => this.projectForm.patchValue(project),
        error: () => alert('Failed to load project')
      })
    }
  }

  onSubmit(): void {
    if (this.projectForm.invalid) return

    const project: Project = this.projectForm.value

    if (this.isEdit) {
      this.projectService.updateProject(this.projectId, project).subscribe({
        next: () => {
          alert('Project updated successfully')
          this.router.navigate(['/projects'])
        },
        error: () => alert('Failed to update project')
      })
    } else {
      this.projectService.createProject(project).subscribe({
        next: () => {
          alert('Project created successfully')
          this.router.navigate(['/projects'])
        },
        error: () => alert('Failed to create project')
      })
    }
  }
}
