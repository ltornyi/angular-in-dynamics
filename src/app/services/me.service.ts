import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

export const graphMeEndpoint = 'https://graph.microsoft.com/v1.0/me';

export interface UserInfo {
  givenName?: string,
  surname?: string,
  userPrincipalName?: string,
  id?: string
}

@Injectable({
  providedIn: 'root'
})
export class MeService {
  constructor(private http: HttpClient) { }

  getMe() {
    return this.http.get<UserInfo>(graphMeEndpoint);
  }
}
