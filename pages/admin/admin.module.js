(function () {
    'use strict';
    angular.module('BlurAdmin.pages.admin', ['BlurAdmin.pages.admin.user','BlurAdmin.pages.admin.auditType','BlurAdmin.pages.admin.year','BlurAdmin.pages.admin.station','BlurAdmin.pages.admin.subStation','BlurAdmin.pages.admin.complianceStatus','ngAnimate', 'ngSanitize', 'ui.bootstrap'])
      .config(routeConfig);
     
    /** @ngInject */
    function routeConfig($stateProvider) {
      $stateProvider
        .state('main.admin', {
          url: '/admin',
          templateUrl: 'app/pages/admin/admin.html',
          title: 'Admin',
          controller: 'admin-ctrl',
          sidebarMeta: {
            icon: 'ion-ios-person-outline',
            order: 0,
          },
          authenticate: true
        });
    }
  
})();