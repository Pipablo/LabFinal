import { Routes } from '@angular/router';
export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./features/home/home.component').then((m) => m.Home),
    title: 'home',
  },
  {
    path: 'tasks',
    loadComponent: () =>
      import('./features/tasks/tasks.component').then((m) => m.Tasks),
    title: 'Tasks',
  },
  {
    path: 'tasks/:id',
    loadComponent: () =>
      import('./features/task-details/task-details.component').then(
        (m) => m.TaskDetailsComponent
      ),
    title: 'Task Details',
  },
  {
    path: '**',
    redirectTo: '/home',
  },
];
