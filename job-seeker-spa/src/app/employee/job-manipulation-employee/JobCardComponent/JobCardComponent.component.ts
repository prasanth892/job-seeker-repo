import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { EmployeeService } from 'src/app/_services/employee.service';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-JobCardComponent',
  templateUrl: './JobCardComponent.component.html',
  styleUrls: ['./JobCardComponent.component.css']
})
export class JobCardComponentComponent implements OnInit {

  jobs: any = [];
  addJobForm: FormGroup;
  jobToSave: any = [];
  selectedJob: any = [];
  statusChange: string;


  constructor(private _employeeService: EmployeeService, private _router:Router,
    private _alertifyService: AlertifyService, private _route: ActivatedRoute,) { 
      this.selectedJob = _route.snapshot.params['data'];
      
    }

  
  ngOnInit() {
    this.loadJobs();
    
  }

  loadJobs(){
    this._employeeService.getSearchJobs(this.selectedJob).subscribe(res => {
      this.addJobForm.patchValue(res[0]);      
    });



  this.addJobForm = new FormGroup({
    jobTitle: new FormControl("", Validators.required),
    postedBy: new FormControl("", Validators.required),
    educationLevel: new FormControl("", Validators.required),
    professionalQualification: new FormControl("Nil", [
      Validators.maxLength(1000),
      Validators.required
    ]),
    specialSkill: new FormControl("Nil", Validators.required),
    specialExperience: new FormControl("Nil", Validators.required),
    sector: new FormControl("", Validators.required),
    type: new FormControl("", Validators.required),
    state: new FormControl("", Validators.required),
    id: new FormControl(this.selectedJob.id, Validators.required),
    
    // not update here
    status: new FormControl()
  });

  }
  save(){
    this.jobToSave = this.addJobForm.value;
    this.jobToSave = Object.assign({},this.jobToSave);

    this._employeeService.saveJob(this.jobToSave).subscribe(
      res => {
        this._alertifyService.success("Successfully saved");        
        this.ngOnInit();
        this._router.navigate(['jobs-employee']);
      },
      error => {
        this._alertifyService.error(error.message);
      }
    );          
    
  }

  cancel(){
    
    this._alertifyService.confirm('Warning','Do you really wanna cancel...?', 
    () => { this._router.navigate(['jobs-employee']);
     this._alertifyService.error('You have cancelled'); 
     return null},
    () => {this.loadJobs(); return null});
    
  }


}
