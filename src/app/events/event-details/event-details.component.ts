import { Component, OnInit } from '@angular/core';
import { EventService } from '../shared/event.service';
import { ActivatedRoute, Params } from '@angular/router';
import { IEvent, ISession } from '../shared/index';

@Component({
  templateUrl: './event-details.component.html',
  styles: [`
    .container { padding-left: 20px; padding-right: 20px;}
    .event-image {height: 100px;}
    a {cursor: pointer}
  `]
})

export class EventDetailsComponent implements OnInit {
  event: IEvent;
  addMode = false;
  filterBy = 'all';
  sortBy = 'votes';

  constructor(private eventService: EventService, private route: ActivatedRoute) {}

  ngOnInit() {
    this.route.params.forEach((params: Params) => { this.event = this.eventService.getEvent(+params['id']); this.addMode = false; });   // This version DOES update the page when the id param changes and it resets the addMode variable.
    // this.event = this.eventService.getEvent(+this.route.snapshot.params['id']);    // This version does not update page when the id param changes
  }

  addSession() {
    this.addMode = true;
  }

  saveNewSession(session: ISession) {
    const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));  // Get max id from event.sessions
    session.id = nextId + 1;  // Increment nextId to get a unique id for this new session
    this.event.sessions.push(session);  // Add new session to sesssions array
    this.eventService.updateEvent(this.event);
    this.addMode = false;
  }

  cancelAddSession() {
    this.addMode = false;
  }
}
