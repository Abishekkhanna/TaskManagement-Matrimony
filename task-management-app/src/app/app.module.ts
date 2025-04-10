import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ProjectListComponent } from './pages/project-list/project-list.component';
import { ProjectFormComponent } from './pages/project-form/project-form.component';
import { TaskListComponent } from './pages/task-list/task-list.component';
import { TaskFormComponent } from './pages/task-form/task-form.component';
import { TaskFiltersComponent } from './components/task-filters/task-filters.component';
import { TaskCardComponent } from './components/task-card/task-card.component';
import { MaterialModule } from './material.module';
import { HttpClientModule } from '@angular/common/http';
import { HomeComponent } from './pages/home/home.component';

@NgModule({
  declarations: [
    AppComponent,
    ProjectListComponent,
    ProjectFormComponent,
    TaskListComponent,
    TaskFormComponent,
    TaskFiltersComponent,
    TaskCardComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
