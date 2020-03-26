angular.module('BlurAdmin.pages.admin.station').service('stationService', function ($http,$q) {
    this.message = '';
    this.getStationData = function(reqJSON){
        var deferred = $q.defer();

        $http.post('http://localhost:3007/getMiscellaneousRecord',reqJSON,{
            headers : {
                'Content-Type' : 'application/json; charset=utf-8'
                    }
            }).
            success(function (data, status) {
              if(data.msg === "success"){
                deferred.resolve({
                    data: data});
                }
            }).
            error(function (msg, status) {
                deferred.reject(msg);
            });
       return deferred.promise;
    }

    this.editStationData = function(reqJSON){
        var deferred = $q.defer();
        $http.post('http://localhost:3007/editMiscellaneousRecord',reqJSON,{
            headers : {
                'Content-Type' : 'application/json; charset=utf-8'
            }
          }).
          success(function (data, status) {
            console.log("upadate Successful")
            deferred.resolve({
                data: data});
          }).
          error(function (msg, status) {
            deferred.reject(msg);
        });
        return deferred.promise;
    }
});