export const paths = {
  timer: {
    link: '/timer',
  },
  menu: {
    link: '/menu',
  },
  projects: {
    link: '/projects',
    create: '/projects/create',
    edit: (id: string) => `/projects/edit/${id}`,
  },
  auth: {
    link: '/auth',
    code: '/auth/code',
  },
};
