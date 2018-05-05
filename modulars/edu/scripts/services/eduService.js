define(["./services"], function(services) {
    "use strict";
    var urlEduGro = "Education/getEducation.action";//教育集团管理桌面
    var urlGetshares = "Education/getshares.action";//教育集团股票信息
    var urlCaiwu = "Jyjtcwfx/getJyjtcwfx.action";//财务分析
    var urlRenli = "Jyjtrlfx/getJyjtrlfx.action";//人力分析
    var urlTuiPro = "Study/getStudySetion.action";//各学段学费及占比
    var urlTuiPro1 = "Jyjtxdxf/getJyjtxdxf.action";//各学段学校
    var urlGrowthRate = "Study/getGrowthRate.action";//学生人数及学费增长率
    var urlSumPer = "Study/getManagement.action";//最近学期经营概况
    var urlArea = "XXqulx/getqu.action"//区域
    var urlSchool = "Jyjtxxlxsl/getJyjtxxlxslyou.action"//学校
    services.factory("eduService", ["$q", "$http","requestService", function($q, $http,requestService) {
        return {
             //教育集团股票信息
             getShares:function(pflag,paramArr,url){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    dataType: 'JSONP',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlGetshares
                }).success(function(response, status, headers, config) {
                    // console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },



             //最近学期经营概况
             getManagement:function(pflag,paramArr,url){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    dataType: 'JSONP',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlSumPer
                }).success(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },

            //各学校学费
            getStudySetion1:function(pflag,paramArr,url){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    dataType: 'JSONP',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlTuiPro1
                }).success(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },

            //各学段学费及占比
            getStudySetion:function(pflag,paramArr,url){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    dataType: 'JSONP',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlTuiPro
                }).success(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },
            //学生人数及学费增长率
            getGrowthRate:function(pflag,paramArr,url){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    dataType: 'JSONP',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlGrowthRate
                }).success(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },
            //最近学期经营概况
            getEducation:function(pflag,paramArr,url){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    dataType: 'JSONP',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlEduGro
                }).success(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },

            //财务分析
            getCaiwu:function(pflag,paramArr,url){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    dataType: 'JSONP',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlCaiwu
                }).success(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },
            //人力分析
            getRenli:function(pflag,paramArr,url){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    dataType: 'JSONP',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlRenli
                }).success(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },

            //区域
            getArea:function(pflag,paramArr,url){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    dataType: 'JSONP',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlArea
                }).success(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },

            //学校数量
            getSchool:function(pflag,paramArr,url){
                var deferred = $q.defer();
                $http({
                    method: 'GET',
                    isLocal: '',
                    dataType: 'JSONP',
                    params: requestService.setParam(pflag,paramArr),
                    data: {},
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded'
                    },
                    url: requestService.LS_SERVICE+urlSchool
                }).success(function(response, status, headers, config) {
                    console.log(response);
                    deferred.resolve(response);
                });
                return deferred.promise;
            },

        };
    }]);
     
});