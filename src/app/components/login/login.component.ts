import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthenticationService } from './../../services/authentication.service';
import {first} from "rxjs/operators";
import { NotifierService } from 'angular-notifier';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  submitted: boolean = false;
  invalidLogin: boolean = false;
  constructor(private formBuilder: FormBuilder, 
    private router: Router, 
    private authService: AuthenticationService, 
    private notifier: NotifierService) {

     }

  onSubmit() {
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
    }
    if(this.loginForm.controls.email.value == 'anup.bhagwat7@gmail.com' && this.loginForm.controls.password.value == 'password') {
        this.router.navigate(['users']);
        this.notifier.notify("success", "Login successfull!!");
    }else {
      this.invalidLogin = true;
      this.notifier.notify("error", "Invalid credentials!!");
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }


}
