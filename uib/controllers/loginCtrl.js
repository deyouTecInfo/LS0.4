define(["./controllers"], function (controllers) {
    "use strict";
    controllers.controller("loginsCtrl", ["$scope","$state","mainService",'$rootScope','$tool', function ($scope, $state,mainService,$rootScope,$tool) {

        localStorage.setItem('login',false);
        localStorage.setItem('user',null);
        localStorage.setItem('psw',null);
        $rootScope.loginflag = false;

        var winH = $(window).height();
        var winW = $(window).width();
        $('.logins').css('height',winH);
        window.onresize = resize;
        function resize() {
            $('.logins').css('height',$(window).height())
        }

        $scope.click_qx=function () {
            $(".logins #show_qx").animate({ opacity:0},10);
            $rootScope.show_qx =false;
        };

        $scope.acn=function(){
            if($rootScope.show_zh){
                $(".logins .show_zh").animate({ opacity:0},1000);
                $rootScope.show_zh =false;
            }
        }
    }]);
});