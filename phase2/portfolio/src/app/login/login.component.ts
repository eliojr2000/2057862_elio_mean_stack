import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  failedLogin: boolean = false;

  constructor(private router: Router, private ds: DatabaseService) { }

  ngOnInit(): void {
  }

  login(n: string, p: string)
  {
    this.failedLogin = false;
    if(this.ds.login(n, p))
    {
      this.router.navigate(["/myPortfolio"]);
    }
    else
    {
      this.failedLogin = true;
    }
  }

  signUp()
  {
    this.router.navigate(["/signUp"]);
  }

}
