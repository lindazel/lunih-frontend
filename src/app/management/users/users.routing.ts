import { Routes } from '@angular/router';

export const UsersRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'student',
        pathMatch: 'full'
      },
      {
        path: 'student',
        loadChildren: () => import('./student/student.module').then(m => m.StudentModule)
      },
      {
        path: 'university',
        loadChildren: () => import('./university/university.module').then(m => m.UniversityModule)
      },
      {
        path: 'company',
        loadChildren: () => import('./company/company.module').then(m => m.CompanyModule)
      },
      {
        path: 'admin',
        loadChildren: () => import('./admin/admin.module').then(m => m.AdminModule)
      },
    ]
  }
];