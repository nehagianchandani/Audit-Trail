/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.auditsDone', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'smart-table'])
    .config(routeConfig)
    .controller('auditsDone-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.auditsDone', {
        url: '/auditsDone',
        templateUrl: 'app/pages/auditsDone/auditsDone.html',
        title: 'Audits Done',
        controller: 'auditsDone-ctrl',
        sidebarMeta: {
          icon: 'ion-android-done',
          order: 0,
        },
        authenticate: true
      });
  }

 
  /** @ngInject */
  function TablesPageCtrl($scope,$rootScope, $http, $filter,$state , editableOptions, editableThemes, auditsDoneService, $uibModal, $log, _, toasterService) {
    $scope.init=function(){
      $scope.auditsDone = {};
      $scope.insert=false;
      $scope.station=[];
      $scope.year=[];
      $scope.auditType=[];
      $scope.rowCollection=[];
      $scope.subStations=[];
     $scope.todayDate= new Date().getFullYear() +"-" + ((new Date().getMonth() + 1)<10 ? ("0"+ (new Date().getMonth() + 1)) : (new Date().getMonth() + 1))  + "-" + ((new Date().getDate())<10?("0"+ (new Date().getDate())) :  (new Date().getDate()));
      $scope.getauditsDone();

    }
   
   
   
   

    
    $scope.open = function(data) {
    

         $scope.$modalInstance =  $uibModal.open({
          scope: $scope,
          templateUrl: "/app/pages/auditsDone/editAuditsDoneModal.html",
          size: 'sm',
          backdrop: 'static',
          keyboard: false
        })
      };

      $scope.addNewAuditsDone = function() {
            var duplicate=false;
            $scope.from=$scope.fromSelected.getFullYear()+"-"+$scope.fromSelected.getMonth()+"-"+$scope.fromSelected.getDate()
            $scope.to=$scope.toSelected.getFullYear()+"-"+$scope.toSelected.getMonth()+"-"+$scope.toSelected.getDate()

        for(var i=0;i<$scope.rowCollection.length && duplicate===false;i++)
          { 
             $scope.rowCollection[i].from=new Date($scope.rowCollection[i].from);
             $scope.rowCollection[i].to=new Date($scope.rowCollection[i].to);
            $scope.rowfrom=($scope.rowCollection[i].from).getFullYear()+"-"+($scope.rowCollection[i].from).getMonth()+"-"+($scope.rowCollection[i].from).getDate()
            $scope.rowto=$scope.rowCollection[i].to.getFullYear()+"-"+($scope.rowCollection[i].to).getMonth()+"-"+($scope.rowCollection[i].to).getDate()

            if($scope.rowCollection[i].auditType===$scope.auditTypeSelected.auditType && $scope.rowCollection[i].year===$scope.yearSelected.year  && $scope.rowCollection[i].station===($scope.stationIncharge.length===1?$scope.stationIncharge[0]:$scope.stationSelected) && $scope.rowfrom===$scope.from &&  $scope.rowto===$scope.to)
          {
           duplicate=true
          }

          }

if(duplicate===false ){
        auditsDoneService.addAuditsDoneData(JSON.stringify({
        
          empID:Number(localStorage.getItem("username")),
          auditType:$scope.auditTypeSelected.auditType,
          year:$scope.yearSelected.year,
          station:$scope.stationIncharge.length===1?$scope.stationIncharge[0]:$scope.stationSelected,
          from:$scope.fromSelected,
          to: $scope.toSelected,
          enteredDate: new Date(),
          delete:0
        })).then(function(){
         toasterService.openSucessToast("Record has been inserted!");
          $state.reload();
        },function(){
          toasterService.openErrorToast("an error occurred. Please try again!");
        }) }
        else
        {
        toasterService.openSucessToast("Duplicate data. Please try again!");
        $state.reload();
        }
    };
  
    
    $scope.page_size = 7
    $scope.current_page = 1
$scope.rembemberCurrentPage = function(p) {
  $scope.current_page = p
}

    $scope.cancel = function() {
        $scope.$modalInstance.dismiss('cancel');
    };
    


    $scope.getauditsDone= function(){
     $scope.stationIncharge= JSON.parse(localStorage.getItem("stationIncharge"));
      auditsDoneService.getauditsDone($scope.stationIncharge).then(
        function(data) { 
          $scope.auditsDone= JSON.parse(data.data.data);
          $scope.rowCollection = JSON.parse(data.data.data);
          

       


          

              auditsDoneService.getMiscellaneousData(JSON.stringify({
                name : "year"
              })).then(
                function(data) { 
                  $scope.year = JSON.parse(data.data.data)[0].data;
                  for(var i=0; i<$scope.year.length;i++)
          {
            if($scope.year[i].delete===1)
            {
            $scope.year.splice(i,1)
            i=i-1;
          }
        }

                  auditsDoneService.getMiscellaneousData(JSON.stringify({
                    name : "auditType"
                  })).then(
                    function(data) { 
                      $scope.auditType = JSON.parse(data.data.data)[0].data;
                      for(var i=0; i<$scope.auditType.length;i++)
          {
            if($scope.auditType[i].delete===1)
            {
            $scope.auditType.splice(i,1)
            i=i-1;
          }
        }
                    
                    },
                    function(msg) {
                    });
    
                  

                },
                function(msg) {
                });
          
        
         

        },
        function(msg) {
        });
    }





  }
})();
