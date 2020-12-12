import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Property } from 'src/app/model/property';
import { HousingService } from 'src/app/services/housing.service';
import {NgxGalleryOptions} from '@kolkov/ngx-gallery';
import {NgxGalleryImage} from '@kolkov/ngx-gallery';
import {NgxGalleryAnimation} from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.css']
})
export class PropertyDetailComponent implements OnInit {
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  public propertyId:number;
  property = new Property();

  constructor(private route:ActivatedRoute,
               private router:Router,
               private housing:HousingService) { }

  ngOnInit(){
    this.propertyId = +this.route.snapshot.params['id'];
    this.route.data.subscribe(
      (data: Property) =>{
        this.property = data ['prop'];
      }
    )
    // this.route.params.subscribe((params)=>{
    //   this.propertyId =+params['id'];
    //   this.housing.getProperty(this.propertyId).subscribe(
    //     (data:Property) => {
    //       this.property = data;
    //     }
    //   )
    // });
    this.galleryOptions = [
      {
        width: '100%',
        height: '465px',
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide
      },
    ]

    this.galleryImages = [
      {
        small: 'assets/Images/1-small.jpg',
        medium: 'assets/Images/1-small.jpg',
        big: 'assets/Images/1-small.jpg'
      },
      {
        small: 'assets/Images/2-small.jpg',
        medium: 'assets/Images/2-small.jpg',
        big: 'assets/Images/2-small.jpg'
      },
      {
        small: 'assets/Images/3-small.jpg',
        medium: 'assets/Images/3-small.jpg',
        big: 'assets/Images/3-small.jpg'
      },
      {
        small: 'assets/Images/4-small.jpg',
        medium: 'assets/Images/4-small.jpg',
        big: 'assets/Images/4-small.jpg'
      },
      {
        small: 'assets/Images/5-small.jpg',
        medium: 'assets/Images/5-small.jpg',
        big: 'assets/Images/5-small.jpg'
      }
    ];
  }


}
