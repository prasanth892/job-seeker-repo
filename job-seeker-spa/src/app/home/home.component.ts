import { AlertifyService } from './../_services/alertify.service';
import { AuthService } from './../_services/auth.service';
import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  values : any;
  registerMode =  false;
  hideRegisterMsgAndFooter = true;
  userType: any;



    constructor(private _http:HttpClient, public _authService: AuthService,
    private _alertifyService: AlertifyService, private modalService: NgbModal,
    private _router: Router) { }

  ngOnInit() {
    
    this.userType = localStorage.getItem('userType');



    // if(this.authService.decodedToken.unique_name){
    //   this.registerMode =  true;
    // }
  }


  registerModeToggle(): void {

    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(event) {
    console.log(event);
    
    this.registerMode = event;

  }

  openVerticallyCentered(content) {
    this.modalService.open(content, { centered: true });
  }


}
