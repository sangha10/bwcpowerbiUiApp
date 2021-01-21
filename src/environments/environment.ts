// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  reportId: "918ea07e-e5c8-4537-9289-f2ed939eb7f3",
  roleName: "Customer Filter",
  workspaceId:"fc2a58b3-e4bd-44ee-8f96-d1e6dc0a94ce",
  apiUrl: "https://bwcterminalapi.azurewebsites.net/api/",
  powerBiUrl: "https://analysis.windows.net/powerbi/api",
  actionName: "auth",
  secretKey : 'PDv7DrqznYL6nv7DrqzjnQYO9JxIsWdcjnQYL6nu0fJHG79HGf56hjhsd%#*zxdsc&*&*&jhsbdsjfHJBH',
  actionToken : 'token',
  // apiEndPoint: {"api":"b52ca625-be83-4645-92b1-0fcaad28c6c1"} , // api endpoint for generationg embed tokens (for app-owns-data)
  // powerBIEndpoint: "https://analysis.windows.net/powerbi/api",
  // groupId: "fc2a58b3-e4bd-44ee-8f96-d1e6dc0a94ce", // similar to workspace id
  adalConfig: {
    tenant: 'b54b70ea-096e-445e-be09-aa511a708841', //tenant id of your organization
    clientId: 'b52ca625-be83-4645-92b1-0fcaad28c6c1', // client id of your azure ad application
    cacheLocation: 'localStorage', // Default is sessionStorage     
    endpointsApi: "api",
    endPoint: "b52ca625-be83-4645-92b1-0fcaad28c6c1",
    navigateToLoginRequestUrl: false,
    redirectUri: "http://localhost:4200",
    expireOffsetSeconds: "600"
  }
};
/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
