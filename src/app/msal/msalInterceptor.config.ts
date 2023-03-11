import { MsalInterceptorConfiguration } from "@azure/msal-angular"
import { InteractionType } from "@azure/msal-browser";
import { graphMeEndpoint } from "../services/me.service";

export const msalInterceptorConfig: MsalInterceptorConfiguration = {
  interactionType: InteractionType.Redirect,
  protectedResourceMap: new Map([
    [graphMeEndpoint, ['user.read']]
  ])
}
