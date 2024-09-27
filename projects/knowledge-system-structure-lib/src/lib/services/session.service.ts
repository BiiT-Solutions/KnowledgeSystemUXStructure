import { Injectable } from '@angular/core';
import {SessionService as AuthSessionService} from 'authorization-services-lib';
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
