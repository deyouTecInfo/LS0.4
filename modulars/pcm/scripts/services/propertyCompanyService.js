define(["./services"], function(services) {
    "use strict";
    //物业务公司运营桌面
    var urlStr1 = "wySjlSS/getWySjlSS.action";  //物业务公司运营桌面各大指标-实时
    var urlStr2 = "wySjl/getWySjl.action";  //物业务公司运营桌面各大指标
    var urlStr3 = "wySjlDT/getWySjlDT.action";  // 物业务公司运营桌面各大指标-各省份收缴金额分布
    var urlStr4 = "wySjlPM/getWySjlPM.action";  //物业务公司运营桌面-收/追缴率排名

    var urlStr5 = "wyJgmj/getWyJgmj.action";         //接管面积6大指标
    var urlStr6 = "wySjlDT/getWyJgmjDT.action";      //业务公司运营桌面各大指标--接管面积地图
    var urlStr7 = "wyJgmjSdt/getWyJgmjSdt.action";  //接管面积散点图
    var urlStr8 = "wyJgmjZzt/getWyJgmjSdt.action";  //接管面积柱状图
    var urlStr9 = "wyTable/getWyTable.action";       //物业表格


    services.factory("propertyCompanyService", ["$q", "$http","requestService", function($q, $http,requestService) {
        return {


            //业务公司运营桌面各大指标-实时
            getWySjlSS:function(pflag,paramArr){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlStr1
                }).success(function(response, status, headers, config) {
                    deferred.resolve(response);
                }).error(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },
            //业务公司运营桌面各大指标
            getwySjl:function(pflag,paramArr){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlStr2
                }).success(function(response, status, headers, config) {
                    deferred.resolve(response);
                }).error(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },
            //业务公司运营桌面各大指标-各省份收缴金额分布
            getwySjlDT:function(pflag,paramArr){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlStr3
                }).success(function(response, status, headers, config) {
                    deferred.resolve(response);
                }).error(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },
            //业务公司运营桌面-收/追缴率排名
            getwySjlPM:function(pflag,paramArr){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlStr4
                }).success(function(response, status, headers, config) {
                    deferred.resolve(response);
                }).error(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },

            //接管面积6大指标
            getWyJgmj:function(pflag,paramArr){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlStr5
                }).success(function(response, status, headers, config) {
                    deferred.resolve(response);
                }).error(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },
            //业务公司运营桌面各大指标--接管面积地图
            getWyJgmjDT:function(pflag,paramArr){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlStr6
                }).success(function(response, status, headers, config) {
                    deferred.resolve(response);
                }).error(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },
            //接管面积散点图
            getWyJgmjSdt:function(pflag,paramArr){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlStr7
                }).success(function(response, status, headers, config) {
                    deferred.resolve(response);
                }).error(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },
            //接管面积柱状图
            getWyJgmjZzt:function(pflag,paramArr){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlStr8
                }).success(function(response, status, headers, config) {
                    deferred.resolve(response);
                }).error(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },
            //物业表格
            getWyTable:function(pflag,paramArr){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlStr9
                }).success(function(response, status, headers, config) {
                    deferred.resolve(response);
                }).error(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },

        };
    }]);
     
});