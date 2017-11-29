<template>
    <div v-title data-title="首页">

     	<!-- 头部 -->
    	<div class="header">
            <table width="100%">
                <tr>
                    <td width="30%" align="left">
                        <div class="left loaction">
                            <span style="color:#fff;font-size:0.28rem;">[</span><a @click="showCity" ref="citySelected" class="hover">{{chosedCity.split('?')[0]}}</a><span style="color:#fff;font-size:0.28rem;display:inline-block">]</span>
                        </div>
                    </td>
                    <td width="40%" align="center">
                        <!-- <img src="static/images/1_03.png" alt="安徽继续教育网" width="95"/> -->
                        <img src="static/images/logo12.png" alt="安徽继续教育网" style="width:2.6rem;display:block"/>
                        
                    </td>
                    <td width="30%" align="right">
                        <img src="static/images/sys.png" alt="安徽继续教育网" class="ewm"  @click='showEwm'/>
                    </td>
                </tr>
            </table>

            <!-- 地址选择弹框 -->
            <div class="area_select_box">
                <div class="trangle_box"></div>
                <ul>
                    <li>
                        <p name="34" @click="chooseCity">安徽</p>
                    </li>
                    <li v-for="msg in adressData">
                        <!-- 安徽 -->
                        <p :name="msg.codeid" @click="chooseCity">{{msg.cityname}}</p>
                    </li>

                    <div class="clear"></div>
                </ul>
            </div>
            <div class="pool_box" @click="hideCity"></div>
        </div>
        <!-- 大二维码 -->
        <div class="ewm_pool"  @click='hideEwm'>
            <div class="ewm_box">
                <p>扫一扫加关注</p>
                <img src="static/images/ewm_wx.jpg" alt="安徽继续教育网">
            </div>
        </div>
        
        <div style="height:.9rem;"></div>

        <!-- app下载 -->
        <div class="for_app" v-show="appClose">
            <img src="static/images/1_15.png" alt="安徽继续教育网" class="left"/>
            <img src="static/images/1_21.png" alt="安徽继续教育网" class="app_close right" @click="closeApp"/>
            <img src="static/images/1_18.png" alt="安徽继续教育网" class="app_download right"/>
        </div>
        
        <!-- 主体 -->
        <div class="main">
            <div style="height:0.05rem;background:#eee"></div>
        	<!-- 导航 -->
            <div class="tab_nav">
                <ul>
                    <li>
                        <router-link to="/chooseClass">
                            <img src="static/images/1_27.png" alt="安徽继续教育网"/>
                            <p>报名选课</p>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/myClass">
                            <img src="static/images/1_29.png" alt="安徽继续教育网"/>
                            <p>学习中心</p>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/shoppingCart">
                            <img src="static/images/1_31.png" alt="安徽继续教育网"/>
                            <p>&nbsp;购物车</p>
                        </router-link>
                    </li>
                    <li>
                        <router-link to="/zscy">
                            <img src="static/images/1_33.png" alt="安徽继续教育网"/>
                            <p>证书查验</p>
                        </router-link>
                    </li>
                </ul>
            </div>

    		<!-- 帮助 -->
        	<div class="help" >
                <div class="help_box">
                    <img src="static/images/1_39.png" alt="安徽继续教育网" style="opacity:0"/>
                    <a href="tel:4000551736" class="tel"></a>
                    <router-link to='/helpCenter' class="help_center"></router-link>
                </div>
                <div class="clear"></div>
            </div>

            <!-- 课程 -->
            <div class="type_box">
                <!--公需-->
                <div class="type_list" v-show="typeData1.list != null">
                    <div class="k_top gxk_top">
                        <table>
                            <tr>
                                <td width="20%"></td>
                                <td width="60%" align="center">
                                    <span class="k_title k_gx">继续教育公需课</span>
                                    <div class="clear"></div>
                                </td>
                                <td width="20%"></td>
                            </tr>
                        </table>

                    </div>
                    <div class="k_detail">
                        <ul>
                            <li v-for="msg in typeData1.list"><router-link :to="{path:'/chooseClass',query:{'codeNo':msg.codeNo}}">{{msg.codeName}}</router-link></li>
                        </ul>
                    </div>
                </div>

                <!--专业课-->
                <div class="type_list" v-show="typeData2 != null">
                    <div class="k_top">
                        <table>
                            <tr>
                                <td width="20%"></td>
                                <td width="60%" align="center">
                                    <span class="k_title k_zy">继续教育专业课</span>
                                </td>
                                <td width="20%">
                                    <router-link to="/chooseClass" style="display:inline-block"><span style="color:#75B9D5">更多>></span></router-link>
                                </td>
                            </tr>
                        </table>
                    </div>
                    <div class="k_detail">
                        <ul>
                            <li v-for="msg in typeData2.list"><router-link :to="{path:'/chooseClass',query:{'codeNo':msg.codeNo}}">{{msg.codeName}}</router-link></li>
                        </ul>
                    </div>
                </div>

                <!--转岗培训-->
                <div class="type_list" v-show="typeData3 != null">
                    <div class="k_top">
                        <table>
                            <tr>
                                <td width="20%"></td>
                                <td width="60%" align="center">
                                    <span class="k_title k_zg">转岗培训</span>
                                </td>
                                <td width="20%"><router-link to="/chooseClass"><span style="color:#75B9D5">更多>></span></router-link></td>
                            </tr>
                        </table>
                    </div>
                    <div class="k_detail">
                        <ul>
                            <li v-for="msg in typeData3.list"><router-link :to="{path:'/chooseClass',query:{'codeNo':msg.codeNo}}" style="display:inline-block">{{msg.codeName}}</router-link></li>
                        </ul>
                    </div>
                </div>
            </div>

    		<!-- 轮播广告 -->
    		<div class="advertise">
                <mt-swipe :auto="4000" style="height:2.1rem">
                    
                    <mt-swipe-item class="slide1">
                        <router-link :to="{path:'/carouselFigureDetail',query:{'picId':imagesData1.id}}"> 
                            <img :src="imagesData1.picUrl" alt="安徽继续教育网"/>
                        </router-link> 
                    </mt-swipe-item>
                    <mt-swipe-item class="slide2">
                        <router-link :to="{path:'/carouselFigureDetail',query:{'picId':imagesData2.id}}">
                            <img :src="imagesData2.picUrl" alt="安徽继续教育网"/>
                        </router-link>
                    </mt-swipe-item>
                    <mt-swipe-item class="slide3">
                        <router-link :to="{path:'/carouselFigureDetail',query:{'picId':imagesData3.id}}">
                            <img :src="imagesData3.picUrl" alt="安徽继续教育网"/>
                        </router-link>
                    </mt-swipe-item>
                </mt-swipe>
                <div class="clear"></div>
            </div>

            <!--通知公告-->
            <div class="tzgg">
                <div class="new_top">
                    <div class="left">
                        <span class="news_title">通知公告</span>
                    </div>
                    <router-link :to="{path:'/notify',query:{'codeNo':'150104'}}" class="new_more right">更多>></router-link>
                </div>

                <div class="new_main">
                    <ul>
                        <li v-for="msg in newsData.list">
                            <router-link :to="{path:'/notifyDetail',query:{'codeNo':'150104','name':msg.name}}" class='left' style="width:100% ">
                                <table>
                                    <tr>
                                        <td width="3%"><img src="static/images/222_03.png" width="7" alt="安徽继续教育网"/></td>
                                        <td width="97%"><p class="news_titles">{{msg.title}}</p></td>
                                    </tr>
                                </table>
                                <div class="clear"></div>
                            </router-link>
                            <div class="clear"></div>
                        </li>
                    </ul>
                </div>
            </div>

            <!--行业资讯-->
            <div class="xwzx">
                <div class="new_top">
                    <div class="left">
                        <span class="news_title">行业资讯</span>
                    </div>
                    <router-link :to="{path:'/notify',query:{'codeNo':'150101'}}" class="new_more right">更多>></router-link>
                </div>

                <div class="new_main">
                    <ul>
                        <li v-for="msg in newsData2.list">
                            <router-link :to="{path:'/notifyDetail',query:{'codeNo':'150101','name':msg.name}}">
                                <table width="100%">
                                    <tr>
                                        <td width="3%"><img src="static/images/222_03.png" alt="安徽继续教育网" width="7"/></td>
                                        <td width="97%"><p class="news_titles">{{msg.title}}</p></td>
                                    </tr>
                                </table>
                                <div class="clear"></div>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <!-- 返回顶部 -->
        <div class="back_to_top" @click='backToTop'>
            <img src="static/images/backtotop.png" alt="安徽继续教育网">
        </div>
    
        <!-- 底部 -->
        <div class="footer">
            <div class="footer1">
                <ul>
                    <li><router-link to="/login">登录</router-link></li>
                    <li class="line3"></li>
                    <li><router-link to="/register">注册</router-link></li>
                    <li class="line3"></li>
                    <li><a href="http://www.gc80.cn/web/info/toInfoMessage.html?nav=1">公司简介</a></li>
                </ul>
            </div>

            <!-- <div class="footer2">
                <ul>
                    <li>
                        <a href="#">
                            <img src="static/images/1_63.png" alt="安徽继续教育网"/>
                            <p>客户端</p>
                        </a>
                    </li>
                    <li>
                        <a>
                            <img src="static/images/1_65.png" alt="安徽继续教育网"/>
                            <p>触屏版</p>
                        </a>
                    </li>
                    <li>
                        <a href="https://www.ahsjxjy.com">
                            <img src="static/images/1_67.png" alt="安徽继续教育网"/>
                            <p>电脑版</p>
                        </a>
                    </li>
                </ul>
            </div> -->
            <footCommon></footCommon>
        </div>
    	
        <!-- 底部导航 -->
    	<navBottom></navBottom>
    </div>
