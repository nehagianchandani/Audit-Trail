/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.admin.complianceStatus', ['ngAnimate', 'ngSanitize', 'ui.bootstrap','smart-table'])
    .config(routeConfig)
    .controller('complianceStatus-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.admin.complianceStatus', {
        url: '/complianceStatus',
        templateUrl: 'app/pages/admin/complianceStatus/complianceStatus.html',
        title: 'Compliance Status',
        controller: 'complianceStatus-ctrl',
        sidebarMeta: {
          icon: 'ion-android-send',
          order: 0,
        },
        authenticate: true
      });
  }

 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter,$state , editableOptions, editableThemes, complianceStatusService, $uibModal, $log, _, toasterService) {
   
    $scope.init=function(){
      $scope.complianceStatus = {};
      $scope.rowCollection=[];
      $scope.getComplianceStatus();
      $scope.dataDelete=[];
      $scope.deletedItems=[];
    }


   
   $scope.cancel = function() {
    $scope.$modalInstance.dismiss('cancel');
    $state.reload();
    };


    
    $scope.page_size = 7
    $scope.current_page = 1
$scope.rembemberCurrentPage = function(p) {
  $scope.current_page = p
}

    $scope.addNewRecord = function(){
      $scope.complianceStatus.complianceStatusData.push({
        complianceStatus:"",
        delete:0
      });
      $scope.rowCollection.push({
        complianceStatus:"",
        delete:0
      });
    }


    $scope.opendelete = function(data,index) {
      $scope.dataDelete=data;
      $scope.index=index;
           
        $scope.$modalInstance =  $uibModal.open({
         scope: $scope,
         templateUrl: "/app/pages/admin/complianceStatus/confirmDeleteModal.html",
         size: 'sm',
         backdrop: 'static',
         keyboard: false
       })
     };
    
     $scope.confirmcomplianceStatusDelete=function()
     {
      $scope.editComplianceStatusData($scope.dataDelete,$scope.index,1);
     }




    $scope.getComplianceStatus= function(){
     
      complianceStatusService.getComplianceStatusData(JSON.stringify({
        name : "complianceStatus"
      })).then(
        function(data) { 
          $scope.complianceStatus.complianceStatusData = JSON.parse(data.data.data)[0].data;
          $scope.rowCollection = JSON.parse(data.data.data)[0].data;
for(var i=0;i< $scope.complianceStatus.complianceStatusData.length ;i++){
  if($scope.complianceStatus.complianceStatusData[i].delete===1)
  {
    $scope.deletedItems.push($scope.complianceStatus.complianceStatusData[i]);
    $scope.complianceStatus.complianceStatusData.splice(i,1);
    $scope.rowCollection.splice(i,1);
    i=i-1;
  }
}
          $scope.complianceStatus.complianceStatusID = JSON.parse(data.data.data)[0]._id;
          $scope.complianceStatus.complianceStatusName = JSON.parse(data.data.data)[0].name;
        },
        function(msg) {
        });
    }

    $scope.editComplianceStatusData = function(data, index,counter){
      var duplicate=false;
      if(counter==0){
        data.complianceStatus = data.complianceStatus.toUpperCase(); 

        for(var i=0;i<$scope.rowCollection.length && duplicate==false;i++){
          if(i!=index&&$scope.rowCollection[i].complianceStatus===data.complianceStatus)
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
     if( $scope.rowCollection[index].complianceStatus!=""){
      complianceStatusService.editComplianceStatusData(JSON.stringify({
          _id: $scope.complianceStatus.complianceStatusID,
          name: $scope.complianceStatus.complianceStatusName,
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
