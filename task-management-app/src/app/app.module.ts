import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'
import { AppRoutingModule } from './app-routing.module'
import { AppComponent } from './app.component'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'

import { HttpClientModule } from '@angular/common/http'
import { FormsModule } from '@angular/forms'

import { ProjectFormComponent } from './components/project-form/project-form.component'
import { ProjectListComponent } from './components/project-list/project-list.component'
import { TaskFormComponent } from './components/task-form/task-form.component'
import { TaskListComponent } from './components/task-list/task-list.component'
import { TaskFiltersComponent } from './components/task-filters/task-filters.component'

import { MatToolbarModule } from '@angular/material/toolbar'
import { MatButtonModule } from '@angular/material/button'
import { MatCardModule } from '@angular/material/card'
import { MatIconModule } from '@angular/material/icon'
import { MatFormFieldModule } from '@angular/material/form-field'
import { MatInputModule } from '@angular/material/input'
import { MatTableModule } from '@angular/material/table'
import { MatSelectModule } from '@angular/material/select'
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatNativeDateModule } from '@angular/material/core'
import { MatSnackBarModule } from '@angular/material/snack-bar'
import { MatProgressBarModule } from '@angular/material/progress-bar'
import { MatChipsModule } from '@angular/material/chips'
import { MatPaginatorModule } from '@angular/material/paginator'
import { HomeComponent } from './pages/home/home.component'

@NgModule({
  declarations: [
    AppComponent,
    ProjectFormComponent,
    ProjectListComponent,
    TaskFormComponent,
    TaskListComponent,
    TaskFiltersComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    FormsModule,
    MatToolbarModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatProgressBarModule,
    MatChipsModule,
    MatPaginatorModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
