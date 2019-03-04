import { Component, OnInit } from '@angular/core';
import { EventService } from './shared/event.service';
import {ToastrService} from '../common/toastr.service';

@Component({
  selector: 'events-list',
  template: `
  <div>
  <h1>Upcoming Angular Events</h1>
  <hr>
  <div class="row">
    <div *ngFor="let anEvent of eventsAry" class="col-md-5">
      <event-thumbnail (click)="handleThumbnailClick(anEvent.name)" [event]="anEvent"></event-thumbnail>
    </div>
  </div>

  </div>
  `
})
export class EventsListComponent implements OnInit{
  eventsAry: any[];
  constructor(private eventService: EventService, private toastr: ToastrService) { }

  ngOnInit() {
    this.eventsAry = this.eventService.getEvents(); // It is best to do longer calls in ngOnInit and not in the Component constructor
  }

  handleThumbnailClick(eventName) {
    this.toastr.info(eventName);
  }

}
