/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.admin.auditType', ['ngAnimate', 'ngSanitize', 'ui.bootstrap','smart-table'])
    .config(routeConfig)
    .controller('auditType-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.admin.auditType', {
        url: '/auditType',
        templateUrl: 'app/pages/admin/auditType/auditType.html',
        title: 'Audit Type',
        controller: 'auditType-ctrl',
        sidebarMeta: {
          icon: 'ion-android-send',
          order: 0,
        },
        authenticate: true
      });
  }

 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter,$state , editableOptions, editableThemes, auditTypeService, $uibModal, $log, _, toasterService) {
   
    $scope.init=function(){
      $scope.auditType = {};
      $scope.rowCollection=[];
      $scope.getAuditType();
      $scope.indexValue=0;
      $scope.dataDelete=[];
      $scope.deletedItems=[];
    }

    
    $scope.page_size = 7
    $scope.current_page = 1
$scope.rembemberCurrentPage = function(p) {
  $scope.current_page = p
}

    $scope.addNewRecord = function(){
      $scope.auditType.auditTypeData.push({
        auditType:"",
        delete:0
      });
      $scope.rowCollection.push({
        auditType:"",
        delete:0
      });
    }

    $scope.opendelete = function(data,index) {
    $scope.dataDelete=data;
    $scope.index=index;
         
      $scope.$modalInstance =  $uibModal.open({
       scope: $scope,
       templateUrl: "/app/pages/admin/auditType/confirmDeleteModal.html",
       size: 'sm',
       backdrop: 'static',
       keyboard: false
     })
   };
       
   $scope.confirmAuditTypeDelete=function()
   {
    $scope.editAuditTypeData($scope.dataDelete,$scope.index,1);
   }


   $scope.cancel = function() {
    $scope.$modalInstance.dismiss('cancel');
    $state.reload();
    };


    $scope.getAuditType= function(){
     
      auditTypeService.getAuditTypeData(JSON.stringify({
        name : "auditType"
      })).then(
        function(data) { 
          $scope.auditType.auditTypeData = JSON.parse(data.data.data)[0].data;
          $scope.rowCollection = JSON.parse(data.data.data)[0].data;
          for(var i=0;i< $scope.auditType.auditTypeData.length ;i++){
            if($scope.auditType.auditTypeData[i].delete===1)
            {
              $scope.deletedItems.push($scope.auditType.auditTypeData[i]);
              $scope.auditType.auditTypeData.splice(i,1);
              $scope.rowCollection.splice(i,1);
              i=i-1;
            }
          }
          $scope.auditType.auditTypeID = JSON.parse(data.data.data)[0]._id;
          $scope.auditType.auditTypeName = JSON.parse(data.data.data)[0].name;
        },
        function(msg) {
        });
    }
 

    $scope.editAuditTypeData = function(data, index,counter){
     
      var duplicate=false;
      if(counter==0){
        data.auditType = data.auditType.toUpperCase(); 
        
        for(var i=0;i<$scope.rowCollection.length&&duplicate==false;i++){
if(i!=index&&$scope.rowCollection[i].auditType===data.auditType)
{
  duplicate=true;
}
        }
        if(duplicate===false)
        $scope.rowCollection[index]=data;
      }
      else
      {
        data.delete = 1; 
        $scope.rowCollection[index]=data;
      }
      if(duplicate===false){
        if( $scope.rowCollection[index].auditType!=""){
      auditTypeService.editAuditTypeData(JSON.stringify({
          _id: $scope.auditType.auditTypeID,
          name: $scope.auditType.auditTypeName,
          data: $scope.rowCollection.concat( $scope.deletedItems),
        })).then(function(){
          if(counter==0)
         toasterService.openSucessToast("Record has been inserted/updated!");
         else
         toasterService.openSucessToast("Record has been deleted!");
          $state.reload();
        },function(){
          toasterService.openErrorToast("Some error occured. Please try again!");
        })  
      }
      else
      {
        toasterService.openErrorToast("Blank data. Please try again!");
        $state.reload();
        }  
    }
      else
      {
      toasterService.openErrorToast("Duplicate data. Please try again!");
      $state.reload();
      }
    }
 
    

    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-success btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';
  






  }
})();
