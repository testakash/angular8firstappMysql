import { Component } from '@angular/core';  
import {SlimLoadingBarService} from 'ng2-slim-loading-bar'; 
import { AuthenticationService } from './_services/authentication.service';
import { AlertService} from './_services/alert.service';
import { User } from './_models';

import { NavigationCancel,  
 Event,  
        NavigationEnd,  
        NavigationError,  
        NavigationStart,  
        Router } from '@angular/router';  
@Component({  
  selector: 'app-root',  
  templateUrl: './app.component.html',  
  styleUrls: ['./app.component.css']  
})  
export class AppComponent { 
currentUser: User; 
  title = 'angular8tutorial';  
  constructor(private loadingBar: SlimLoadingBarService, private router: Router,
        private authenticationService: AuthenticationService,private  alertService: AlertService) {  
           this.router.events.subscribe((event: Event) => {  
          this.navigationInterceptor(event);  
        }); 
    this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
  }


  private navigationInterceptor(event: Event): void {  
    if (event instanceof NavigationStart) {  
      this.loadingBar.start();  
    }  
    if (event instanceof NavigationEnd) {  
      this.loadingBar.complete();  
    }  
    if (event instanceof NavigationCancel) {  
      this.loadingBar.stop();  
    }  
    if (event instanceof NavigationError) {  
      this.loadingBar.stop();  
    }  
  }

  logout() {

        this.authenticationService.logout();
        this.router.navigate(['/']);
        this.alertService.notify('success','Logout successfully'); 

    }
}




