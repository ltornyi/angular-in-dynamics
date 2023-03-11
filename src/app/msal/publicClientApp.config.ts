import { BrowserCacheLocation, Configuration } from "@azure/msal-browser"
import { environment } from "../../environments/environment";

const publicClientConfigAuth = {
  clientId: '381b1bac-fcfa-4206-836b-f93ff73caa74',
  authority: 'https://login.microsoftonline.com/72373ee4-2187-4491-8345-ec8201d25f87',
  redirectUri: environment.msalRedirectUri
}

const isIE = window.navigator.userAgent.indexOf('MSIE ') > -1 || window.navigator.userAgent.indexOf('Trident/') > -1;

export const publicClientAppConfig: Configuration = {
  auth: publicClientConfigAuth,
  cache: {
    cacheLocation: BrowserCacheLocation.LocalStorage,
    storeAuthStateInCookie: isIE
  },
}
