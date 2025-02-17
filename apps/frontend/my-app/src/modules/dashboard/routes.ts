const dashboardRoutes = [
    {
      path: '/dashboard',
      name: 'Dashboard',
      component: () => import('./components/Dashboard.vue'),
    },
  ];

  export default dashboardRoutes;