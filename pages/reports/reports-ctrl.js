/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.reports', ['ngAnimate', 'ngSanitize', 'ui.bootstrap'])
    .config(routeConfig)
    .controller('reports-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.reports', {
        url: '/reports',
        templateUrl: 'app/pages/reports/reports.html',
        title: 'Reports',
        controller: 'reports-ctrl',
        sidebarMeta: {
          icon: 'ion-ios-book-outline',
          order: 0,
        },
        authenticate: true
      });
  }

 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter,$state , editableOptions, editableThemes, reportsService, $uibModal, $log, _, toasterService) {
   
  }
})();
