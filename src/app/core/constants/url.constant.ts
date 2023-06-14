import { environment } from 'src/environments/environment';

export const UrlConstant = {

  PUBLIC_URL: [
    { regex: '.*login.*', method: 'POST' },
    { regex: '.*banner$', method: 'GET' },
    { regex: '.*banner/[a-fA-f0-9]{24}', method: 'GET' }, // banner/{id}
    { regex: '.*side-banner$', method: 'GET' },
    { regex: '.*side-banner/[a-fA-f0-9]{24}', method: 'GET' }, // banner/{id}
    { regex: '.*bai-viet/paging', method: 'GET' },
    { regex: '.*bai-viet/loai-bai-viet', method: 'GET' },
    { regex: '.*bai-viet/[a-fA-f0-9]{24}', method: 'GET' }, // bai-viet/{id}
    { regex: '.*file.*', method: 'GET' },
  ],
  
  API: {
    // Main
    LOGIN: environment.serverUrl + 'rest/login',

    // Categories
    FACULTY: environment.serverUrl + 'rest/faculty',
  },
  ROUTE: {
      LOGIN: '/login',
      MAIN: {
          HOME: '/',
      },
      MANAGEMENT: {
          DASHBOARD: '/management/dashboard',
          CATEGORIES: '/management/categories',
          FACULTY: '/management/categories/faculty',

  },
  }
};