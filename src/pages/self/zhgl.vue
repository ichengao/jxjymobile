<template>
	<div v-title data-title="个人中心" class="main_box">
		<!-- 头部 -->
		<heade :titlehead="headTitle"></heade>

	    <!-- 主体 -->
	    <div class="main">

	        <!-- 时间 -->
	        <div class="time">
	            <span>时间</span>&nbsp;
				<!-- 开始日期选择 -->
				<input type="text" readonly placeholder="开始时间" @click="open('picker3')" v-model="start_time" unselectable="on" onfocus="this.blur()">
				<mt-datetime-picker ref="picker3" type="date" v-model="value3" @confirm="handleChange1">
				</mt-datetime-picker>&nbsp;<span>至</span>&nbsp;

	            <!-- 结束日期选择 -->
	            <input type="text" v-model="end_time" readonly placeholder="结束时间" @click="open('picker2')" unselectable="on" onfocus="this.blur()">
	            <mt-datetime-picker ref="picker2" type="date" v-model="value2" @confirm="handleChange2">
				</mt-datetime-picker>
	            <a class="btn_search" @click="dateSearch">搜索</a>
	        </div>

	        <!-- 积分详细信息 -->
	        <div class="jf_detail">
	            <div class="jf_list" v-for="msg in dataMsg.list">
	                <div class="jf_listL left">
	                    <div class="list1">
	                        <span class="jf_type">{{msg.describe}}</span>
	                        <span class="right" v-show="msg.type=='01'">+￥{{msg.depositAmount}}</span>
	                        <span class="right" v-show="msg.type=='02'">-￥{{msg.depositAmount}}</span>
	                    </div>
	                    <p class="list2">
	                        <span>当前余额：￥{{msg.balance}}</span>
	                        <span class="right">{{msg.depositTime.split(' ')[0]}}</span>
	                       <!--  {{msg.depositTime.split(' ')[0]}} -->
	                    </p>
	                    <div class="list_box" style="display:none">
	                        <p v-show="msg.depositType == '01'">类型：在线充值</p>
	                        <p v-show="msg.depositType == '02'">类型：学习卡充值</p>
	                        <p v-show="msg.depositType == '03'">类型：现金充值（个人）</p>
	                        <p v-show="msg.depositType == '04'">类型：银行汇款</p>
	                        <p v-show="msg.depositType == '05'">类型：邮局汇款</p>
	                        <p v-show="msg.depositType == '06'">类型：现金充值（公司）</p>
	                        <p v-show="msg.depositType == '07'">类型：退课充值</p>
	                        <p v-show="msg.depositType == '08'">类型：班级购买</p>
	                        <p v-show="msg.depositType == '09'">类型：运费</p>
	                        <p v-show="msg.depositType == '10'">类型：人工处理</p>
	                        
							<p v-show="msg.equipment =='01' ">终端：WEB网站</p>
	                        <p v-show="msg.equipment =='02' ">终端：手机网站</p>
	                        <p v-show="msg.equipment =='03' ">终端：APP</p>

	                        <p>访问IP：{{msg.ip}}</p>
	                        <p>账号：{{msg.sysUser.userName}}</p>
	                    </div>
	                </div>
	                <div class="jf_listR left" @click="moreToggle">
	                    <img src="static/images/icon-02.png" alt="安徽继续教育网" class="change_img current">
	                    <img src="static/images/top.png" alt="安徽继续教育网" class="change_img">
	                </div>
	                <div class="clear"></div>
	            </div>

				<!-- 点击加载更多 -->
	            <div class="loadMore" v-show="sw && haveData">上拉加载更多</div>
	            <!-- <div class="loadMore" v-show="!sw && haveData">数据已加载完！</div> -->
	            <div class="loadMore" v-show="!haveData">暂无数据！</div>

	        </div>
	    </div>
	</div>
