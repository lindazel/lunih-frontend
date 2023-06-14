import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { SharedModule } from 'src/app/shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { UsersRoutes } from './users.routing';

@NgModule({
    declarations: [],
    imports: [
        CommonModule,
        SharedModule,
        FormsModule,
        ReactiveFormsModule,

        // Routes
        RouterModule.forChild(UsersRoutes),
    ]
})
export class UsersModule { }