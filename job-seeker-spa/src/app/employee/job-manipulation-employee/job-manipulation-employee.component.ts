import { AlertifyService } from './../../_services/alertify.service';
import { job } from 'src/app/_models/job';
import { EmployeeService } from 'src/app/_services/employee.service';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, NgModule, ViewChild, Input } from "@angular/core";


@Component({
  selector: 'app-job-manipulation-employee',
  templateUrl: './job-manipulation-employee.component.html',
  styleUrls: ['./job-manipulation-employee.component.css']
})
export class JobManipulationEmployeeComponent implements OnInit {

  showSeachBox = false;
  jobs: any = [];
  searchText: string;
  addJobDivShow = false;
  addJobForm: FormGroup;
  jobToSave: any = [];
  showSpinner: boolean = true;


  constructor(private _employeeService: EmployeeService, private _router:Router,
    private _alertifyService: AlertifyService) { }
  
  ngOnInit() {
  this.showSeachBox = false;
  
  this.loadJobs();
  
  }

  loadJobs(){
    this._employeeService.getJobs().subscribe(res => {
      this.jobs = res;
      this.showSpinner = false;

    });
  


  this.addJobForm = new FormGroup({
    jobTitle: new FormControl("", Validators.required),
    postedBy: new FormControl("", Validators.required),
    educationLevel: new FormControl("diploma", Validators.required),
    professionalQualification: new FormControl("Nil", [
      Validators.maxLength(1000),
      Validators.required
    ]),
    specialSkill: new FormControl("Nil", Validators.required),
    specialExperience: new FormControl("Nil", Validators.required),
    sector: new FormControl("administration", Validators.required),
    type: new FormControl("fulltime", Validators.required),
    state: new FormControl("eastern", Validators.required)
  });

  }
  searchJobs(event) {
   
    this.searchText = event.target.value;
    this._employeeService
      .getSearchJobs(this.searchText.toLowerCase())
      .subscribe(res => {
        this.jobs = res;
        this.showSpinner = false;
      });

  }

  showHideSearchBox(){
    this.showSeachBox = !this.showSeachBox;
    
    if(this.addJobDivShow){
      this.addJobDivShow = !this.addJobDivShow;
    }
  }

  showHideAddJobDiv(){    
    this.addJobDivShow = true;   
    
  }

  save(check: boolean){

    if(check){
   
      this._alertifyService.error('Please fillout required fields');
      return false;      
    }
    
    this.jobToSave = this.addJobForm.value;
    this.jobToSave = Object.assign({},this.jobToSave);


    this._employeeService.saveJob(this.jobToSave).subscribe(
      res => {
        this._alertifyService.success("Successfully saved");
        this.showHideSearchBox();
        this.ngOnInit();
      },
      error => {
        this._alertifyService.error(error.message);
      }
    );          
    
  }

  cancel(){
    
    this._alertifyService.confirm('Warning','Do you really wanna cancel...?', 
    () => {this.showHideSearchBox(); this._alertifyService.error('You have cancelled'); return null},
    () => {this.loadJobs(); return null});
    
  }

  navigateToEdit(jobId){
    
    this._router.navigate(['/jobs-card', jobId]);
  }

}