</template>
<script>
	import heade from '@/components/common/header'
	import { Toast,MessageBox } from 'mint-ui';
	import axios from "axios"
	import config from "@/api/base.js";
  	export default {
    	data() {
      		return {
        		value2: null,
        		visible2: false,
        		value3: null,
        		visible3: false,
        		end_time:'',
        		start_time:'',
        		dataMsg:[],               //axios获取的数据集合
        		headTitle:"我的账户",
        		pages:'1',                //加载次数
        		pageSize:10,              //每次加载的数量
        		allNum:true,              //是否取得全部数据
        		sw:false,                 //设置一个开关来避免重复请求数据
        		haveData:true,            //是否有数据
        		beforeLeave:true,         //滚动加载数据开关
      		};
    	},
    	created(){
    		this.setHeaderBackBtn();
    		this.getData();
    	},
    	mounted(){
    		// 缓存指针  
            var _this = this;   
    		// 注册scroll事件并监听  
            window.addEventListener('scroll',function(){  
                // console.log(document.documentElement.clientHeight+'-----------'+window.innerHeight); // 可视区域高度  
                // 判断是否滚动到底部  
                if(document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) { 
                    // 如果开关打开则加载数据  
                    if(_this.sw==true && _this.beforeLeave){  
                        // 将开关关闭  
                        _this.sw = false;  
                        _this.loadMore();
                    }  
                }  
            }); 
    	},
    	components:{
    		heade
    	},
    	methods: {
    		getData(){
    			// 页面数据
	    		// pages为空或者没有就是第一页，pageSize为空或者没有就是一页10条数据
	    		var _this=this;
	    		var params={"pages":_this.pages,"staTime":"","endTime":"","pageSize":""};
	    		axios.post('/user/toMyAccount.do',params,config)
	    		.then(function(res){
	    			_this.dataMsg=res.data;

	    			// 页码加一
	    			_this.pages++;
	    			_this.sw = (res.data.page < res.data.pagenum) ?  true:false;
	    			_this.haveData=(res.data.list.length==0)?false:true;
	    		});
    		},
    		// 设置是否显示头部返回按钮
            setHeaderBackBtn(){
                this.$store.commit('showHeaderBack',true);
            },
      		open(picker) {
        		this.$refs[picker].open();
      		},
	      	handleChange1(value){      //开始时间
	      		var monthToNumber={
	      			"Jan":"01","Feb":"02","Mar":"03","Apr":"04",
	      			"May":"05","Jun":"06","Jul":"07","Aug":"08",
	      			"Sep":"09","Oct":"10","Nov":"11","Dec":"12"
	      		};
	      		var mon=value.toString().slice(4,7);   //月份
	      		var dateSelect=value.toString().slice(11,15)+"-"+monthToNumber[mon]+"-"+value.toString().slice(8,10);            //日期拼接
	      		this.start_time=dateSelect;
	      	},
	      	handleChange2(value) {		//结束时间
	      		var monthToNumber={
	      			"Jan":"01","Feb":"02","Mar":"03","Apr":"04",
	      			"May":"05","Jun":"06","Jul":"07","Aug":"08",
	      			"Sep":"09","Oct":"10","Nov":"11","Dec":"12"
	      		};
	      		var mon=value.toString().slice(4,7);   //月份
	      		var dateSelect=value.toString().slice(11,15)+"-"+monthToNumber[mon]+"-"+value.toString().slice(8,10);            //日期拼接
	      		this.end_time=dateSelect;
	      	},
	      	moreToggle(e){
	      		// 积分详情显示隐藏
			   	$(e.target || e.srcElement).parent().children().toggleClass('current').parent().siblings(".jf_listL").children(".list_box").slideToggle();		
	      	},
	      	//日期查询
	      	dateSearch(){				
	      		var start=this.start_time;
	      		var end=this.end_time;

	      		var a=start.slice(0,4)+start.slice(5,7)+start.slice(8,10);
	      		var b=end.slice(0,4)+end.slice(5,7)+end.slice(8,10);

	      		if(start == '' || end ==''){
	      			this.openAlert("请选择查询范围");
	      		}else if(a>b){
	      			this.openAlert("请选择正确的日期查询范围");
	      		}else{
	      			var _this=this;
	      			//查询页码置零
	      			_this.pages="0";
		    		var params={"pages":_this.pages,"staTime":start,"endTime":end,"pageSize":""};
		    		axios.post('/user/toMyAccount.do',params,config)
		    		.then(function(res){
		    			_this.dataMsg=res.data;

		    			// 页码加一
		    			_this.pages++;
		    			_this.sw = (res.data.page < res.data.pagenum) ?  true:false;
		    			_this.haveData=(res.data.list.length==0)?false:true;
		    		});
	      		}
	      	},
	      	// 弹框提示
			openAlert(a) {                           
        		MessageBox.alert(a,'提示');
      		},
	      	//加载更多内容
	      	loadMore(){                   
	      		var _this=this;

    			// 插入查询日期，若是没有，默认查询今年全部
    			var start=this.start_time;
	      		var end=this.end_time;
	      		if(start == '' || end == ''){
	      			start=end='';
	      		};

	    		var params={"pages":_this.pages,"staTime":start,"endTime":end,"pageSize":""};
	    		axios.post('/user/toMyAccount.do',params,config)
	    		.then(function(res){
	    			var a=res.data.list;
	    			for(var key in a){
	    				_this.dataMsg.list.push(a[key]);
	    			}

	    			_this.pages++;
	    			_this.sw = (res.data.page < res.data.pagenum) ?  true:false;
	    		});
	      	}
    	},
    	beforeDestroy(){ 
      		this.beforeLeave=false;
    	}
	};
</script>
<style scoped>
	.main_box{background:#fff;}

    .main{margin:.9rem auto 100px auto;padding:5px 5px 0 5px;}
    .jf_num{font-size: 1.1em;padding: 10px 0;border-bottom: 1px solid #F0EFEF}
    .time a span{color:#BD5959;margin-left: 3px;}
    .time{padding:10px 0;border-bottom: 1px solid #F0EFEF;color:#8F9191;font-size: 1.1em}
    .time input{width:110px;border:0;background:#EFEFEF;color:#474747;margin-bottom: 10px;padding-left: 5px;height:0.5rem;}
    @media screen and (min-width:480px){.time input{width:150px!important}}
    .time>span{color:#8F9191;}
    .btn_search{float:left;width:100%;height:0.53rem;background:#49A4CB;color:#fff;line-height:0.53rem;text-align: center;margin-bottom: 10px;border-radius: 5px;-moz-border-radius: 5px;-webkit-border-radius: 5px;-o-border-radius: 5px;}

    .time_warn{color:#BD5959;font-size: 0.9em}
    .jf_detail{margin-bottom: 50px;}
    .jf_list{padding-top: 10px;border-bottom: 1px dashed #E1DFDF}
    .jf_listL{width:90%;}
    .jf_listR{width:10%;text-align: center;padding-top: 15px;padding-left: 0.2rem;padding-bottom: 10px;height: 100%}
    .jf_type{font-size: 1.1em}
    .list1{margin-bottom: 5px}
    .list1 span{color:#737575;}
    .list_box,.list2{margin-bottom: 12px;}
    .list_box p{color:#737575;}
    .change_img{display:none;width: 0.35rem;}
    .current.change_img{display:block;}

    .loadMore{text-align: center;margin-top:30px;}
</style>