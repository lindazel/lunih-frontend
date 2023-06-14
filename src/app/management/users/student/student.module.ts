import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { StudentRoutes } from './student.routing';
import { ListStudentComponent } from './list-student/list-student.component';
import { FormStudentComponent } from './form-student/form-student.component';


@NgModule({
  declarations: [
    // Component here
    ListStudentComponent,
    FormStudentComponent,  
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

    // Routes
    RouterModule.forChild(StudentRoutes),
  ]
})
export class StudentModule { }