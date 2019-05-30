import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from './_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  
  title = 'job-seeker-spa';

  jwtHelper = new JwtHelperService();
  
  constructor(private _authService: AuthService){
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if(token){
      this._authService.decodedToken = this.jwtHelper.decodeToken(token);
    }

    // const userType = localStorage.getItem('userType');
    // if(userType){
    //   this._authService.userType = this.jwtHelper.decodeToken(userType);
    //   console.log('utype in app cpm => '+ userType);
    // }
  }


}
