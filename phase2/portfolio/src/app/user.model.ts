import { Contact } from './contact.model';

export class User
{
    private contacts: Array<Contact> = [];
    constructor(private userName: string, private password: string)
    {}

    getUserName(): string
    {
        return this.userName;
    }

    checkLogin(password: string): boolean
    {
        if(this.password == password)
            return true;
        else
            return false;
    }

    getContacts(): Array<Contact>
    {
        return this.contacts;
    }

    addContact(newContact: Contact)
    {
        this.contacts.push(newContact);
    }

    getPassword(): string
    {
        return this.password;
    }
}