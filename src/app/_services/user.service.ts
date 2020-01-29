import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
  
@Injectable({  
  providedIn: 'root'  
})  
export class UserService {  
  uri = 'http://localhost:8080';  
  constructor(private http: HttpClient) { } 

  login(email,password) {  
    console.log(email,password);  
    const obj = {  
        email,  
        password  
    };  
     return this.http.post(`${this.uri}/login`, obj);        
  }
  
  addUser(name,email,password) {  
    console.log(name,email,password);  
    const obj = {  
        name,  
        email,
        password  
    };  
    return this.http.post(`${this.uri}/addUser`, obj); 
          
  }  
  getUsers() {  
    const obj={};
    return  this.http.post(`${this.uri}/users`,obj);  
  }  
  editUser(id) {
     const obj={};  
    return this.http.post(`${this.uri}/user/${id}`,obj);  
    } 
    
  

  updateUser(name,email,id) {  
    const obj = {  
      name,  
      email,
      id        
    };  
    console.log(obj,"Called");
    return this.http.post(`${this.uri}/updateUser`, obj);  
  } 


  

  deleteUser(id) {
    const obj={id};   
    return this.http.post(`${this.uri}/deleteUser`,obj);  
  } 

   fileupload(formData) {
     
    return formData;  
  } 
} 