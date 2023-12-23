/// <reference types="vite/client" />

/* eslint-disable @typescript-eslint/member-ordering */
interface ImportMetaEnv {
  // Infrastructure specific

  readonly VITE_DEPLOYMENT_ENVIRONMENT: 'dev' | 'staging' | 'production';
  readonly VITE_GENERATE_SOURCEMAP: boolean;

  // App specific

  readonly VITE_APP_MY_SECRET: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
