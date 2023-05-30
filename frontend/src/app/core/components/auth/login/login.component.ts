import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import Swal from 'sweetalert2';

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

  authenticated = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService) { }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLoggedin(e: Event) {
    e.preventDefault();
    this.getUserInfo(this.loginForm.username);
    /*
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
        */
  }

  getUserInfo(email: string) {

    this.userService.getAll()
    .subscribe({
      next: (data) => {
        console.log(data);
        
        data.forEach((user: any) => {
          if(user.email===email){
            localStorage.setItem('userInfo', JSON.stringify(user));
            this.authenticated = true;
          }
        });
      },
      error: (e) => {
        console.log(e);
      },
      complete: () => {
        console.log("done");
        this.navigate();
      }
    })
  }

  navigate(){
    if(this.authenticated){
      localStorage.setItem('isLoggedin', 'true');
      if (localStorage.getItem('isLoggedin')) {
        this.router.navigate([this.returnUrl]);
      }
    }else{
      Swal.fire({
        position: 'top-end',
        icon: 'warning',
        title: 'Verifique credenciales',
        showConfirmButton: false,
        timer: 1800
      }).then(result => {
        console.log(result);
      })
    }
    
  }
}
