import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './dashboard.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './pages/home/home.component';
import { UserComponent } from './pages/user/user.component';
import { AccountComponent } from './pages/account/account.component';
import { TransactionComponent } from './pages/transaction/transaction.component';


@NgModule({
  declarations: [
    DashboardComponent,
    SidebarComponent,
    NavbarComponent,
    HomeComponent,
    UserComponent,
    AccountComponent,
    TransactionComponent
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule
  ]
})
export class DashboardModule { }
