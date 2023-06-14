import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListPostTypeComponent } from './list-post-type/list-post-type.component';
import { FormPostTypeComponent } from './form-post-type/form-post-type.component';
import { PostTypeRoutes } from './post-type.routing';

@NgModule({
  declarations: [
    // Component here
    ListPostTypeComponent,
    FormPostTypeComponent,
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

    // Routes
    RouterModule.forChild(PostTypeRoutes),
  ]
})
export class PostTypeModule { }