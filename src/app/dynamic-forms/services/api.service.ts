import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http:HttpClient) {}

  create(url:string,data:any):Observable<any>{
    return this.http.post<any>(`${url}`,data)
  }

  edit(url:string,data:any):Observable<any>{
    return this.http.put<any>(`${url}`,data)
  }

  list(url:string,filters:any):Observable<any>{
    return this.http.get<any>(`${url}`)
  }

  getById(url:string):Observable<any>{
    return this.http.get<any>(`${url}`)
  }

  delete(url:string):Observable<any>{
    return this.http.delete<any>(`${url}`)
  }

}
