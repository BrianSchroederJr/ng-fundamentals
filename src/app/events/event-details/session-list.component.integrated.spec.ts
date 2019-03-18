import { TestBed, async, ComponentFixture } from '@angular/core/testing';
import { DebugElement, Component, NO_ERRORS_SCHEMA } from '@angular/core';
import { By } from '@angular/platform-browser';
import { SessionListComponent } from './session-list.component';
import { AuthService } from 'src/app/user/auth.service';
import { VoterService } from './voter.service';
//import { UpvoteComponent } from './upvote.component';
import { DurationPipe } from '../shared/duration.pipe';
import { ISession } from '../shared/event.model';
import { CollapsibleWell2Component } from 'src/app/common';

// Use blank components to fake an api for a child component for Shallow Tests
// @Component({})
// class UpvoteComponent {
// }

describe('SessionListComponent', () => {
  let fixture: ComponentFixture<SessionListComponent>;
  let component: SessionListComponent;
  let element: HTMLElement;
  let debugEl: DebugElement;

  beforeEach(async(() => {
    let mockAuthService = {
      isAuthenticated: () => true,
      currentUser: {userName: 'Joe'}
    };
    let mockVoterService = {
      userHasVoted: () => true
    };

    TestBed.configureTestingModule({
      imports: [],
      declarations: [
        SessionListComponent,
        //UpvoteComponent,
        DurationPipe,
        //CollapsibleWell2Component,
      ],
      providers: [
        { provide: AuthService, useValue: mockAuthService },
        { provide: VoterService, useValue: mockVoterService}
      ],
      schemas: [
        NO_ERRORS_SCHEMA    // This tells the Angular integrated test to ignore any missing(unknown) child elements.
      ]
    });
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionListComponent);
    component = fixture.componentInstance;
    debugEl = fixture.debugElement;
    element = fixture.nativeElement;
  });

  describe('initial display', () => {

    it('should have the correct session title', () => {
      component.sessions = [{id: 3, name: 'Session 1', presenter: 'Joe', duration: 1, level: 'beginner', abstract: 'abstract', voters: ['john', 'bob']}];
      component.filterBy = 'all';
      component.sortBy = 'name';
      component.eventId = 4;

      component.ngOnChanges();    // Need to call this since it doesn't fire on it's own without a change.  ngOnInit would not have this problem.
      fixture.detectChanges();    // Force a detect changes call

      //expect(element.querySelector('[well-title]').textContent).toContain('Session 1');   // Using raw DOM
      expect(debugEl.query(By.css('[well-title]')).nativeElement.textContent).toContain('Session 1');   // Using Angular's Debug Element - also useful for finding Directives

    });
  });

});
