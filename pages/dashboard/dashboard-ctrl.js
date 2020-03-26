/**
 * @author v.lugovsky
 * created on 16.12.2015
 */
(function() {
    'use strict';
    angular.module('BlurAdmin.pages.dashboard')
        .controller('dashboard-ctrl', dashboardCtrl)


    /** @ngInject */
    function dashboardCtrl($scope,$rootScope, $http, $filter,$state , editableOptions, editableThemes, dashboardService, $uibModal, $log, _, toasterService) {

        $scope.init=function(){
           
            $scope.rowCollection=[];
            $scope.complianceStatus=[];
            $scope.subStation=[];
            $scope.subStations=[];
            $scope.getauditsDone();
            $scope.location=[];
            $scope.rowCollectionEntries=[];
           $scope.uploadmessage="Please upload files in pdf format only! "
          }
          $scope.page_size1 = 5
          $scope.page_size = 7
          $scope.current_page = 1
      $scope.rembemberCurrentPage = function(p) {
        $scope.current_page = p
      }
            
    $scope.openedit = function(data1) {

      

      dashboardService.getMiscellaneousData(JSON.stringify({
        name : "complianceStatus"
      })).then(
        function(data) { 
          $scope.complianceStatus = JSON.parse(data.data.data)[0].data;
          $scope.modaldata=data1
          for(var i=0; i<$scope.complianceStatus.length;i++)
          {
            if($scope.complianceStatus[i].delete===1)
            {
            $scope.complianceStatus.splice(i,1)
            i=i-1;
          }
        }


         
          dashboardService.getMiscellaneousData(JSON.stringify({
            name : "subStation"
          })).then(
            function(substationdata) { 
              $scope.subStation = JSON.parse(substationdata.data.data)[0].data;
              for(var i=0;i<$scope.subStation.length;i++)
              {
             
                 if($scope.subStation[i].station===$scope.modaldata.station){
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



      




          $scope.$modalInstance =  $uibModal.open({
           scope: $scope,
           templateUrl: "/app/pages/dashboard/editDashboardModal.html",
           size: 'sm',
           backdrop: 'static',
           keyboard: false
         })
        });
        },
             
        function(msg) {
        });
    
    
     
   };


   $scope.uploadFile = function(){

    var file = $scope.myFile;
    if(file.name.substr(-4, 4)===".pdf"){
    var uploadUrl = "http://localhost:3007/multer1";
    var fd = new FormData();
    fd.append('file', file);

    $http.post(uploadUrl,fd, {
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
    })
    .success(function(data){
      console.log("success!!");
      $scope.filename=data.filename;
      $scope.uploadmessage="File uploaded successfully!"
    })
    .error(function(){
      console.log("error!!");
      $scope.uploadmessage="Error! Please try again!"
    });
  }
  else{
    $scope.uploadmessage="Wrong file format! Please upload file in pdf format"
  }
  }

   $scope.opendetails = function(data) {
    
    $scope.detailsmodaldata=data;
    dashboardService.getEntriesData(JSON.stringify({
      _id: $scope.detailsmodaldata._id,
      empID:Number(localStorage.getItem("username"))
    })).then(

          function(data) { 
        dashboardService.getMiscellaneousData(JSON.stringify({
          name : "complianceStatus"
        })).then(
          function(data1) { 
            $scope.complianceStatus = JSON.parse(data1.data.data)[0].data;
          for(var i=0; i<$scope.complianceStatus.length;i++)
          {
            if($scope.complianceStatus[i].delete===1)
            {
            $scope.complianceStatus.splice(i,1)
            i=i-1;
            }
          }
        $scope.entries= JSON.parse(data.data.data);
        $scope.rowCollection = JSON.parse(data.data.data);
        $scope.$modalInstance =  $uibModal.open({
          scope: $scope,
          templateUrl: "/app/pages/dashboard/detailsDashboardModal.html",
          size: 'lg',
          backdrop: 'static',
          keyboard: false
        })
        })
      },
      function(msg) {
      });
 };

   $scope.cancel = function() {
    $scope.$modalInstance.dismiss('cancel');
    $state.reload();
};





$scope.editEntiresStart = function(data){
  $scope.editableEntriesHourlyRec = angular.copy(data);
}
        



$scope.editEntriesOldData = function(data, index){
  data.editHistory = $scope.editableEntriesHourlyRec;
  data.editDate = new Date();
  data.empID = Number(localStorage.getItem("username"));
  data.complianceStatus=data.complianceStatus.complianceStatus
  dashboardService.editEntriesOldData(JSON.stringify(
    {
      data:data
    })
 
).then(function(){
      // $scope.opendetails($scope.detailsmodaldata);
    },function(){
      console.log("error")
    })      
}




$scope.addNewEntries = function() {

 
  dashboardService.getEntriesData(JSON.stringify({
    _id: $scope.modaldata._id,
    empID:Number(localStorage.getItem("username"))
  })).then(
    function(data2) { 
    $scope.entries= JSON.parse(data2.data.data);
    $scope.rowCollectionEntries = JSON.parse(data2.data.data);
   
  


  var duplicate=false;
  for(var i=0;i<$scope.rowCollectionEntries.length && duplicate===false;i++)
  { 
    if($scope.rowCollectionEntries[i].subStation===$scope.subStationinput.subStation && $scope.rowCollectionEntries[i].recommendations===$scope.recommendationsinput    &&    $scope.rowCollectionEntries[i].generalObservations===$scope.generalObservationsinput     &&   $scope.rowCollectionEntries[i].targetDate===$scope.targetDateinput    &&    $scope.rowCollectionEntries[i].currentStatus===$scope.currentStatusinput    &&    $scope.rowCollectionEntries[i].actionTaken===$scope.actionsTakeninput  && $scope.rowCollectionEntries[i].complianceStatus===$scope.complianceStatusinput.complianceStatus  &&    $scope.rowCollectionEntries[i].actionTakenBy===$scope.actionTakenByinput &&   $scope.rowCollectionEntries[i].remarks===$scope.remarksinput)
    {
      duplicate=true
    }
  }


  if(duplicate===false ){
  dashboardService.addEntriesData(JSON.stringify({
    empID:Number(localStorage.getItem("username")),
    
    auditInfo:$scope.modaldata._id,
    generalObservations:$scope.generalObservationsinput,
    recommendations:$scope.recommendationsinput,
    subStation:$scope.subStationinput.subStation,
    targetDate:$scope.targetDateinput,
    currentStatus:$scope.currentStatusinput,
    actionTaken: $scope.actionsTakeninput,
    complianceStatus:$scope.complianceStatusinput.complianceStatus,
    actionTakenBy:$scope.actionTakenByinput,
    remarks:$scope.remarksinput,
   editDate: new Date(),
   delete:0,
   image:$scope.filename
  })).then(function(){
   toasterService.openSucessToast("Record has been successfully inserted!");
    $state.reload();
  },function(){
    toasterService.openErrorToast("An error occurred. Please try again!");
  }) }
  else
  $state.reload();
})
};

       
    $scope.getauditsDone= function(){
      $scope.location= JSON.parse(localStorage.getItem("location"));
        dashboardService.getauditsDone( $scope.location).then(
          function(data) { 
            $scope.auditsDone= JSON.parse(data.data.data);
            $scope.rowCollection = JSON.parse(data.data.data);
  
         
  
          },
          function(msg) {
          });
      }

           
    }
})();