import { FormControl } from '@angular/forms';

export function restrictedWords(words) {
  return (control: FormControl): {[key: string]: any} => {
    if(!words) return null;   // Return null if no words are passed in which makes this Validator valid

    var invalidWords = words.map(w => control.value.includes(w) ? w : null).filter(w => w != null);    // Set invalidWords to words found in control and filter out all nulls.

    return invalidWords && invalidWords.length > 0 ? {'restrictedWords': invalidWords.join(', ')} : null;   // If invalidWords contains some words then return the array of comma seperated words.  Otherwise return null.
  }
}
