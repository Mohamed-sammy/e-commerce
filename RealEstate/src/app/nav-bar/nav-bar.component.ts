import { Component, OnInit } from '@angular/core';
import { AlertifyService } from '../services/alertify.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {
  loogedinUser: string;
  constructor(private alertify:AlertifyService) { }

  ngOnInit(): void {
  }
  loggedIn(){
   this.loogedinUser = localStorage.getItem('token');
   return this.loogedinUser;
  }
  onloggedOut(){
    localStorage.removeItem('token');
    this.alertify.warning('You Logged Out');
  }
}
