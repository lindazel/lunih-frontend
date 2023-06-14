import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CompanyRoutes } from './company.routing';
import { ListCompanyComponent } from './list-company/list-company.component';
import { FormCompanyComponent } from './form-company/form-company.component';


@NgModule({
  declarations: [
    // Component here
    ListCompanyComponent,
    FormCompanyComponent,  
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

    // Routes
    RouterModule.forChild(CompanyRoutes),
  ]
})
export class CompanyModule { }