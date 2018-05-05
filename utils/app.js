define([
    'angular',                      
    'ui.router',
    'ui.bootstrap',
    'angular-animate',
    'angular-locale-zh-cn',
    'bootstrap.min',
    'excel',
    'tl.tool',
    'uib.controller', 'uib.directive','uib.service','uib.states',
    'pcm.controller', 'pcm.service',
    'edu.controller','edu.service',
    'price.controller','price.service',
], function(angular) {
    'use strict';
    var app = angular.module('myapp', [
        'ui.router', 'ui.bootstrap', 'ngAnimate','tl.tool','excel',
        'myapp.controllers', 'myapp.services', 'myapp.directives','myapp.states',
        'myapp.pcmcontrollers', 'myapp.pcmservices',
        'myapp.educontrollers', 'myapp.eduservices',
        'myapp.pricecontrollers', 'myapp.priceservices',

    ]);
    return app;
});
