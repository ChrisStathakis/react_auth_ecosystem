
export const BASE_URL = 'http://127.0.0.1:8000/api/';
export const LOGIN_ENDPOINT = BASE_URL + 'token/';
export const REFRESH_TOKEN_ENDPOINT = BASE_URL + 'token/refresh/';

export const PRODUCTS_ENDPOINT = BASE_URL  + 'products/list/';
export const CREATE_PRODUCT_ENDPOINT = BASE_URL + 'products/create/';
export const UPDATE_DESTROY_PRODUCT_ENDPOINT = BASE_URL + 'products/update/'


export const VENDORS_LIST_ENDPOINT = BASE_URL + 'products/vendors/';
export const BRANDS_LIST_ENDPOINT = BASE_URL +'products/brands/';
export const BRAND_CREATE_ENDPOINT = BRANDS_LIST_ENDPOINT;
export const PRODUCT_CLASS_LIST_ENDPOINT = BASE_URL + 'products/product-class/';