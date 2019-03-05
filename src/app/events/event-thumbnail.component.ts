import { Component, Input, Output } from '@angular/core';
import { EventEmitter } from 'events';
import { IEvent } from './shared/index';

@Component({
  selector: 'event-thumbnail',
  template: `
  <div [routerLink]="['/events', event.id]" class="well hoverwell thumbnail">
    <h2>{{event?.name}}</h2>
    <div>Date: {{event?.date}}</div>
    <!-- ngClass is used when multiple classes need to be added based on some logic test.
         ngStyle is used when multiple style elements need to be added or changed based on some logic tests.
    -->
    <!--<div [class.green]="event?.time === '8:00 am'" [ngSwitch]="event?.time">Time: {{event?.time}} -->  <!-- Moved logic to function getStartTimeClass() -->
    <!--OR-->
    <!--<div [ngClass]="{green: event?.time === '8:00 am', bold: event?.time === '8:00 am'}" [ngSwitch]="event?.time">Time: {{event?.time}} -->  <!-- Moved logic to function getStartTimeClass() -->
    <!--OR-->
    <!--<div [ngClass]="getStartTimeClass()" [ngSwitch]="event?.time">Time: {{event?.time}}-->
    <!--OR-->
    <!--<div [style.color]="event?.time === '8:00 am' ? '#003300' : '#bbb'" [ngSwitch]="event?.time">Time: {{event?.time}}-->
    <!--OR-->
    <!--<div [ngStyle]="{'color': event?.time === '8:00 am' ? '#003300' : '#bbb', 'font-weight':  event?.time === '8:00 am' ? 'bold' : 'normal'}" [ngSwitch]="event?.time">Time: {{event?.time}}-->
    <!--OR-->
    <div [ngStyle]="getStartTimeStyle()" [ngSwitch]="event?.time">Time: {{event?.time}}
      <span *ngSwitchCase="'8:00 am'">(Early Start)</span>
      <span *ngSwitchCase="'10:00 am'">(Late Start)</span>
      <span *ngSwitchDefault>(Normal Start)</span>
    </div>
    <div>Price: \${{event?.price}}</div>
    <div [hidden]="!event?.location">     <!-- Hide elements if they may be displayed later -->
      <span>Location: {{event?.location?.address}}</span>
      <span class="pad-left">{{event?.location?.city}}, {{event?.location?.country}}</span>
    </div>
    <div *ngIf="event?.onlineUrl">        <!-- Remove elements if you know that they won't be needed for a performance boost -->
      Online URL: {{event?.onlineUrl}}
    </div>
  </div>
  `,
  styles: [`
    .green { color: #003300 !important; }
    .bold { font-weight: bold; }
    .thumbnail { min-height: 210px; }
    .pad-left {margin-left: 10px;}
    .well div { color: #bbb; }
  `]
})

export class EventThumbnailComponent {
  @Input() event: IEvent;

  getStartTimeClass() {
    // const isEarlyStart = this.event && this.event.time === '8:00 am';
    // return {green: isEarlyStart, bold: isEarlyStart};
    // OR
    // if(this.event && this.event.time === '8:00 am')
    //   return ['green', 'bold'];
    // return [];
    // OR
    if(this.event && this.event.time === '8:00 am')
      return 'green bold';
    return '';
  }

  getStartTimeStyle():any {
    if(this.event && this.event.time === '8:00 am')
      return {color: '#003300', 'font-weight': 'bold'};     // font-weight is quoted due to the dash in the text
    return {};
  }

}
