import { jobSeekerReport } from "./../../_models/jobSeekerReport";
import { AlertifyService } from "src/app/_services/alertify.service";
import { Component, OnInit } from "@angular/core";
import { BsDatepickerConfig } from "ngx-bootstrap";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { AdminService } from "src/app/_services/admin.service";
import { jobSeeker } from "src/app/_models/jobSeeker";
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas';

@Component({
  selector: 'app-jobs-report',
  templateUrl: './jobs-report.component.html',
  styleUrls: ['./jobs-report.component.css']
})
export class JobsReportComponent implements OnInit {
  bsConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();

  loadForm: FormGroup;
  searchKeys = {};
  jobs: any = [];
 


  constructor(
    private _alertifyService: AlertifyService,
    private _adminService: AdminService
  ) {}

  ngOnInit() {

    this.bsConfig = {
      containerClass: "theme-red",
      dateInputFormat: "DD-MM-YYYY",
      maxDate: new Date(),
      minDate: new Date('1-1-10')
    };

    this.loadForm = new FormGroup({
      startDate: new FormControl('1-1-2011'),
      finishDate: new FormControl(new Date()),
      sector: new FormControl("sector", Validators.required),
      state: new FormControl("state", Validators.required),
      type: new FormControl("type", Validators.required)
    });

    this.reset();
  }

  load() {
    // if(this.loadForm.value.startDate == null)
    // {
    //   this.loadForm['startDate'].setValue('1-1-10');
    // }

    // if(this.loadForm.value.finishDate== null)
    // {
    //   this.loadForm['finishDate'].setValue('1-1-2020');
    // }

    this.searchKeys = this.loadForm.value;
    this.searchKeys = Object.assign({}, this.searchKeys);

    this._adminService.getJobsReport(this.searchKeys).subscribe(
      res => {
        
        this.jobs = res;
        console.log("loging: " + res);
        // console.log("response => " + res[0].firstName);
      }
    );
  }

  reset() {
    let todayDate = new Date();
    this.loadForm.reset({
      education: "education",
      sector: "sector",
      state: "state",
      type: "type",
      

    });
  }

  printReport(){

    
      var data = document.getElementById('contentToConvert');  
      html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 212;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('Jobseeker_Report.pdf'); // Generated PDF   
    });  

    
  } 

  elements: any = [
    { id: 1, first: "Mark", last: "Otto", handle: "@mdo" },
    { id: 2, first: "Jacob", last: "Thornton", handle: "@fat" },
    { id: 3, first: "Larry", last: "the Bird", handle: "@twitter" }
  ];

  headElements = [
    "No",
    "Job Title",
    "Posted By",
    "Sector",
    "State",
    "Type",
    "Posted on"
  ];

}

