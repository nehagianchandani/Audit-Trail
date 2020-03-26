/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.admin.subStation', ['ngAnimate', 'ngSanitize', 'ui.bootstrap','smart-table'])
    .config(routeConfig)
    .controller('subStation-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.admin.subStation', {
        url: '/subStation',
        templateUrl: 'app/pages/admin/subStation/subStation.html',
        title: 'Sub-Stations',
        controller: 'subStation-ctrl',
        sidebarMeta: {
          icon: 'ion-android-send',
          order: 0,
        },
        authenticate: true
      });
  }

 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter,$state , editableOptions, editableThemes, subStationService, $uibModal, $log, _, toasterService) {
   
    $scope.init=function(){
      $scope.subStation = {};
      $scope.station=[];
      $scope.dataDelete=[];
      $scope.deletedItems=[];
      
 $scope.rowCollection=[];
      $scope.getSubStation();
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
   templateUrl: "/app/pages/admin/subStation/confirmDeleteModal.html",
   size: 'sm',
   backdrop: 'static',
   keyboard: false
 })
};

$scope.cancel = function() {
  $scope.$modalInstance.dismiss('cancel');
  $state.reload();
  };


  $scope.confirmsubStationDelete=function()
  {
   $scope.editSubStationData($scope.dataDelete,$scope.index,1);
  }



    $scope.addNewRecord = function(){
      $scope.subStation.subStationData.push({
        station:"",
        subStation:"",
        delete:0
      });
      $scope.rowCollection.push({
        station:"",
        subStation:"",
        delete:0
      });
      
    }

    $scope.getSubStation= function(){
     
      subStationService.getSubStationData(JSON.stringify({
        name : "subStation"
      })).then(
        function(data) { 
          $scope.subStation.subStationData = JSON.parse(data.data.data)[0].data;
          $scope.rowCollection =JSON.parse(data.data.data)[0].data;

          for(var i=0;i< $scope.subStation.subStationData.length ;i++){
            if($scope.subStation.subStationData[i].delete===1)
            {
              $scope.deletedItems.push($scope.subStation.subStationData[i]);
              $scope.subStation.subStationData.splice(i,1);
              $scope.rowCollection.splice(i,1);
              i=i-1;
            }
          }

          $scope.subStation.subStationID = JSON.parse(data.data.data)[0]._id;
          $scope.subStation.subStationName = JSON.parse(data.data.data)[0].name;

          subStationService.getSubStationData(JSON.stringify({
            name : "station"
          })).then(
            function(data) { 
              $scope.station = JSON.parse(data.data.data)[0].data;
            },
            function(msg) {
            });

            
        },
        function(msg) {
        });
    }


    // $scope.rowCollection = [];

    // for (id; id < 5; id++) {
    //     $scope.rowCollection.push(generateRandomItem(id));
    // }


    

    $scope.editSubStationData = function(data, index,counter){
      var duplicate=false;
      if(counter==0){
        data.subStation = data.subStation.toUpperCase();

        data.station = data.station.station;
         
        for(var i=0;i<$scope.rowCollection.length && duplicate==false;i++){
          if(i!=index && $scope.rowCollection[i].subStation===data.subStation   && $scope.rowCollection[i].station===data.station )
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
     if( $scope.rowCollection[index].subStation!="" && $scope.rowCollection[index].station!="" ){
     
      subStationService.editSubStationData(JSON.stringify({
          _id: $scope.subStation.subStationID,
          name: $scope.subStation.subStationName,
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