</template>
<script>
	import navBottom from '@/components/common/navBottom'
	import footCommon from '@/components/common/footer'
    import axios from "axios";
    import config from "@/api/base.js"; 
	export default {
		data(){
			return{
                headTitle:"首页",
                dataMsg:{},
				appClose:false,                //是否显示app下载
                adressData:{},                 //选择城市数据
                getOnce:true,                  //是否第一次调用
                chosedCity:"安徽?34",           //选择的区域
                typeData1:{},                  //公需
                typeData2:{},                  //专业
                typeData3:{},                  //转岗
                newsData:{},                   //通知公告
                newsData2:{},                  //行业资讯
                imagesData:{},                 //轮播图
                imagesData1:{},                //轮播图
                imagesData2:{},                //轮播图
                imagesData3:{},                //轮播图
                pageSize:'3',                  //新闻一次取得条数
                num:'3',                       //一次获取轮播图
			}
		},
        created(){
            this.setNavBottom();
            this.getData1();
        },
		components:{
			navBottom,
			footCommon
		},
        mounted(){
            this.getBroeserCityMsg();
            this.showBackToTop();
        },
        updated(){
            this.setCss();
        },
		methods:{
            // 图片幻灯片
            getImages(){
                var _this=this;
                var params={'num':_this.num};
                axios.post('/info/tofindPicture.html',params,config)
                .then(function(res){
                    _this.imagesData=res.data.list;
                    _this.imagesData1=_this.imagesData[0];
                    _this.imagesData2=_this.imagesData[1];
                    _this.imagesData3=_this.imagesData[2];
                    if(res.data.result=='1'){
                        _this.getNews();
                        _this.getNews2();
                    };
                });
            },
            // 公需
            getData1(){
                var _this=this;
                var params={'parent':'0701'};
                axios.post('/class/toCode.html',params,config)
                .then(function(res){
                    _this.typeData1=res.data;
                    if(res.data.result == '0'){
                        _this.typeData1.list=null;
                    }else if(res.data.result == '1'){
                        _this.typeData1.list=_this.typeData1.list.slice(0,9);
                        _this.getData2();
                    }
                });
            },
            // 专业
            getData2(){
                var _this=this;
                // 公需
                var params={'parent':'0702'};
                axios.post('/class/toCode.html',params,config)
                .then(function(res){
                    _this.typeData2=res.data;
                    if(res.data.result == '0'){
                        _this.typeData2.list=null;
                    }else if(res.data.result == '1'){
                        _this.typeData2.list=_this.typeData2.list.slice(0,9);
                        _this.getData3();
                    }
                });
            },
            // 转岗
            getData3(){
                var _this=this;
                // 公需
                var params={'parent':'0703'};
                axios.post('/class/toCode.html',params,config)
                .then(function(res){
                    _this.typeData3=res.data;
                    if(res.data.result == '0'){
                        _this.typeData3.list=null;
                    }else if(res.data.result == '1'){
                        _this.typeData3.list=_this.typeData3.list.slice(0,9);
                        _this.getImages();
                    };
                });
            },
            // 通知公告
            getNews(){
                var _this=this;
                var params={'codeNo':"150104",'pageSize':_this.pageSize};
                axios.post('/info/toInfoMessage.html',params,config)
                .then(function(res){
                    _this.newsData=res.data;
                });
            },
            // 行业资讯
            getNews2(){
                var _this=this;
                var params={'codeNo':"150101",'pageSize':_this.pageSize};
                axios.post('/info/toInfoMessage.html',params,config)
                .then(function(res){
                    _this.newsData2=res.data;
                });
            },
            // 返回顶部
            showBackToTop(){
                window.addEventListener('scroll',function(){
                    if(document.body.scrollTop>100){
                        $(".back_to_top").fadeIn();
                    }else{
                        $(".back_to_top").fadeOut();
                    }
                });
            },
            backToTop(){
                $('body,html').animate({scrollTop: 0});
            },
            // css设置
            setCss(){
                $('.k_detail ul li:nth-child(3n)').css('borderRight','0');
                // 获取屏幕宽度
                var wid=$(".new_main").width();
                wid=Math.floor(wid*0.97)-10;
                $('.news_titles').width(wid);
            },
            // 显示二维码
            showEwm(){
                $('.ewm_pool').fadeIn();
                $("html,body").css({"height":"100%","overflow":"hidden"});
            },
            // 隐藏二维码
            hideEwm(){
                $('.ewm_pool').fadeOut();
                $("html,body").css({"height":"auto","overflow":"visible"});
            },
			// 关闭app下载
			closeApp(){
				this.appClose=false;
			},
            // 设置底部导航按钮状态
            setNavBottom(){
                this.$store.commit('setNavOnBottomStatus',['1','0','0','0','0']);
            },
            // 浏览器是否有存储的选择的地区信息
            getBroeserCityMsg(){
                var a=sessionStorage.getItem('jxjySetChooseCity');
                if(a!="" && a!=null && a!=undefined){
                    this.chosedCity=a;
                }
            },
            // 显示城市下拉框
            showCity(){
                // 有hover影藏。无hover出现
                var a=this.$refs.citySelected.className;
                if(a == 'hover'){
                    // 如果是第一次调用，请求地区接口数据
                    if(this.getOnce){
                        var _this=this;
                        _this.getOnce=false;

                        var params={'parent':'34'};
                        axios.post('/user/toArea.html',params,config)
                        .then(function(res){
                            _this.adressData=res.data.list;
                        });
                    };
                    // 显示下拉框和背景
                    $(".pool_box").fadeIn();
                    $(".area_select_box").slideDown();
                    $("html,body").css({"height":"100%","overflow":"hidden"});

                    this.$refs.citySelected.className="";
                }else{
                    this.hideCity();
                    this.$refs.citySelected.className="hover";
                }
                
            },
            // 隐藏城市下拉框
            hideCity(){
                $(".pool_box").fadeOut();
                $(".area_select_box").slideUp();

                $("html,body").css({"height":"auto","overflow":"visible"});
            },
            // 选择城市
            chooseCity(e){
                var a=e.target || e.srcElement;
                var b=a.innerHTML;
                var c=$(a).attr('name');
                // 将选中的城市的编号存在name和sessionStorsge中
                this.$refs.citySelected.innerHTML=b;
                this.$refs.citySelected.name=c;
                // 切换城市时将数据存入store和sessionStorage
                this.$store.commit('setChooseCity',c);
                sessionStorage.setItem('jxjySetChooseCity',b+'?'+c);
                // 隐藏选择下拉框
                this.hideCity();
            }
		}
	}
