const authRoutes = [
    {
      path: '/login',
      name: 'Login',
      component: () => import('./components/Login.vue'),
    },
    {
      path: '/register',
      name: 'Register',
      component: () => import('./components/Register.vue'),
    }
  ];

  export default authRoutes;