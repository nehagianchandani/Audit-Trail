/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.admin.year', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'smart-table'])
    .config(routeConfig)
    .controller('year-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.admin.year', {
        url: '/year',
        templateUrl: 'app/pages/admin/year/year.html',
        title: 'Year',
        controller: 'year-ctrl',
        sidebarMeta: {
          icon: 'ion-android-send',
          order: 0,
        },
        authenticate: true
      });
  }

 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter,$state , editableOptions, editableThemes, yearService, $uibModal, $log, _, toasterService) {
    
    $scope.init=function(){
      $scope.year = {};
      $scope.rowCollection=[];
      $scope.getYear();
      $scope.dataDelete=[];
      $scope.deletedItems=[];

    }

    $scope.page_size = 7
    $scope.current_page = 1
$scope.rembemberCurrentPage = function(p) {
  $scope.current_page = p
}

    $scope.addNewRecord = function(){
      $scope.year.yearData.push({
        year:"",
        delete:0
      });
      $scope.rowCollection.push({
        year:"",
        delete:0
      });
    }

    $scope.getYear= function(){
     
      yearService.getYearData(JSON.stringify({
        name : "year"
      })).then(
        function(data) { 
          $scope.year.yearData = JSON.parse(data.data.data)[0].data;
          $scope.rowCollection = JSON.parse(data.data.data)[0].data;

          for(var i=0;i< $scope.year.yearData.length ;i++){
            if($scope.year.yearData[i].delete===1)
            {
              $scope.deletedItems.push($scope.year.yearData[i]);
              $scope.year.yearData.splice(i,1);
              $scope.rowCollection.splice(i,1);
              i=i-1;
            }
          }

          $scope.year.yearID = JSON.parse(data.data.data)[0]._id;
          $scope.year.yearName = JSON.parse(data.data.data)[0].name;
        },
        function(msg) {
        });
    }

    $scope.editYearData = function(data, index,counter){
      var duplicate=false;
      if(counter==0){
        data.year = data.year.toUpperCase(); 
        for(var i=0;i<$scope.rowCollection.length && duplicate==false;i++){
          if(i!=index&&$scope.rowCollection[i].year===data.year)
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
      if( $scope.rowCollection[index].year!=""){
      yearService.editYearData(JSON.stringify({
          _id: $scope.year.yearID,
          name: $scope.year.yearName,
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
   


    $scope.opendelete = function(data,index) {
      $scope.dataDelete=data;
      $scope.index=index;
    

      $scope.$modalInstance =  $uibModal.open({
       scope: $scope,
       templateUrl: "/app/pages/admin/year/confirmDeleteModal.html",
       size: 'sm',
       backdrop: 'static',
       keyboard: false
     })
   };


   $scope.confirmyearDelete=function()
   {
    $scope.editYearData($scope.dataDelete,$scope.index,1);
   }

   $scope.cancel = function() {
    $scope.$modalInstance.dismiss('cancel');
    $state.reload();
    };

    

    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-success btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';
  




  }
})();
