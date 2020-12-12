import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { Property } from '../model/property';

@Injectable({
  providedIn: 'root'
})
export class HousingService {

  constructor(private http:HttpClient) { }

  getProperty(id: number) {
    return this.getAllProperties(id).pipe(
      map(propertiesArray => {
        return propertiesArray.find(p => p.id === id);
      })
    );
  }

  getAllProperties(sellRent?:number): Observable<Property[]> {
    return this.http.get('data/properties.json').pipe(map(data=>{
      const propertiesArray: Array<Property> = [];
      const localProperties = JSON.parse(localStorage.getItem('newProp'));
      if (localProperties) {
        for (const id in localProperties) {
          if (sellRent) {
          if (localProperties.hasOwnProperty(id) && localProperties[id].sellRent === sellRent) {
             propertiesArray.push(localProperties[id]);
          }}else{
            propertiesArray.push(localStorage[id]);
          }
        }
      }

      for (const id in data) {
        if(sellRent){
        if (data.hasOwnProperty(id) && data[id].sellRent === sellRent) {
           propertiesArray.push(data[id]);
        }}else{
          propertiesArray.push(data[id]);
        }
      }
      return propertiesArray;
    }));
    return this.http.get<Property[]>('data/properties.json');
  }
  addProperty(property: Property){
    let newProp = [property];
    if (localStorage.getItem('newProp')) {
      newProp = [property,
        ...JSON.parse(localStorage.getItem('newProp'))];
    }
    localStorage.setItem('newProp', JSON.stringify(newProp));
  }
  newPropID(){
    if (localStorage.getItem('PID')) {
      localStorage.setItem('PID', String(+localStorage.getItem('PID') + 1));
      return +localStorage.getItem('PID');
    } else {
      localStorage.setItem('PID', '101');
      return 101;
    }
  }
}
