import { Injectable } from '@angular/core';
import {RootPath} from 'authorization-services-lib';

@Injectable({
  providedIn: 'root'
})
export class KnowledgeSystemRootService implements RootPath {

  constructor() { }

  private rootUrl: URL = null;

  public set serverUrl(url: URL) {
    this.rootUrl = url;
  }

  public get serverUrl(): URL {
    return this.rootUrl;
  }

  getRootPath(): URL {
    return this.rootUrl;
  }
}
