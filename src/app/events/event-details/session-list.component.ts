import { Component, Input, OnChanges } from '@angular/core';
import { ISession } from '../shared/index';
import { AuthService } from 'src/app/user/auth.service';
import { VoterService } from './voter.service';

@Component({
  selector: 'session-list',
  templateUrl: './session-list.component.html'
})

export class SessionListComponent implements OnChanges {

  @Input() sessions: ISession[];
  @Input() filterBy: string;
  @Input() sortBy: string;
  @Input() eventId: number;

  visibleSessions: ISession[] = []; // Used for display to maintain original sessions array untouched

  constructor(public authService: AuthService, private voterService: VoterService) {}

  // This will fire every time one of the @Input values change!!! :)
  ngOnChanges() {
    // Make sure that sessions is already set
    if (this.sessions) {
      this.filterSessions(this.filterBy);
      this.sortBy === 'name' ? this.visibleSessions.sort(sortByNameAsc) : this.visibleSessions.sort(sortByVotesDesc);
    }
  }

  toggleVote(session: ISession) {
    if(this.userHasVoted(session)) {
      this.voterService.deleteVoter(this.eventId, session, this.authService.currentUser.userName);
    }
    else {
      this.voterService.addVoter(this.eventId, session, this.authService.currentUser.userName);
    }
    // Resort
    if(this.sortBy === 'votes') {
      this.visibleSessions.sort(sortByVotesDesc);
    }
  }

  userHasVoted(session: ISession) {
    return this.voterService.userHasVoted(session, this.authService.currentUser.userName);
  }

  filterSessions(filter) {
    if (filter === 'all') {
      this.visibleSessions = this.sessions.slice(0);  // Slice from beginning creates a duplicate of the sesssions array.  We don't set it equal since we don't want a pointer to the array.
    }
    else {
      this.visibleSessions = this.sessions.filter(s => {return s.level.toLocaleLowerCase() === filter;});   // Return any sessions with a level (difficulty) that matches the filter string.
    }
  }

}

function sortByNameAsc(s1: ISession, s2: ISession) {
  if (s1.name > s2.name) return 1;
  else if (s1.name === s2.name) return 0;
  else return -1;
}

function sortByVotesDesc(s1: ISession, s2: ISession) {
  return s2.voters.length - s1.voters.length;
}
