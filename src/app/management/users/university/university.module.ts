import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UniversityRoutes } from './university.routing';
import { ListUniversityComponent } from './list-university/list-university.component';
import { FormUniversityComponent } from './form-university/form-university.component';


@NgModule({
  declarations: [
    // Component here
    ListUniversityComponent,
    FormUniversityComponent,  
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

    // Routes
    RouterModule.forChild(UniversityRoutes),
  ]
})
export class UniversityModule { }