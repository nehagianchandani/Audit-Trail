angular.module('BlurAdmin.pages.dashboard').service('dashboardService', function ($http,$q) {
    this.message = '';
    

    this.getauditsDone = function(reqJSON){
        var deferred = $q.defer();

        $http.post('http://localhost:3007/getAuditsDoneRecord',reqJSON,{
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


        this.getMiscellaneousData = function(reqJSON){
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



        this.getEntriesData = function(reqJSON){
            var deferred = $q.defer();
    
            $http.post('http://localhost:3007/getEntriesRecord',reqJSON,{
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


            this.addEntriesData = function(reqJSON){
                var deferred = $q.defer();
                $http.post('http://localhost:3007/addEntriesRecord',reqJSON,{
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

            this.editEntriesOldData = function(reqJSON){
                var deferred = $q.defer();
                $http.post('http://localhost:3007/editEntriesOldRecord',reqJSON,{
                    headers : {
                        'Content-Type' : 'application/json; charset=utf-8'
                    }
                  }).
                  success(function (data, status) {
                    console.log("update Successful")
                    deferred.resolve({
                        data: data});
                  }).
                  error(function (msg, status) {
                    deferred.reject(msg);
                });
                return deferred.promise;
            }
    });
