declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT: number;

      AUTH0_CLIENT_ID: string;
      AUTH0_CLIENT_SECRET: string;
      AUTH0_ISSUER_BASE_URL: string;
      AUTH0_ISSUER: string;
      AUTH0_DATABASE_IDENTIFIER: string;

      POSTGRES_URI: string;

      NODE_ENV: 'development' | 'production' | 'test';
    }
  }
}

export {};
