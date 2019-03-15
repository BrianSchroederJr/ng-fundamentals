import { Component, OnInit } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { ISession, IEvent } from '../events/shared/event.model';
import { EventService } from '../events/index';

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

  searchTerm = '';
  foundSessions: ISession[];
  currentEvents: IEvent[];

  constructor(public authService: AuthService, private eventService: EventService) {}

  searchSessions(searchTerm) {
    this.eventService.searchSessions(searchTerm).subscribe(data => { this.foundSessions = data; });

  }

  ngOnInit() {
    this.eventService.getEvents().subscribe(currEvents => { this.currentEvents = currEvents as IEvent[]; });
  }

}
