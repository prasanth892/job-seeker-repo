import { employee } from './../../_models/employee';
import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { EmployeeService } from 'src/app/_services/employee.service';
import { Router } from '@angular/router';
import { AlertifyService } from 'src/app/_services/alertify.service';
import { AdminService } from 'src/app/_services/admin.service';

@Component({
  selector: 'app-employee-manipulation-admin',
  templateUrl: './employee-manipulation-admin.component.html',
  styleUrls: ['./employee-manipulation-admin.component.css']
})
export class EmployeeManipulationAdminComponent implements OnInit {

  showSeachBox = false;
  employees: any = [];
  searchText: string;
  addJobDivShow = false;
  addEmployeeForm: FormGroup;
  employeeToSave: any = [];
  showSpinner: boolean = true;


  constructor(private _AdminService: AdminService, private _router:Router,
    private _alertifyService: AlertifyService) { }
  
  ngOnInit() {
  this.showSeachBox = false;
  this.loadEmployees();
  }

  loadEmployees(){
    this._AdminService.getSearchEmployees().subscribe(res => {
      this.employees = res;
      this.showSpinner = false;
    }); 


  this.addEmployeeForm = new FormGroup({
    firstName: new FormControl("", [Validators.required, Validators.maxLength(100)]),
    lastName: new FormControl("", [Validators.required, Validators.maxLength(100)]),
    contactNumber: new FormControl("", [
      Validators.required,
      Validators.pattern("^[0-9]{10}$")
  ]),
    status: new FormControl("active", Validators.required),
    username: new FormControl("", [Validators.required, Validators.maxLength(10)]),
    password: new FormControl("", [Validators.required, Validators.maxLength(10), Validators.minLength(4)])
  });

  }
  searchEmployees(event) {
   
    if(event.target.value.length == 0 ){
      this.loadEmployees();
    }

    this.searchText = event.target.value;
    this._AdminService
      .getSearchEmployees(this.searchText.toLowerCase())
      .subscribe(res => {
        this.employees = res;
      });

  }

  showHideSearchBox(){
    this.showSeachBox = !this.showSeachBox;
    
    if(this.addJobDivShow){
      this.addJobDivShow = !this.addJobDivShow;
    }
  }

  showHideAddJobDiv(){    
    this.addJobDivShow = true;     
  }

  save(){
 
    this.employeeToSave = this.addEmployeeForm.value;
    this.employeeToSave = Object.assign({},this.employeeToSave);


    this._AdminService.saveEmployee(this.employeeToSave).subscribe(
      res => {
        this._alertifyService.success("Successfully saved");
        this.showHideSearchBox();
        this.ngOnInit();
      },
      error => {
        if(error.status == 400){
          this._alertifyService.error("Existing username please try different one");
        }
        else{

          this._alertifyService.error(error.message);
        }
     
      }
    );          
    
  }

  cancel(){
    
    this._alertifyService.confirm('Warning','Do you really wanna cancel...?', 
    () => {this.showHideSearchBox(); this._alertifyService.error('You have cancelled'); return null},
    () => { return null;});
    
  }

  navigateToEdit(empUsername){     
    this._router.navigate(['/employee-card', empUsername]);
  }


}
