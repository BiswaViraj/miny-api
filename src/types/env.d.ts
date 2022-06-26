declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_URI: string;
      ENV: string;
      PORT: string;
      JWT_ACCESS_TOKEN: string;
      JWT_REFRESH_TOKEN: string;
    }
  }
}

export {};
