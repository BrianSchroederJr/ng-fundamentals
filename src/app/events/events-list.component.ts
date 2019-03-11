import { Component, OnInit } from '@angular/core';
import { EventService } from './shared/event.service';
//import {ToastrService} from '../common/toastr.service';
import { ActivatedRoute } from '@angular/router';
import { IEvent } from './shared/index';

@Component({
  selector: 'events-list',
  template: `
  <div>
  <h1>-- Upcoming Angular Events --</h1>
  <hr>
  <div class="row">
    <div *ngFor="let anEvent of eventsAry" class="col-md-5">
      <!--<event-thumbnail (click)="handleThumbnailClick(anEvent.name)" [event]="anEvent"></event-thumbnail>-->
      <event-thumbnail [event]="anEvent"></event-thumbnail>
    </div>
  </div>

  </div>
  `
})
export class EventsListComponent implements OnInit{
  eventsAry: IEvent[];
  constructor(private eventService: EventService, private route: ActivatedRoute) { }// private toastr: ToastrService, private route: ActivatedRoute) { }

  ngOnInit() {
    //this.eventService.getEvents().subscribe(data => {this.eventsAry = data}); // It is best to do longer calls in ngOnInit and not in the Component constructor
    this.eventsAry = this.route.snapshot.data['events'];
  }

  // handleThumbnailClick(eventName) {
  //   this.toastr.info(eventName);
  // }

}
