/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
  'use strict';
  angular.module('BlurAdmin.pages.admin')
  .controller('admin-ctrl', TablesPageCtrl)
  .constant('_',
    window._
  );
 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter,$state , editableOptions, editableThemes, $uibModal, $log, _, toasterService) {
   
  }
})();