</script>
<style scoped>
    .back_to_top{position: fixed;right:10px;bottom:75px;width:0.8rem;height:0.8rem;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;background:#fff;z-index: 50;display:none;}
    .back_to_top img{width:0.8rem;}

    .header{width:100%;height:.9rem;border-bottom:1px solid #BBD5E1;position: fixed;top:0;left:0;right:0;background:url(/static/img/bj-25.e20d83a.jpg);z-index: 100;background-size:100% .9rem;-webkit-background-size:100% .9rem;-moz-background-size:100% .9rem;-o-background-size:100% .9rem;}
    .header .loaction{margin-left:10px;}
    .header .loaction a{font-size: 0.28rem;color: #fff;}
    .header table{border-collapse: collapse;height:.9rem;}
    .header table td{vertical-align: middle;}
    .header .ewm{ margin-left:4%;height:.35rem;margin-right: 10px;display:block;}
    .header .top_img{text-align: center;width:40%}
    .area_select_box{position:absolute;top:1.1rem;left:0;width:100%;z-index:999;padding:0 5px;display: none;}
    .area_select_box ul{width:100%;background:#fff;padding:5px 0;}
    .area_select_box ul li{float:left;width:25%;padding:10px 0;}
    .area_select_box ul li p{border:1px solid #ddd;width:90%;margin:0 auto;padding:5px 0;border-radius: 5px;text-align: center;font-size: 0.28rem}
    .trangle_box{width:0;height:0;border-bottom:10px solid #fff !important;border:10px solid transparent;position:absolute;top:-19px;left:15px;z-index:998}
    .pool_box{position:fixed;top:.8rem;left:0;right:0;bottom:0;background:#000;opacity:.7;display: none;}
    .ewm_pool{position: fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.7);z-index: 1000;display:none;}
    .ewm_box{width:250px;height:270px;background:#fff;position: absolute;top:50%;left:50%;margin-top:-125px;margin-left: -125px;text-align: center;}
    .ewm_box p{font-size: 0.4rem;margin-top: 10px}
    .ewm_box img{width:230px;}

	.for_app{width:100%;padding:1% 6% 1% 12%;background:#EDECEA;overflow: hidden;}
   	.for_app .app_download{margin-right:13%}
    .for_app .app_close{margin-top:4px;}
    
    .main{padding-bottom: 5px;}
    .main .tab_nav{padding:0.2rem 5px;border-bottom:1px solid #F0F0F0;background:#fff;}
    .main .tab_nav ul{width:100%;overflow: hidden}
    .main .tab_nav ul li{float:left;width:25%;text-align: center}
    .main .tab_nav ul li img{width:1rem;}
    .main .tab_nav ul li p{font-size: 0.28rem}

    .help{text-align: center;padding:12px 0;border-bottom:1px solid #F0F0F0;background:#fff;}
    .help_box{background:url(../../static/images/1_39.png) no-repeat;background-size: 100%;position: relative;width:6rem;margin:0 auto;}
    .help img{width:100%;}
    .tel{position: absolute;top:0;left:0;right:48%;bottom:0;}
    .help_center{position: absolute;top:0;left:52%;right:0;bottom:0;}

    .type_list{background:#fff;}
    .type_list table{width:100%;}
    .type_box{margin-top: 5px;}
    .k_top{padding:8px 0;overflow: hidden;width:100%;position: relative;height:0.8rem;border-bottom:1px solid #EBEBEC;padding-top: 10px;}
    .k_top .k_list{text-align: center;width:100%;z-index: 10;overflow: hidden}
    .k_title{font-size: 0.36rem;color:#000;padding:0.02rem 0 0 0.64rem;;background-size: 0.45rem !important;display: inline-block;}
    .k_gx{background:url(../../static/images/1_42.png) no-repeat 0 center;}
    .k_zy{background:url(../../static/images/1_45.png) no-repeat 0 center;}
    .k_zg{background:url(../../static/images/1_48.png) no-repeat 0 center;}
    .k_top tr td:last-child{text-align: right;padding-right:5px;vertical-align: bottom}

    .k_top .gx_list{background:#fff;top:0px;}
    .k_detail{width:100%}
    .k_detail ul{width:100%;overflow: hidden}
    .k_detail ul li{width:33.3%;text-align: center;height:0.7rem;line-height:0.7rem;float:left}
    .k_detail ul li{border-right:1px solid #F1F1F1;border-bottom:1px solid #F1F1F1}

    .tzgg{margin-top:5px;padding:10px 5px 5px 5px;width:100%;background:#fff;}
    .xwzx{padding-top:19px;padding:20px 5px 5px 5px;width:100%;background:#fff;}
    .news_title{font-size: 0.36rem;background:url(../../static/images/1_55.png) no-repeat 0 center;padding-left:0.5rem;background-size:0.35rem !important;}
    .new_top{overflow: hidden}
    .new_top .new_more{color:#57ABD0}
    .new_main{margin-top:8px;}
    .new_main ul li{width:100%;padding:10px 0;border-bottom:1px solid #E2E2E2;}
    .new_main ul li:last-child{border-bottom:1px solid #fff;}
    .new_main ul li span{margin-left:3px;}
    .new_main ul li span:active{color:#284D99}
    .new_main ul li table{width:100% !important;border-collapse: collapse;}
    .new_main ul li table td p{text-overflow: ellipsis;white-space: nowrap;overflow:hidden;width:280px;font-size: 0.30rem}
    .new_main ul li table td{vertical-align: middle}

    .advertise{width:100%;text-align: center;padding:5px 10px;margin-top:5px;background:#fff;}
    .advertise img{width:100%}
    
    .footer{width:100%;background:#fff;}
    .footer1{padding:15px 0;width:100%;border-bottom:1px solid #D0D0D0;text-align: center;overflow: hidden}
    .footer1 ul{overflow: hidden;display: inline-block}
    .footer1 ul li{float: left;position: relative;height:.4rem;}
    .footer1 ul li.line3{border-left:1px solid #A4A39F;height:0.25rem;margin:0.03rem 17px 0 17px;}

    .footer2{text-align:center;margin-top:0.3rem;padding-bottom:15px;border-bottom:1px solid #A4A39F;width:100%;}
    .footer2 ul{overflow: hidden;margin:0 auto;width:80%;}
    .footer2 ul li{float: left;width:33%;text-align: center}
    .footer2 ul li img{width:45%;}
    .footer3{margin-bottom:60px !important;}
</style>