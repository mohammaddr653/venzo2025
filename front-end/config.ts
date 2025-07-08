/// <reference types="vite/client" />
const mode = import.meta.env.VITE_NODE_ENV;
const site_key = import.meta.env.VITE_SITE_KEY;

export const SERVER_URL =
  mode === "production"
    ? "https://venzo2025-backend.liara.run"
    : "http://127.0.0.1:5000";

export const SERVER_API = SERVER_URL + "/api";

export const DEFAULT_PRODUCT =
  SERVER_URL +
  "/images/abstract-luxury-plain-blur-grey-black-gradient-used-as-background-studio-wall-display-your-products.jpg";

export const DEFAULT_BLOG =
  SERVER_URL +
  "/images/abstract-luxury-plain-blur-grey-black-gradient-used-as-background-studio-wall-display-your-products.jpg";

export const DEFAULT_AVATAR =
  SERVER_URL +
  "/images/abstract-luxury-plain-blur-grey-black-gradient-used-as-background-studio-wall-display-your-products.jpg";

export const Logo = SERVER_URL + "/images/logo.png";

export const SITE_KEY = site_key;
