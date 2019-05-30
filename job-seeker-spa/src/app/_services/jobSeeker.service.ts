import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import { jobSeeker } from '../_models/jobSeeker';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class JobSeekerService {

  baseUrl = environment.apiUrl +  'jobseeker/';

  constructor(private _http: HttpClient, private authServe: AuthService) {}

// JOBS
////////////////////////////////////////////////////////

// Get all jobs 
getJobs() {

  const headers = new HttpHeaders();
  headers.append( 'Accept','application/json');
  headers.append( 'Access-Control-Allow-Origin','*');
  headers.append( 'Authorization','Bearer ' + localStorage.getItem('token'));
  headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  headers.append( 'username', localStorage.getItem('username'));
  
  return  this._http.get(environment.apiUrl +  'employee/' + 'getjobs/all-jobseeker',
  {headers}) 
  .pipe(
    map((res: Response) => {                 
     return res;  
    }), catchError(
     error => {
      return error.message;
    })
  );
}

  updateJobSeeker(model: jobSeeker): any{

    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    headers.append( 'Accept','application/json; charset=utf-8');
    headers.append( 'Access-Control-Allow-Origin','http://localhost:5000');
    headers.append( 'Authorization','Bearer ' + localStorage.getItem('token'));
    headers.append( 'username', localStorage.getItem('username'));

    return  this._http.post(this.baseUrl + 'jobseekersave',
                     model, {headers}) 
                      .pipe(
                       map((res: Response) => {
                         return res;
                        }), catchError(
                         error => {
                          console.log('Following error occured: ' + error.message);
                          return error;
                        })
                      );
  }

  ///
  // get photo user for edit option

  // return  this._http.post("http://localhost:5000/api/photo/" + photo.username ,

  ///


  // change the format to photo

  
  uploadPhoto(photo: any): any{

    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    headers.append( 'Accept','application/json; charset=utf-8');
    headers.append( 'Access-Control-Allow-Origin','http://localhost:5000');
    headers.append( 'Authorization','Bearer ' + localStorage.getItem('token'));
    headers.append( 'username', localStorage.getItem('username'));
      
  
      return  this._http.post(this.baseUrl + 'addphoto' ,
                  photo, {headers}) 
                  .pipe(
                  map((res: Response) => {
                    console.log(res.json());
                    
                    return res;
                    }), catchError(
                    error => {
                      console.log(error);
                      return error;
                    })
                  );      
    }
  
  getExistingUser(username) {
    const headers = new HttpHeaders();
    
    headers.append( 'Accept','application/json');
    headers.append( 'Access-Control-Allow-Origin','*');
    headers.append( 'Authorization','Bearer ' + localStorage.getItem('token'));
    headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    headers.append( 'username', localStorage.getItem('username'));
    
    return  this._http.get('http://localhost:5000/api/jobseeker/getjobseeker?username=' + username ,
    {headers}) 
    .pipe(
      map((res: Response) => {
       return res;  
      }), catchError(
       error => {
        return error.message;
      })
    );
  }

  getExistingUserPhoto(username) {
    const headers = new HttpHeaders();
    
    headers.append( 'Accept','application/json');
    headers.append( 'Access-Control-Allow-Origin','*');
    headers.append( 'Authorization','Bearer ' + localStorage.getItem('token'));
    headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    headers.append( 'username', localStorage.getItem('username'));
    
    return  this._http.get('http://localhost:5000/api/photo/' + username ,
    {headers}) 
    .pipe(
      map((res: Response) => {
       return res;  
      }), catchError(
       error => {
        return error.message;
      })
    );
  }   



//////
  report(model: any): any{

    const headers = new HttpHeaders();
    headers.append("Content-Type", "application/json");
    headers.append( 'Accept','application/json; charset=utf-8');
    headers.append( 'Access-Control-Allow-Origin','*');
    headers.append( 'Authorization','Bearer ' + localStorage.getItem('token'));
      
      return  this._http.post('http://localhost:5000/api/report/test',
                        model, {headers}) 
                        .pipe(
                         map((res: Response) => {
                           return res;
                          }), catchError(
                           error => {
                            console.log(error);
                            return error;
                          })
                        );
    }
  


}
