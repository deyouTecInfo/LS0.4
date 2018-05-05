define(["./controllers"], function (controllers) {
    "use strict";
    controllers.controller("carouselCtrl", ["$scope","$state","mainService",'$rootScope','$tool', function ($scope, $state,mainService,$rootScope,$tool) {


        $scope.items = ["One", "Two", "Three"];






    }]);
});