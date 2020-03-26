angular.module('BlurAdmin.pages.admin.user').service('userService', function ($http,$q) {
    this.message = '';
    
    this.getUserData = function(reqJSON){
        var deferred = $q.defer();

        $http.post('http://localhost:3007/getUserRecord',reqJSON,{
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
    this.getSubStationData = function(reqJSON){
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

    this.editUserData = function(reqJSON){
        var deferred = $q.defer();
        $http.post('http://localhost:3007/editUserRecord',reqJSON,{
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
    this.addUserData = function(reqJSON){
        var deferred = $q.defer();
        $http.post('http://localhost:3007/addUserRecord',reqJSON,{
            headers : {
                'Content-Type' : 'application/json; charset=utf-8'
            }
          }).
          success(function (data, status) {
            console.log("inserted Successful")
            deferred.resolve({
                data: data});
          }).
          error(function (msg, status) {
            deferred.reject(msg);
        });
        return deferred.promise;
    } 
    // this.deleteUserData = function(reqJSON){
    //     var deferred = $q.defer();
    //     $http.post('http://localhost:3007/deleteUserRecord',reqJSON,{
    //         headers : {
    //             'Content-Type' : 'application/json; charset=utf-8'
    //         }
    //       }).
    //       success(function (data, status) {
    //         console.log("upadate Successful")
    //         deferred.resolve({
    //             data: data});
    //       }).
    //       error(function (msg, status) {
    //         deferred.reject(msg);
    //     });
    //     return deferred.promise;
    // }
});


