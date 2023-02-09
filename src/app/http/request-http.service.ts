import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http'
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class RequestHttpService {

  URL = environment.API
  constructor(
    private http: HttpClient
  ) { }

  // TODO request http
  get_id(id: string): Observable<any> {
    return this.http.get(`${this.URL}/request_form/id/${id}`)
  }
  get_all(): Observable<any> {
    return this.http.get(`${this.URL}/request_form`)
  }
  draft(data: any): Observable<any> {
    return this.http.post(`${this.URL}/request_form/draft`, data)
  }
  insert(data: any): Observable<any> {
    return this.http.post(`${this.URL}/request_form/insert`, data)
  }
  update(id: any, data: any): Observable<any> {
    return this.http.put(`${this.URL}/request_form/update/${id}`, data)
  }
  delete(id: any): Observable<any> {
    return this.http.delete(`${this.URL}/request_form/delete/${id}`)
  }
  count(data: any): Observable<any> {
    return this.http.post(`${this.URL}/request_form/count`, data)
  }
  getByCondition(data: any): Observable<any> {
    return this.http.post(`${this.URL}/request_form/getByCondition`, data)
  }

  // ! new !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
  getRequestTable(params: any): Observable<any> {
    return this.http.get(`${this.URL}/request_form/tableManage/${params.userId}/${params.status}/${params.limit}/${params.skip}/${params.sort}/${params.count}`)
  }

  getTable(params: any): Observable<any> {
    return this.http.get(`${this.URL}/request_form/table/${params.userId}/${params.status}`)
  }

  table(param: any) {
    return this.http.get(`${this.URL}/request_form/tableShow/`, {
      params: param
    })
  }
  tableAdmin(param: any) {
    return this.http.get(`${this.URL}/request_form/tableShowAdmin/`, {
      params: param
    })
  }
  tableCount(param: any) {
    return this.http.get(`${this.URL}/request_form/tableShowCount/`, {
      params: param
    })
  }



  // * dashboard
  corporateRemain(param: any) {
    return this.http.get(`${this.URL}/request_form/corporateRemain/`, {
      params: param
    })
  }
  sectionRemain(param: any) {
    return this.http.get(`${this.URL}/request_form/sectionRemain/`, {
      params: param
    })
  }
  dailyRemain() {
    return this.http.get(`${this.URL}/request_form/dailyRemain/`)
  }
  chamberRemain(param: any) {
    return this.http.get(`${this.URL}/request_form/chamberRemain/`, {
      params: param
    })
  }
  operateRemain(param: any) {
    return this.http.get(`${this.URL}/request_form/operateRemain/`, {
      params: param
    })
  }
  // * dashboard


}
