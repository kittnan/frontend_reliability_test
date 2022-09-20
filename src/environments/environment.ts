// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  API: 'http://localhost:4070',
  requestStatusFinish: ['request', 'reject_request_approve', 'reject_qe_window_person', 'request_approve', 'qe_window_person', 'reject_qe_engineer', 'reject_qe_section_head','reject_qe_department_head', 'qe_engineer', 'qe_section_head', 'qe_department_head']
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
