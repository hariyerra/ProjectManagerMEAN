import { Injectable } from '@angular/core';
import { HttpParams, HttpClient } from '@angular/common/http';

import { environment } from '../../../environments/environment';
import { ParentTask } from '../models/task';
import { ApiResponse } from '../../shared/models/shared';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';


export interface IParentTaskService {
  getParentTask(parentId: number): Observable<ApiResponse<ParentTask>>;
  getParentTaskList(searchKey?: string): Observable<ApiResponse<ParentTask[]>>;
  addParentTask(newParent: ParentTask): Observable<ApiResponse<ParentTask>>;
}

@Injectable({
  providedIn: 'root'
})
export class ParentTaskService implements IParentTaskService {

  baseUri = environment.apiBaseUri;

  constructor(private http: HttpClient) { }

  
  getParentTask(parentId: number): Observable<ApiResponse<ParentTask>> {

    var uri= `${this.baseUri}${environment.endpoint_parentTask_get}/${parentId}`;

    return this.http
      .get<ApiResponse<ParentTask>>(uri);
  }

  getParentTaskList(searchKey?: string): Observable<ApiResponse<ParentTask[]>> {

    //add query string params to search and sort
    let params = new HttpParams();

    if (searchKey)
      params = params.append('searchKey', searchKey);

    var uri = `${this.baseUri}${environment.endpoint_parentTask_get}`;

    return this.http
      .get<ApiResponse<ParentTask[]>>(uri, { params: params });
  }

  addParentTask(newParent: ParentTask): Observable<ApiResponse<ParentTask>> {

    var uri = `${this.baseUri}${environment.endpoint_parentTask_add}`;

    return this.http
      .post<ApiResponse<ParentTask>>(uri, newParent);
  }
}
