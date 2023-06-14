import { Routes } from '@angular/router';

export const CategoriesRoutes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: 'faculty',
        pathMatch: 'full'
      },
      {
        path: 'faculty',
        loadChildren: () => import('./faculty/faculty.module').then(m => m.FacultyModule)
      }
    ]
  }
];