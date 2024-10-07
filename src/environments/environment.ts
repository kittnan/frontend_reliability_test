// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // API: 'http://10.200.90.152:4031',
  API: 'http://localhost:4031',
  // API: 'http://10.200.90.152:9999',
  // API: 'http://10.200.90.152:40311',
  fileServer: 'http://10.200.90.152:30000/upload/new',
  fileServerDelete: 'http://10.200.90.152:30000/delete',
  pathSaveFile:"reliability",
  BASE: '/',
  appVersion: require('../../package.json').version + '-dev',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
