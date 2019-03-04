import { Injectable } from '@angular/core';

declare let toastr: any;    // This lets TypeScript know that toastr is an object that we know exists on the global scope

@Injectable()
export class ToastrService {
  success(message: string, title?: string) {
    toastr.success(message, title);
  }
  info(message: string, title?: string) {
    toastr.info(message, title);
  }
  warning(message: string, title?: string) {
    toastr.warning(message, title);
  }
  error(message: string, title?: string) {
    toastr.error(message, title);
  }
}
