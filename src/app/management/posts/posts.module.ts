import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ListPostComponent } from './list-post/list-post.component';
import { FormPostComponent } from './form-post/form-post.component';
import { PostRoutes } from './posts.routing';


@NgModule({
  declarations: [
    // Component here
    ListPostComponent,
    FormPostComponent,  
    
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    ReactiveFormsModule,

    // Routes
    RouterModule.forChild(PostRoutes),
  ]
})
export class PostModule { }