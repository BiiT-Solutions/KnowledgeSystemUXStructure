import { Injectable } from '@angular/core';
import {KnowledgeSystemRootService} from "./knowledge-system-root.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {FileEntry} from "../models/file-entry";
import {User} from "authorization-services-lib";

@Injectable({
  providedIn: 'root'
})
export class StreamService {
  private static readonly ROOT_PATH: string = '/stream'

  constructor(private rootService: KnowledgeSystemRootService, private httpClient: HttpClient) { }

  downloadFileByUuid(uuid: string): Observable<Blob> {
    return this.httpClient.get<Blob>(`${this.rootService.serverUrl}${StreamService.ROOT_PATH}/file-entry/uuid/${uuid}`,
      {
        responseType: 'blob' as 'json',
        observe: 'body',
        headers: {'Content-Type': 'application/json'}
      });
  }
  downloadFileByPath(path: string): Observable<Blob> {
    return this.httpClient.get<Blob>(`${this.rootService.serverUrl}${StreamService.ROOT_PATH}/path/${path}`,
      {
        responseType: 'blob' as 'json',
        observe: 'body',
        headers: {'Content-Type': 'application/json'}
      });
  }
}
