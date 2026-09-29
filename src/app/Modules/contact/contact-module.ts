import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { Contact } from './contact/contact';
import { Addcontact } from './addcontact/addcontact';

const routes: Routes = [
  {
    path: '',component: Contact
  },
  {
    path: 'add', component: Addcontact
  }

];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ContactModule {}
