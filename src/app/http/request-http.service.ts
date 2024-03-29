import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class RequestHttpService {
  URL = environment.API;
  constructor(private http: HttpClient) {}

  // TODO request http
  get_id(id: string): Observable<any> {
    return this.http.get(`${this.URL}/request_form/id/${id}`);
  }
  getByControlNo(param: HttpParams): Observable<any> {
    return this.http.get(`${this.URL}/request_form/getByControlNo`, {
      params: param,
    });
  }
  get_all(): Observable<any> {
    return this.http.get(`${this.URL}/request_form`);
  }
  draft(data: any): Observable<any> {
    return this.http.post(`${this.URL}/request_form/draft`, data);
  }
  insert(data: any): Observable<any> {
    return this.http.post(`${this.URL}/request_form/insert`, data);
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.URL}/request_form/update/${id}`, data);
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${this.URL}/request_form/delete/${id}`);
  }
  count(data: any): Observable<any> {
    return this.http.post(`${this.URL}/request_form/count`, data);
  }
  getByCondition(data: any): Observable<any> {
    return this.http.post(`${this.URL}/request_form/getByCondition`, data);
  }
  updateControlNo(id: any, data: any): Observable<any> {
    return this.http.put(`${this.URL}/request_form/updateControlNo/${id}`, data);
  }

  // ! new !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  getRequestTable(params: any): Observable<any> {
    return this.http.get(
      `${this.URL}/request_form/tableManage/${params.userId}/${params.status}/${params.limit}/${params.skip}/${params.sort}/${params.count}`
    );
  }

  getTable(params: any): Observable<any> {
    return this.http.get(
      `${this.URL}/request_form/table/${params.userId}/${params.status}`
    );
  }

  table(param: any) {
    return this.http.get(`${this.URL}/request_form/tableShow/`, {
      params: param,
    });
  }
  tableAdmin(param: any) {
    return this.http.get(`${this.URL}/request_form/tableShowAdmin/`, {
      params: param,
    });
  }
  tableGuest(param: any) {
    return this.http.get(`${this.URL}/request_form/tableShowGuest/`, {
      params: param,
    });
  }
  tableCount(param: any) {
    return this.http.get(`${this.URL}/request_form/tableShowCount/`, {
      params: param,
    });
  }
  backup_request(data: any) {
    return this.http.post(`${this.URL}/request_form/backup_request/`, data);
  }

  // * dashboard
  corporateRemain(param: any) {
    return this.http.get(`${this.URL}/request_form/corporateRemain/`, {
      params: param,
    });
  }
  sectionRemain(param: any) {
    return this.http.get(`${this.URL}/request_form/sectionRemain/`, {
      params: param,
    });
  }
  dailyRemain(param: any) {
    return this.http.get(`${this.URL}/request_form/dailyRemain/`, {
      params: param,
    });
  }
  chamberRemain(param: any) {
    return this.http.get(`${this.URL}/request_form/chamberRemain/`, {
      params: param,
    });
  }
  operateRemain(param: any) {
    return this.http.get(`${this.URL}/request_form/operateRemain/`, {
      params: param,
    });
  }
  reportStatus(param: any) {
    return this.http.get(`${this.URL}/request_form/reportStatus/`, {
      params: param,
    });
  }
  // * dashboard
}
