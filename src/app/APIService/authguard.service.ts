import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthguardService {
  [x: string]: any;
  DataSharing = new Subject();
  constructor() { }
 
}
