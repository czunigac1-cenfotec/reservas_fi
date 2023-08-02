import { Component, OnInit, ViewChild, ElementRef, Inject, Renderer2 } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { Router } from '@angular/router';
import { LocalStorageService, SessionStorageService } from 'ngx-webstorage';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  userInfo:any;

  constructor(
    @Inject(DOCUMENT) private document: Document, 
    private renderer: Renderer2,
    private router: Router,
    private $localStorage: LocalStorageService,
    private $sessionStorage: SessionStorageService,
  ) { }

  ngOnInit(): void {
    this.getUserInfo();
  }

  /**
   * Sidebar toggle on hamburger button click
   */
  toggleSidebar(e: Event) {
    e.preventDefault();
    this.document.body.classList.toggle('sidebar-open');
  }

  /**
   * Logout
   */
  onLogout(e: Event) {
    e.preventDefault();
    localStorage.removeItem('isLoggedin');
    localStorage.removeItem('userInfo');
    if (!localStorage.getItem('isLoggedin')) {
      this.router.navigate(['/auth/login']);
    }
  }

  getUserInfo(){
    debugger;
    try {
      this.userInfo  = this.$localStorage.retrieve('userInfo')

      if (this.userInfo === null) {
        this.userInfo = this.$sessionStorage.retrieve('userInfo')
      }
    }catch(exception){
      console.error(exception);
    }
  }
}
