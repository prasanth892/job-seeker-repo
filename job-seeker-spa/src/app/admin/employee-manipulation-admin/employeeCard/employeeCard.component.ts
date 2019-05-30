import { AdminService } from './../../../_services/admin.service';
import { EmployeeService } from 'src/app/_services/employee.service';
import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-employeeCard',
  templateUrl: './employeeCard.component.html',
  styleUrls: ['./employeeCard.component.css']
})
export class EmployeeCardComponent implements OnInit {

  employees: any = [];
  updateEmployeeForm: FormGroup;
  employeeToSave: any = [];
  selectedEmployee: any = [];
  statusChange: string;


  constructor(private _adminService: AdminService, private _router:Router,
    private _alertifyService: AlertifyService, private _route: ActivatedRoute,) { 
      this.selectedEmployee = _route.snapshot.params['data'];
      
    }

  
  ngOnInit() {
    this.loadEmployee();
    
  }

  loadEmployee(){
    this._adminService.getSearchEmployees(this.selectedEmployee).subscribe(res => {
      this.updateEmployeeForm.patchValue(res[0]);
      
    });

    this.updateEmployeeForm = new FormGroup({
      firstName: new FormControl("", [Validators.required, Validators.maxLength(100)]),
      lastName: new FormControl("", [Validators.required, Validators.maxLength(100)]),
      contactNumber: new FormControl("", [
        Validators.required,
      Validators.maxLength(10),
      Validators.pattern("^[0-9]*$")
    ]),
    status: new FormControl(),
      username: new FormControl("", [Validators.required, Validators.maxLength(10)]),
      password: new FormControl("", [Validators.required, Validators.maxLength(10)])
    });
  

  }
  save(){
    this.employeeToSave = this.updateEmployeeForm.value;
    this.employeeToSave = Object.assign({},this.employeeToSave);

    console.log('checkign' + this.updateEmployeeForm.value);

    this._adminService.saveEmployee(this.employeeToSave).subscribe(
      res => {
        this._alertifyService.success("Successfully saved");        
        this.ngOnInit();
        this._router.navigate(['emp-manipulation-admin']);
      },
      error => {
        this._alertifyService.error(error.message);
      }
    );
              
    
  }

  cancel(){
    
    this._alertifyService.confirm('Warning','Do you really wanna cancel...?', 
    () => { this._router.navigate(['/emp-manipulation-admin']);
     this._alertifyService.error('You have cancelled'); 
     return null},
    () => { return null});
    
  }

}
