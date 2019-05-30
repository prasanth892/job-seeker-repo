import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { JwtHelperService} from '@auth0/angular-jwt';
import { environment } from "src/environments/environment";


@Injectable({
  providedIn: "root"
})
export class AuthService {
  
  baseUrl = environment.apiUrl +  'auth/';
  jwtHelper = new JwtHelperService();
  decodedToken: any;
  userType: any;

  constructor(private _http: HttpClient) {}

  login(model: any): any {
    return this._http.post(this.baseUrl + "login", model).pipe(
      map((response: any) => {        
        const user = response;        
        if (user) {
          localStorage.setItem("token", user.token);
          localStorage.setItem("userType", user.userType);
          localStorage.setItem("username", user.username);
          
          this.decodedToken = this.jwtHelper.decodeToken(user.token);
        }
        return user.userType;
      }),
      catchError( error => {
        return throwError('Following error occurred' + error);
      })
    );
  }

  register(model: any){
    
    return this._http.post(this.baseUrl + 'register', model)
               .pipe(
                map((res: Response) => {
                  res;
               }), catchError( error => {
                 return throwError( error);
               }));
  }

  loggedIn() {
    const token = localStorage.getItem('token');
    return !this.jwtHelper.isTokenExpired(token);
  }


}
 