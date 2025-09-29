/// <reference types="vite/client" />
const mode = import.meta.env.VITE_NODE_ENV;
const site_key = import.meta.env.VITE_SITE_KEY;
const tinymce_key = import.meta.env.VITE_TMCE_API_KEY;

export const SERVER_URL =
  mode === "development"
    ? "/back-end" //این عبارت توسط پراکسی در مود توسعه با آدرس سرور جایگزین می شود
    : "";

export const SERVER_API = SERVER_URL + "/api";

export const DEFAULT_IMAGE =
  SERVER_URL +
  "/public/static-images/1759131600005-673329792-abstract-luxury-plain-blur-grey-black-gradient-used-as-background-studio-wall-display-your-products-medium.webp"; //تصویر پیش فرض

export const Logo = SERVER_URL + "/public/static-images/logo.png";

export const SITE_KEY = site_key;

export const TMCE_API_KEY = tinymce_key;

//same on index.css
export const BREAK_POINTS = {
  sm: 640,
  md: 768,
  lg: 1024,
  xl: 1280,
  xxl: 1536,
};
