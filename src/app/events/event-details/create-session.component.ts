import { Component, OnInit } from '@angular/core';
import { FormControl, Validators, FormGroup } from '@angular/forms';
import { ISession, restrictedWords } from '../shared/index';

@Component({
  templateUrl: './create-session.component.html',
  styles: [`
    em {float: right; color: #E05C65; padding-left: 10px;}
    .error input, .error select, .error textarea {background-color: #E3C3C5;}
    .error ::-webkit-input-placeholder { color: #999 }
    .error ::-moz-placeholder { color: #999 }
    .error :-moz-placeholder { color: #999 }
    .error :ms-input-placeholder { color: #999 }
  `]
})

export class CreateSessionComponent implements OnInit {

  newSessionForm: FormGroup;
  name: FormControl;
  presenter: FormControl;
  duration: FormControl;
  level: FormControl;
  abstract: FormControl;

  ngOnInit() {
    this.name = new FormControl('', Validators.required);
    this.presenter = new FormControl('', Validators.required);
    this.duration = new FormControl('', Validators.required);
    this.level = new FormControl('', Validators.required);
    //this.abstract = new FormControl('', [Validators.required, Validators.maxLength(400), this.restrictedWords]);    // Simple custom restrictedWords Validator function.
    this.abstract = new FormControl('', [Validators.required, Validators.maxLength(400), restrictedWords(['foo', 'bar'])]);  // Complex custom restrictedWords Validator - referencing a JavaScript function that returns a function since that's what a Validator is.

    this.newSessionForm = new FormGroup({
      name: this.name,
      presenter: this.presenter,
      duration: this.duration,
      level: this.level,
      abstract: this.abstract
    });
  }

  // private restrictedWords(control: FormControl): {[key: string]: any}
  // {
  //   return control.value.includes('foo') ? {'restrictedWords': 'foo'} : null;
  // }


  // --- MOVED TO: restricted-words.validator.ts ---

  // private restrictedWords(words) {
  //   return (control: FormControl): {[key: string]: any} => {
  //     if(!words) return null;   // Return null if no words are passed in which makes this Validator valid

  //     var invalidWords = words.map(w => control.value.includes(w) ? w : null).filter(w => w != null);    // Set invalidWords to words found in control and filter out all nulls.

  //     return invalidWords && invalidWords.length > 0 ? {'restrictedWords': invalidWords.join(', ')} : null;   // If invalidWords contains some words then return the array of comma seperated words.  Otherwise return null.
  //   }
  // }

  saveSession(formValues) {
    let session: ISession = {
      id: undefined,
      name: formValues.name,
      duration: +formValues.duration,
      level: formValues.level,
      presenter: formValues.presenter,
      abstract: formValues.abstract,
      voters: []
    };
    console.log(session);
  }

}
