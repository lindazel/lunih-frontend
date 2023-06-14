import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FacultyRoutes } from './faculty.routing';
import { ListFacultyComponent } from './list-faculty/list-faculty.component';
import { FormFacultyComponent } from './form-faculty/form-faculty.component';

@NgModule({
  declarations: [
    // Component here
    ListFacultyComponent,
    FormFacultyComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

    // Routes
    RouterModule.forChild(FacultyRoutes),
  ]
})
export class FacultyModule { }