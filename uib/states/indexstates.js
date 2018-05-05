define(["./states"],
    function(states) {
        var version = 1.03;
        states.config(["$stateProvider", "$urlRouterProvider",
            function($stateProvider, $urlRouterProvider) {

                $urlRouterProvider.otherwise("/");

                //登录页面
                $stateProvider.state("login", {
                    url: "/",
                    templateUrl: "uib/views/logins.html?v="+version
                });




                // 前策产品定价部运营桌面
                $stateProvider.state("qccp",{
                    url:"^/qccp",
                    templateUrl:"modulars/price/views/qianceprice.html?v="+version
                });
                // 前策产品定价部运营桌面下钻表格
                $stateProvider.state("qccpTab", {
                    url: "^/qccpTab/:area",
                    templateUrl:"modulars/price/views/qccpTab.html?v="+version
                });


                /*
                *教育集团
                */
                // 教育集团管理桌面
                $stateProvider.state("eduGro",{
                    url:"^/eduGro",
                    templateUrl:"modulars/edu/views/eduGroupManagement.html?v="+version
                });

                //教育集团断点登录测试
                $stateProvider.state("sso", {
                    url: "^/sso",
                    templateUrl: "modulars/edc/views/SSOTest.html?v="+version
                });

                // 各学段学费及占比
                $stateProvider.state("tuiPro",{
                    url:"^/tuiPro",
                    templateUrl:"modulars/edu/views/tuitionProportion.html?v="+version
                });
                // 学生人数及学费增长率
                $stateProvider.state("growthRate",{
                    url:"^/growthRate",
                    templateUrl:"modulars/edu/views/studentsAndTuitionGrowthRate.html?v="+version
                });
                // 最近学期经营概况
                $stateProvider.state("sumPer",{
                    url:"^/sumPer",
                    templateUrl:"modulars/edu/views/summaryOfOperations.html?v="+version
                });
                //财务分析
                $stateProvider.state("Caiwu", {
                    url: "^/Caiwu",
                    templateUrl:"modulars/edu/views/Caiwu.html?v="+version
                });
                //人力分析
                $stateProvider.state("Renli", {
                    url: "^/Renli",
                    templateUrl:"modulars/edu/views/Renli.html?v="+version
                });









                /*
                *物业公司
                */

                //物业公司管理桌面1
                $stateProvider.state("pcm", {
                    url: "^/pcm",
                    templateUrl: "./modulars/pcm/views/propertyCompany.html?v="+version
                });
                //物业公司管理桌面2
                $stateProvider.state("pcm2", {
                    url: "^/pcm2",
                    templateUrl: "./modulars/pcm/views/propertyCompanytwo.html?v="+version
                });



            }
        ]);


        states.run(['$rootScope', '$state','$tool',"mainService",function($rootScope, $state,$tool,mainService) {
            $rootScope.inindex = 0;
            $rootScope.$on('$stateChangeStart',function(_event, _toState, _toParams, _fromState, _fromParams){
                var inFlag = false;
                if(_toState.name == 'hptmb'&&$rootScope.inindex==0){
                    inFlag = true;
                    _event.preventDefault();
                }
//            	alert(inFlag+$rootScope.inindex);
                if(inFlag&&$rootScope.inindex==0){
                    $rootScope.inFlag = true;
                    $rootScope.loginflag = true;
                    mainService.getBIPLoginKK('ls',['DP00']).then(function(res){
//        				alert(res.resulet+"---"+res.userauth);
                        if (res.resulet) {
                            //再查询bi用户接口
                            if(res.userauth){
                                $state.go('hptmb',null,{reload: true, location: 'replace'});
                            }else{
                                $(".dialogddd").css('display','none');
                                $state.go("error",null,{reload: true, location: 'replace'});
                            }
                        }else{
                            $(".dialogddd").css('display','none');
                            $state.go("error",null,{reload: true, location: 'replace'});
                        }
                    });
                    $rootScope.inindex = $rootScope.inindex + 1;
                }else{
                    $rootScope.inindex = $rootScope.inindex + 1;
                }
            });



            $rootScope.$on("$stateChangeSuccess", function(_event, _toState, _toParams, _fromState, _fromParams) {
                /*获取路径入参*/
                $rootScope.mysates=$state.current;
                // console.log($state.params);

                // console.log("--------------------state");
                // console.log(_fromState);
                // console.log($rootScope.mysates);

                $rootScope.startTime = $tool.getTime();//开始时间秒
                $rootScope.startTimeMs = new Date();//开始时间毫秒


                //物业公司路由切换处理
                // if(_fromState.name =='pcm' && $state.current.name =='')
                if($rootScope.mysates != 'pcm' || $rootScope.mysates != 'pcm2'  ){
                    window.clearInterval($rootScope.setIn_1);
                    window.clearInterval($rootScope.setIn_2);
                }

            });
        }]);

    });
