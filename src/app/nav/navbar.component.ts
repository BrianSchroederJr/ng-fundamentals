import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';

@Component({
  selector: 'nav-bar',
  templateUrl: './navbar.component.html',
  styles: [`
    .nav.navbar-nav {font-size: 15px;}
    #searchForm {margin-right: 100px;}
    @media (max-width: 1200px) {#searchForm {display: none}}  /* Hide the searchForm piece if the window gets too small (less than or equal to 1200px) */
    li > a.active { color: #F97924; }
  `]
})
export class NavbarComponent implements OnInit {

  constructor(public authService: AuthService) {}

  ngOnInit() {
  }

}
