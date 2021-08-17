import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MyPortfolioComponent } from './my-portfolio/my-portfolio.component';

const routes: Routes =
[
  { path: "myPortfolio", component: MyPortfolioComponent },
  { path: "login", component: LoginComponent},
  { path: "", redirectTo: "login", pathMatch: "full" },
  { path: "signUp", component: RegisterComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
