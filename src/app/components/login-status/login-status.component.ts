import { Component, OnInit } from '@angular/core';
import { OktaAuthService } from '@okta/okta-angular';

@Component({
  selector: 'app-login-status',
  templateUrl: './login-status.component.html',
  styleUrls: ['./login-status.component.css']
})
export class LoginStatusComponent implements OnInit {

  isAuthenticated: boolean=false;
  userFullName:string;

  constructor(private oktAuthService: OktaAuthService ) { }

  ngOnInit(): void {

    this.oktAuthService.$authenticationState.subscribe(
      (result) =>{
        this.isAuthenticated=result;
        this.getUserDetails();
      }
    );

  }
  getUserDetails() {
   if(this.isAuthenticated){
     this.oktAuthService.getUser().then(
       res =>{
         this.userFullName=res.name;
       }
    );
   }
  }
  logout(){
    this.oktAuthService.signOut();
  }

}
