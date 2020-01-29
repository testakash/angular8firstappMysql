import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';  
import { ActivatedRoute, Router } from '@angular/router';  
import { UserService } from '../_services/user.service';
import { AlertService} from '../_services/alert.service';
declare var require: any;
var v=require('../validator/custom_validator');


@Component({
  selector: 'app-user-add',
  templateUrl: './user-add.component.html',
  styleUrls: ['./user-add.component.css']
})
export class UserAddComponent implements OnInit { 
  
  angForm: FormGroup;
  fileData: File = null;
  previewUrl:any = null;
  fileUploadProgress: string = null;
  uploadedFilePath: string = null;  
  constructor(private route: ActivatedRoute, private router: Router, private ps: UserService, private fb: FormBuilder, private alertService: AlertService) {  
      this.createForm();  
  }

  createForm() {  
    this.angForm = this.fb.group({  
      name: ['', [v.OnlyAlphabetAllowed,Validators.required]],  
      email: ['', [Validators.required,Validators.email]], 
      password: ['', Validators.required ]  
    });  
  } 

  ngOnInit() {
  }

  fileProgress(fileInput: any) {
      this.fileData = <File>fileInput.target.files[0];
      this.preview();
}
 
preview() {
    // Show preview 
    var mimeType = this.fileData.type;
    if (mimeType.match(/image\/*/) == null) {
      return;
    }
 
    var reader = new FileReader();      
    reader.readAsDataURL(this.fileData); 
    reader.onload = (_event) => { 
      this.previewUrl = reader.result; 
    }
}
 
onSubmit() {
    const formData = new FormData();
      formData.append('file', this.fileData);
     alert('suss');
}

  addUser(name,email,password,image) {  
    console.log(image); 
    this.ps.addUser(name,email,password)
    .subscribe(res => {
      this.alertService.notify('success','User added successfully');
      this.router.navigate(['users']);
    },error=>console.log);
     
  }

  

  
  
  

}


