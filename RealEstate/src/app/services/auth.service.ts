import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  authUser(user:any){
    let userArr = [] ;
    if (localStorage.getItem('Users')) {
      userArr = JSON.parse(localStorage.getItem('Users'));
    }
    return userArr.find(s => s.userName === user.userName && s.password === user.password);
  }
}
