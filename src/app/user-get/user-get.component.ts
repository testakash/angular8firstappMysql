import { Component, OnInit } from '@angular/core';  
import { UserService } from '../_services/user.service';
import { AlertService} from '../_services/alert.service';


@Component({
  selector: 'app-user-get',
  templateUrl: './user-get.component.html',
  styleUrls: ['./user-get.component.css']
})
export class UserGetComponent implements OnInit {
  users:{};  
  constructor(private ps: UserService, private alertService: AlertService) { } 

  ngOnInit() {
   var token = localStorage.getItem('token');  
    this.ps.getUsers().subscribe((data) => {
    console.log(data);
    if(data['data'].length>0){
     this.users = data['data'];
    
    }
    });
    
   }

   deleteUser(id) {  
    this.ps.deleteUser(id).subscribe(res => {  
      this.ps  
          .getUsers()  
          .subscribe(data => {  
            if(data['data'].length>0){           
            this.users = data['data'];
            } 
        });
        this.alertService.notify('success','User deleted successfully'); 
    });  
  }
}






