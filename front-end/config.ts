/// <reference types="vite/client" />
const mode = import.meta.env.VITE_NODE_ENV;

export const SERVER_URL =
  mode === "production"
    ? "https://venzo2025-backend.vercel.app"
    : "http://127.0.0.1:5000";

export const SERVER_API = SERVER_URL + "/api";

export const DEFAULT_PRODUCT =
  SERVER_URL + "/uploads/images/products/default-product.jpg";

export const DEFAULT_BLOG =
  SERVER_URL + "/uploads/images/blogs/default-blog.jpg";

export const DEFAULT_AVATAR =
  SERVER_URL + "/uploads/images/avatars/default-avatar.jpg";

export const SITE_KEY = "6LcUFf0qAAAAAORJ8E3ad4CBTA4SD8OPBsTDCbOS";
