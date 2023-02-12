import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  returnUrl: any;

  loginForm = {
    username: '',
    password: ''
  }

  constructor(private router: Router, 
              private route: ActivatedRoute,
              private authService: AuthService) { }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLoggedin(e: Event) {
    e.preventDefault();

    console.log(this.loginForm);
    debugger;

    //TODO: Call auth service
    this.authService.doLogin({userName:this.loginForm.username,
                              password:this.loginForm.password}
                            ).subscribe({
      next:(data)=>{
        console.log(data);
      },
      error:(e)=>{
        console.log(e);
      },
      complete:()=>{
        console.log("done");
        localStorage.setItem('isLoggedin', 'true');
        if (localStorage.getItem('isLoggedin')) {
          this.router.navigate([this.returnUrl]);
        }
      }
    }) 
  }
}
