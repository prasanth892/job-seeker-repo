import { AlertifyService } from "./../_services/alertify.service";
import { Component, OnInit } from "@angular/core";
import { AuthService } from "../_services/auth.service";
import { Router } from "@angular/router";
import { JwtHelperService } from "@auth0/angular-jwt";

@Component({
  selector: "app-nav",
  templateUrl: "./nav.component.html",
  styleUrls: ["./nav.component.css"]
})
export class NavComponent implements OnInit {
  photoUrl = "../../../../../assets/images/user.png";
  model: any = {};
  toggleBtn: boolean =  false;
  userOptions: string;
  jwtHelper = new JwtHelperService();
  userType: any;
  
  

  constructor(
    public _authService: AuthService,
    private _alertifyService: AlertifyService,
    private _router: Router
  ) {
   
  }

  ngOnInit() {
    this.userType = localStorage.getItem('userType');
     
  }
  
  toggleNav($event) {
   this.toggleBtn = !this.toggleBtn;
  }

  login() {
    this._authService.login(this.model).subscribe(
      (res) => {
        this.userType = localStorage.getItem('userType');
        // this.userOptions = res;      // getting admin
          // console.log('uo => '+this.userOptions);
          
        this._alertifyService.success("Logged in successfully");
      },
      error => {
        this._alertifyService.error("Invalid login details");
      },
      () => {
        if(this.userType == 'jobseeker'){
          this._router.navigate(['/managecv-jobseeker']);
        }else if(this.userType == 'admin'){
          this._router.navigate(['/js-manipulation-admin']);
        }
        else{
          this._router.navigate(['/js-manipulation-employee']);
        }
      }
    );
  }

  logout() {
    localStorage.removeItem("token");
    
    this._alertifyService.success("Logged out successfully");
    this._router.navigate(['/home']);
  }

  loggedIn() {
    //this._authService.loggedIn();
    
    const token = localStorage.getItem("token");
    return !!token;
  }
}
