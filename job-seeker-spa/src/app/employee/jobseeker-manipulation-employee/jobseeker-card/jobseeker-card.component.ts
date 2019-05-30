import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { JobSeekerService } from "src/app/_services/jobSeeker.service";
import { jobSeeker } from "src/app/_models/jobSeeker";
import { ActivatedRoute } from "@angular/router";
import { photo } from "src/app/_models/photo";
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 


@Component({
  selector: "app-jobseeker-card",
  templateUrl: "./jobseeker-card.component.html",
  styleUrls: ["./jobseeker-card.component.css"]
})
export class JobseekerCardComponent implements OnInit {
  currentDate: Date;
  jobSeeker: jobSeeker
  imageUrl: string;
  date: string;
  existingJobSeeker: jobSeeker;
  existingPhoto: photo;

  @Output() sendMemberCard = new EventEmitter();

  selectedUsername: string;

  public constructor(private _route: ActivatedRoute, private _jobSeeker: JobSeekerService) {
  this.selectedUsername = _route.snapshot.params['data'];
    

}
  ngOnInit() {
    
    this._jobSeeker.getExistingUser(this.selectedUsername)
    .subscribe(res => {
      this.existingJobSeeker = res;
    });

    let imageRetrived = null;
    this._jobSeeker.getExistingUserPhoto(this.selectedUsername)
    .subscribe(res => {
      imageRetrived = res;
      this.existingPhoto = imageRetrived.url;
      localStorage.setItem('image', this.existingPhoto.url);
    }, error => {});

   
  }
 
  sendMemberCardsToParent() {
    this.sendMemberCard.emit("");
  }  

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



// this.route.queryParams.subscribe(params => {
//   this.selectedUsername = params["username"];
//   console.log(this.selectedUsername);
// });