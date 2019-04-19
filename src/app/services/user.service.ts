import { Injectable } from '@angular/core';
import { User } from './../model/user';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  apiUrl:string = "http://localhost:8081/api/";

  constructor(private http : HttpClient) { 
  }

  getUsers() {
    return this.http.get<User[]>(this.apiUrl+'users');
   }

   deleteUser(userId: number){
    return this.http.delete(this.apiUrl+'user/'+userId);
   }

   addUser(user: User){
     console.log(user);
     return this.http.post(this.apiUrl+ 'user/', user );
   }

   editUser(user: User){
    console.log(user);
    return this.http.put(this.apiUrl+ 'user/', user );
  }
 
}