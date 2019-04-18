import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import {first} from "rxjs/operators";

@Component({
  selector: 'addUser',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.css']
})
export class AddUserComponent implements OnInit {

  submitted: boolean= false;
  ngOnInit(): void {
    this.userForm = this.formBuilder.group({
      "firstName": ["", Validators.required],
      "lastName": ["", Validators.required],
      "email": ["", Validators.email],
      "age": ["", Validators.required],
      "mobile": ["", Validators.required]
    });
  }

  userForm: FormGroup;
  //firstName = new FormControl("", Validators.required);

  constructor(private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private userService: UserService,
    private router:Router) {

  }

  onSubmit() {
    this.submitted = true;
    if (this.userForm.invalid) {
      return;
    }
    console.log("User Object: "+this.userForm.value);

    this.userService.addUser(this.userForm.value)
      .subscribe( data => {
        this.notifier.notify("success", "User added successfulyy!!");
        //this.router.navigate(['users']);
      });

    
  }

}


