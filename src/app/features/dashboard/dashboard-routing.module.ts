import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { AccountComponent } from './pages/account/account.component';
import { TransactionComponent } from './pages/transaction/transaction.component';

const routes: Routes = [
   {
    path: '',
    component: DashboardComponent,
    children: [
        {path:'',component:HomeComponent},
        {path:'user',component:UserComponent},
        {path:'account',component:AccountComponent},
        {path:'transaction',component:TransactionComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
