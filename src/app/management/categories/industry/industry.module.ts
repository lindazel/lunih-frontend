import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IndustryRoutes } from './industry.routing';
import { ListIndustryComponent } from './list-industry/list-industry.component';
import { FormIndustryComponent } from './form-industry/form-industry.component';

@NgModule({
  declarations: [
    // Component here
    ListIndustryComponent,
    FormIndustryComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

    // Routes
    RouterModule.forChild(IndustryRoutes),
  ]
})
export class IndustryModule { }