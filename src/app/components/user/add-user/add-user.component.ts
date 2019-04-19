import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { NotifierService } from 'angular-notifier';
import { UserService } from 'src/app/services/user.service';
import { Router, ActivatedRoute } from '@angular/router';
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
      "fname": ["", Validators.required],
      "lname": ["", Validators.required],
      "email": ["", Validators.email],
      "age": ["", Validators.required],
      "mobile": ["", Validators.required]
    });
    //console.log("Child Value: "+ this.route.snapshot.paramMap.get('userToBeEditedFromParent'));
    this.route.params.subscribe(params => {
        console.log("Child Value: ");
        console.log( params);

    });
  }

  userForm: FormGroup;
  //firstName = new FormControl("", Validators.required);

  @Input() userToBeEditedInChild: any;
  
  constructor(private formBuilder: FormBuilder,
    private notifier: NotifierService,
    private userService: UserService,
    private router:Router,
    private route: ActivatedRoute) {
      //console.log("Child Value: "+ this.userToBeEditedInChild);
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


