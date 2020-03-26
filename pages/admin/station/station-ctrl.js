/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.admin.station', ['ngAnimate', 'ngSanitize', 'ui.bootstrap' , 'smart-table'])
    .config(routeConfig)
    .controller('station-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.admin.station', {
        url: '/station',
        templateUrl: 'app/pages/admin/station/station.html',
        title: 'Stations',
        controller: 'station-ctrl',
        sidebarMeta: {
          icon: 'ion-android-send',
          order: 0,
        },
        authenticate: true
      });
  }

 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter,$state , editableOptions, editableThemes, stationService, $uibModal, $log, _, toasterService) {
  
    $scope.init=function(){
      $scope.station = {};
      $scope.rowCollection=[];
      $scope.getStation();
      $scope.count=0;
      $scope.dataDelete=[];
      $scope.deletedItems=[];
    
     
    }

    $scope.page_size = 7
    $scope.current_page = 1
$scope.rembemberCurrentPage = function(p) {
  $scope.current_page = p
}
   

$scope.opendelete = function(data,index) {
  $scope.dataDelete=data;
  $scope.index=index; 

  $scope.$modalInstance =  $uibModal.open({
   scope: $scope,
   templateUrl: "/app/pages/admin/station/confirmDeleteModal.html",
   size: 'sm',
   backdrop: 'static',
   keyboard: false
 })
};

$scope.cancel = function() {
  $scope.$modalInstance.dismiss('cancel');
  $state.reload();
  };


  $scope.confirmstationDelete=function()
  {
   $scope.editStationData($scope.dataDelete,$scope.index,1);
  }

   
   
    $scope.addNewRecord = function(){
      $scope.station.stationData.push({
        station:"",
        delete:0
      });
      $scope.rowCollection.push({
        station:"",
        delete:0
      });
    }

    $scope.getStation= function(){
     
      stationService.getStationData(JSON.stringify({
        name : "station"
      })).then(
        function(data) { 
          $scope.station.stationData = JSON.parse(data.data.data)[0].data;
          $scope.rowCollection = JSON.parse(data.data.data)[0].data;
          for(var i=0;i< $scope.station.stationData.length ;i++){
            if($scope.station.stationData[i].delete===1)
            {
              $scope.deletedItems.push($scope.station.stationData[i]);
              $scope.station.stationData.splice(i,1);
              $scope.rowCollection.splice(i,1);
              i=i-1;
            }
          }

          $scope.station.stationID = JSON.parse(data.data.data)[0]._id;
          $scope.station.stationName = JSON.parse(data.data.data)[0].name;
        },
        function(msg) {
        });
    }


    

    $scope.editStationData = function(data, index,counter){
      var duplicate=false;
      if(counter==0){
        data.station = data.station.toUpperCase();
        
        for(var i=0;i<$scope.rowCollection.length && duplicate==false;i++){
          if(i!=index&&$scope.rowCollection[i].station===data.station)
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
     if( $scope.rowCollection[index].station!=""){
      
      stationService.editStationData(JSON.stringify({
          _id: $scope.station.stationID,
          name: $scope.station.stationName,
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
