define(["./controllers"], function (controllers) {
    "use strict";
    controllers.controller("propertyCompanytwoCtrl", ["$scope", "$state","mainService","propertyCompanyService",'$rootScope','$tool',"$compile", function ($scope, $state,mainService,propertyCompanyService,$rootScope,$tool,$compile) {
        var url = $rootScope.mysates.name; //获取当前页面路由名称
        var pflag = "ls";
        var paramArr = [];
        var winH = $(window).height();
        var winW = $(window).width();
        $('.hpt').css('height',winH);
        $('.tqimgdiv').css('width',$('.tqimgdiv').height());	//天气、日期
        $scope.ispc = true;
        $scope.url = "images";
        $scope.gsjgmj=true;    //各省接管面积分布
        $scope.gsjgxm=false;  //各省接管项目数分布
        $scope.qyjggc=true;   //各区域接管构成
        $scope.qyjgxm=false;  //各区域接管项目数
        $scope.catable=false;  //极坐标散点图
        // console.log("url2----------------"+url);
        // console.log(url);


        var setIn_3 = 0;
        var setIn_4 = 0;
        //设置全屏
//		$scope.quanping();
        $rootScope.homepage = "hpt";
        $rootScope.isNative = true;
        $rootScope.theme = true;
        $scope.screen = function(){
            $scope.quanping();

//		　　　　　　监听不同浏览器的全屏事件，并件执行相应的代码
            document.addEventListener("webkitfullscreenchange", function() {
                if (document.webkitIsFullScreen) {
                    setTimeout(function(){
                        setH(1);
                    },100);
                }else{
                    setTimeout(function(){
                        setH(2);
                    },100);
                }
            }, false);
            document.addEventListener("fullscreenchange", function() {
                if (document.fullscreen) {
                    setTimeout(function(){
                        setH(3);
                    },100);
                }else{
                    setTimeout(function(){
                        setH(4);
                    },100);
                }
            }, false);
            document.addEventListener("mozfullscreenchange", function() {
                if (document.mozFullScreen) {
                    setTimeout(function(){
                        setH(5);
                    },100);
                }else{
                    setTimeout(function(){
                        setH(6);
                    },100);
                }
            }, false);
            document.addEventListener("msfullscreenchange", function() {
                if (document.msFullscreenElement) {
                    setTimeout(function(){
                        setH(7);
                    },100);
                }else{
                    setTimeout(function(){
                        setH(8);
                    },100);
                }
            }, false);
            if(!$rootScope.qp){
                setTimeout(function () {
                    setH(9);
                    $('.hpt').css('height',winH);
                },400);
            }
        };


        //退出全屏
        $scope.exitFullScreen = function(){
            $scope.tuichuquanping();
            setTimeout(function () {
                setH(101);
            },100);
        };




        //初始化大屏数据
        $scope.rq = '';		//日期

        $scope.jgmj=0; //接管面积
        $scope.jgmjhb=0; //接管面积环比
        $scope.yzs=0; //业主数
        $scope.yzshb=0;  //业主数环比
        $scope.xms=0;  //项目数
        $scope.xmshb=0;  //项目数环比
        $scope.QYS=[];  //柱图数据---区域
        $scope.CW=[];  //柱图数据---车位
        $scope.SP=[];  //柱图数据---商铺
        $scope.ZZ=[];  //柱图数据---住宅
        $scope.DXS=[];  //柱图数据---地下室
        $scope.MJ=[];  //柱图数据---面积
        $scope.JGMJ=[];  //接管面积
        $scope.JGHS=[];  //接管户数
        $scope.JGXMS=[];  //接管项目数
        $scope.SDTHJ=[]; //接管散点合集
        $scope.cat=''; //接管散点
        $scope.catabledata=[];  //接管散点详细数据
        $scope.JGZTQH=true;  //柱图数据切换



        //地图
        var mapcharts=function () {
            // var winH = $(window).height();
            // $('.hpt').css('height',winH);
            var gsjgEchart = echarts.init(document.getElementById('gsjg'));
            var option = {
                tooltip: {
                    trigger: 'item',
                    confine:true,
                    position: function (pos, params, dom, rect) {
                        return [rect.x+20,rect.y]; //跟着选中区域跑
                    },
                    formatter:function (param) {
                        //console.log(param);
                        if(param.value ){
                            if($scope.qyjggc){
                                return param.name+"："+ qwfformatter(param.value,1);
                            }else{
                                return param.name+"："+ qwfformatter(param.value,2);
                            }

                        }else if(!param.value){
                            return "暂无数据";
                        }
                    }
                },
                series: [
                    {
                        type: 'map',
                        mapType: 'china',
                        roam: false,
                        top:"0",
                        bottom:"10%",
                        left:"19%",
                        right:"19%",
                        itemStyle: {
                            normal: { borderColor: '#dad6d6', areaColor: 'rgba(255,255,255,0)', },
                        },
                        label: {
                            normal: {show: false},
                            emphasis: { show: true,textStyle:{color:"#fff"} }
                        },
                        // data:$scope.xmdt,
                        data:$scope.xmdt.sort(function (a,b) { return b.value- a.value; })

                    },

                ]
            };
            // gsjgEchart.clear();
            gsjgEchart.setOption(option);

            var currentIndex = -1;
            function switchAction_map_2(){
                var dataLen = option.series[0].data.length;
                // console.log($rootScope.currentIndex_map_2);
                // 取消高亮
                gsjgEchart.dispatchAction({
                    type: 'downplay',
                    seriesIndex: 0,
                    dataIndex:$rootScope.currentIndex_map_2
                });


                $rootScope.currentIndex_map_2 = ($rootScope.currentIndex_map_2 + 1) % dataLen;
                // 高亮当前选中symbol
                gsjgEchart.dispatchAction({
                    type: 'highlight',
                    seriesIndex: 0,
                    name: option.series[0].data[$rootScope.currentIndex_map_2].name,
                });

                gsjgEchart.dispatchAction({
                    type : 'showTip',
                    seriesIndex : 0,
                    name: option.series[0].data[$rootScope.currentIndex_map_2].name,
                });

                if($rootScope.currentIndex_map_2==dataLen){
                    $rootScope.currentIndex_map_2=-1
                }
            };
            if($rootScope.loginflag) {
                setIn_4 = setInterval(switchAction_map_2, 2000);
            }
            // //点击后延时五秒继续轮播
            // gsjgEchart.on('click',function (params) {
            //     clearInterval(setIn_4);
            //     // 取消高亮
            //     gsjgEchart.dispatchAction({
            //         type: 'downplay',
            //         seriesIndex: 0,
            //         dataIndex:$rootScope.currentIndex_map_2
            //     });
            //     // setTimeout(function () {
            //     //      setIn_4 = setInterval(switchAction_map_2, 2000);
            //     // },5000);
            // });

        };
        //柱图
        var barcharts=function () {
            // var winH = $(window).height();
            // $('.hpt').css('height',winH);
            var qyjgEchart = echarts.init(document.getElementById('qyjg'));
            if($scope.qyjggc){
                var option2  = {
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        top:0,
                        textStyle:{ color:"#7181A2" },
                        data:['住宅','商铺','地下室','车位']
                    },
                    grid: {
                        left: '2%',
                        right: '2%',
                        top:"22%",
                        bottom: '18%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            axisTick:{show:false},
                            axisLine:{ lineStyle:{color:"#fff" } },
                            axisLabel:{ textStyle:{ color:"#7181A2"}},
                            data : $scope.QYS
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            splitNumber:3,
                            axisTick:{show:false},
                            splitLine:{show:false},
                            axisLine:{ lineStyle:{color:"#fff" } },
                            axisLabel:{ textStyle:{color:"#7181A2"}},

                        }
                    ],
                    series : [
                        {
                            name:'住宅',
                            type:'bar',
                            stack: '区域接管',
                            barWidth:"65%",
                            itemStyle:{normal:{color:"#3DF9E0"}},
                            data: $scope.ZZ
                        },
                        {
                            name:'商铺',
                            type:'bar',
                            stack: '区域接管',
                            barWidth:"65%",
                            itemStyle:{normal:{color:"#FF964A"} },
                            data: $scope.SP
                        },
                        {
                            name:'地下室',
                            type:'bar',
                            stack: '区域接管',
                            barWidth:"65%",
                            itemStyle:{ normal:{ color:"#32A8E6" } },
                            data: $scope.DXS
                        },
                        {
                            name:'车位',
                            type:'bar',
                            stack: '区域接管',
                            barWidth:"65%",
                            itemStyle:{normal:{color:"#EF5297"}},
                            data: $scope.CW
                        }
                    ]
                };
            }else{
                var option2  = {
                    tooltip : {
                        trigger: 'axis',
                        axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                            type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    legend: {
                        top:0,
                        textStyle:{ color:"#7181A2" },
                        data:['项目数']
                    },
                    grid: {
                        left: '2%',
                        right: '2%',
                        top:"22%",
                        bottom: '18%',
                        containLabel: true
                    },
                    xAxis : [
                        {
                            type : 'category',
                            axisTick:{show:false},
                            axisLine:{ lineStyle:{color:"#fff" } },
                            axisLabel:{ textStyle:{ color:"#7181A2"}},
                            data : $scope.QYS
                        }
                    ],
                    yAxis : [
                        {
                            type : 'value',
                            splitNumber:3,
                            axisTick:{show:false},
                            splitLine:{show:false},
                            axisLine:{ lineStyle:{color:"#fff" } },
                            axisLabel:{ textStyle:{color:"#7181A2"}},

                        }
                    ],
                    series : [
                        {
                            name:'项目数',
                            type:'bar',
                            barWidth:"65%",
                            itemStyle:{normal:{color:"#3DF9E0"}},
                            // data:[620, 732, 701, 734, 1090, 1130, 1120,620, 732, 701, 734, 1090, 1130, 1120,620, 732, 701, 734, 1090, 1130, 1120,620, 732, 701, 734, 1090, 1130, 1120]
                            data: $scope.MJ
                        },
                    ]
                };
            }

            qyjgEchart.clear();
            qyjgEchart.setOption(option2);
        };
        //极坐标散点图
        var cacharts=function(){
            // var winH = $(window).height();
            // $('.hpt').css('height',winH);
            var jgmjEchart = echarts.init(document.getElementById('jgmj'));

            var option3 = {
                polar: {
                    center: ['50%', '50%'],
                    // radius:['40', '20'],
                },
                tooltip: {
                    formatter:function(params){
                        // console.log(params);
                        //接管项目数、接管面积、接管户数、接管区域 2,3,4,5
                        return  "接管区域："+ params.data[5]+'<br\>接管项目数：'+params.data[2]+"个<br\>接管面积："+params.data[3]+"万平<br\>接管户数："+params.data[4]+"万户";
                    }
                },
                angleAxis: {
                    type: 'category',
                    // data: hours,  //外圈刻度
                    data:  $scope.KEDU,
                    boundaryGap: false,
                    axisTick:{show:false},
                    splitLine: {
                        show: true,
                        lineStyle: { color: '#25868F', type: 'dashed' }
                    },
                    axisLine: {show: false },
                    axisLabel: {
                        textStyle:{
                            color:"#3EF8E1"
                        },
                        formatter:function (a) {
                            if(a){
                                return a+'万平'
                            }else{
                                return '0万平'
                            }

                        }
                    }
                },
                radiusAxis: {
                    type: 'category',
                    // data: days, //axisTick 刻度
                    data: $scope.reward,
                    splitNumber:4,
                    axisLine: {  show: false },
                    axisTick:{
                        inside:true,
                        lineStyle:{
                            color:"#000",
                            shadowColor:"#25868F",
                            shadowOffsetX:7,
                        }
                    },
                    axisLabel: {
                        rotate: 0,
                        margin:-8,
                        textStyle:{
                            color:"#25868F",
                            align:"left",
                            baseline:"bottom"
                        },
                        formatter:function (a) {
                            if(a){
                                return a+'万户'
                            }

                        }
                    }
                },
                series: [{
                    name: '接管面积',
                    type: 'scatter',
                    coordinateSystem: 'polar',
                    itemStyle:{normal:{color:"#F3F93F",}},
                    symbolSize: function (val) {
                        if(val[2]>40){
                            return 40 ;
                        }else{
                            return val[2] ;
                        }
                    },
                    // data: data2,
                    data: $scope.SDTHJ,
                    animationDelay: function (idx) {
                        return idx * 5;
                    }
                }]
            };
            jgmjEchart.clear();
            jgmjEchart.setOption(option3);

        };


        //接管面积6大指标
        var getWyJgmj=function () {
            var res={
                "status": 1001,
                "data": [
                    {
                        "ds_ts": "2017-10-27",
                        "jgmj": "11215.5015140",
                        "jgmjhb": "136.1642550",
                        "xms": "957",
                        "xmshb": "210",
                        "yzs": "843276.00",
                        "yzshb": "22451.00"
                    },
                    {
                        "ds_ts": "2017-10-27",
                        "jgmj": "11215.5015140",
                        "jgmjhb": "136.1642550",
                        "xms": "957",
                        "xmshb": "210",
                        "yzs": "843276.00",
                        "yzshb": "22451.00"
                    }
                ]
            }
            var  data=res.data[0];
            $scope.jgmj=qwfformatter(data.jgmj,1); //接管面积
            $scope.jgmjhb=dataFormat(data.jgmjhb,1); //接管面积环比
            $scope.yzs=qwfformatter(parseInt(data.yzs),2); //业主数
            $scope.yzshb=qwfformatter(parseInt(data.yzshb),2);  //业主数环比
            $scope.xms=data.xms;  //项目数
            $scope.xmshb=data.xmshb;  //项目数环比
        };
        getWyJgmj();
        //业务公司运营桌面各大指标--接管面积地图
        var getWyJgmjDT=function () {
            var res={
                "status": 1001,
                "data": [
                    {
                        "color": "8",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "302",
                        "lx": "XMS",
                        "province": "广东"
                    },
                    {
                        "color": "2",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "50",
                        "lx": "XMS",
                        "province": "安徽"
                    },
                    {
                        "color": "4",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "124",
                        "lx": "XMS",
                        "province": "江苏"
                    },
                    {
                        "color": "2",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "63",
                        "lx": "XMS",
                        "province": "湖北"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "14",
                        "lx": "XMS",
                        "province": "辽宁"
                    },
                    {
                        "color": "2",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "52",
                        "lx": "XMS",
                        "province": "湖南"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "13",
                        "lx": "XMS",
                        "province": "山东"
                    },
                    {
                        "color": "2",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "43",
                        "lx": "XMS",
                        "province": "浙江"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "29",
                        "lx": "XMS",
                        "province": "福建"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "6",
                        "lx": "XMS",
                        "province": "内蒙古"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "31",
                        "lx": "XMS",
                        "province": "贵州"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "22",
                        "lx": "XMS",
                        "province": "重庆"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "14",
                        "lx": "XMS",
                        "province": "四川"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "27",
                        "lx": "XMS",
                        "province": "广西"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "10",
                        "lx": "XMS",
                        "province": "甘肃"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "9",
                        "lx": "XMS",
                        "province": "天津"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "18",
                        "lx": "XMS",
                        "province": "海南"
                    },
                    {
                        "color": "2",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "44",
                        "lx": "XMS",
                        "province": "河南"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "31",
                        "lx": "XMS",
                        "province": "河北"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "15",
                        "lx": "XMS",
                        "province": "江西"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "2",
                        "lx": "XMS",
                        "province": "黑龙江"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "13",
                        "lx": "XMS",
                        "province": "云南"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "1",
                        "lx": "XMS",
                        "province": "吉林"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "7",
                        "lx": "XMS",
                        "province": "山西"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "10",
                        "lx": "XMS",
                        "province": "陕西"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "1",
                        "lx": "XMS",
                        "province": "北京"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "4",
                        "lx": "XMS",
                        "province": "上海"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "1",
                        "lx": "XMS",
                        "province": "青海"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "1",
                        "lx": "XMS",
                        "province": "宁夏"
                    },
                    {
                        "color": "8",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "5197.04133",
                        "lx": "MJ",
                        "province": "广东"
                    },
                    {
                        "color": "2",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "1096.72918",
                        "lx": "MJ",
                        "province": "安徽"
                    },
                    {
                        "color": "2",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "999.6195",
                        "lx": "MJ",
                        "province": "江苏"
                    },
                    {
                        "color": "2",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "733.15191",
                        "lx": "MJ",
                        "province": "湖北"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "584.91608",
                        "lx": "MJ",
                        "province": "辽宁"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "571.51716",
                        "lx": "MJ",
                        "province": "湖南"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "210.11111",
                        "lx": "MJ",
                        "province": "山东"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "198.20067",
                        "lx": "MJ",
                        "province": "浙江"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "183.06538",
                        "lx": "MJ",
                        "province": "福建"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "155.92247",
                        "lx": "MJ",
                        "province": "内蒙古"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "137.29199",
                        "lx": "MJ",
                        "province": "贵州"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "136.13389",
                        "lx": "MJ",
                        "province": "重庆"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "133.62931",
                        "lx": "MJ",
                        "province": "四川"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "122.24384",
                        "lx": "MJ",
                        "province": "广西"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "119.64292",
                        "lx": "MJ",
                        "province": "甘肃"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "116.59937",
                        "lx": "MJ",
                        "province": "天津"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "114.06066",
                        "lx": "MJ",
                        "province": "海南"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "114.03245",
                        "lx": "MJ",
                        "province": "河南"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "94.69543",
                        "lx": "MJ",
                        "province": "河北"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "88.57952",
                        "lx": "MJ",
                        "province": "江西"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "35.57238",
                        "lx": "MJ",
                        "province": "黑龙江"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "26.32054",
                        "lx": "MJ",
                        "province": "云南"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "17.8976",
                        "lx": "MJ",
                        "province": "吉林"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "15.49135",
                        "lx": "MJ",
                        "province": "山西"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "13.03547",
                        "lx": "MJ",
                        "province": "陕西"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "0",
                        "lx": "MJ",
                        "province": "北京"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "0",
                        "lx": "MJ",
                        "province": "上海"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "0",
                        "lx": "MJ",
                        "province": "青海"
                    },
                    {
                        "color": "1",
                        "ds_ts": "2017-10-27 00:00:00.0",
                        "jgs": "0",
                        "lx": "MJ",
                        "province": "宁夏"
                    }
                ]
            }
                // console.log("业务公司运营桌面各大指标--接管面积地图");
                // console.log(res);
                if(!res || res ==null || res.data.length<1){
                    return   mapcharts();
                }else{
                    var data=res.data;
                    $scope.xmdt=[];
                    $scope.mjdt=[];
                    //设置颜色
                    var  setColor=function(index) {
                        var color = "";
                        if(index=="1"){
                            return  color="#B2E5FB";
                        }else if(index=="2"){
                            return color="#81D3F9";

                        }else if(index=="3"){
                            return  color="#4FC2F6";

                        }else if(index=="4"){
                            return  color="#25B3F5";

                        }else if(index=="5"){
                            return  color="#5BC0DE";

                        }else if(index=="6"){
                            return  color="#0493E7";

                        }else if(index=="7"){
                            return  color="#0484D1";

                        }else if(index=="8") {
                            return  color="#0467B7";
                        }else{
                            return  color="#02478B";
                        }

                    }
                    for(var i=0;i<data.length;i++){
                        var item1={ name:"广州", value:"10",  itemStyle:{normal:{color:"#fff",} } };
                        if(data[i].lx=='MJ' && $scope.gsjgmj){
                            item1.name=data[i].province;
                            item1.value=data[i].jgs;
                            item1.itemStyle.normal.color=setColor(data[i].color);
                            $scope.xmdt.push(item1)
                        }else   if(data[i].lx=='XMS'&& !$scope.gsjgmj){
                            item1.name=data[i].province;
                            item1.value=data[i].jgs;
                            item1.itemStyle.normal.color=setColor(data[i].color);
                            $scope.xmdt.push(item1)
                        }
                    }

                    // console.log($scope.xmdt);
                    mapcharts();
                }

        };
        getWyJgmjDT();
        //接管面积散点图
        var getWyJgmjSdt=function () {
          var res =  {
                "status": 1001,
                "data": [
                {
                    "areaname": "江中区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "4.9830000",
                    "jghs_1": "5.0000000",
                    "jgmj": "785.2882230",
                    "jgmj_1": "800.0000000",
                    "jgxms": "34",
                    "jgxms_1": "34.0000000"
                },
                {
                    "areaname": "安徽区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "5.9312000",
                    "jghs_1": "6.0000000",
                    "jgmj": "773.7798970",
                    "jgmj_1": "750.0000000",
                    "jgxms": "39",
                    "jgxms_1": "39.0000000"
                },
                {
                    "areaname": "广清区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "4.8488000",
                    "jghs_1": "5.0000000",
                    "jgmj": "738.0318060",
                    "jgmj_1": "750.0000000",
                    "jgxms": "34",
                    "jgxms_1": "34.0000000"
                },
                {
                    "areaname": "增城区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "4.2739000",
                    "jghs_1": "4.5000000",
                    "jgmj": "648.1281120",
                    "jgmj_1": "650.0000000",
                    "jgxms": "20",
                    "jgxms_1": "20.0000000"
                },
                {
                    "areaname": "东北区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "5.3341000",
                    "jghs_1": "5.5000000",
                    "jgmj": "620.4884610",
                    "jgmj_1": "600.0000000",
                    "jgxms": "16",
                    "jgxms_1": "16.0000000"
                },
                {
                    "areaname": "沪苏区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "3.7943000",
                    "jghs_1": "4.0000000",
                    "jgmj": "527.9788260",
                    "jgmj_1": "550.0000000",
                    "jgxms": "84",
                    "jgxms_1": "84.0000000"
                },
                {
                    "areaname": "佛山区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "3.1616000",
                    "jghs_1": "3.0000000",
                    "jgmj": "513.0103600",
                    "jgmj_1": "500.0000000",
                    "jgxms": "31",
                    "jgxms_1": "31.0000000"
                },
                {
                    "areaname": "粤东区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "3.0471000",
                    "jghs_1": "3.0000000",
                    "jgmj": "446.5372230",
                    "jgmj_1": "450.0000000",
                    "jgxms": "34",
                    "jgxms_1": "34.0000000"
                },
                {
                    "areaname": "粤北区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "2.6630000",
                    "jghs_1": "2.5000000",
                    "jgmj": "430.5811170",
                    "jgmj_1": "450.0000000",
                    "jgxms": "12",
                    "jgxms_1": "12.0000000"
                },
                {
                    "areaname": "惠深区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "4.1968000",
                    "jghs_1": "4.0000000",
                    "jgmj": "403.2692970",
                    "jgmj_1": "400.0000000",
                    "jgxms": "32",
                    "jgxms_1": "32.0000000"
                },
                {
                    "areaname": "武汉区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "2.6497000",
                    "jghs_1": "2.5000000",
                    "jgmj": "401.5145800",
                    "jgmj_1": "400.0000000",
                    "jgxms": "23",
                    "jgxms_1": "23.0000000"
                },
                {
                    "areaname": "长沙区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "2.3786000",
                    "jghs_1": "2.5000000",
                    "jgmj": "399.5626170",
                    "jgmj_1": "400.0000000",
                    "jgxms": "27",
                    "jgxms_1": "27.0000000"
                },
                {
                    "areaname": "南京区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "3.2352000",
                    "jghs_1": "3.0000000",
                    "jgmj": "398.6422150",
                    "jgmj_1": "400.0000000",
                    "jgxms": "23",
                    "jgxms_1": "23.0000000"
                },
                {
                    "areaname": "江苏区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "3.1263000",
                    "jghs_1": "3.0000000",
                    "jgmj": "392.8822370",
                    "jgmj_1": "400.0000000",
                    "jgxms": "26",
                    "jgxms_1": "26.0000000"
                },
                {
                    "areaname": "顺碧区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "2.3973000",
                    "jghs_1": "2.5000000",
                    "jgmj": "325.0183190",
                    "jgmj_1": "350.0000000",
                    "jgxms": "7",
                    "jgxms_1": "7.0000000"
                },
                {
                    "areaname": "莞深区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "2.8050000",
                    "jghs_1": "3.0000000",
                    "jgmj": "315.8565530",
                    "jgmj_1": "300.0000000",
                    "jgxms": "46",
                    "jgxms_1": "46.0000000"
                },
                {
                    "areaname": "粤西区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "1.8942000",
                    "jghs_1": "2.0000000",
                    "jgmj": "301.6479710",
                    "jgmj_1": "300.0000000",
                    "jgxms": "30",
                    "jgxms_1": "30.0000000"
                },
                {
                    "areaname": "肇庆区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "1.9318000",
                    "jghs_1": "2.0000000",
                    "jgmj": "267.9179410",
                    "jgmj_1": "250.0000000",
                    "jgxms": "16",
                    "jgxms_1": "16.0000000"
                },
                {
                    "areaname": "湖北区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "1.4256000",
                    "jghs_1": "1.5000000",
                    "jgmj": "216.0861410",
                    "jgmj_1": "200.0000000",
                    "jgxms": "30",
                    "jgxms_1": "30.0000000"
                },
                {
                    "areaname": "山东区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "1.8387000",
                    "jghs_1": "2.0000000",
                    "jgmj": "210.1111130",
                    "jgmj_1": "200.0000000",
                    "jgxms": "12",
                    "jgxms_1": "12.0000000"
                },
                {
                    "areaname": "福建区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "1.4763000",
                    "jghs_1": "1.5000000",
                    "jgmj": "183.0653790",
                    "jgmj_1": "200.0000000",
                    "jgxms": "29",
                    "jgxms_1": "29.0000000"
                },
                {
                    "areaname": "内蒙区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "1.1769000",
                    "jghs_1": "1.0000000",
                    "jgmj": "173.8200680",
                    "jgmj_1": "150.0000000",
                    "jgxms": "7",
                    "jgxms_1": "7.0000000"
                },
                {
                    "areaname": "湖南区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "1.3238000",
                    "jghs_1": "1.5000000",
                    "jgmj": "171.9545430",
                    "jgmj_1": "150.0000000",
                    "jgxms": "25",
                    "jgxms_1": "25.0000000"
                },
                {
                    "areaname": "重庆区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "1.0669000",
                    "jghs_1": "1.0000000",
                    "jgmj": "134.1074750",
                    "jgmj_1": "150.0000000",
                    "jgxms": "14",
                    "jgxms_1": "14.0000000"
                },
                {
                    "areaname": "四川区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "1.1166000",
                    "jghs_1": "1.0000000",
                    "jgmj": "133.6293110",
                    "jgmj_1": "150.0000000",
                    "jgxms": "14",
                    "jgxms_1": "14.0000000"
                },
                {
                    "areaname": "浙江区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "1.0163000",
                    "jghs_1": "1.0000000",
                    "jgmj": "127.2533520",
                    "jgmj_1": "150.0000000",
                    "jgxms": "32",
                    "jgxms_1": "32.0000000"
                },
                {
                    "areaname": "贵州区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.7866000",
                    "jghs_1": "1.0000000",
                    "jgmj": "126.9774080",
                    "jgmj_1": "150.0000000",
                    "jgxms": "26",
                    "jgxms_1": "26.0000000"
                },
                {
                    "areaname": "广西区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.7045000",
                    "jghs_1": "0.5000000",
                    "jgmj": "122.2438360",
                    "jgmj_1": "100.0000000",
                    "jgxms": "27",
                    "jgxms_1": "27.0000000"
                },
                {
                    "areaname": "西北区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.9086000",
                    "jghs_1": "1.0000000",
                    "jgmj": "119.6429160",
                    "jgmj_1": "100.0000000",
                    "jgxms": "12",
                    "jgxms_1": "12.0000000"
                },
                {
                    "areaname": "清能碧桂园",
                    "ds_ts": "2017-10-27",
                    "jghs": "1.0999000",
                    "jghs_1": "1.0000000",
                    "jgmj": "117.3518120",
                    "jgmj_1": "100.0000000",
                    "jgxms": "11",
                    "jgxms_1": "11.0000000"
                },
                {
                    "areaname": "海南区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "1.3643000",
                    "jghs_1": "1.5000000",
                    "jgmj": "114.0606640",
                    "jgmj_1": "100.0000000",
                    "jgxms": "18",
                    "jgxms_1": "18.0000000"
                },
                {
                    "areaname": "河南区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.7768000",
                    "jghs_1": "1.0000000",
                    "jgmj": "114.0324540",
                    "jgmj_1": "100.0000000",
                    "jgxms": "44",
                    "jgxms_1": "44.0000000"
                },
                {
                    "areaname": "天津区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.8853000",
                    "jghs_1": "1.0000000",
                    "jgmj": "105.8065780",
                    "jgmj_1": "100.0000000",
                    "jgxms": "4",
                    "jgxms_1": "4.0000000"
                },
                {
                    "areaname": "江西区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.6391000",
                    "jghs_1": "0.5000000",
                    "jgmj": "88.5795210",
                    "jgmj_1": "100.0000000",
                    "jgxms": "15",
                    "jgxms_1": "15.0000000"
                },
                {
                    "areaname": "河北区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.5102000",
                    "jghs_1": "0.5000000",
                    "jgmj": "73.2674430",
                    "jgmj_1": "50.0000000",
                    "jgxms": "14",
                    "jgxms_1": "14.0000000"
                },
                {
                    "areaname": "沪浙区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.5029000",
                    "jghs_1": "0.5000000",
                    "jgmj": "62.4426890",
                    "jgmj_1": "50.0000000",
                    "jgxms": "9",
                    "jgxms_1": "9.0000000"
                },
                {
                    "areaname": "北京区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.1771000",
                    "jghs_1": "0.0000000",
                    "jgmj": "32.2207780",
                    "jgmj_1": "50.0000000",
                    "jgxms": "18",
                    "jgxms_1": "18.0000000"
                },
                {
                    "areaname": "云南区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.1655000",
                    "jghs_1": "0.0000000",
                    "jgmj": "26.3205350",
                    "jgmj_1": "50.0000000",
                    "jgxms": "13",
                    "jgxms_1": "13.0000000"
                },
                {
                    "areaname": "深圳区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.2257000",
                    "jghs_1": "0.0000000",
                    "jgmj": "19.9537830",
                    "jgmj_1": "0.0000000",
                    "jgxms": "4",
                    "jgxms_1": "4.0000000"
                },
                {
                    "areaname": "山西区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.0980000",
                    "jghs_1": "0.0000000",
                    "jgmj": "15.4913470",
                    "jgmj_1": "0.0000000",
                    "jgxms": "7",
                    "jgxms_1": "7.0000000"
                },
                {
                    "areaname": "遵义城市公司",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.0066000",
                    "jghs_1": "0.0000000",
                    "jgmj": "10.3145820",
                    "jgmj_1": "0.0000000",
                    "jgxms": "6",
                    "jgxms_1": "6.0000000"
                },
                {
                    "areaname": "韩城公司",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.0944000",
                    "jghs_1": "0.0000000",
                    "jgmj": "9.0410670",
                    "jgmj_1": "0.0000000",
                    "jgxms": "4",
                    "jgxms_1": "4.0000000"
                },
                {
                    "areaname": "宁波区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.0693000",
                    "jghs_1": "0.0000000",
                    "jgmj": "8.5046320",
                    "jgmj_1": "0.0000000",
                    "jgxms": "3",
                    "jgxms_1": "3.0000000"
                },
                {
                    "areaname": "陕西区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.0234000",
                    "jghs_1": "0.0000000",
                    "jgmj": "3.9944060",
                    "jgmj_1": "0.0000000",
                    "jgxms": "6",
                    "jgxms_1": "6.0000000"
                },
                {
                    "areaname": "苏州区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.0233000",
                    "jghs_1": "0.0000000",
                    "jgmj": "3.0655080",
                    "jgmj_1": "0.0000000",
                    "jgxms": "3",
                    "jgxms_1": "3.0000000"
                },
                {
                    "areaname": "重庆金阳",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.0104000",
                    "jghs_1": "0.0000000",
                    "jgmj": "2.0264180",
                    "jgmj_1": "0.0000000",
                    "jgxms": "7",
                    "jgxms_1": "7.0000000"
                },
                {
                    "areaname": "上海区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.0000000",
                    "jghs_1": "0.0000000",
                    "jgmj": "0.0000000",
                    "jgmj_1": "0.0000000",
                    "jgxms": "3",
                    "jgxms_1": "3.0000000"
                },
                {
                    "areaname": "衡水城市公司",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.0000000",
                    "jghs_1": "0.0000000",
                    "jgmj": "0.0000000",
                    "jgmj_1": "0.0000000",
                    "jgxms": "4",
                    "jgxms_1": "4.0000000"
                },
                {
                    "areaname": "江中区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "4.9830000",
                    "jghs_1": "5.0000000",
                    "jgmj": "785.2882230",
                    "jgmj_1": "800.0000000",
                    "jgxms": "34",
                    "jgxms_1": "34.0000000"
                },
                {
                    "areaname": "安徽区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "5.9312000",
                    "jghs_1": "6.0000000",
                    "jgmj": "773.7798970",
                    "jgmj_1": "750.0000000",
                    "jgxms": "39",
                    "jgxms_1": "39.0000000"
                },
                {
                    "areaname": "广清区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "4.8488000",
                    "jghs_1": "5.0000000",
                    "jgmj": "738.0318060",
                    "jgmj_1": "750.0000000",
                    "jgxms": "34",
                    "jgxms_1": "34.0000000"
                },
                {
                    "areaname": "增城区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "4.2739000",
                    "jghs_1": "4.5000000",
                    "jgmj": "648.1281120",
                    "jgmj_1": "650.0000000",
                    "jgxms": "20",
                    "jgxms_1": "20.0000000"
                },
                {
                    "areaname": "东北区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "5.3341000",
                    "jghs_1": "5.5000000",
                    "jgmj": "620.4884610",
                    "jgmj_1": "600.0000000",
                    "jgxms": "16",
                    "jgxms_1": "16.0000000"
                },
                {
                    "areaname": "沪苏区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "3.7943000",
                    "jghs_1": "4.0000000",
                    "jgmj": "527.9788260",
                    "jgmj_1": "550.0000000",
                    "jgxms": "84",
                    "jgxms_1": "84.0000000"
                },
                {
                    "areaname": "佛山区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "3.1616000",
                    "jghs_1": "3.0000000",
                    "jgmj": "513.0103600",
                    "jgmj_1": "500.0000000",
                    "jgxms": "31",
                    "jgxms_1": "31.0000000"
                },
                {
                    "areaname": "粤东区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "3.0471000",
                    "jghs_1": "3.0000000",
                    "jgmj": "446.5372230",
                    "jgmj_1": "450.0000000",
                    "jgxms": "34",
                    "jgxms_1": "34.0000000"
                },
                {
                    "areaname": "粤北区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "2.6630000",
                    "jghs_1": "2.5000000",
                    "jgmj": "430.5811170",
                    "jgmj_1": "450.0000000",
                    "jgxms": "12",
                    "jgxms_1": "12.0000000"
                },
                {
                    "areaname": "惠深区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "4.1968000",
                    "jghs_1": "4.0000000",
                    "jgmj": "403.2692970",
                    "jgmj_1": "400.0000000",
                    "jgxms": "32",
                    "jgxms_1": "32.0000000"
                },
                {
                    "areaname": "武汉区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "2.6497000",
                    "jghs_1": "2.5000000",
                    "jgmj": "401.5145800",
                    "jgmj_1": "400.0000000",
                    "jgxms": "23",
                    "jgxms_1": "23.0000000"
                },
                {
                    "areaname": "长沙区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "2.3786000",
                    "jghs_1": "2.5000000",
                    "jgmj": "399.5626170",
                    "jgmj_1": "400.0000000",
                    "jgxms": "27",
                    "jgxms_1": "27.0000000"
                },
                {
                    "areaname": "南京区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "3.2352000",
                    "jghs_1": "3.0000000",
                    "jgmj": "398.6422150",
                    "jgmj_1": "400.0000000",
                    "jgxms": "23",
                    "jgxms_1": "23.0000000"
                },
                {
                    "areaname": "江苏区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "3.1263000",
                    "jghs_1": "3.0000000",
                    "jgmj": "392.8822370",
                    "jgmj_1": "400.0000000",
                    "jgxms": "26",
                    "jgxms_1": "26.0000000"
                },
                {
                    "areaname": "顺碧区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "2.3973000",
                    "jghs_1": "2.5000000",
                    "jgmj": "325.0183190",
                    "jgmj_1": "350.0000000",
                    "jgxms": "7",
                    "jgxms_1": "7.0000000"
                },
                {
                    "areaname": "莞深区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "2.8050000",
                    "jghs_1": "3.0000000",
                    "jgmj": "315.8565530",
                    "jgmj_1": "300.0000000",
                    "jgxms": "46",
                    "jgxms_1": "46.0000000"
                },
                {
                    "areaname": "粤西区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "1.8942000",
                    "jghs_1": "2.0000000",
                    "jgmj": "301.6479710",
                    "jgmj_1": "300.0000000",
                    "jgxms": "30",
                    "jgxms_1": "30.0000000"
                },
                {
                    "areaname": "肇庆区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "1.9318000",
                    "jghs_1": "2.0000000",
                    "jgmj": "267.9179410",
                    "jgmj_1": "250.0000000",
                    "jgxms": "16",
                    "jgxms_1": "16.0000000"
                },
                {
                    "areaname": "湖北区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "1.4256000",
                    "jghs_1": "1.5000000",
                    "jgmj": "216.0861410",
                    "jgmj_1": "200.0000000",
                    "jgxms": "30",
                    "jgxms_1": "30.0000000"
                },
                {
                    "areaname": "山东区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "1.8387000",
                    "jghs_1": "2.0000000",
                    "jgmj": "210.1111130",
                    "jgmj_1": "200.0000000",
                    "jgxms": "12",
                    "jgxms_1": "12.0000000"
                },
                {
                    "areaname": "福建区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "1.4763000",
                    "jghs_1": "1.5000000",
                    "jgmj": "183.0653790",
                    "jgmj_1": "200.0000000",
                    "jgxms": "29",
                    "jgxms_1": "29.0000000"
                },
                {
                    "areaname": "内蒙区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "1.1769000",
                    "jghs_1": "1.0000000",
                    "jgmj": "173.8200680",
                    "jgmj_1": "150.0000000",
                    "jgxms": "7",
                    "jgxms_1": "7.0000000"
                },
                {
                    "areaname": "湖南区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "1.3238000",
                    "jghs_1": "1.5000000",
                    "jgmj": "171.9545430",
                    "jgmj_1": "150.0000000",
                    "jgxms": "25",
                    "jgxms_1": "25.0000000"
                },
                {
                    "areaname": "重庆区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "1.0669000",
                    "jghs_1": "1.0000000",
                    "jgmj": "134.1074750",
                    "jgmj_1": "150.0000000",
                    "jgxms": "14",
                    "jgxms_1": "14.0000000"
                },
                {
                    "areaname": "四川区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "1.1166000",
                    "jghs_1": "1.0000000",
                    "jgmj": "133.6293110",
                    "jgmj_1": "150.0000000",
                    "jgxms": "14",
                    "jgxms_1": "14.0000000"
                },
                {
                    "areaname": "浙江区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "1.0163000",
                    "jghs_1": "1.0000000",
                    "jgmj": "127.2533520",
                    "jgmj_1": "150.0000000",
                    "jgxms": "32",
                    "jgxms_1": "32.0000000"
                },
                {
                    "areaname": "贵州区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.7866000",
                    "jghs_1": "1.0000000",
                    "jgmj": "126.9774080",
                    "jgmj_1": "150.0000000",
                    "jgxms": "26",
                    "jgxms_1": "26.0000000"
                },
                {
                    "areaname": "广西区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.7045000",
                    "jghs_1": "0.5000000",
                    "jgmj": "122.2438360",
                    "jgmj_1": "100.0000000",
                    "jgxms": "27",
                    "jgxms_1": "27.0000000"
                },
                {
                    "areaname": "西北区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.9086000",
                    "jghs_1": "1.0000000",
                    "jgmj": "119.6429160",
                    "jgmj_1": "100.0000000",
                    "jgxms": "12",
                    "jgxms_1": "12.0000000"
                },
                {
                    "areaname": "清能碧桂园",
                    "ds_ts": "2017-10-27",
                    "jghs": "1.0999000",
                    "jghs_1": "1.0000000",
                    "jgmj": "117.3518120",
                    "jgmj_1": "100.0000000",
                    "jgxms": "11",
                    "jgxms_1": "11.0000000"
                },
                {
                    "areaname": "海南区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "1.3643000",
                    "jghs_1": "1.5000000",
                    "jgmj": "114.0606640",
                    "jgmj_1": "100.0000000",
                    "jgxms": "18",
                    "jgxms_1": "18.0000000"
                },
                {
                    "areaname": "河南区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.7768000",
                    "jghs_1": "1.0000000",
                    "jgmj": "114.0324540",
                    "jgmj_1": "100.0000000",
                    "jgxms": "44",
                    "jgxms_1": "44.0000000"
                },
                {
                    "areaname": "天津区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.8853000",
                    "jghs_1": "1.0000000",
                    "jgmj": "105.8065780",
                    "jgmj_1": "100.0000000",
                    "jgxms": "4",
                    "jgxms_1": "4.0000000"
                },
                {
                    "areaname": "江西区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.6391000",
                    "jghs_1": "0.5000000",
                    "jgmj": "88.5795210",
                    "jgmj_1": "100.0000000",
                    "jgxms": "15",
                    "jgxms_1": "15.0000000"
                },
                {
                    "areaname": "河北区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.5102000",
                    "jghs_1": "0.5000000",
                    "jgmj": "73.2674430",
                    "jgmj_1": "50.0000000",
                    "jgxms": "14",
                    "jgxms_1": "14.0000000"
                },
                {
                    "areaname": "沪浙区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.5029000",
                    "jghs_1": "0.5000000",
                    "jgmj": "62.4426890",
                    "jgmj_1": "50.0000000",
                    "jgxms": "9",
                    "jgxms_1": "9.0000000"
                },
                {
                    "areaname": "北京区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.1771000",
                    "jghs_1": "0.0000000",
                    "jgmj": "32.2207780",
                    "jgmj_1": "50.0000000",
                    "jgxms": "18",
                    "jgxms_1": "18.0000000"
                },
                {
                    "areaname": "云南区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.1655000",
                    "jghs_1": "0.0000000",
                    "jgmj": "26.3205350",
                    "jgmj_1": "50.0000000",
                    "jgxms": "13",
                    "jgxms_1": "13.0000000"
                },
                {
                    "areaname": "深圳区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.2257000",
                    "jghs_1": "0.0000000",
                    "jgmj": "19.9537830",
                    "jgmj_1": "0.0000000",
                    "jgxms": "4",
                    "jgxms_1": "4.0000000"
                },
                {
                    "areaname": "山西区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.0980000",
                    "jghs_1": "0.0000000",
                    "jgmj": "15.4913470",
                    "jgmj_1": "0.0000000",
                    "jgxms": "7",
                    "jgxms_1": "7.0000000"
                },
                {
                    "areaname": "遵义城市公司",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.0066000",
                    "jghs_1": "0.0000000",
                    "jgmj": "10.3145820",
                    "jgmj_1": "0.0000000",
                    "jgxms": "6",
                    "jgxms_1": "6.0000000"
                },
                {
                    "areaname": "韩城公司",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.0944000",
                    "jghs_1": "0.0000000",
                    "jgmj": "9.0410670",
                    "jgmj_1": "0.0000000",
                    "jgxms": "4",
                    "jgxms_1": "4.0000000"
                },
                {
                    "areaname": "宁波区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.0693000",
                    "jghs_1": "0.0000000",
                    "jgmj": "8.5046320",
                    "jgmj_1": "0.0000000",
                    "jgxms": "3",
                    "jgxms_1": "3.0000000"
                },
                {
                    "areaname": "陕西区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.0234000",
                    "jghs_1": "0.0000000",
                    "jgmj": "3.9944060",
                    "jgmj_1": "0.0000000",
                    "jgxms": "6",
                    "jgxms_1": "6.0000000"
                },
                {
                    "areaname": "苏州区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.0233000",
                    "jghs_1": "0.0000000",
                    "jgmj": "3.0655080",
                    "jgmj_1": "0.0000000",
                    "jgxms": "3",
                    "jgxms_1": "3.0000000"
                },
                {
                    "areaname": "重庆金阳",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.0104000",
                    "jghs_1": "0.0000000",
                    "jgmj": "2.0264180",
                    "jgmj_1": "0.0000000",
                    "jgxms": "7",
                    "jgxms_1": "7.0000000"
                },
                {
                    "areaname": "上海区域",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.0000000",
                    "jghs_1": "0.0000000",
                    "jgmj": "0.0000000",
                    "jgmj_1": "0.0000000",
                    "jgxms": "3",
                    "jgxms_1": "3.0000000"
                },
                {
                    "areaname": "衡水城市公司",
                    "ds_ts": "2017-10-27",
                    "jghs": "0.0000000",
                    "jghs_1": "0.0000000",
                    "jgmj": "0.0000000",
                    "jgmj_1": "0.0000000",
                    "jgxms": "4",
                    "jgxms_1": "4.0000000"
                }
            ]
            }
            if(!res || res ==null || res.data.length<1){
                return  cacharts();
            }else{
                var data=res.data;
                $scope.cat=data;
                /*
                 根据指定的值，在revenue查找第一个比它大的值，返回对应的索引，通过索引在reward获取对应的奖励
                 1：如果值小于revenue最小的值时，则奖励0。所以reward前被了个0
                 2：如果值大于revenue最大的值时，则归为最高一档

                 ***注意***
                 前提是：revenue为整型数组，且已经按照从小到大排好了序的
                 */
                var  find=function(array,val,a){
                    //console.log(val);
                    var idx =0, i=0, j= array.length;
                    if(a==0){
                        //如果值小于revenue最小的值时，则归为最后一档
                        if(val  <   Math.min.apply(null,array)){
                            return array.length;
                        };
                        //如果值大于revenue最大的值时，则归为最第一档
                        if(val  >   Math.max.apply(null,array)){
                            return 0;
                        };
                        for(i;i<j;i++){
                            if(val >array[i]  || val== array[i] ){
                                idx = i;
                                break;
                            }
                        };
                    }else{
                        //如果值小于revenue最小的值时，则归为最后一档
                        if(val  <   Math.min.apply(null,array)){

                            return 0;
                        };
                        //如果值大于revenue最大的值时，则归为最第一档
                        if(val  >   Math.max.apply(null,array)){
                            return array.length-1;
                        };
                        for(i;i<j;i++){
                            if(val== array[i] ){
                                idx = i;
                                break;
                            }
                        };
                    }

                    return idx;
                };

                $scope.JGMJ=[] ;  //接管面积
                $scope.JGHS=[] ;  //接管户数
                $scope.JGXMS=[] ; //接管项目数
                $scope.GSDHJ=[] ; //接管散点合集
                $scope.arrr2=[] ; //
                $scope.arrr3=[] ; //
                $scope.arrr4=[] ; //

                for(var i=0;i<data.length;i++){
                    var e=dataFormat(data[i].jgxms_1,1);
                    var f=dataFormat(data[i].jghs_1,1);
                    var g=dataFormat(data[i].jgmj_1,1);
                    $scope.arrr2.push(f);
                    $scope.arrr3.push(g);
                    $scope.arrr4.push(g);
                }
                //去重方法封装
                var getvalue = function (arr) {
                    var temp = [];
                    for(var i=0;i<arr.length;i++){
                        if(temp.indexOf(arr[i]) == -1){
                            temp.push(arr[i])
                        }
                    }
                    return temp;
                };
                //去重
                $scope.arrr3=getvalue( $scope.arrr3);
                //排序
                $scope.arrr3.sort(function (a,b) { return a-b; }); //最大面积 升序
                // console.log("$scope.arrr3--------------");
                // console.log($scope.arrr3);

                var da=$scope.arrr3.slice(-1);
                var  k = Math.floor(da / 23);//向下取整
                var  z = da;
                $scope.KEDU= [parseFloat(da[0])];
                $scope.kdIndex=[];
                $scope.nkdIndex=[];
                $scope.reward   = ['0','1', '2', '3','4', '5', '6', '7'];  //内部刻度 --户数
                //分23次减去 最大面积/23  向下取整的值 得到23个外圈刻度  ---面积
                for(var i=0;i<22;i++){
                    z=z-k;
                    $scope.KEDU.push(z);
                }
                //得到外圈刻度位置
                for(var i=0;i<$scope.arrr4.length;i++){
                    $scope.kdIndex.push(find($scope.KEDU,$scope.arrr4[i],0));
                }
                //得到外圈刻度位置
                for(var i=0;i<$scope.arrr2.length;i++){
                    $scope.nkdIndex.push(find($scope.reward,$scope.arrr2[i],1));
                }
                // console.log( $scope.nkdIndex);
                for(var i=0;i<data.length;i++){
                    var a=dataFormat(data[i].jgmj,1)/1; //接管面积
                    var b=dataFormat(data[i].jghs,1)/1;//接管户数
                    var c=data[i].jgxms/1;  //接管项目数
                    var d=data[i].areaname;  //接管区域
                    var e=data[i].jghs_1/1;  //接管区域
                    // $scope.JGMJ.push(a);
                    // $scope.JGHS.push(b);
                    // $scope.JGXMS.push(c);
                    //内部刻度值 、 外圈刻度、图标大小值 、接管项目数、接管面积、接管户数、接管区域
                    $scope.SDTHJ.push([e,$scope.kdIndex[i],c,a,b,d]);   //接管散点合集
                }
                // console.log( $scope.KEDU);
                cacharts();
            }

        };
        getWyJgmjSdt();

        ////接管面积柱状图
        var getWyJgmjZzt=function () {
            var res={
                "status": 1001,
                "data": [
                    {
                        "cw": "2.621200",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.025000",
                        "mj": "787.934423",
                        "province": "江中",
                        "sp": "26.102025",
                        "zz": "759.186198"
                    },
                    {
                        "cw": "3.955300",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.393272",
                        "mj": "778.128469",
                        "province": "安徽",
                        "sp": "23.095666",
                        "zz": "750.684231"
                    },
                    {
                        "cw": "2.755300",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "740.787105",
                        "province": "广清",
                        "sp": "21.167813",
                        "zz": "716.863992"
                    },
                    {
                        "cw": "4.246500",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "652.374612",
                        "province": "增城",
                        "sp": "20.747427",
                        "zz": "627.380685"
                    },
                    {
                        "cw": "2.146800",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000200",
                        "mj": "622.635461",
                        "province": "东北",
                        "sp": "18.967302",
                        "zz": "601.521159"
                    },
                    {
                        "cw": "2.685100",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "530.663926",
                        "province": "沪苏",
                        "sp": "22.636932",
                        "zz": "505.341894"
                    },
                    {
                        "cw": "1.480600",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "514.490960",
                        "province": "佛山",
                        "sp": "13.146459",
                        "zz": "499.863901"
                    },
                    {
                        "cw": "3.508500",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "450.045723",
                        "province": "粤东",
                        "sp": "18.848378",
                        "zz": "427.688845"
                    },
                    {
                        "cw": "1.656000",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "432.237117",
                        "province": "粤北",
                        "sp": "14.632570",
                        "zz": "415.948547"
                    },
                    {
                        "cw": "2.001000",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "405.270297",
                        "province": "惠深",
                        "sp": "7.225190",
                        "zz": "396.044107"
                    },
                    {
                        "cw": "1.000700",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "402.515280",
                        "province": "武汉",
                        "sp": "7.654143",
                        "zz": "393.860437"
                    },
                    {
                        "cw": "2.171300",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "400.813515",
                        "province": "南京",
                        "sp": "6.448765",
                        "zz": "392.193450"
                    },
                    {
                        "cw": "1.175300",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "400.737917",
                        "province": "长沙",
                        "sp": "13.358352",
                        "zz": "386.204265"
                    },
                    {
                        "cw": "1.965300",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "394.847537",
                        "province": "江苏",
                        "sp": "8.508612",
                        "zz": "384.373625"
                    },
                    {
                        "cw": "0.532400",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "325.550719",
                        "province": "顺碧",
                        "sp": "2.940429",
                        "zz": "322.077890"
                    },
                    {
                        "cw": "1.159900",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "317.016453",
                        "province": "莞深",
                        "sp": "9.086453",
                        "zz": "306.770100"
                    },
                    {
                        "cw": "1.415700",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "303.063671",
                        "province": "粤西",
                        "sp": "12.909930",
                        "zz": "288.738041"
                    },
                    {
                        "cw": "1.280300",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.052754",
                        "mj": "269.250995",
                        "province": "肇庆",
                        "sp": "8.772851",
                        "zz": "259.145090"
                    },
                    {
                        "cw": "0.527800",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "216.613941",
                        "province": "湖北",
                        "sp": "8.997382",
                        "zz": "207.088759"
                    },
                    {
                        "cw": "1.099900",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "211.211013",
                        "province": "山东",
                        "sp": "7.479634",
                        "zz": "202.631479"
                    },
                    {
                        "cw": "0.967800",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.661885",
                        "mj": "184.695065",
                        "province": "福建",
                        "sp": "7.269631",
                        "zz": "175.795749"
                    },
                    {
                        "cw": "0.618400",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "174.438468",
                        "province": "内蒙",
                        "sp": "4.771995",
                        "zz": "169.048073"
                    },
                    {
                        "cw": "0.769300",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "172.723843",
                        "province": "湖南",
                        "sp": "6.459359",
                        "zz": "165.495184"
                    },
                    {
                        "cw": "0.581800",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "134.689275",
                        "province": "重庆",
                        "sp": "8.997603",
                        "zz": "125.109872"
                    },
                    {
                        "cw": "0.514500",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "134.143811",
                        "province": "四川",
                        "sp": "2.932653",
                        "zz": "130.696658"
                    },
                    {
                        "cw": "0.800300",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.922023",
                        "mj": "128.975675",
                        "province": "浙江",
                        "sp": "6.385236",
                        "zz": "120.868116"
                    },
                    {
                        "cw": "0.100000",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "127.077408",
                        "province": "贵州",
                        "sp": "17.664389",
                        "zz": "109.313019"
                    },
                    {
                        "cw": "0.434700",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "122.678536",
                        "province": "广西",
                        "sp": "4.663085",
                        "zz": "117.580751"
                    },
                    {
                        "cw": "0.415200",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "120.058116",
                        "province": "西北",
                        "sp": "5.296709",
                        "zz": "114.346207"
                    },
                    {
                        "cw": "0.579100",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "117.930912",
                        "province": "清能碧桂园",
                        "sp": "4.482412",
                        "zz": "112.869400"
                    },
                    {
                        "cw": "0.311300",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "114.343754",
                        "province": "河南",
                        "sp": "3.254310",
                        "zz": "110.778144"
                    },
                    {
                        "cw": "0.113900",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.001200",
                        "mj": "114.175764",
                        "province": "海南",
                        "sp": "3.309191",
                        "zz": "110.751473"
                    },
                    {
                        "cw": "0.496300",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "106.302878",
                        "province": "天津",
                        "sp": "1.651071",
                        "zz": "104.155507"
                    },
                    {
                        "cw": "0.353600",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "88.933121",
                        "province": "江西",
                        "sp": "6.689224",
                        "zz": "81.890297"
                    },
                    {
                        "cw": "0.149100",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "73.416543",
                        "province": "河北",
                        "sp": "2.772610",
                        "zz": "70.494833"
                    },
                    {
                        "cw": "0.523100",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "62.965789",
                        "province": "沪浙",
                        "sp": "2.983636",
                        "zz": "59.459053"
                    },
                    {
                        "cw": "0.017500",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "32.238278",
                        "province": "北京",
                        "sp": "7.534399",
                        "zz": "24.686379"
                    },
                    {
                        "cw": "0.138000",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "26.458535",
                        "province": "云南",
                        "sp": "0.892661",
                        "zz": "25.427874"
                    },
                    {
                        "cw": "0.000000",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "19.953783",
                        "province": "深圳",
                        "sp": "0.734048",
                        "zz": "19.219735"
                    },
                    {
                        "cw": "0.011700",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "15.503047",
                        "province": "山西",
                        "sp": "0.930192",
                        "zz": "14.561155"
                    },
                    {
                        "cw": "0.020100",
                        "ds_ts": "2017-10-27",
                        "dxs": "1.388119",
                        "mj": "10.449286",
                        "province": "韩城公司",
                        "sp": "0.000000",
                        "zz": "9.041067"
                    },
                    {
                        "cw": "0.033100",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "10.347682",
                        "province": "遵义城市公司",
                        "sp": "8.739180",
                        "zz": "1.575402"
                    },
                    {
                        "cw": "0.000000",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "8.504632",
                        "province": "宁波",
                        "sp": "0.000000",
                        "zz": "8.504632"
                    },
                    {
                        "cw": "0.016800",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "4.011206",
                        "province": "陕西",
                        "sp": "0.302161",
                        "zz": "3.692245"
                    },
                    {
                        "cw": "0.011400",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "3.076908",
                        "province": "苏州",
                        "sp": "0.000000",
                        "zz": "3.065508"
                    },
                    {
                        "cw": "0.460300",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "2.486718",
                        "province": "重庆金阳",
                        "sp": "0.300000",
                        "zz": "1.726418"
                    },
                    {
                        "cw": "0.000000",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "0.000000",
                        "province": "上海",
                        "sp": "0.000000",
                        "zz": "0.000000"
                    },
                    {
                        "cw": "0.000000",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "0.000000",
                        "province": "衡水城市公司",
                        "sp": "0.000000",
                        "zz": "0.000000"
                    },
                    {
                        "cw": "0.000000",
                        "ds_ts": "2017-10-27",
                        "dxs": "0.000000",
                        "mj": "0.000000",
                        "province": "null",
                        "sp": "0.000000",
                        "zz": "0.000000"
                    }
                ]
            }
            //console.log("接管面积柱状图");
            //console.log(res);
            $scope.QYS=[];  //柱图数据---区域
            $scope.CW=[];  //柱图数据---车位
            $scope.SP=[];  //柱图数据---商铺
            $scope.ZZ=[];  //柱图数据---住宅
            $scope.DXS=[];  //柱图数据---地下室
            $scope.MJ=[];  //柱图数据---面积
            if(!res || res ==null || res.data.length<1){
                return  barcharts();;
            }else{
                var data=res.data;
                for(var i=0;i<data.length;i++){
                    var obj={};
                    $scope.QYS.push(data[i].province);  //柱图数据---区域
                    $scope.CW.push(dataFormat(data[i].cw,1));  //柱图数据---车位
                    $scope.SP.push(dataFormat(data[i].sp,1));  //柱图数据---商铺
                    $scope.ZZ.push(dataFormat(data[i].zz,1));  //柱图数据---住宅
                    $scope.DXS.push(dataFormat(data[i].dxs,1));  //柱图数据---地下室
                    $scope.MJ.push(qwfformatter(data[i].mj,2));  //柱图数据---面积
                }
                barcharts();
            }
        };
        getWyJgmjZzt();



        var bargrap="30%";
        var setH = function(a){
            // console.log("------------------------");
            console.log(a);
            clearInterval(setIn_4);    //清除定时器--地图轮播
            var winH = $(window).height();
            var winW = $(window).width();
            $('.hpt').css('height',winH);
            $('.tqimgdiv').css('width',$('.tqimgdiv').height());	//天气、日期

            //高度处理
            if(winH<=490){
                // bargrap="30%";
            }else if(winH>490 && winH<750){
                bargrap="35%";
                // $(".card1").css("padding-top","5%");
            }else if(winH>740 && winH<900){
                // $(".card1").css("padding-top","10%");
            }else{

            }

            mapcharts();
            barcharts();
            cacharts();
            // $scope.$digest();
            // $scope.$apply();
        };


        //显示极坐标散点图--详细数据
        $scope.showcatable=function () {
            var data=$scope.cat;
            for(var i=0;i< data.length;i++){
                var a={};
                a.areaname=data[i].areaname;
                a.jgmj=dataFormat(data[i].jgmj,1);
                a.jgxms=qwfformatter(data[i].jgxms,2);
                a.jghs=dataFormat(data[i].jghs,1);
                $scope.catabledata.push(a);
            }
            // console.log($scope.catabledata);
            $scope.catable=true;

        };
        //关闭极坐标散点图--详细数据
        $scope.clsecatable=function () {
            $scope.catable=false;
        };



        //初始化股票数据
        $scope.openprice = 0;		//开盘价
        $scope.maxprice = 0;		//最高价
        $scope.currentprice = 0;	//当前价
        $scope.volume = 0;			//成交量
        //获取股票数据
        var getgupiao = function(){
            mainService.getgupiao(pflag,paramArr).then(function(res){
                // console.log(res);
                if(!res ||res ==null){

                }else if(res.Sharedata.length<1){

                }else{
                    $scope.openprice = (res.Sharedata[0].openprice/1).toFixed(3);		//开盘价
                    $scope.maxprice = (res.Sharedata[0].maxprice/1).toFixed(3);		//最高价
                    $scope.currentprice = (res.Sharedata[0].currentprice/1).toFixed(3);	//当前价
                    $scope.volume = res.Sharedata[0].volume;			//成交量
                }
            });
        }
        getgupiao();
        //股票定时刷新(每5s刷新一次)
        var setIn_2=setInterval(function(){
            getgupiao();
        }, 30000);

        //设置地址和天气
        $scope.ssd = '';
        $scope.tqzk = '';
        function myFun(result){
            var cityName = result.name;
            $scope.address1 = cityName.split('市')[0];
            $('#address1').html($scope.address1);
            $('#address2').html($scope.address1);
            findWeather();
        };
        var myCity = new BMap.LocalCity();
        function findWeather() {
            var cityUrl = 'http://int.dpool.sina.com.cn/iplookup/iplookup.php?format=js';
            $.getScript(cityUrl, function (script, textStatus, jqXHR) {
                var citytq = remote_ip_info.city; // 获取城市
                if(citytq!=undefined&&citytq!=null&&citytq!=''){
                    $('#address1').html(citytq);
                    $('#address2').html(citytq);
                }
                var url = "http://php.weather.sina.com.cn/iframe/index/w_cl.php?code=js&city=" + citytq + "&day=0&dfc=3";
                $.ajax({
                    url: url,
                    dataType: "script",
                    scriptCharset: "gbk",
                    success: function (data) {
                        var _w = window.SWther.w[citytq][0];
                        if(_w.t1!=undefined&&_w.t1!=null&&_w.t1!=''&&_w.t2!=undefined&&_w.t2!=null&&_w.t2!=''){
                            $scope.ssd = _w.t2 + '~' + _w.t1 + "℃ ";
                            $('#ssd').html($scope.ssd);
                            $('#ssd2').html($scope.ssd);
                        }
                        if(_w.s1!=undefined&&_w.s1!=null&&_w.s1!=''){
                            $scope.tqzk = _w.s1;
                            $('#tqzk').html($scope.tqzk);
                            $('#tqzk2').html($scope.tqzk);
                        }
                    }
                });
            });
        }
        myCity.get(myFun);


        var now= new Date();//现在时刻
        var year= now.getFullYear();//现在时刻
        var month=now.getMonth()+1;//月;
        var day=now.getDate(); //日;
        var hours =now.getHours();//时
        var min = now.getMinutes();//分
        var second = now.getSeconds();//秒
        var show_day=new Array('星期日','星期一','星期二','星期三','星期四','星期五','星期六');
        var reloadTime = 0;
        $scope.rq=year+"年"+month+"月"+day+"日";
        $scope.day=show_day[now.getDay()];


        $scope.qiehuan=function(){
            $rootScope.clearste_pcm2
            $state.go("pcm");
        };

        //定时刷新图表数据 10s
        var setIn_1= setInterval(function(){
            clearInterval(setIn_4);  //切换时清除地图轮播任务
            var winH = $(window).height();
            var winW = $(window).width();
            $('.hpt').css('height',winH);
            $('.tqimgdiv').css('width',$('.tqimgdiv').height());	//天气、日期
            if($rootScope.loginflag) {
                if ($scope.gsjgmj) {
                    $scope.gsjgmj = false;    //各省接管面积分布
                    $scope.qyjggc = false;   //各区域接管构成
                } else {
                    $scope.gsjgmj = true;    //各省接管面积分布
                    $scope.qyjggc = true;   //各区域接管构成
                }
                getWyJgmjZzt();
                getWyJgmjDT();
                $scope.$digest();    //这个换成$apply即可
            }

        }, 10000);



        //清除定时器
        $rootScope.clearste_pcm2 = function ()   {
            window.clearInterval(setIn_1);    //清除定时器--图标数据
            window.clearInterval(setIn_2);    //清除定时器--股票数据
            window.clearInterval($rootScope.setIn_2);    //清除定时器--切换页面
            window.clearInterval(setIn_4);    //清除定时器--地图轮播
        }


        //注销
        $scope.cancel = function(){
            var mymessage=confirm("确定注销？");
            if(mymessage==true){
                localStorage.setItem('login',false);
                localStorage.setItem('user',null);
                localStorage.setItem('psw',null);
                $rootScope.loginflag = false;
                $rootScope.clearste_pcm2
            }else if(mymessage==false){
                return;
            }
        };


        /**
         *数据统一处理
         *type
         * 1.取绝对值;
         * 2.取绝对值乘以100;
         * 3.取绝对值乘以100加“%”
         */
        function dataFormat(number,type){
            if(number)
            {
                if(type=="1")
                {
                    return  (Number(number).toFixed(2));
                }
                else if(type=="2")
                {
                    return  (Number(number*1000000*100)/1000000);
                }
                else if(type=="3")
                {
                    return   (Number(number*1000000*100)/1000000)+"%";
                }
            }
            else
            {
                return "0";
            }
        };

        // 单纯地加千位符和小数位
        function qwfformatter(value,type) {
            var numbers = new String(Math.round(value * 100) / 100).split(".", 2);
            var number = numbers[0].replace(/\d+?(?=(?:\d{3})+$)/img, "$&,");
            var dec = numbers[1] || "00";
            if(type=="1"){
                if (dec.length > 2) {
                    dec = dec.substring(0, 2);
                }
                if (dec.length == 1) {
                    dec += "0";
                }
                return number + "." + dec

            }else if (type=="2"){
                return number ;
            }

        };

    }]);
});