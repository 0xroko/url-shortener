/**
 * @type {import('@remix-run/dev').AppConfig}
 */
module.exports = {
  serverBuildTarget: 'cloudflare-workers',
  devServerBroadcastDelay: 500,
  ignoredRouteFiles: ['**/.*'],
};
