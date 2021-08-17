import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  //Dummy username and password whenever we are not logged in

  private currentUser: User = new User("yourenotsupposedtopickthisname", "123");
  private users: Array<User> = [];

  constructor(){}

  getCurrentUser(): User
  {
    return this.currentUser;
  }

  //Must be logged in
  addContact(n: string, p: string): void
  {
    this.currentUser.addContact({name: n, phone: p});
  }

  //Must be logged in
  getContacts(): Array<Contact>
  {
    return this.currentUser.getContacts();
  }

  deleteContact()
  {
    
  }

  logOff(): void
  {
    this.currentUser = new User("yourenotsupposedtopickthisname", "123");
  }

  login(userName: string, password: string): boolean
  {
    for(var x of this.users)
    {
      if(x.getUserName() == userName)
      {
        if(x.checkLogin(password))
        {
          this.currentUser = x;
          return true;
        }
      }
      break;
    }

    return false;
  }

  register(n: string, p: string): boolean
  {
    for(var x of this.users)
    {
      if(x.getUserName() == n)
      {
        return false;
      }
    }
    this.users.push(new User(n, p));
    return true;
  }

  getAllUsers(): Array<User>
  {
    return this.users;
  }
}
