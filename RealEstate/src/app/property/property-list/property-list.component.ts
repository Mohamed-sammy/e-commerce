import { error } from '@angular/compiler/src/util';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { HousingService } from "src/app/services/housing.service";

@Component({
  selector: 'app-property-list',
  templateUrl: './property-list.component.html',
  styleUrls: ['./property-list.component.css']
})
export class PropertyListComponent implements OnInit {
  sellRent=1;
  properties: IPropertyBase[] ;
  today = new Date();
  city = '';
  searchCity = '';
  sortByParam = '';
  sortDirection = 'asc';
  constructor(private route:ActivatedRoute ,private housingservice:HousingService) { }

  ngOnInit(): void {
    if (this.route.snapshot.url.toString()) {
      this.sellRent=2 //Means we are on rent-property URL else we are on base URL
    }
    this.housingservice.getAllProperties(this.sellRent).subscribe(
        data => {
      this.properties=data;
      console.log(data);

    },
    error=>{
      console.log('httperror:');
      console.log(error);

    });
  }
  // Filter by city
  onCityFilter(){
    this.searchCity = this.city;
  }
  // Clear Filter Field
  onCityFilterClear(){
    this.searchCity = '';
     this.city = '';
  }
    //  direction of Sorting array
  onSortDirection(){
    if (this.sortDirection === 'desc') {
      this.sortDirection = 'asc';
    } else {
      this.sortDirection = 'desc';
    }
  }
}
