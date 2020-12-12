import { Injectable } from '@angular/core';
import * as alertify from 'alertifyjs';

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

  constructor() { }

  success(massage:string){
    alertify.success(massage);
  }
  error(massage:string){
    alertify.error(massage);
  }
  warning(massage:string){
    alertify.warning(massage);
  }
}
