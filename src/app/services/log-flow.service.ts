import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LogFlowService {
  private URL = environment.API
  constructor(
    private http: HttpClient
  ) { }

  insertLogFlow(data: any) {
    return this.http.post(`${this.URL}/log_flow/insert`, data)
  }
}
