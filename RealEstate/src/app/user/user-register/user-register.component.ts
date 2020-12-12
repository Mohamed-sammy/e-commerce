import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { UserServicesService } from 'src/app/services/user-services.service';
import { User } from "src/app/model/user";
import { AlertifyService } from 'src/app/services/alertify.service';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.css']
})
export class UserRegisterComponent implements OnInit {
  userSubmitted:boolean;
  registerationForm:FormGroup;
  user: User;
  constructor(private fb:FormBuilder,
              private userService:UserServicesService,
              private alertify:AlertifyService) { }

  ngOnInit(): void {
    // this.registerationForm=new FormGroup({
    //   userName: new FormControl(null, Validators.required),
    //   email: new FormControl(null,[Validators.required, Validators.email]),
    //   password: new FormControl(null,[Validators.required, Validators.minLength(8)]),
    //   confirmpassword: new FormControl(null,Validators.required,),
    //   mobile: new FormControl(null, )
    // }, this.passwordMatchingValidator);
    this.createRegisterationForm();
  }
  createRegisterationForm(){
    this.registerationForm = this.fb.group({
      userName : [null, Validators.required],
      email: [null,[Validators.required, Validators.email]],
      password: [null,[Validators.required, Validators.minLength(8)]],
      confirmpassword: [null,Validators.required,],
      mobile: [null, Validators.required]
    },this.passwordMatchingValidator)
  }
  passwordMatchingValidator(fg:FormGroup):Validators{
    return fg.get('password').value === fg.get('confirmpassword').value ? null :
    {notmathced: true};
  }
  // Getter methods for all form control
  get userName(){
    return this.registerationForm.get('userName') as FormControl;
  }
  get email(){
    return this.registerationForm.get('email') as FormControl;
  }
  get password(){
    return this.registerationForm.get('password') as FormControl;
  }
  get passwordconfirm(){
    return this.registerationForm.get('confirmpassword') as FormControl;
  }
  get mobile(){
    return this.registerationForm.get('mobile') as FormControl;
  }
  onSubmit(){
    console.log(this.registerationForm.value);
    this.userSubmitted=true;
    if (this.registerationForm.valid) {
    // this.user = Object.assign(this.user, this.registerationForm.value);
    this.userService.addUser((this.userData()));
    this.registerationForm.reset();
    this.userSubmitted=false;
    this.alertify.success('Success message');
    }else {
      this.alertify.error('Error message');
    }

  }
  userData():User{
    return this.user = {
      userName:this.userName.value,
      email:this.email.value,
      password:this.password.value,
      mobile:this.mobile.value
    }
  }


}
