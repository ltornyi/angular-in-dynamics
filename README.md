# Angular in Dynamics 365

## Initial setup

Generated with Angular CLI 15

    ng new angular-in-dynamics --routing=true --style=css --strict=false

## Add Jest and remove Jasmine and Karma

Follow instructions for jest-preset-angular 

    npm install jest jest-preset-angular @types/jest --save-dev

Change the `test` script definition in `package.json` to the following:

    "test": "jest --config ./jest.config.js --coverage --no-cache --updateSnapshot"

Create `jest.config.js` and `setup-jest.ts` in the root folder. Also create an empty `jestGlobalMocks.ts` in the root folder.

Add commonjs as a module to `tsconfig.spec.json` in the compilerOptions like this:

    "outDir": "./out-tsc/spec",
    "module": "CommonJS",
    "types": [
      "jest"
    ]

You can get rid of Karma

    npm remove @types/jasmine jasmine-core karma karma-chrome-launcher karma-coverage karma-jasmine karma-jasmine-html-reporter

Now `ng test` is broken, use `npm test`

## Register the app in Azure

Follow instructions [here](https://learn.microsoft.com/en-us/azure/active-directory/develop/scenario-spa-app-registration). We will use MSAL.js 2.0 with the auth code flow. For development, the redirect URL should be http://localhost:4200/

## Add MSAL to the project

    npm install @azure/msal-angular @azure/msal-browser

Configure MsalModule in `app.module.ts` using the registered application id and your tenant id. Bootstrap MsalRedirectComponent in `app.module.ts`. Add `<app-redirect></app-redirect>` to index.html

## Configure routing

Generate components for routes and add routes as normal. Add the suggested iframe and popup conditions as described [here](https://learn.microsoft.com/en-us/azure/active-directory/develop/tutorial-v2-angular-auth-code#configure-the-application)

Our app will run as a web resource in Dynamics, therefore in an iframe, so ignore the isIframe property and related functionality in the above.

## Subscribe to MSalBroadcastService to check if interaction is complete

See details in AppComponent. The point here is to check when interaction is complete and an account is logged in before rendering UI.

## Add MsalInterceptor

Add MsalInterceptor in app.module.ts and configure the protected resources, i.e. endpoints and scopes.

## Deploy to Dynamics 365

We will deploy the Angular app as a set of web resources in Dynamics.

### Angular routing

We need to change how Angular calculates the base URL for routing purposes. In dev mode, "/" is fine. When deployed as a web resource,
the base HREF should be /WebResources/<publisher>/<path to your deployed index.html>.
Based on [this idea](https://github.com/kip-dk/angular-xrm-webresource#new-2019-08-23-using-angular-routes-in-applications-deployed-to-dynamics-365) add a Javascript snippet to index.html to determine the if the app path contains `webresources` and adjust the APP_BASE_HREF DI token accordingly. See the Angular documentation [here](https://angular.io/api/common/APP_BASE_HREF)

### Create production build

Web resources are versioned as they are published in Dynamics, so we can safely switch off the hashing GUIDs in the generated filenames.
We also remove the `<base href="/">` tag from the source index.html so linked scripts and css files use relative URLs.

    ng build --output-hashing none

Web resource naming is important because that directly influences the URL of the web resource. Upload the files as

    /AngularMSAL/index.html
    /AngularMSAL/styles.css
    /AngularMSAL/runtime.js
    /AngularMSAL/polyfills.js
    /AngularMSAL/main.js

Don't forget to upload and publish whenever you create a new build.

### Redirect URI in production

Add the proper redict URI to the app registration, i.e. https://<Dynamics org URL>/WebResources/<your publisher>/AngularMSAL/index.html. Make sure this also appear in environment.ts so the production build will use this as part of publicClientApp.config.ts

### Add web resource to form

Finally, add the web resource to a form in Dynamics. Publish the changes.
Unfortunately, MSAL throws an error message in this situation:

BrowserAuthError: redirect_in_iframe: Redirects are not supported for iframed or brokered applications. Please ensure you are using MSAL.js in a top frame of the window if using the redirect APIs, or use the popup APIs. (window.parent !== window) => true
