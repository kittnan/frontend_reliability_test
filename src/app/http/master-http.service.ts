import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class MasterHttpService {

  URL = environment.API
  constructor(
    private http: HttpClient
  ) { }

  getAuthorizeMaster(): Observable<any> {
    return this.http.get(`${this.URL}/authorize_master/`)
  }


  getDepartmentMaster(): Observable<any> {
    return this.http.get(`${this.URL}/department_master/`)
  }
  insertDepartmentMaster(data: any): Observable<any> {
    return this.http.post(`${this.URL}/department_master/insert`, data)
  }
  updateDepartmentMaster(id: any, data: any): Observable<any> {
    return this.http.put(`${this.URL}/department_master/update/${id}`, data)
  }
  deleteDepartmentMaster(id: any): Observable<any> {
    return this.http.delete(`${this.URL}/department_master/delete/${id}`)
  }

  getModelMaster(): Observable<any> {
    return this.http.get(`${this.URL}/model_master/`)
  }
  insertModelMaster(data: any): Observable<any> {
    return this.http.post(`${this.URL}/model_master/insert`, data)
  }
  updateModelMaster(id: any, data: any): Observable<any> {
    return this.http.put(`${this.URL}/model_master/update/${id}`, data)
  }
  deleteModelMaster(id: any): Observable<any> {
    return this.http.delete(`${this.URL}/model_master/delete/${id}`)
  }

  getTestPurposeMaster(): Observable<any> {
    return this.http.get(`${this.URL}/test_purpose_master/`)
  }
  insertTestPurposeMaster(data: any): Observable<any> {
    return this.http.post(`${this.URL}/test_purpose_master/insert`, data)
  }
  updateTestPurposeMaster(id: any, data: any): Observable<any> {
    return this.http.put(`${this.URL}/test_purpose_master/update/${id}`, data)
  }
  deleteTestPurposeMaster(id: any): Observable<any> {
    return this.http.delete(`${this.URL}/test_purpose_master/delete/${id}`)
  }
  
  getTestingTypeMaster(): Observable<any> {
    return this.http.get(`${this.URL}/testing_type_master/`)
  }
  insertTestingTypeMaster(data: any): Observable<any> {
    return this.http.post(`${this.URL}/testing_type_master/insert`, data)
  }
  updateTestingTypeMaster(id: any, data: any): Observable<any> {
    return this.http.put(`${this.URL}/testing_type_master/update/${id}`, data)
  }
  deleteTestingTypeMaster(id: any): Observable<any> {
    return this.http.delete(`${this.URL}/testing_type_master/delete/${id}`)
  }
  
  getIntervalMaster(): Observable<any> {
    return this.http.get(`${this.URL}/interval_master/`)
  }
  insertIntervalMaster(data: any): Observable<any> {
    return this.http.post(`${this.URL}/interval_master/insert`, data)
  }
  updateIntervalMaster(id: any, data: any): Observable<any> {
    return this.http.put(`${this.URL}/interval_master/update/${id}`, data)
  }
  deleteIntervalMaster(id: any): Observable<any> {
    return this.http.delete(`${this.URL}/interval_master/delete/${id}`)
  }
}
