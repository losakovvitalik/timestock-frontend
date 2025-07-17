export const paths = {
  timer: '/timer',
  menu: '/menu',
  profile: '/profile',
  projects: {
    list: '/projects',
    create: '/projects/create',
    edit: (id: string) => `/projects/edit/${id}`,
  },
  auth: {
    link: '/auth',
    code: '/auth/code',
  },
};
