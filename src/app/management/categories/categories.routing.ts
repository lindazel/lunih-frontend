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
      },
      {
        path: 'industry',
        loadChildren: () => import('./industry/industry.module').then(m => m.IndustryModule)
      },
      {
        path: 'program',
        loadChildren: () => import('./program/program.module').then(m => m.ProgramModule)
      },
      {
        path: 'post-type',
        loadChildren: () => import('./post-type/post-type.module').then(m => m.PostTypeModule)
      }
    ]
  }
];