// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  url: 'https://onlinekniznica.snk.sk',
  snkokBackOfficeUrl: 'http://localhost:8080',
  siteKey: '6Ld7oqUUAAAAAORInrRX9rvdZJgwEtg5cAhvOVnD',
  passwordPattern: '(?=.*\\d)(?=.*[a-zA-Z]).{6,}'
};
