import { Injectable } from '@angular/core';
import {SessionService as AuthSessionService} from '@biit-solutions/authorization-services';
import {AuthService} from './auth.service';
import {Constants} from '../constants';

@Injectable({
  providedIn: 'root'
})
export class SessionService extends AuthSessionService {

  constructor(authService: AuthService) {
    super(authService, Constants.SESSION_STORAGE.CONTEXT);
  }

}
