import { AgePipePipe } from './_pipes/AgePipe.pipe';
import { JobseekerManipulationEmployeeComponent } from './employee/jobseeker-manipulation-employee/jobseeker-manipulation-employee.component';
import { CommonService } from './_services/Common.service';
import { NumericTextboxModule } from 'ngx-numeric-textbox';
import { MatFormFieldModule, MatInputModule, MatSelectModule, MatCardModule } from 
   '@angular/material';
import { AlertifyService } from './_services/alertify.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Pipe } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import  { FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BsDropdownModule, TabsModule, BsDatepickerModule, PaginationModule } from 'ngx-bootstrap';
import { appRoutes } from './Routes';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { FileUploadModule } from "ng2-file-upload";

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from './_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './jobseeker/register/register.component';
import { RouterModule } from '@angular/router';
import { ManageCVJobSeekerComponent } from './jobseeker/ManageCV-JobSeeker/ManageCV-JobSeeker.component';
import { AuthGuard } from './_route-guards/auth.guard';

import { FindjobJobseekerComponent } from './jobseeker/findjob-jobseeker/findjob-jobseeker.component';
import { MDBBootstrapModule  } from 'angular-bootstrap-md';

import { JobSeekerService } from './_services/jobSeeker.service';
import { JobseekerCardComponent } from './employee/jobseeker-manipulation-employee/jobseeker-card/jobseeker-card.component';
import { JobManipulationEmployeeComponent } from './employee/job-manipulation-employee/job-manipulation-employee.component';
import { JobCardComponentComponent } from './employee/job-manipulation-employee/JobCardComponent/JobCardComponent.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { ReportsJobseekerComponent } from './jobseeker/reports-jobseeker/reports-jobseeker.component';
import { EmployeeManipulationAdminComponent } from './admin/employee-manipulation-admin/employee-manipulation-admin.component';
import { EmployeeCardComponent } from './admin/employee-manipulation-admin/employeeCard/employeeCard.component';
import { JobseekerManipulationAdminComponent } from './admin/jobseeker-manipulation-admin/jobseeker-manipulation-admin.component';
import { JobManipulationAdminComponent } from './admin/job-manipulation-admin/job-manipulation-admin.component';
import { SanitizeUrlPipe } from '../app/_pipes/sanitizeUrl.pipe';
import { SanitizeUrl } from './sanitizeUrl.pipe';
import { JobseekersReportAdminComponent } from './reports/jobseekers-report-admin/jobseekers-report-admin.component';
import { JobsReportComponent } from './reports/jobs-report/jobs-report.component';
import { EmployeesReportComponent } from './reports/employees-report/employees-report.component';
import { NgxSpinnerService, NgxSpinnerModule } from 'ngx-spinner';
import { LoadingSpinnerComponent } from './ui/loading-spinner/loading-spinner.component';




@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      ManageCVJobSeekerComponent,
      ReportsJobseekerComponent,
      FindjobJobseekerComponent,
      JobseekerManipulationEmployeeComponent,
      JobseekerCardComponent,
      SanitizeUrlPipe,
      JobManipulationEmployeeComponent,
      JobCardComponentComponent,
      EmployeeManipulationAdminComponent,
      EmployeeCardComponent,
      JobseekerManipulationAdminComponent,
      JobManipulationAdminComponent,
      JobseekersReportAdminComponent,
      JobsReportComponent,
      EmployeesReportComponent,
      LoadingSpinnerComponent,
      AgePipePipe,
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      BrowserAnimationsModule,
      BsDatepickerModule.forRoot(),
      MatFormFieldModule,
      MatSelectModule,
      MatInputModule,
      MDBBootstrapModule.forRoot(),
      FormsModule,
      FileUploadModule,
      ReactiveFormsModule,
      NumericTextboxModule,
      MatCardModule,
      NgbModule,
      NgxSpinnerModule,
      
      
      
   ],
   providers: [
      AuthService,
      AlertifyService,
      AuthGuard,
      JobSeekerService,
      CommonService,
      
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { 
   SanitizeUrlPipe
}
