import { EmployeeCardComponent } from './admin/employee-manipulation-admin/employeeCard/employeeCard.component';
import { JobManipulationEmployeeComponent } from './employee/job-manipulation-employee/job-manipulation-employee.component';
import { JobseekerCardComponent } from './employee/jobseeker-manipulation-employee/jobseeker-card/jobseeker-card.component';
import { JobseekerManipulationEmployeeComponent } from './employee/jobseeker-manipulation-employee/jobseeker-manipulation-employee.component';
import { Routes } from "@angular/router";
import { RegisterComponent } from "./jobseeker/register/register.component";
import { HomeComponent } from "./home/home.component";
import { ManageCVJobSeekerComponent } from "./jobseeker/ManageCV-JobSeeker/ManageCV-JobSeeker.component";
import { AuthGuard } from "./_route-guards/auth.guard";
import { FindjobJobseekerComponent } from "./jobseeker/findjob-jobseeker/findjob-jobseeker.component";
import { JobCardComponentComponent } from './employee/job-manipulation-employee/JobCardComponent/JobCardComponent.component';
import { ReportsJobseekerComponent } from './jobseeker/reports-jobseeker/reports-jobseeker.component';
import { EmployeeManipulationAdminComponent } from './admin/employee-manipulation-admin/employee-manipulation-admin.component';
import { JobseekerManipulationAdminComponent } from './admin/jobseeker-manipulation-admin/jobseeker-manipulation-admin.component';
import { JobManipulationAdminComponent } from './admin/job-manipulation-admin/job-manipulation-admin.component';
import { JobseekersReportAdminComponent } from './reports/jobseekers-report-admin/jobseekers-report-admin.component';
import { JobsReportComponent } from './reports/jobs-report/jobs-report.component';
import { EmployeesReportComponent } from './reports/employees-report/employees-report.component';

export const appRoutes: Routes = [
  { path: "", component: HomeComponent },
  {
    path: "",
    canActivate: [AuthGuard],
    runGuardsAndResolvers: "always",
    children: [
      { path: "register", component: RegisterComponent },
      { path: "managecv-jobseeker", component: ManageCVJobSeekerComponent },
      { path: "reports-jobseeker", component: ReportsJobseekerComponent },
      { path: "findjob-jobseeker", component: FindjobJobseekerComponent },
      

      { path: "js-manipulation-employee", component: JobseekerManipulationEmployeeComponent },
      { path: "jobseeker-card/:data", component: JobseekerCardComponent },

      { path: "jobs-employee", component: JobManipulationEmployeeComponent },
      { path: "jobs-card/:data", component: JobCardComponentComponent },

      { path: "js-manipulation-admin", component: JobseekerManipulationAdminComponent },
      { path: "jobs-admin", component: JobManipulationAdminComponent },
      { path: "emp-manipulation-admin", component: EmployeeManipulationAdminComponent },
      { path: "employee-card/:data", component: EmployeeCardComponent },
      { path: "jobseekers-reports", component: JobseekersReportAdminComponent },
      { path: "jobs-reports", component: JobsReportComponent },
      { path: "employees-reports", component: EmployeesReportComponent },


    ]
  },
  

  { path: "**", component: HomeComponent, pathMatch: "full" }
];
