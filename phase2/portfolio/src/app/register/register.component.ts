import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';

import { DatabaseService } from '../database.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  failedRegister: boolean = false;
  fieldBlank: boolean = false;

  constructor(private router: Router, private ds: DatabaseService) { }

  ngOnInit(): void {
  }

  back(): void
  {
    this.router.navigate(["/login"]);
  }

  register(n: string, p: string): void
  {
    this.fieldBlank = false;
    this.failedRegister = false;

    if(n == "" || p == "")
    {
      this.fieldBlank = true;
      return;
    }

    if(this.ds.register(n, p))
    {
      this.router.navigate(["/login"]);
    }
    else
    {
      this.failedRegister = true;
    }
  }

}
