/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function () {
  'use strict';
  angular.module('BlurAdmin.pages.editData', ['ngAnimate', 'ngSanitize', 'ui.bootstrap', 'smart-table'])
  .config(routeConfig)
    .controller('editData-ctrl', TablesPageCtrl)
    .constant('_',
      window._
    );
  /** @ngInject */
  function routeConfig($stateProvider) {
    $stateProvider
      .state('main.editData', {
        url: '/editData',
        templateUrl: 'app/pages/editData/editData.html',
        title: 'Edit Data',
        controller: 'editData-ctrl',
        sidebarMeta: {
          icon: 'ion-ios-compose-outline',
          order: 0,
        },
        authenticate: true
      });
  }
  
  function TablesPageCtrl($scope,$rootScope, $http, $filter,$state , editableOptions, editableThemes,editDataService, $uibModal, $log, _, toasterService) {
   
                                        $scope.init=function(){
                                          $scope.rowCollectionEntries=[];    
                                          $scope.rowCollection=[];
                                          $scope.year=[];
                                          $scope.auditType=[];
                                          $scope.station=[];
                                          $scope.subStations=[];
                                          $scope.getauditsDone();
                                          $scope.deleteCounterAudits=0;
                                          $scope.deleteCounterEntries=0;


                                          $scope.deleteDataAudits=[];
                                          $scope.deleteDataEntries=[];
                                         

                                        }



                                        $scope.page_size1 = 5
                                        $scope.page_size = 7
                                        $scope.current_page = 1
                                    $scope.rembemberCurrentPage = function(p) {
                                      $scope.current_page = p
                                    }
                                          
                                    // $scope.openedit = function(data) {

                                    // $scope.modaldata=data
                                    // $scope.$modalInstance =  $uibModal.open({
                                    // scope: $scope,
                                    // templateUrl: "/app/pages/dashboard/editDashboardModal.html",
                                    // size: '',
                                    // })
                                    // };
                                    $scope.opendetails = function(data, $index) {
                                    $scope.detailsmodaldata=data;
                                    editDataService.getEntriesData(JSON.stringify({
                                      _id: $scope.detailsmodaldata._id
                                      
                                    })).then(
                                      function(data) { 
                                        $scope.entries= JSON.parse(data.data.data);
                                        $scope.rowCollectionEntries = JSON.parse(data.data.data);


                                        editDataService.getMiscellaneousData(JSON.stringify({
                                          name : "subStation"
                                        })).then(
                                          function(substationdata) { 
                                            $scope.subStation = JSON.parse(substationdata.data.data)[0].data;
                                            for(var i=0;i<$scope.subStation.length;i++)
                                            {
                                           
                                               if($scope.subStation[i].station===$scope.detailsmodaldata.station){
                                               $scope.subStations.push($scope.subStation[i]);
                                              }
                                    
                                             
                                            } 
                                            for(var i=0; i<$scope.subStations.length;i++)
                                            {
                                              if($scope.subStations[i].delete===1)
                                              {
                                              $scope.subStations.splice(i,1)
                                              i=i-1;
                                            }
                                          }

                                            editDataService.getMiscellaneousData(JSON.stringify({
                                              name : "complianceStatus"
                                            })).then(
                                              function(substationdata) { 
                                                $scope.complianceStatus = JSON.parse(substationdata.data.data)[0].data;
                                                for(var i=0; i<$scope.complianceStatus.length;i++)
                                                {
                                                  if($scope.complianceStatus[i].delete===1)
                                                  {
                                                  $scope.complianceStatus.splice(i,1)
                                                  i=i-1;
                                                }
                                              }


                                        $scope.$modalInstance4 =  $uibModal.open({
                                          scope: $scope,
                                          templateUrl: "/app/pages/editData/editDataModal.html",
                                          size: '',
                                          backdrop: 'static',
                                          keyboard: false
                                        })
                                      });
                                    });
                                      },
                                      function(msg) {
                                      });
                                    };

                                    $scope.cancel = function() {
                                    $scope.$modalInstance.dismiss('cancel');
                                    $state.reload();
                                    };

                                    
                                    $scope.canceldelete = function() {
                                      $scope.$modalInstance4.dismiss('cancel');
                                      $state.reload();
                                      };

                                      


                                    $scope.editEntriesOldData = function(data, index){
                                    
                                      if($scope.deleteCounterEntries===0)
                                      {
                                      data.complianceStatus=data.complianceStatus.complianceStatus
                                      data.subStation=data.subStation.subStation

                                      


                                      var duplicate=false;
                                      for(var i=0;i<$scope.rowCollectionEntries.length && duplicate===false;i++)
                                                 { 
                                                  if(i!=index)
                                                  {
                                                  if($scope.rowCollectionEntries[i].subStation===data.subStation && $scope.rowCollectionEntries[i].recommendations===data.recommendations    &&    $scope.rowCollectionEntries[i].generalObservations===data.generalObservations     &&   $scope.rowCollectionEntries[i].targetDate===data.targetDate    &&    $scope.rowCollectionEntries[i].currentStatus===data.currentStatus    &&    $scope.rowCollectionEntries[i].actionTaken===data.actionTaken  && $scope.rowCollectionEntries[i].complianceStatus===data.complianceStatus  &&    $scope.rowCollectionEntries[i].actionTakenBy===data.actionTakenBy &&   $scope.rowCollectionEntries[i].remarks===data.remarks)
                                                  {
                                                       duplicate=true
                                                   }
                                                  }
                                             }
                                            }


                                         if(duplicate===false   || $scope.deleteCounterEntries===1){

                                      if($scope.deleteCounterEntries!=1)
                                      {
                                        data.editHistory = $scope.editableEntriesHourlyRec;
                                        data.editDate = new Date();
                                        data.empID = Number(localStorage.getItem("username"));
                                      }                     
                                     editDataService.editEntriesOldData(JSON.stringify(
                                        {
                                          data:data
                                        })
                                     
                                    ).then(function(){
                                      if($scope.deleteCounterEntries===1)
                                      toasterService.openSucessToast("Record has been deleted!");
                                      else
                                      toasterService.openSucessToast("Record has been updated!");
                                        
                                        },function(){
                                          toasterService.openErrorToast("An error occurred. Please try again!");
                                        })  }
                                        else
                                        {
                                        toasterService.openSucessToast("Duplicate data. Please try again!");
                                        $state.reload();  
                                        }  
                                    }


                                    // $scope.addNewEntries = function() {
                                    // dashboardService.addEntriesData(JSON.stringify({
                                    // empID:localStorage.getItem("username"),

                                    // auditInfo:$scope.modaldata._id,
                                    // generalObservations:$scope.generalObservationsinput,
                                    // recommendations:$scope.recommendationsinput,

                                    // targetDate:$scope.targetDateinput,
                                    // currentStatus:$scope.currentStatusinput,
                                    // actionsTaken: $scope.actionsTakeninput,
                                    // complianceStatus:$scope.complianceStatusinput,
                                    // actionTakenBy:$scope.actionTakenByinput,
                                    // remarks:$scope.remarksinput,
                                    // editDate: new Date()
                                    // })).then(function(){
                                    // // toasterService.openSucessToast("Record has been successfully inserted/updated!");
                                    // $state.reload();
                                    // },function(){
                                    // //toasterService.openErrorToast("Record has been successfully inserted/updated!");
                                    // }) 
                                    // };



                                    $scope.getEntries= function(){

                                      editDataService.getEntriesData().then(
                                      function(data) { 
                                        $scope.entries= JSON.parse(data.data.data);
                                        $scope.rowCollectionEntries = JSON.parse(data.data.data);


                                      },
                                      function(msg) {
                                      });
                                    }

                                    $scope.cancelHistory = function() {
                                      $scope.$modalInstance1.dismiss('cancel');
                                      // $state.reload();
                                      };

                                      
                $scope.editEntiresStart = function(data){
                  $scope.editableEntriesHourlyRec = angular.copy(data);
                }

                
             $scope.openHistory = function(data) {

              $scope.flattenedHistory=[];
              recursivePush(data) 
              function recursivePush(data){
            $scope.flattenedHistory.push(data)
            if(data.editHistory!=null){
              recursivePush(data.editHistory)
            }
          }
  

            $scope.$modalInstance1 =  $uibModal.open({
             scope: $scope,
             templateUrl: "/app/pages/editData/editDataHistoryModal.html",
             size: 'lg',
             backdrop: 'static',
             keyboard: false
           })
         };
                                      
                                    $scope.getauditsDone= function(){
                                   
                                    editDataService.getauditsDone().then(
                                        function(data) { 
                                          $scope.auditsDone= JSON.parse(data.data.data);
                                          $scope.rowCollection = JSON.parse(data.data.data);




                                           for(var i=0;i<$scope.rowCollection.length;i++)
                                           {
                                             $scope.rowCollection[i].from= new Date($scope.rowCollection[i].from)
                                             $scope.auditsDone[i].from= new Date($scope.rowCollection[i].from) 
                                             $scope.rowCollection[i].to= new Date($scope.rowCollection[i].to)
                                             $scope.auditsDone[i].to= new Date($scope.rowCollection[i].to)
                                           }
                                          editDataService.getMiscellaneousData(JSON.stringify({
                                            name : "station"
                                          })).then(
                                            function(data1) { 
                                              $scope.station = JSON.parse(data1.data.data)[0].data;
                                              for(var i=0; i<$scope.station.length;i++)
          {
            if($scope.station[i].delete===1)
            {
            $scope.station.splice(i,1)
            i=i-1;
          }
        }
                                              

                                              editDataService.getMiscellaneousData(JSON.stringify({
                                                name : "auditType"
                                              })).then(
                                                function(data1) { 
                                                  $scope.auditType = JSON.parse(data1.data.data)[0].data;
                                                  for(var i=0; i<$scope.auditType.length;i++)
          {
            if($scope.auditType[i].delete===1)
            {
            $scope.auditType.splice(i,1)
            i=i-1;
          }
        }



                                                  editDataService.getMiscellaneousData(JSON.stringify({
                                                    name : "year"
                                                  })).then(
                                                    function(data1) { 
                                                      $scope.year = JSON.parse(data1.data.data)[0].data;
                                                      for(var i=0; i<$scope.year.length;i++)
          {
            if($scope.year[i].delete===1)
            {
            $scope.year.splice(i,1)
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

                                        },
                                        function(msg) {
                                        });

                                    }


                                    $scope.opendeleteAudits = function(data) {
                                      
                                      $scope.deleteDataAudits=data;

                                      $scope.$modalInstance =  $uibModal.open({
                                       scope: $scope,
                                       templateUrl: "/app/pages/editData/AuditconfirmDeleteModal.html",
                                       size: 'sm',
                                       backdrop: 'static',
                                       keyboard: false
                                     })
                                   };

                                   
                                   $scope.opendeleteEntries = function(data) {
                                      
                                    $scope.deleteDataEntries=data;

                                    $scope.$modalInstance3 =  $uibModal.open({
                                     scope: $scope,
                                     templateUrl: "/app/pages/editData/EntriesconfirmDeleteModal.html",
                                     size: 'sm',
                                     backdrop: 'static',
                                     keyboard: false
                                   })
                                 };



                                    $scope.confirmdelete=function()
                                  {
                                    
                                    $scope.deleteCounterAudits=1;
                                    $scope.deleteDataAudits.delete=1;
                                    $scope.editAuditsDone($scope.deleteDataAudits,0)
                                  }


                                  $scope.confirmdeleteEntries=function()
                                  {
                                    $scope.$modalInstance3.dismiss('cancel');
                                    $scope.deleteDataEntries.delete=1;
                                    $scope.deleteCounterEntries=1;
                                    $scope.editEntriesOldData( $scope.deleteDataEntries,0)

                                  }




                                    $scope.editAuditsDone = function(data, index) {

                                      if( $scope.deleteCounterAudits===0)
                                      {

                                      var duplicate=false;
                                      $scope.from=new Date(data.from);
                                      $scope.to=new Date(data.to);
                                      $scope.from=$scope.from.getFullYear()+"-"+$scope.from.getMonth()+"-"+$scope.from.getDate()
                                      $scope.to=$scope.to.getFullYear()+"-"+$scope.to.getMonth()+"-"+$scope.to.getDate()
                          
                                  for(var i=0;i<$scope.rowCollection.length && duplicate===false;i++)
                                    { 

                                      if(i!=index)
                                      {
                                       $scope.rowCollection[i].from=new Date($scope.rowCollection[i].from);
                                       $scope.rowCollection[i].to=new Date($scope.rowCollection[i].to);
                                      $scope.rowfrom=($scope.rowCollection[i].from).getFullYear()+"-"+($scope.rowCollection[i].from).getMonth()+"-"+($scope.rowCollection[i].from).getDate()
                                      $scope.rowto=$scope.rowCollection[i].to.getFullYear()+"-"+($scope.rowCollection[i].to).getMonth()+"-"+($scope.rowCollection[i].to).getDate()
                          
                                      if($scope.rowCollection[i].auditType===data.auditType.auditType && $scope.rowCollection[i].year===data.year.year  && $scope.rowCollection[i].station===data.station.station && $scope.rowfrom===$scope.from &&  $scope.rowto===$scope.to)
                                    {
                                     duplicate=true
                                    }
                                    }
                          
                                    }


                                  }
                          
                          if(duplicate===false  ||  $scope.deleteCounterAudits===1 ){
                                  editDataService.editAuditsDoneData(JSON.stringify({
                                  _id:data._id,
                                    empID:data.empID,
                                    auditType:data.auditType.auditType,
                                    year:data.year.year,
                                    station:data.station.station,
                                    from:data.from,
                                    to: data.to,
                                    enteredDate:data.enteredDate,
                                    delete:data.delete 
                                                                    })).then(function(){
                                                                      if($scope.deleteCounterAudits===1)
                                                                      toasterService.openSucessToast("Record has been deleted!");
                                                                      else
                                                                      toasterService.openSucessToast("Record has been updated!");
                                                                      $state.reload();   
                                   // toasterService.openSucessToast("Record has been successfully inserted/updated!");
                                    // $state.reload();
                                  },function(){
                                    toasterService.openErrorToast("An error occurred. Please try again!");
                                  }) }
                                  else
                                  toasterService.openSucessToast("Duplicate data. Please try again!");
                                  $state.reload();
                              };
                            







  }
})();
