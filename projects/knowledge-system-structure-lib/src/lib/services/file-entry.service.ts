import { Injectable } from '@angular/core';
import {KnowledgeSystemRootService} from "./knowledge-system-root.service";
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {FileEntry} from "../models/file-entry";
import {User} from "authorization-services-lib";

@Injectable({
  providedIn: 'root'
})
export class FileEntryService {
  private static readonly ROOT_PATH: string = '/files'

  constructor(private rootService: KnowledgeSystemRootService, private httpClient: HttpClient) { }

  upload(file: File): Observable<FileEntry> {
    return this.httpClient.post<FileEntry>(`${this.rootService.serverUrl}${FileEntryService.ROOT_PATH}`, file);
  }
  getByUuid(uuid: string): Observable<FileEntry> {
    return this.httpClient.get<FileEntry>(`${this.rootService.serverUrl}${FileEntryService.ROOT_PATH}/uuid/${uuid}`);
  }
  search(query: string): Observable<FileEntry[]> {
    return this.httpClient.get<FileEntry[]>(`${this.rootService.serverUrl}${FileEntryService.ROOT_PATH}/search/${query}`);
  }
  downloadFileByUuid(uuid: string): Observable<Blob> {
    return this.httpClient.get<Blob>(`${this.rootService.serverUrl}${FileEntryService.ROOT_PATH}/download/${uuid}`,
      {
        responseType: 'blob' as 'json',
        observe: 'body',
        headers: {'Content-Type': 'application/json'}
      });
  }
  downloadFileByFilename(filename: string): Observable<Blob> {
    return this.httpClient.get<Blob>(`${this.rootService.serverUrl}${FileEntryService.ROOT_PATH}/download/${filename}`,
      {
        responseType: 'blob' as 'json',
        observe: 'body',
        headers: {'Content-Type': 'application/json'}
      });
  }
}
