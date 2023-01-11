import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SendMailService {
  private URL = environment.API
  constructor(
    private http: HttpClient
  ) { }

  send(data: any) {
    return this.http.post(`${this.URL}/mail/send`, data)
  }
}
