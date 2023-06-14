import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListProgramComponent } from './list-program/list-program.component';
import { FormProgramComponent } from './form-program/form-program.component';
import { ProgramRoutes } from './program.routing';

@NgModule({
  declarations: [
    // Component here
    ListProgramComponent,
    FormProgramComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

    // Routes
    RouterModule.forChild(ProgramRoutes),
  ]
})
export class ProgramModule { }