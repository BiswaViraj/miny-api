declare global {
  namespace NodeJS {
    interface ProcessEnv {
      DB_URI: string;
      NODE_ENV: "dev" | "production";
      PORT: string;
      JWT_ACCESS_TOKEN: string;
      JWT_REFRESH_TOKEN: string;
    }
  }
}

export {};
