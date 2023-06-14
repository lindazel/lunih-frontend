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
    INDUSTRY: environment.serverUrl + 'rest/industry',
    POST_TYPE: environment.serverUrl + 'rest/post-type',
    PROGRAM: environment.serverUrl + 'rest/program',

    // User_account
    STUDENT: environment.serverUrl + 'rest/student',
    UNIVERSITY: environment.serverUrl + 'rest/university',
    COMPANY: environment.serverUrl + 'rest/company',
    ADMIN: environment.serverUrl + 'rest/admin',

    // Post
    POST: environment.serverUrl + 'rest/post',
  },
  ROUTE: {
    LOGIN: '/login',
    MAIN: {
      HOME: '/',
    },

    MANAGEMENT: {
      MANAGEMENT: '/management',
      DASHBOARD: '/management/dashboard',

      USER_ACCOUNT: '/management/users',
      STUDENT: '/management/users/student',
      UNIVERSITY: '/management/users/university',
      COMPANY: '/management/users/company',
      ADMIN: '/management/users/admin',
      
      CATEGORIES: '/management/categories',
      FACULTY: '/management/categories/faculty',
      INDUSTRY: '/management/categories/industry',
      PROGRAM: '/management/categories/program',
      POST_TYPE: '/management/categories/post-type',

      POST_MANAGEMENT: '/management/posts',

    },


  },
};
