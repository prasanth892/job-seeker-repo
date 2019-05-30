import { Component, OnInit } from "@angular/core";
import { jobSeeker } from "src/app/_models/jobSeeker";
import { EmployeeService } from "src/app/_services/employee.service";
import { Router, NavigationExtras } from "@angular/router";
import { FormGroup, FormControl } from "@angular/forms";
import { NgxSpinnerService } from 'ngx-spinner';


@Component({
  selector: "app-jobseeker-manipulation-employee",
  templateUrl: "./jobseeker-manipulation-employee.component.html",
  styleUrls: ["./jobseeker-manipulation-employee.component.css"]
})
export class JobseekerManipulationEmployeeComponent implements OnInit {
  jobSeekers: any = [];
  images: any = [];
  combineJsWithImage: any;
  userName: string;
  searchText: string;
  defaultSearch = 'all';
  showSpinner: boolean = true;
  criteriaForm: FormGroup;

  constructor(private _employeeService: EmployeeService, private _router:Router) {}

  ngOnInit() {
    
    
    
    this.loadJobSeekers();
    
    this.criteriaForm = new FormGroup({
      criteria: new FormControl('all')
    });
}



  searchJobSeeker(event) {

    this.searchText = event.target.value;
    this._employeeService
      .getSearchJobSeekers(this.searchText.toLowerCase())
      .subscribe(res => {
        this.jobSeekers = res;
      });
  }

  navigateJobSeeker(username) {
    
    this._router.navigate(['/jobseeker-card', username]);
  }

  loadJobSeekers() {
    //  Retrive User from repo
    this._employeeService.getJobSeekers().subscribe(res => {
      this.jobSeekers = res;
      this.showSpinner = false;
    });

    // Retrive User from Cloudinary API

    let imageRetrived = null;
    this._employeeService.getPhotoList().subscribe(res => {
      imageRetrived = res;
      this.images = imageRetrived;
    });
  }


}
