import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../_services/employee.service';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { JobSeekerService } from 'src/app/_services/jobSeeker.service';

@Component({
  selector: 'app-findjob-jobseeker',
  templateUrl: './findjob-jobseeker.component.html',
  styleUrls: ['./findjob-jobseeker.component.css'],
  
})
export class FindjobJobseekerComponent implements OnInit {
  jobs: any = [];
  searchText: string;
  closeResult: string;
  showSpinner: boolean = true;



  constructor(private _employeeService: EmployeeService, private modalService: NgbModal,
    private _jobSeekerService: JobSeekerService) { }

  ngOnInit() {

    this.loadJobs();  
  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }

  loadJobs(){
    this._jobSeekerService.getJobs().subscribe(res => {
      this.jobs = res;
      this.showSpinner = false;
    });
  }

  searchJobs(event) {
   
    this.searchText = event.target.value;
    this._employeeService
      .getSearchJobs(this.searchText.toLowerCase())
      .subscribe(res => {
        this.jobs = res;
        
      });

  }
}
