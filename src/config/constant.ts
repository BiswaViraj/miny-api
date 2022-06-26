export const DB_URI = process.env.DB_URI || "mongodb://localhost:27017";
export const ENV = process.env.NODE_ENV;
export const PORT = process.env.PORT || 8000;
export const IS_PROD = ENV === "production";
export const JWT_ACCESS_TOKEN = process.env.JWT_ACCESS_TOKEN;
export const JWT_REFRESH_TOKEN = process.env.JWT_REFRESH_TOKEN;
