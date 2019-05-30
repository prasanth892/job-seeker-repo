import { jobSeeker } from "../../_models/jobSeeker";
import { AlertifyService } from "../../_services/alertify.service";
import { JobSeekerService } from "../../_services/jobSeeker.service";
import { Component, OnInit, NgModule, ViewChild, Input } from "@angular/core";
import { BsDatepickerConfig } from "ngx-bootstrap";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { FileUploader } from "ng2-file-upload";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { map, catchError } from "rxjs/operators";
import { throwError } from "rxjs";
import { AuthService } from "../../_services/auth.service";
import { Router } from "@angular/router";


@NgModule({})
@Component({
  selector: "app-ManageCV-JobSeeker",
  templateUrl: "./ManageCV-JobSeeker.component.html",
  styleUrls: ["./ManageCV-JobSeeker.component.css"]
})
export class ManageCVJobSeekerComponent implements OnInit {
  bsConfig: Partial<BsDatepickerConfig> = new BsDatepickerConfig();
  baseUrl = environment.apiUrl;
  uploader: FileUploader;
  hasBaseDropZoneOver = false;
  updateCVForm: FormGroup;
  jobSeeker: any = {};
  imageForCovert: any = {};
  currentDate: any;
  imageUrl:string = '../../assets/images/user.png';
  fileToUpload: File = null;
  agreeCheck = true; // not set yet
  editDate: Date;
  userStatus: any;

  @Input() changeNavOption: string;

  
  constructor(
    private _jobSeekerService: JobSeekerService,
    private _http: HttpClient,
    private _alertify: AlertifyService,
    private _router:Router
    ) {}
    
    currentYear = new Date().getFullYear();
    
    ngOnInit() {
      this.bsConfig = {
        containerClass: "theme-red",
        dateInputFormat: "dddd  YYYY-MM-DD",
        maxDate: new Date((this.currentYear - 16), 1, 1),
        minDate: new Date((this.currentYear-50),1,1)
      };
      
     
     
     
    //  Retrive User from repo
     
      this.currentDate = new Date().getFullYear() - 16;
      
      this._jobSeekerService.getExistingUser(localStorage.getItem('username'))
      .subscribe(res => {
        console.log('data: '+res);
        
        this.updateCVForm.patchValue(res);
        let substringDate = this.updateCVForm.controls['dob'].value;
        substringDate = substringDate.substring(0,10);
        this.updateCVForm.controls['dob'].setValue(substringDate);
        this.userStatus = this.updateCVForm.controls['firstName'].value;
        this.updateCVForm.controls['contactNumber'].setValue('0'+this.updateCVForm.controls['contactNumber'].value);
      });
        

      // Retrive User from Cloudinary API

      let imageRetrived = null;
      this._jobSeekerService.getExistingUserPhoto(localStorage.getItem('username'))
      .subscribe(res => {
          imageRetrived = res;
          this.imageUrl = imageRetrived.url;
      });

      
      

      this.initializeUploader();
      
      this.updateCVForm = new FormGroup({
        firstName: new FormControl("", Validators.required),
        lastName: new FormControl("", Validators.required),
        gender: new FormControl("male", Validators.required),
        dob: new FormControl(),
        religion: new FormControl("buddhism", Validators.required),
        maritalStatus: new FormControl("single"),
        email: new FormControl("", [Validators.email, Validators.required]),
        contactNumber: new FormControl("", [
          Validators.required,
        Validators.pattern("^[0-9]{9,13}$")
      ]),
      
      height: new FormControl("", [
        Validators.max(7.5),
        Validators.required,
        Validators.min(3)
      ]),
      
      address: new FormControl("", [
        Validators.maxLength(300),
        Validators.required
      ]),
      
      overview: new FormControl("", [
        Validators.maxLength(1000),
        Validators.required
      ]),
      
      minEduLvl: new FormControl("diploma", Validators.required),
      
      minNumGscePasses: new FormControl("9 passes", [
        Validators.maxLength(300),
        Validators.required
      ]),

      specificEduLvl: new FormControl("Nil", [
        Validators.maxLength(1000),
        Validators.required
      ]),
      
      specificProfessionalLvl: new FormControl("Nil", [
        Validators.maxLength(1000),
        Validators.required
      ]),
      
      specificSkill: new FormControl("Nil", [
        Validators.maxLength(1000),
        Validators.required
      ]),
      
      specificExperience: new FormControl("Nil", [
        Validators.maxLength(1000),
        Validators.required
      ]),
      
      sector: new FormControl("administration", Validators.required),
      state: new FormControl("eastern", Validators.required),
      type: new FormControl("fulltime", Validators.required),
      username: new FormControl(
        localStorage.getItem("username"),
        Validators.required
        ) 
    });   

}



  initializeUploader() {
    this.uploader = new FileUploader({
      url: this.baseUrl + 'photo/addphoto/',
      authToken: "Bearer " + localStorage.getItem("token"),
      isHTML5: true,
      allowedFileType: ["image"],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
      
    });
    
    this.uploader.onBuildItemForm = function(fileItem, form){
      form.append('username',localStorage.getItem('username'));
    }
    
    this.uploader.onSuccessItem = (item: any, resonse: any, status: any) => {
      this.imageUrl = resonse;
    }
    
    this.uploader.onAfterAddingFile = (file) => {file.withCredentials = false;};
  }
  
        
        
  save(check: boolean) {
    
    if(check){
   
      this._alertify.error('Please fillout required fields');
      return false;      
    }

    this.jobSeeker = this.updateCVForm.value;
    this.jobSeeker = Object.assign({},this.jobSeeker);

    this._jobSeekerService.updateJobSeeker(this.jobSeeker).subscribe(
      res => {
        this._alertify.success("Successfully saved");
        return false;
      },
      error => {
        this._alertify.error(error.message);
      }
    );
    
    
  }
  
  
  // validateInputs(check: boolean){
  //   if(check){
  //     return true;
  //   }
  //   this._alertify.error('Please fillout required fields');
  //   return false;
  // } 

  cancel(){
    // this._alertifyService.confirm('Warning','Do you really wanna cancel...?', 
    // () => { this._router.navigate(['/findjob-jobseeker']);
    //  this._alertifyService.error('You have cancelled'); 
    //  return null},
    // () => {this.loadJobs(); return null});
    
    this._router.navigate(['/findjob-jobseeker']);
  }




}