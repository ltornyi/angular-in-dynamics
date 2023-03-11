import { MsalInterceptorConfiguration } from "@azure/msal-angular"
import { InteractionType } from "@azure/msal-browser";
import { graphMeEndpoint } from "../services/me.service";

export const msalInterceptorConfig: MsalInterceptorConfiguration = {
  interactionType: InteractionType.Popup,
  protectedResourceMap: new Map([
    [graphMeEndpoint, ['user.read']]
  ])
}
