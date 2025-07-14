/// <reference types="vite/client" />
const mode = import.meta.env.VITE_NODE_ENV;
const site_key = import.meta.env.VITE_SITE_KEY;

export const SERVER_URL =
  mode === "development"
    ? "/back-end" //این عبارت توسط پراکسی در مود توسعه با آدرس سرور جایگزین می شود
    : "";

export const SERVER_API = SERVER_URL + "/api";

export const DEFAULT_PRODUCT =
  SERVER_URL +
  "/public/static-images/abstract-luxury-plain-blur-grey-black-gradient-used-as-background-studio-wall-display-your-products.jpg";

export const DEFAULT_BLOG =
  SERVER_URL +
  "/public/static-images/abstract-luxury-plain-blur-grey-black-gradient-used-as-background-studio-wall-display-your-products.jpg";

export const DEFAULT_AVATAR =
  SERVER_URL +
  "/public/static-images/abstract-luxury-plain-blur-grey-black-gradient-used-as-background-studio-wall-display-your-products.jpg";

export const Logo = SERVER_URL + "/public/static-images/logo.png";

export const SITE_KEY = site_key;
