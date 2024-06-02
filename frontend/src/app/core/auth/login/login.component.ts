import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';
import { AuthService } from 'src/app/core/services/auth.service';
import { UserService } from 'src/app/core/services/user.service';
import { Roles } from 'src/app/enum/roles.enum';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})

export class LoginComponent implements OnInit {

  returnUrl: any;
  url = '';
  userRole = '';

  loginForm = {
    userName: '',
    password: '',
    rememberMe: false
}

  authenticated = false;

  constructor(private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private userService: UserService,
    private $localStorage: LocalStorageService,
    private $sessionStorage: SessionStorageService) { }

  ngOnInit(): void {
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  onLoggedin(e: Event) {
    e.preventDefault();
    this.login();
  }

  login(): void {
    debugger;
    this.authService
        .login({
            userName: this.loginForm.userName,
            password: this.loginForm.password,
            rememberMe: false ,
        })
        .subscribe(
            (data) => {
              debugger;
              if(data.isUserAuthorized){
                this.authenticated = true;
                this.getUserInfo(this.loginForm.userName,this.loginForm.rememberMe);
              }else{
                this.authenticated = false;
                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: 'Credenciales incorrectos',
                    showConfirmButton: false,
                    timer: 1500
                })
              }
            },
            error =>{
                this.authenticated = false;
                Swal.fire({
                    position: 'center',
                    icon: 'info',
                    title: 'Credenciales incorrectos',
                    showConfirmButton: false,
                    timer: 1500
                })
            }
        );
  }

  /*For test purpose*/
  loginTest(): void {
      this.authService.login({ userName: this.loginForm.userName, 
                               password: this.loginForm.password, 
                               rememberMe: this.loginForm.rememberMe})
      .subscribe({
        next: (data) => {
          console.log(data);
        },
        error: (e) => {
          console.log(e);
          //should be in the next block
          this.getUserInfo(this.loginForm.userName,this.loginForm.rememberMe);
        },
        complete: () => {
          console.log("done");
          this.navigate();
        }
      })
  }

  getUserInfo(email: string, rememberMe: boolean) {

    this.userService.getAll()
    .subscribe({
      next: (data) => {
        console.log(data);
        debugger;
        data.forEach((user: any) => {
          if(user.email===email){

            this.$localStorage.store('authenticationtoken','91C95003-ECDF-4B9B-8B9C-5AC072FA6F52');
            this.userRole = user.unidadAcademica;

            if(email === 'test@mail.com'){
              user: user = {
                userInfoUuid:'010d20af-6555-494d-b2f1-6a38b77f87b5',
                nombre:'Test User',
                primerApellido:'Test',
                segundoApellido:'User',
                identificacion: '000000000',
                unidadAcademica: '1',
                telefono:'88888888',
                email : 'test@mail.com'
              };
            
            }

            if (rememberMe) {
                this.$localStorage.store('userInfo', user);
            } else {
                this.$sessionStorage.store('userInfo', user);
            }
            
            this.authenticated = true;
          }
        });

        //TODO: Only for test. This should be validated with LDAP

        if(email === 'test@mail.com'){

          this.$localStorage.store('authenticationtoken','91C95003-ECDF-4B9B-8B9C-5AC072FA6F52');
          this.userRole = Roles.ADMINISTRADOR.toString();

          const user = {
            userInfoUuid:'010d20af-6555-494d-b2f1-6a38b77f87b5',
            nombre:'Test User',
            primerApellido:'Test',
            segundoApellido:'User',
            identificacion: '000000000',
            unidadAcademica: '1',
            telefono:'88888888',
            email : 'test@mail.com'
          };

          if (rememberMe) {
            this.$localStorage.store('userInfo', user);
          } else {
            this.$sessionStorage.store('userInfo', user);
          }
        
          this.authenticated = true;
          this.navigate();
        }
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

  private resolveURLByRole(){

    var userRole = this.userRole;
    switch ( userRole ){
        case Roles.ADMINISTRADOR.toString(): {
            this.url = '/admin/user-list';
            break;
        }
        case Roles.PROFESOR.toString(): {
            this.url = '/reservation/reservation-calendar';
            break;
        }
        case Roles.REGISTRO.toString(): {
          this.url = '/admin/user-list';
          break;
        }
        default: {
            this.url = '/reservation/reservation-calendar';
            break;
        }
    }

    this.router.navigateByUrl(this.url);
}


  navigate(){
    if(this.authenticated){
      localStorage.setItem('isLoggedin', 'true');
      if (localStorage.getItem('isLoggedin')) {
        this.resolveURLByRole();
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
