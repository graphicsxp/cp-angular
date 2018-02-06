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
  private returnUrl: string;

  constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) { }

  ngOnInit() {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  public onLogin(): void {
    this.authService.login(this.userName, this.password)/*.subscribe(
      () => {
          console.log("User is logged in");
          this.router.navigateByUrl('/');
      }
  )*/;
    this.router.navigate([this.returnUrl]);
  }
}
