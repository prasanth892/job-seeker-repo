import { AlertifyService } from "../../_services/alertify.service";
import { AuthService } from "../../_services/auth.service";
import { Component, OnInit, Output, Input, EventEmitter } from "@angular/core";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { Router } from "@angular/router";


// import { User } from '../_models/user';


@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  constructor(
    private _authService: AuthService,
    private _alertifyService: AlertifyService,
    private _router: Router
  ) {}

  @Input() ValueFromHome: any;
  @Output() cancelRegister = new EventEmitter();

  model: any = {};

  ngOnInit() {}

  register() {
    this.model.userType= 'jobseeker';
    this._authService.register(this.model).subscribe(
      res => {

        this._authService.login(this.model).subscribe(
          (res) => {
            this._router.navigate(['/managecv-jobseeker']);
            
            this._alertifyService.success("Logged in successfully");
          },
          error => {
            this._alertifyService.error("Invalid login details");
          }
        );   
        
      },
      error => {
        if (error.status == 400)
        this._alertifyService.error(
          "Existing username please try different one"
          );
          else
          this._alertifyService.error(
            "Error has has been occured while registering: " + error
            );
          },() =>{
            this._alertifyService.success(" Registration successful");
      }
    );
  }

  cancel() {
    this.cancelRegister.emit(false);
    this._alertifyService.error("You have cancelled the Registration");
  }
}
