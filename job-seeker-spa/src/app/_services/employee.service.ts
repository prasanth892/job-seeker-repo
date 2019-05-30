import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { job } from '../_models/job';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  baseUrl = environment.apiUrl +  'employee/';
constructor(private _http: HttpClient, private authServe: AuthService) { }

// Get all jobseekers 
getJobSeekers() {

  const headers = new HttpHeaders();
  headers.append( 'Accept','application/json');
  headers.append( 'Access-Control-Allow-Origin','*');
  headers.append( 'Authorization','Bearer ' + localStorage.getItem('token'));
  headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  headers.append( 'username', localStorage.getItem('username'));
  
  return  this._http.get(this.baseUrl + 'getjobseekers',
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


// Get all jobseekers' photo
getPhotoList() {

  const headers = new HttpHeaders();  
  headers.append( 'Accept','application/json');
  headers.append( 'Access-Control-Allow-Origin','*');
  headers.append( 'Authorization','Bearer ' + localStorage.getItem('token'));
  headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  headers.append( 'username', localStorage.getItem('username'));
  
  return  this._http.get(this.baseUrl +'getjobseekersphotoes' ,
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


// Get selected jobseeker 
getSearchJobSeekers(searchString?: string) {

  if(searchString.length === 0){
    searchString = 'all';
  }


  const headers = new HttpHeaders();
  headers.append( 'Accept','application/json');
  headers.append( 'Access-Control-Allow-Origin','*');
  headers.append( 'Authorization','Bearer ' + localStorage.getItem('token'));
  headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  headers.append( 'username', localStorage.getItem('username'));

  return  this._http.post(this.baseUrl + 'getsearchedjobseekers/' + searchString,
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
  
  return  this._http.get(this.baseUrl + 'getjobs/all',
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



// Get selected Jobs 
getSearchJobs(searchString?: string) {

  if(searchString.length === 0){
    searchString = 'all';
  }

  console.log(searchString);

  const headers = new HttpHeaders();
  headers.append( 'Accept','application/json');
  headers.append( 'Access-Control-Allow-Origin','*');
  headers.append( 'Authorization','Bearer ' + localStorage.getItem('token'));
  headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  headers.append( 'username', localStorage.getItem('username'));

  return  this._http.get(this.baseUrl + 'getjobs/' + searchString,
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

// Save job by Employee
saveJob(model: job): any{

  const headers = new HttpHeaders();
  headers.append("Content-Type", "application/json");
  headers.append( 'Accept','application/json; charset=utf-8');
  headers.append( 'Access-Control-Allow-Origin','http://localhost:5000');
  headers.append( 'Authorization','Bearer ' + localStorage.getItem('token'));
  headers.append( 'username', localStorage.getItem('username'));

  return  this._http.post(this.baseUrl + 'savejob',
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






}