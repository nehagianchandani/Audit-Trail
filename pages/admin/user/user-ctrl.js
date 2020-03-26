/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.admin.user', ['ngAnimate', 'ngSanitize', 'ui.bootstrap','smart-table'])
    .config(routeConfig)
    .controller('user-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.admin.user', {
        url: '/user',
        templateUrl: 'app/pages/admin/user/user.html',
        title: 'User',
        controller: 'user-ctrl',
        sidebarMeta: {
          icon: 'ion-android-send',
          order: 0,
        },
        authenticate: true
      });
  }

 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter,$state , editableOptions, editableThemes, userService, $uibModal, $log, _, toasterService) {
   $scope.stationIncharge=["yes","no"];
    $scope.init=function(){
      $scope.user = {};
      $scope.location=[];
      $scope.rowCollection=[];
      $scope.getUser();
      $scope.userData=[];
    }
   
    $scope.page_size = 7
    $scope.current_page = 1
$scope.rembemberCurrentPage = function(p) {
  $scope.current_page = p
}

   
   
    $scope.addNewRecord = function(){
      $scope.user.push({
        location:"",
        empID:0,
        stationIncharge:"no",
        counter:0,
        delete:0
        
      });
      $scope.rowCollection.push({
        location:"",
        empID:0,
        stationIncharge:"no",
        counter:0,
        delete:0
      });
    }

    

    $scope.getUser= function(){
     
      userService.getUserData().then(
        function(data) { 
          $scope.user= JSON.parse(data.data.data);
          $scope.rowCollection = JSON.parse(data.data.data);
          for(var i=0;i<$scope.user.length;i++)
          {
             if($scope.user[i].empID===987654321)
             {
             $scope.user.splice(i, 1);
             $scope.rowCollection.splice(i, 1);
             }
          }

          userService.getSubStationData(JSON.stringify({
            name : "station"
          })).then(
            function(data) { 
              $scope.location = JSON.parse(data.data.data)[0].data;
            },
            function(msg) {
            });

        },
        function(msg) {
        });
    }

    $scope.opendelete = function(data) {
    
      $scope.userData=data;
      $scope.$modalInstance =  $uibModal.open({
       scope: $scope,
       templateUrl: "/app/pages/admin/user/confirmDeleteModal.html",
       size: 'sm',
       backdrop: 'static',
       keyboard: false
     })
   };
   $scope.cancel = function() {
    $scope.$modalInstance.dismiss('cancel');
    $state.reload();
    };


    
    
    $scope.confirmdeleteUser=function()
                                  {
                                    $scope.$modalInstance.dismiss('cancel');
                                    $scope.userData.delete=1;
                                    $scope.editUserData($scope.userData,0)

                                  }




        

    $scope.editUserData = function(data, index){
      var duplicate=false;
     
     
      if( data.empID!=0 && data.location.station!=""){ 

        for(var i=0;i<$scope.rowCollection.length && duplicate==false;i++){
          if(i!=index && $scope.rowCollection[i].empID===Number(data.empID) && data.location.station===$scope.rowCollection[i].location  && data.delete===0)
          {
            duplicate=true;
          }
                  }
                  if(duplicate===false)
                  {

                  
     if(data.counter===0)
     {data.counter=1;
     
      userService.addUserData(JSON.stringify({
        empID: Number(data.empID),
        location: data.location.station,
        stationIncharge: data.stationIncharge,
        counter:data.counter,
        delete:0
      })).then(function(){
       toasterService.openSucessToast("Record has been inserted!");
        $state.reload();
      },function(){
        toasterService.openErrorToast("Some error occured. Please try again!");
      }) 

     }
   
     else
     {
  
      userService.editUserData(JSON.stringify({
          _id: data._id,
          empID: Number(data.empID),
          location: data.location.station,
          stationIncharge: data.stationIncharge,
          counter:data.counter,
          delete:data.delete
        })).then(function(){
          if(data.delete==0)
         toasterService.openSucessToast("Record has been updated!");
         else
         toasterService.openSucessToast("Record has been deleted!");
          $state.reload();
        },function(){
          toasterService.openErrorToast("Some error occured. Please try again!");
        })      
  
    }
      }
      else
      {
      toasterService.openErrorToast("Duplicate data. Please try again!");
      $state.reload();
      }
    }
      else
      {
      toasterService.openErrorToast("Blank data. Please enter data and try again!");
      $state.reload();
      }
    }


      // $scope.deleteUserData = function(data, index){
        
      //    userService.deleteUserData(JSON.stringify({
      //      _id: data._id,
      //      empID: data.empID,
      //      location: data.location.station,
      //      stationIncharge: data.stationIncharge,
      //      counter:data.counter,
      //      delete:1
      //    })).then(function(){
      //     // toasterService.openSucessToast("Record has been successfully inserted/updated!");
      //      $state.reload();
      //    },function(){
      //      //toasterService.openErrorToast("Record has been successfully inserted/updated!");
      //    }) 
   
        
      // }
    
    
    
    
    
    editableOptions.theme = 'bs3';
    editableThemes['bs3'].submitTpl = '<button type="submit" class="btn btn-success btn-with-icon"><i class="ion-checkmark-round"></i></button>';
    editableThemes['bs3'].cancelTpl = '<button type="button" ng-click="$form.$cancel()" class="btn btn-default btn-with-icon"><i class="ion-close-round"></i></button>';
  

  }
})();
