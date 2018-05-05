({
    baseUrl: './scripts/',
    name: "main",
    paths: {
        'angular':  './vendor/angular/angular',
        'bootstrap.min':  './vendor/angular-bootstrap/bootstrap.min',
        'angular-animate': './vendor/angular-animate/angular-animate',
        'ui.router':  './vendor/angular-ui-router/angular-ui-router',
        'ui.bootstrap':  './vendor/angular-bootstrap/ui-bootstrap',
        'jQuery':  './vendor/jquery/jquery',
        'app': './app',
        'bootstrap': './bootstrap',
        'angular-locale-zh-cn': './vendor/ng-locale/angular-locale_zh-cn',
        "excel": "./vendor/tools/exportexcel",
        "tl.tool": "./vendor/tools/common"
    },
    shim: {
        'jQuery': { exports: 'jQuery'},
        'angular': { exports: 'angular', deps: ['jQuery']},
        'bootstrap.min': {deps: ['jQuery']},
        'ui.router': { deps: ['angular']},
        'angular-animate': {deps: ['angular']},
        'angular-sanitize': { deps: ['angular']},
        'ui.bootstrap': { deps: ['angular']},
        'excel': { deps: ['angular']},
        'tl.tool': { deps: ['angular']},
        'angular-locale-zh-cn': { deps: ['angular']}

    },
//    dir: "scripts-build",
    out: "main-built.js",
})