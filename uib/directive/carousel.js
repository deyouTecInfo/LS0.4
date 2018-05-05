define(["./directives"], function(directives) {
    "use strict";
    directives.directive('mycarousel', [function($compile) {
        return {
            restrict: 'EA',
            replace: false,
            templateUrl: './uib/views/carousel.html',
            link: function (scope, $el) {
            },
            controller:['$scope','$state',"mainService",'$rootScope','$timeout',function($scope,$state,mainService,$rootScope,$timeout){
                var _this=this;

                var _this=function () {

                    console.log("carousel------")
                    $scope.showno=false;      //动态设置高度百分比
                    $scope.show_dwon=true;    //向下箭头
                    $scope.show_choose=false; //设置界面
                    $scope.hour=0,$scope.min=0,$scope.sec=30;
                    var milliSeconds=30000;   //轮播跳转时间
                    $scope.changTime=function () {
                        milliSeconds = $scope.hour * 3600 * 1000 + $scope.min * 60 * 1000 + $scope.sec * 1000;
                        console.log($scope.hour+"+"+$scope.min+"+"+$scope.sec);
                        console.log(milliSeconds);
                    };

                    console.log(" $scope.showno="+ $scope.showno," $scope.show_dwon="+ $scope.show_dwon);

                    $scope.img_choose=[
                        {'src':'01','url':'pcm','name':'测试1','choose':'1'},
                        {'src':'02','url':'pcm2','name':'测试2','choose':'1'},
                        {'src':'03','url':'qccp','name':'测试3','choose':'0'},
                        {'src':'04','url':'eduGro','name':'测试4','choose':'0'},
                    ];

                    $scope.img_carousel=[
                        {'src':'01','url':'pcm','name':'测试1','choose':'1'},
                        {'src':'02','url':'pcm2','name':'测试2','choose':'1'},
                    ];


                    $scope.show_setting=function (n) {
                        console.log(n);
                        if(n=='1'){
                            $scope.showno=true;
                            $scope.show_dwon=false;
                        }else if(n=='2'){
                            $scope.showno=false;
                            $scope.show_dwon=true;
                        }else if(n=='3'){
                            $('html').css('overflow','hidden');
                            mySwiper.stopAutoplay();
                            $scope.show_choose=true;
                            var winH = $(window).height();
                            $('.zhezhao').css('height',winH);

                        }else if(n=='4'){

                            $scope.show_choose=false;
                            mySwiper.startAutoplay();
                        }
                    };

                    $scope.activeIndex=0;

                    var mySwiper = new Swiper('#marquee1', {
                        autoplay: milliSeconds,  //自动切换的时间间隔（单位ms），不设定该参数slide不会自动切换。
                        setWrapperSize :true, //在Wrapper上添加等于slides相加的宽高
                        slidesPerView: 5,   //显示多少张
                        pagination: '.swiper-pagination',  //分页器样式
                        paginationClickable: true,  //  //当前页下标
                        spaceBetween: 30,   //图片之间的间隔
                        prevButton:'.swiper-button-prev',  //上
                        nextButton:'.swiper-button-next',  //下
                        grabCursor : true,   //显示手掌
                        // hashnav:true,
                        // effect : 'coverflow',  //位移效果
                        centeredSlides: true,   //居中
                        autoplayDisableOnInteraction : false,  //用户操作swiper之后，是否禁止autoplay
                        slideToClickedSlide:true,  //点击图片
                        keyboardControl:true,    //按键切换
                        observer:true,            //修改swiper自己或子元素时，自动初始化swiper 例如window.resize，Swiper更新。
                        observeParents:true,
                        onAutoplay: function(swiper){
                            //自动切换时触发
                            console.log(swiper);
                            $timeout(function(){ $scope.activeIndex=swiper.activeIndex; });
                            if(mySwiper.slides[mySwiper.activeIndex].dataset){
                                var sil=mySwiper.slides[mySwiper.activeIndex].dataset.hash;
                                console.log(sil);
                                if(sil!='pcm'){
                                    $rootScope.clearste(); //pcm
                                }else if(sil!='pcm2'){
                                    $rootScope.clearste_pcm2(); //pcm2
                                }
                                $state.go(sil);
                            }
                        },
                        onClick: function(swiper){
                            //点击时触发
                            console.log(swiper);
                            if(swiper.clickedIndex || swiper.clickedIndex>=0){
                                $timeout(function(){  $scope.activeIndex=swiper.activeIndex; });
                                var sil=mySwiper.clickedSlide.dataset.hash;

                                if(sil!='pcm'){
                                    $rootScope.clearste(); //pcm
                                }else if(sil!='pcm2'){
                                    $rootScope.clearste_pcm2(); //pcm2
                                }
                                $state.go(sil);
                                // console.log(swiper.clickedSlide.dataset.hash);
                                console.log(sil);
                            }

                        }
                    });


                    var el = document.getElementById('sortable_items');
                    var sortable = new Sortable(el, {
                        onEnd: function (evt) {
                            console.log("-------onEnd");
                            // console.log(itemEl);
                            console.log(evt);
                            var newIndex=evt.newIndex;
                            var oldIndex=evt.oldIndex;
                            console.log('newIndex---'+newIndex);
                            console.log('oldIndex---'+oldIndex);

                            $timeout(function(){
                                $scope.img_carousel.move(oldIndex,newIndex);
                                console.log($scope.img_carousel);
                            });

                        }
                    });


                    //选择大屏
                    $scope.fn_choose=function(item){
                      console.log(item);
                      var it_src=item.src,it_url=item.url,it_name=item.name,it_choose=item.choose;
                      if(it_choose=='1'){   //删除
                        for(var i=0;i<$scope.img_carousel.length;i++){
                            if($scope.img_carousel[i].url==it_url){  $scope.img_carousel.splice(i,1); }
                        }
                        fn_updata('0',it_url);  //修改
                      }if(it_choose=='0'){
                            fn_updata('1',it_url); //修改

                            var le=$scope.img_carousel.length;
                            var obj={};
                            obj.src=it_src;
                            obj.url=it_url;
                            obj.name=it_name;
                            obj.choose='1';
                            $scope.img_carousel.splice(le,0,obj); //添加
                      }
                       console.log($scope.img_carousel);
                    };



                };


                /**
                 * 修改 左侧数组 当前选中状态
                 * @param types   1 选中 0取消
                 * @param 对比参数
                 */
                function  fn_updata(types,par) {
                    for(var i=0;i<$scope.img_choose.length;i++){
                        if($scope.img_choose[i].url==par){
                            var obj={};
                            obj.src=$scope.img_choose[i].src;
                            obj.url=$scope.img_choose[i].url;
                            obj.name=$scope.img_choose[i].name;
                            obj.choose=types;
                            $scope.img_choose.splice(i,1,obj);
                            // console.log( $scope.img_choose);
                        }
                    }
                };

                if($rootScope.loginflag){
                    setTimeout(function () {
                        _this();
                    },100);
                }









                //移动数组   [1, 2, 3].move(0, 1) gives [2, 1, 3]
                Array.prototype.move = function (old_index, new_index) {
                    if (new_index >= this.length) {
                        var k = new_index - this.length;
                        while ((k--) + 1) {
                            this.push(undefined);
                        }
                    }
                    this.splice(new_index, 0, this.splice(old_index, 1)[0]);
                    return this; // for testing purposes
                };

                // Array Remove - By John Resig (MIT Licensed)   移除数组中的第二项和第三项   移除数组中的第N项
                Array.prototype.remove = function(from, to) {
                    var rest = this.slice((to || from) + 1 || this.length);
                    this.length = from < 0 ? this.length + from : from;
                    return this.push.apply(this, rest);
                };

            }]
        };
    }]);

});
