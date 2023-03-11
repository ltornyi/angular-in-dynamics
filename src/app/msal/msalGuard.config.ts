import { MsalGuardConfiguration } from "@azure/msal-angular";
import { InteractionType } from "@azure/msal-browser";

export const msalGuardConfig: MsalGuardConfiguration = {
  interactionType: InteractionType.Redirect,
  authRequest: {
    scopes: ['user.read']
  }
}
