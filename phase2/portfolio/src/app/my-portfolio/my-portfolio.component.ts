import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { DatabaseService } from '../database.service';

import { User } from '../user.model';
import { Contact } from '../contact.model';

@Component({
  selector: 'app-my-portfolio',
  templateUrl: './my-portfolio.component.html',
  styleUrls: ['./my-portfolio.component.css']
})
export class MyPortfolioComponent implements OnInit {

  invalidContact: boolean = false;
  contactList: Array<Contact> = [];
  duplicateContact: boolean = false;

  constructor(private router: Router, private db: DatabaseService)
  {
    this.contactList = db.getCurrentUser().getContacts();
  }

  ngOnInit(): void {}
  

  getName(): string
  {
    if(this.db.getCurrentUser().getUserName() == "yourenotsupposedtopickthisname")
    {
      console.log("not logged in, redirecting to login page...");
      this.router.navigate(["/login"]);
    }
    return this.db.getCurrentUser().getUserName();
  }

  addContact(n: string, p: string)
  {
    this.invalidContact = false;
    this.duplicateContact= false;

    if(n == "" || p == "")
    {
      this.invalidContact = true;
      return;
    }


    this.db.addContact(n, p);

    //After successfully adding a new contact, we
    //clear the text boxes for convenience
    (document.getElementsByClassName("contactForm")[0] as HTMLInputElement).value = "";
    (document.getElementsByClassName("contactForm")[1] as HTMLInputElement).value = "";
  }

  logOff()
  {
    this.db.logOff();
    this.router.navigate(["/login"]);
  }

  getContacts(): Array<Contact>
  {
    return this.db.getContacts();
  }

  deleteContact(contact: Contact)
  {
    const index = this.db.getCurrentUser().getContacts().indexOf(contact, 0);
    if (index > -1) {
      this.db.getCurrentUser().getContacts().splice(index, 1);
    }
  }

}
