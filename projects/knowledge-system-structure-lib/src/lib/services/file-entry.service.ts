import { Injectable } from '@angular/core';
import {KnowledgeSystemRootService} from "./knowledge-system-root.service";
import {HttpClient, HttpEvent, HttpParams} from "@angular/common/http";
import {map, Observable} from "rxjs";
import {FileEntry} from "../models/file-entry";
import {FileEntryQuery} from "../models/file-entry-query";

@Injectable({
  providedIn: 'root'
})
export class FileEntryService {
  private static readonly ROOT_PATH: string = '/files';
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

  upload(file: File): Observable<HttpEvent<FileEntry>> {
    const formData = new FormData();
    formData.append('file', file);
    return this.httpClient.post<FileEntry>(`${this.rootService.serverUrl}${FileEntryService.ROOT_PATH}/upload`, formData, {
      reportProgress: true,
      observe: "events"
    });
  }
  update(file: FileEntry): Observable<FileEntry> {
    return this.httpClient.put<FileEntry>(`${this.rootService.serverUrl}${FileEntryService.ROOT_PATH}`, file);
  }
  delete(file: FileEntry): Observable<void> {
    return this.httpClient.post<void>(`${this.rootService.serverUrl}${FileEntryService.ROOT_PATH}/delete`, file)
  }
  deleteByUuid(uuid: string): Observable<void> {
    return this.httpClient.delete<void>(`${this.rootService.serverUrl}${FileEntryService.ROOT_PATH}/${uuid}`);
  }
  getAll(index?: number, limit?: number): Observable<{files: FileEntry[], total: number}> {
    return this.httpClient.get<FileEntry[]>(`${this.rootService.serverUrl}${FileEntryService.ROOT_PATH}`, {params: this.cursorParams(index, limit), observe: 'response'})
      .pipe(map(response => {
        return {
          files: response.body,
          total: Number.parseFloat(response.headers.get('x-total-elements'))
        }
      }));
  }
  getByUuid(uuid: string): Observable<FileEntry> {
    return this.httpClient.get<FileEntry>(`${this.rootService.serverUrl}${FileEntryService.ROOT_PATH}/uuid/${uuid}`);
  }
  getByCategorization(categorizationName: string, index?: number, limit?: number ): Observable<FileEntry> {
    return this.httpClient.get<FileEntry>(`${this.rootService.serverUrl}${FileEntryService.ROOT_PATH}/categories/${categorizationName}`, {params: this.cursorParams(index, limit)});
  }
  search(query: FileEntryQuery, index?: number, limit?: number): Observable<{files: FileEntry[], total: number}> {
    return this.httpClient.post<FileEntry[]>(`${this.rootService.serverUrl}${FileEntryService.ROOT_PATH}/search`, query, {params: this.cursorParams(index, limit), observe: 'response'})
      .pipe(map(response => {
        return {
          files: response.body,
          total: Number.parseFloat(response.headers.get('x-total-elements'))
        }
      }));
  }
  downloadFileByUuid(uuid: string): Observable<Blob> {
    return this.httpClient.get<Blob>(`${this.rootService.serverUrl}${FileEntryService.ROOT_PATH}/download/${uuid}`,
      {
        responseType: 'blob' as 'json',
        observe: 'body',
        headers: {'Content-Type': 'application/json'}
      });
  }
  downloadPublicFileByUuid(uuid: string): Observable<Blob> {
    return this.httpClient.get<Blob>(`${this.rootService.serverUrl}${FileEntryService.ROOT_PATH}/public/download/${uuid}`,
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
