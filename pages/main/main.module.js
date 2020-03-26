/**
 * @author l.azevedo
 * created on 29.07.2017
 */
(function() {
  'use strict';

  angular.module('BlurAdmin.pages.main', [])
    .config(routeConfig);

  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/main',
        templateUrl: 'app/pages/main/main.html',
        controller : "main-ctrl",
        redirectTo: 'main.dashboard',
        authenticate: true
      });
  }

})();