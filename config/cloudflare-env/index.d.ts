interface Env {
  __STATIC_CONTENT: KVNamespace;

  URLS: KVNamespace;

  ACCESS_KEY: string;

  DISSALLOWED_DOMAINS: string;

  APP_URL: string;
}

declare module globalThis {
  var env: Env;
}
