import { Component } from '@angular/core';
import { GetUsers } from '../../services/http';


@Component({
    selector: 'user',
    templateUrl: './user.html',
    styleUrls: ['./user.css']
})
export class UsersComponent {
    private users: Array<any>;

    constructor (private loadUsers: GetUsers) {
        this.loadUsersList();
    }

    loadUsersList () {
        this.users = null;
        this.loadUsers.request().subscribe(data => {
            this.users = data;
        }, () => {this.users = new Array()})
    }
}
