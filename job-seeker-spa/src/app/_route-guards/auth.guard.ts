import { AlertifyService } from "./../_services/alertify.service";
import { Injectable } from "@angular/core";
import { CanActivate, Router } from "@angular/router";
import { AuthService } from "../_services/auth.service";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate {
  constructor(
    private _authService: AuthService,
    private alertifyService: AlertifyService,
    private _router: Router
  ) {}

  canActivate(): boolean {
    if(this._authService.loggedIn())
      return true;
    else
      this.alertifyService.error('You don\'t have an access to this site & Log in for doing so..');
      this._router.navigate(['/home']);
      return false;
  }
}
