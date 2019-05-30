import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map, catchError, delay } from 'rxjs/operators';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 
import { jobSeeker } from 'src/app/_models/jobSeeker';
import { photo } from 'src/app/_models/photo';
import { JobSeekerService } from 'src/app/_services/jobSeeker.service';


@Component({
  selector: 'app-reports-jobseeker',
  templateUrl: './reports-jobseeker.component.html',
  styleUrls: ['./reports-jobseeker.component.css']
})
export class ReportsJobseekerComponent implements OnInit {

  existingJobSeeker: jobSeeker;
  existingPhoto: photo;

  constructor(private _jobSeeker: JobSeekerService) { }

  ngOnInit() {
        this._jobSeeker.getExistingUser(localStorage.getItem('username'))
        .subscribe(res => {
          this.existingJobSeeker = res;
        });

        let imageRetrived = null;
        this._jobSeeker.getExistingUserPhoto(localStorage.getItem('username'))
        .subscribe(res => {
          imageRetrived = res;
          this.existingPhoto = imageRetrived.url;
          localStorage.setItem('image', this.existingPhoto.url);
        }, error => {},
        () => delay(3000));

        
  }

  // ngAfterContentInit()	{
  //   this.captureScreen();
  // }



  public captureScreen()  
  {  
      var data = document.getElementById('contentToConvert');  
      html2canvas(data).then(canvas => {  
      // Few necessary setting options  
      var imgWidth = 208;   
      var pageHeight = 295;    
      var imgHeight = canvas.height * imgWidth / canvas.width;  
      var heightLeft = imgHeight;  
  
      const contentDataURL = canvas.toDataURL('image/png')  
      let pdf = new jspdf('p', 'mm', 'a4'); // A4 size page of PDF  
      var position = 0;  
      pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)  
      pdf.save('Curriculam_Vitae.pdf'); // Generated PDF   
    });  
  }  


}
