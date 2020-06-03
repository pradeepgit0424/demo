import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { first } from 'rxjs/operators';
import { Login } from '../../models/login.model';
import { Router } from '@angular/router';
import { LoginService } from '../../services';


@Component({
  selector: 'app-user-login',
  templateUrl: './user-login.component.html',
  styleUrls: ['./user-login.component.css']
})
export class UserLoginComponent implements OnInit {

  LoggedInUserId: number; // variable to hold user ID of logged in user
  loginForm: FormGroup; // form group variable
  notValidLogin = false; // variable handlling not valid login
  submitted = false;
  //For Json data
  selectedUsername: any;
  selectedPassword: any;
  loginStatus: string;
  displayName: string;

  constructor(private formBuilder: FormBuilder, private router: Router, private loginService: LoginService) { }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });
    this.loginStatus = '';
  }

  get getForm() { return this.loginForm.controls; }

  // On Submit of Login Username/Password
  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
    //Authentication section
    else {
      this.loginService.loginAuthentication(this.loginForm.value.username, this.loginForm.value.password).pipe(first()).subscribe(
        data => {
          if (data) {
            this.router.navigate(['/outdoor']);
            // store user details and basic auth credentials in local storage to keep user logged in between page refreshes
            sessionStorage.setItem('currentUser', JSON.stringify(data.displayName));
            sessionStorage.setItem('userId', JSON.stringify(data.userId));
            sessionStorage.setItem('roleId', JSON.stringify(data.roleId));
            this.LoggedInUserId = data.userId;
            this.displayName = data.displayName;
          }
          else {
            this.notValidLogin = true;
            this.loginStatus = 'Username or Password is incorrect';
          }
        });
    }
  }
}
