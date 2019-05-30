import { employeeReport } from './../_models/employeeReport';
import { jobReport } from './../_models/jobReport';
import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { AuthService } from './auth.service';
import { catchError, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs/internal/Observable';
import { employee } from '../_models/employee';
import { throwError } from 'rxjs';
import { jobSeekerReport } from '../_models/jobSeekerReport';

@Injectable({
  providedIn: 'root'
})
export class AdminService {

  constructor(private http: HttpClient, private authServe: AuthService) { }
  baseUrl = environment.apiUrl +  'admin/';

// Employee
////////////////////////////////////////////////////////

// Get Employees
getSearchEmployees(searchString?: string) {

  if(searchString === undefined){
    searchString = 'all';
  }


  const headers = new HttpHeaders();
  headers.append( 'Accept','application/json');
  headers.append( 'Access-Control-Allow-Origin','*');
  headers.append( 'Authorization','Bearer ' + localStorage.getItem('token'));
  headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  headers.append( 'username', localStorage.getItem('username'));

  return  this.http.get(this.baseUrl + 'getemployees/' + searchString,
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


saveEmployee(model: employee): Observable<any>{

  const headers = new HttpHeaders();
  headers.append("Content-Type", "application/json");
  headers.append( 'Accept','application/json; charset=utf-8');
  headers.append( 'Access-Control-Allow-Origin','http://localhost:5000');
  headers.append( 'Authorization','Bearer ' + localStorage.getItem('token'));
  headers.append( 'username', localStorage.getItem('username'));

  return  this.http.post(this.baseUrl + 'saveemployee',
                   model, {headers}) 
                    .pipe(
                     map((res: Response) => {
                       return res;
                      }), catchError(
                       error => {
                        return throwError( error);
                      })
                    );
  }


  // Reports
////////////////////////////////////////////////////////

// Job Seekers Report

getJobSeekersReport(jobseekerReport?: jobSeekerReport) {

  const headers = new HttpHeaders();
  headers.append( 'Accept','application/json');
  headers.append( 'Access-Control-Allow-Origin','*');
  headers.append( 'Authorization','Bearer ' + localStorage.getItem('token'));
  headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  headers.append( 'username', localStorage.getItem('username'));

  return  this.http.get(this.baseUrl + 'getreportjobseeker?' + 'education='+ jobseekerReport.education
                                      + '&sector=' + jobseekerReport.sector
                                      + '&state=' + jobseekerReport.state
                                      + '&type=' + jobseekerReport.type
                                      + '&startdate=' + jobseekerReport.startDate.toISOString().slice(0,10) 
                                      + '&finishdate=' + jobseekerReport.finishDate.toISOString().slice(0,10), 
  {headers}) 
  .pipe(
    map((res: Response) => {
      // console.log('from admin service: ' + res.json());
      return res;  
    }), catchError(
     error => {
      return error.message;
    })
  );
}

// Jobs Report

getJobsReport(jobReport?: jobReport) {

  const headers = new HttpHeaders();
  headers.append( 'Accept','application/json');
  headers.append( 'Access-Control-Allow-Origin','*');
  headers.append( 'Authorization','Bearer ' + localStorage.getItem('token'));
  headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  headers.append( 'username', localStorage.getItem('username'));

  return  this.http.get(this.baseUrl + 'getreportjob?' 
                                      + '&sector=' + jobReport.sector
                                      + '&state=' + jobReport.state
                                      + '&type=' + jobReport.type
                                      + '&startdate=' + jobReport.startDate.toISOString().slice(0,10) 
                                      + '&finishdate=' + jobReport.finishDate.toISOString().slice(0,10), 
  {headers}) 
  .pipe(
    map((res: Response) => {
      // console.log('from admin service: ' + res.json());
      return res;  
    }), catchError(
     error => {
      return error.message;
    })
  );
}


// Employees Report

getEmployeesReport(employeeReport?: employeeReport) {

  const headers = new HttpHeaders();
  headers.append( 'Accept','application/json');
  headers.append( 'Access-Control-Allow-Origin','*');
  headers.append( 'Authorization','Bearer ' + localStorage.getItem('token'));
  headers.append('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
  headers.append( 'username', localStorage.getItem('username'));

  return  this.http.get(this.baseUrl + 'getreportemployee?' 
                                      + 'status=' + employeeReport.status
                                      + '&startdate=' + employeeReport.startDate.toISOString().slice(0,10) 
                                      + '&finishdate=' + employeeReport.finishDate.toISOString().slice(0,10), 
  {headers}) 
  .pipe(
    map((res: Response) => {
      // console.log('from admin service: ' + res.json());
      return res;  
    }), catchError(
     error => {
      return error.message;
    })
  );
}



}