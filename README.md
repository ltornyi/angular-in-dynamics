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
