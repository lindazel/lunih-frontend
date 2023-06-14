import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListAdminComponent } from './list-admin/list-admin.component';
import { FormAdminComponent } from './form-admin/form-admin.component';
import { AdminRoutes } from './admin.routing';


@NgModule({
  declarations: [
    // Component here
    ListAdminComponent,
    FormAdminComponent,  
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

    // Routes
    RouterModule.forChild(AdminRoutes),
  ]
})
export class AdminModule { }