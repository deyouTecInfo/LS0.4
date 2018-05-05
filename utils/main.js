;
(function() {
    var vendorPath = 'vendor';  //组件包
    var uibPath = 'uib';//公告包
    var pcmPath= './modulars/pcm/scripts';  //物业管理桌面
    var pricePath= './modulars/price/scripts';  //前策产品定价
    var eduPath= './modulars/edu/scripts';  //教育集团管理桌面
    if(sessionStorage){
        if(!sessionStorage.getItem("ts_source")){
            sessionStorage.setItem("ts_source",new Date().getTime());
        }
    }

    require.config({
        baseUrl:"",
        skipDataMain: true,
        waitSeconds: 200,
        paths: {
            'angular': vendorPath + '/angular/angular',
            'bootstrap.min': vendorPath + '/angular-bootstrap/bootstrap.min',
            'angular-animate': vendorPath + '/angular-animate/angular-animate',
            'ui.router': vendorPath + '/angular-ui-router/angular-ui-router',
            'ui.bootstrap': vendorPath + '/angular-bootstrap/ui-bootstrap',
            'jQuery': vendorPath + '/jquery/jquery',
            'app': './utils/app',
            'bootstrap': './utils/bootstrap',
            'angular-locale-zh-cn': vendorPath + '/ng-locale/angular-locale_zh-cn',
            "excel": vendorPath + "/tools/exportexcel",
            "tl.tool": vendorPath + "/tools/common",
            'uib.controller':uibPath+'/controllers/_base',
            'uib.directive':uibPath+'/directive/_base',
            'uib.service':uibPath+'/services/_base',
            'uib.states':uibPath+'/states/_base',
            'pcm.controller':pcmPath+'/controllers/_base',
            'pcm.service':pcmPath+'/services/_base',
            'price.controller':pricePath+'/controllers/_base',
            'price.service':pricePath+'/services/_base',
            'edu.controller':eduPath+'/controllers/_base',
            'edu.service':eduPath+'/services/_base',

        },
        shim: {
            'jQuery': { exports: 'jQuery'},
            'angular': { exports: 'angular', deps: ['jQuery']},
            'bootstrap.min': {deps: ['jQuery']},
            'ui.router': { deps: ['angular']},
            'angular-animate': {deps: ['angular']},
            'angular-sanitize': { deps: ['angular']},
            'ui.bootstrap': { deps: ['angular']},
            'tl.tool': { deps: ['angular']},
            'angular-locale-zh-cn': { deps: ['angular']}
        },
        urlArgs: "bust=" +  sessionStorage.getItem("ts_source")
    });
    /*配置了模块名，直接诶使用模块名引入*/
    require(["bootstrap"], function(bootstrap) {});
}());