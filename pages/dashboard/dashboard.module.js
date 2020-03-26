/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';

  angular.module('BlurAdmin.pages.dashboard', ['ngAnimate','ngSanitize','ui.bootstrap','smart-table'])
      .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
        .state('main.dashboard', {
          url: '/dashboard',
          templateUrl: 'app/pages/dashboard/dashboard.html',
          title: 'My Entries',
          sidebarMeta: {
            icon: 'ion-ios-home-outline',
            order: 0,
          },
          authenticate:true
        });
  }

})();
