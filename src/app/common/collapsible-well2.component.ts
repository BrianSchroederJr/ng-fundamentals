import { Component, Input } from '@angular/core';

@Component({
  selector: 'collapsible-well2',
  template: `
    <div (click)="toggleContent()" class="well pointable">
      <h4>
        <ng-content select="[well-title]"></ng-content>
      </h4>
      <ng-content *ngIf="visible" select="[well-body]"></ng-content>
    </div>
  `
})
export class CollapsibleWell2Component {

  visible = true;

  toggleContent() {
    this.visible = !this.visible;
  }
}
