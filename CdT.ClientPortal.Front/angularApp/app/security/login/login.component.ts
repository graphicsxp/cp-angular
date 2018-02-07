import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  selector: 'cdt-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public userName: string;
  public password: string;
  private _returnUrl: string;

  constructor(private _route: ActivatedRoute, private _router: Router, private _authService: AuthService) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this._returnUrl = this._route.snapshot.queryParams['returnUrl'] || '/';
  }

  public onLogin(): void {
    this._authService.login(this.userName, this.password)/*.subscribe(
      () => {
          console.log("User is logged in");
          this.router.navigateByUrl('/');
      }
  )*/;
    this._router.navigate([this._returnUrl]);
  }
}
