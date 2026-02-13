export const paths = {
  timer: '/timer',
  menu: {
    link: '/menu',
    profile: '/menu/profile',
  },
  project: {
    list: '/projects',
    create: '/projects/create',
    edit: (id: string) => `/projects/edit/${id}`,
    view: (id: string) => `/projects/view/${id}`,
  },
  task: {
    list: '/tasks',
  },
  auth: {
    link: '/auth',
    code: '/auth/code',
  },
} as const;
