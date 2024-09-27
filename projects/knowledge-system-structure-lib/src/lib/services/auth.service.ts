import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {KnowledgeSystemRootService} from './knowledge-system-root.service';
import {AuthService as AuthenticationService} from 'authorization-services-lib';

@Injectable({
  providedIn: 'root'
})
export class AuthService extends AuthenticationService {

  constructor(rootService: KnowledgeSystemRootService, httpClient: HttpClient) {
    super(rootService, httpClient);
  }

}
