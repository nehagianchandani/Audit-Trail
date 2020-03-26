angular.module('BlurAdmin.pages.viewData').service('viewDataService', function ($http,$q) {
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



        this.getEntriesData = function(reqJSON){
            var deferred = $q.defer();
    
            $http.post('http://localhost:3007/getEntriesRecordview',reqJSON,{
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
            

            this.getComplianceStatusData = function(reqJSON){
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