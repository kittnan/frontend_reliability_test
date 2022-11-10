import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class QeChamberService {

  constructor() { }


  generateQueue(chamber: any, e: any) {
    console.log(chamber,e);


  }


}
