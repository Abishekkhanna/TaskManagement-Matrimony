import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ProjectFormComponent } from './pages/project-form/project-form.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskFormComponent } from './pages/task-form/task-form.component';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {path: '',component:HomeComponent},
  { path: 'projects', component: ProjectListComponent },
  { path: 'projects/new', component: ProjectFormComponent },
  { path: 'projects/edit/:id', component: ProjectFormComponent },
  { path: 'tasks', component: TaskListComponent },
  { path: 'tasks/new', component: TaskFormComponent },
  { path: 'tasks/edit/:id', component: TaskFormComponent },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
