import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { Property } from "src/app/model/property";
import { AlertifyService } from 'src/app/services/alertify.service';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
  //@ViewChild('Form') addPropertyForm:NgForm
  @ViewChild('formTabs') formTabs: TabsetComponent;
  addPropertyForm: FormGroup;
  NextClicked: boolean;

  property = new Property();

  propTypes: Array<string> = ["Villa" , "Apartment","Duplex"];
  finishingType: Array<string> = ['Fully' , 'Semi' , 'unfinished'];

  propertyView: IPropertyBase = {
    id : null,
    name : '',
    price: null,
    sellRent: null,
    fType: null,
    pType:null,
    bedrooms:null,
    city:null,
    builtArea:null,
    RTM: null,
  };

  constructor(private housingService: HousingService,
    private fb:FormBuilder,
    private router:Router,
    private alertify:AlertifyService) { }

  ngOnInit(): void {
    this.createAddPropertyForm();
  }

  createAddPropertyForm(){
    this.addPropertyForm = this.fb.group({
      BasicInfo: this.fb.group({
        sellRent:[1,Validators.required],
        bedrooms:[null,Validators.required],
        pType: [null, Validators.required],
        fType: [null, Validators.required],
        name: [null,Validators.required],
        city: [null, Validators.required],}),
        PriceInfo: this.fb.group({
          price: [null, Validators.required],
          CarpetArea: [null],
          Security: [null],
          Maintenance: [null],
          builtArea:[null, Validators.required],
    }),
    AddressInfo: this.fb.group({
      FloorNo: [null],
      TotalFloor: [null],
      Address: [null, Validators.required],
      LandMark: [null],
    }),
    OtherInfo: this.fb.group({
      RTM: [null, Validators.required],
      PossessionOn: [null],
      AOP: [null],
      Gated: [null],
      MainEntrance: [null],
      Description: [null]
    })
  });
}
//#region <GetterMethods>
  //#region <FormGroups>

get BasicInfo(){
  return this.addPropertyForm.controls.BasicInfo as FormGroup;
}
get PriceInfo(){
  return this.addPropertyForm.controls.PriceInfo as FormGroup;
}
get AddressInfo() {
  return this.addPropertyForm.controls.AddressInfo as FormGroup;
}

get OtherInfo() {
  return this.addPropertyForm.controls.OtherInfo as FormGroup;
}
  //#endregion
  //#region <FormsControls>
  get sellRent(){
  return this.BasicInfo.controls.sellRent as FormGroup;
}
get bedrooms(){
  return this.BasicInfo.controls.bedrooms as FormGroup;
}
get price(){
  return this.PriceInfo.controls.price as FormControl;
}
get fType() {
  return this.BasicInfo.controls.fType as FormControl;
}
get pType() {
  return this.BasicInfo.controls.pType as FormControl;
}
get name() {
  return this.BasicInfo.controls.name as FormControl;
}

get city() {
  return this.BasicInfo.controls.city as FormControl;
}

get builtArea() {
  return this.PriceInfo.controls.builtArea as FormControl;
}

get CarpetArea() {
  return this.PriceInfo.controls.CarpetArea as FormControl;
}

get Security() {
  return this.PriceInfo.controls.Security as FormControl;
}

get Maintenance() {
  return this.PriceInfo.controls.Maintenance as FormControl;
}

get FloorNo() {
  return this.AddressInfo.controls.FloorNo as FormControl;
}

get TotalFloor() {
  return this.AddressInfo.controls.TotalFloor as FormControl;
}

get Address() {
  return this.AddressInfo.controls.Address as FormControl;
}

get LandMark() {
  return this.AddressInfo.controls.LandMark as FormControl;
}

get RTM() {
  return this.OtherInfo.controls.RTM as FormControl;
}

get PossessionOn() {
  return this.OtherInfo.controls.PossessionOn as FormControl;
}

get AOP() {
  return this.OtherInfo.controls.AOP as FormControl;
}

get Gated() {
  return this.OtherInfo.controls.Gated as FormControl;
}

get MainEntrance() {
  return this.OtherInfo.controls.MainEntrance as FormControl;
}

get Description() {
  return this.OtherInfo.controls.Description as FormControl;
}
//#endregion
  onBack(){
    this.router.navigate(['/']);
  }
  onSubmit(){
    this.NextClicked = true;

    if (this.allTabsValid()) {
      this.mapProperty();
      this.housingService.addProperty(this.property);
    this.alertify.success('congrats');
    console.log(this.addPropertyForm);
    }else {
      this.alertify.error('please review all the fields');
    }
    if (this.sellRent.value === '2') {
        this.router.navigate(['/rent-property']);
    } else {
        this.router.navigate(['/']);
    }
  }
  mapProperty(): void {
    this.property.id = this.housingService.newPropID();
    this.property.sellRent = +this.sellRent.value;
    this.property.bedrooms = this.bedrooms.value;
    this.property.pType = this.pType.value;
    this.property.name = this.name.value;
    this.property.city = this.city.value;
    this.property.fType = this.fType.value;
    this.property.price = this.price.value;
    this.property.Security = this.Security.value;
    this.property.Maintenance = this.Maintenance.value;
    this.property.builtArea = this.builtArea.value;
    this.property.CarpetArea = this.CarpetArea.value;
    this.property.FloorNo = this.FloorNo.value;
    this.property.TotalFloor = this.TotalFloor.value;
    this.property.Address = this.Address.value;
    this.property.Address2 = this.LandMark.value;
    this.property.RTM = this.RTM.value;
    this.property.AOP = this.AOP.value;
    this.property.Gated = this.Gated.value;
    this.property.MainEntrance = this.MainEntrance.value;
    this.property.Possession = this.PossessionOn.value;
    this.property.Description = this.Description.value;
    this.property.PostedOn = new Date().toString();
  }

  allTabsValid(): boolean {
    if (this.BasicInfo.invalid) {
      this.formTabs.tabs[0].active = true;
      return false;
    }
    if (this.PriceInfo.invalid) {
      this.formTabs.tabs[1].active = true;
      return false;
    }
    if (this.AddressInfo.invalid) {
      this.formTabs.tabs[2].active = true;
      return false;
    }
    if (this.OtherInfo.invalid) {
      this.formTabs.tabs[3].active = true;
      return false;
    }
    return true;
  }
  selectTab(tabId: number, IsCurrentTabValid: boolean) {
    this.NextClicked = true;
    if(IsCurrentTabValid)
    {this.formTabs.tabs[tabId].active = true;}
  }
}
