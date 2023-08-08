import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardHttpService {
  private URL = environment.API
  constructor(
    private http: HttpClient
  ) { }

  corporate(params: HttpParams) {
    return this.http.get(`${this.URL}/dashboard/corporate`, { params: params })
  }
  section(params: HttpParams) {
    return this.http.get(`${this.URL}/dashboard/section`, { params: params })
  }
  daily(params: HttpParams) {
    return this.http.get(`${this.URL}/dashboard/daily`, { params: params })
  }
  report(params: HttpParams) {
    return this.http.get(`${this.URL}/dashboard/report`, { params: params })
  }
  chamber(params: HttpParams) {
    return this.http.get(`${this.URL}/dashboard/chamber`, { params: params })
  }
  operate(params: HttpParams) {
    return this.http.get(`${this.URL}/dashboard/operate`, { params: params })
  }
  testPurpose(params: HttpParams) {
    return this.http.get(`${this.URL}/dashboard/testPurpose`, { params: params })
  }

}

