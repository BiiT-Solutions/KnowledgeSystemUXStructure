import { Injectable } from '@angular/core';
import {KnowledgeSystemRootService} from "./knowledge-system-root.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Categorization} from "../models/categorization";

@Injectable({
  providedIn: 'root'
})
export class CategorizationService {
  private static readonly ROOT_PATH: string = '/categorizations';
  private cursorParams(index?: number, limit?: number): HttpParams {
    let params = new HttpParams();
    if (index) {
      params = params.append('from', index);
    } else {
      params = params.append('from', 0);
    }
    if (limit) {
      params = params.append('size', limit);
    } else {
      params = params.append('size', 30);
    }
    return params;
  }

  constructor(private rootService: KnowledgeSystemRootService, private httpClient: HttpClient) { }

  create(categorization: Categorization): Observable<Categorization> {
    return this.httpClient.post<Categorization>(`${this.rootService.serverUrl}${CategorizationService.ROOT_PATH}`, categorization);
  }
  createByName(name: string): Observable<Categorization> {
    return this.httpClient.put<Categorization>(`${this.rootService.serverUrl}${CategorizationService.ROOT_PATH}/name/${name}`, {});
  }
  createBatch(categorizations: Categorization[]): Observable<Categorization[]> {
    return this.httpClient.post<Categorization[]>(`${this.rootService.serverUrl}${CategorizationService.ROOT_PATH}/list`, categorizations);
  }
  getAll(index?: number, limit?: number): Observable<Categorization[]> {
    return this.httpClient.get<Categorization[]>(`${this.rootService.serverUrl}${CategorizationService.ROOT_PATH}`, {params: this.cursorParams(index, limit)});
  }
  getByUuid(uuid: string): Observable<Categorization> {
    return this.httpClient.get<Categorization>(`${this.rootService.serverUrl}${CategorizationService.ROOT_PATH}/${uuid}`);
  }
  delete(uuid: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.rootService.serverUrl}${CategorizationService.ROOT_PATH}/${uuid}`);
  }
  search(query: string, index?: number, limit?: number): Observable<Categorization[]> {
    return this.httpClient.get<Categorization[]>(`${this.rootService.serverUrl}${CategorizationService.ROOT_PATH}/search/${query}`, {params: this.cursorParams(index, limit)});
  }
  find(name: string): Observable<Categorization> {
    return this.httpClient.get<Categorization>(`${this.rootService.serverUrl}${CategorizationService.ROOT_PATH}/name/${name}`);
  }
}
