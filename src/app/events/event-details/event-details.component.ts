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
    this.route.data.forEach((routeData) => {
      this.event = routeData['event'];
      this.addMode = false;
  });   // This API version DOES update the page when the id param changes and it resets the addMode variable and uses a resolver to verify the route and simplified a bit.
    // this.route.params.forEach((params: Params) => {
    //     this.event = this.route.snapshot.data['event'];
    //     this.addMode = false;
    // });   // This API version DOES update the page when the id param changes and it resets the addMode variable and uses a resolver to verify the route.
    // this.route.params.forEach((params: Params) => {
    //   this.eventService.getEvent(+params['id']).subscribe((event: IEvent) => {
    //     this.event = event;
    //     this.addMode = false;
    //   });
    // });   // This API version DOES update the page when the id param changes and it resets the addMode variable.
    //this.route.params.forEach((params: Params) => { this.event = this.eventService.getEvent(+params['id']); this.addMode = false; });   // This version DOES update the page when the id param changes and it resets the addMode variable.
    // this.event = this.eventService.getEvent(+this.route.snapshot.params['id']);    // This version does not update page when the id param changes
  }

  addSession() {
    this.addMode = true;
  }

  saveNewSession(session: ISession) {
    const nextId = Math.max.apply(null, this.event.sessions.map(s => s.id));  // Get max id from event.sessions
    session.id = nextId + 1;  // Increment nextId to get a unique id for this new session
    this.event.sessions.push(session);  // Add new session to sesssions array
    this.eventService.saveEvent(this.event).subscribe();  // The API server is smart enough to do an update if the event id already exists
    //this.eventService.updateEvent(this.event);
    this.addMode = false;
  }

  cancelAddSession() {
    this.addMode = false;
  }
}
