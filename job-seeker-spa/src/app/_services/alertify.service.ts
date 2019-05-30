import { Injectable } from '@angular/core';
declare let alertify: any;

@Injectable({
  providedIn: 'root'
})
export class AlertifyService {

constructor() { }

confirm(title: string, message: string, okCallback: () => {}, cancelCallback: ()=> {} ) {
  alertify.confirm(title, message, () => {
  okCallback();
}, cancelCallback() );
}


success(message: string) {
alertify.success(message);
}

error(message: string) {
alertify.error(message);
}

warning(message: string) {
alertify.warning(message);
}

message(message: string) {
alertify.message(message);
}


}
