export const environment = {
  production: true,
  // API: 'http://10.200.90.152:40311',
  API: 'http://10.200.90.152:4031',
  // API: 'http://localhost:4031',
  BASE: '/reliability',
  appVersion: require('../../package.json').version,
  // API: 'http://10.200.90.152:40311',
  fileServer: 'http://10.200.90.152:30000/upload/new',
  fileServerDelete: 'http://10.200.90.152:30000/delete',
  pathSaveFile:"reliability",
};
