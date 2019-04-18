import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserComponent } from './components/user/user.component';
import { AddUserComponent } from './components/user/add-user/add-user.component';

const routes: Routes = [
  {path:'users',  component:UserComponent},
  {path:'', component:LoginComponent},
  {path:'addUser', component:AddUserComponent},
  {path:'login', component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  

exports: [RouterModule]
})
export class AppRoutingModule { }
