import { Routes } from '@angular/router';

export const routes: Routes = [

  {
    path: '',
    loadChildren: () => import('./Modules/contact/contact-module').then((m) => m.ContactModule),
  },
];
