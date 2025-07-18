export const paths = {
  timer: '/timer',
  menu: '/menu',
  profile: '/profile',
  project: {
    list: '/projects',
    create: '/projects/create',
    edit: (id: string) => `/projects/edit/${id}`,
    view: (id: string) => `/projects/view/${id}`,
  },
  auth: {
    link: '/auth',
    code: '/auth/code',
  },
};
