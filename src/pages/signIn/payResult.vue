<template>
	<div v-title data-title="支付结果">
		<!-- 头部 -->
		<div class="header">
			<table width="100%">
				<tr>
					<td width="25%">
						<!-- 返回按钮 -->
				        <div class="back" @click="backPrev">
				            <img src="static/images/fff.png" alt="安徽继续教育网" style="height:0.35rem;display:block">
				        </div>
					</td>
					<td width="50%" align="center">
						<p class="title_head">支付结果</p>
					</td>
					<td width="25%" align="right"></td>
				</tr>
			</table>
	    </div>
	    <!-- 支付成功 -->
	    <div class="pay_box" v-show="isShow">
	    	<div v-show='isPayOk'>
		    	<img src="static/images/payok.png" alt="安徽继续教育网">
		    	<p>支付成功</p>
				<p class="time_warn">{{toOtherPage}}s后自动跳转到个人中心</p>
		    </div>
		    <!-- 支付失败 -->
		    <div v-show='!isPayOk'>
		    	<img src="static/images/payworng.png" alt="安徽继续教育网">
		    	<p>支付失败</p>
		    </div>

		    <!-- 完成按钮 -->
		    <div class="btn_box"  v-show='isPayOk'>
		    	<router-link to="/memberCenter">
		    		<button class="finish">完成</button>
		    	</router-link>
		    </div>
	    </div>
	    
		
	</div>
</template>	
<script>
	import axios from "axios";
	import config from "@/api/base.js"; 
	export default{
		data(){
			return{
				dataMsg:"",
				headTitle:"支付结果",
				out_trade_no:'',          //订单号
				isShow:false,             //是否显示
				isPayOk:true,             //是否支付成功
				toOtherPage:10,           //跳转倒计时
			}
		},
		created(){
			this.dataJudge();
		},
		methods:{
			// 判断是否支付成功
			dataJudge(){
				var is_success=this.$route.query.is_success;
				this.out_trade_no=this.$route.query.out_trade_no;         //订单号
				if(is_success == 'T'){
					this.sendToService();
					this.isShow=true;
				}else{
					this.isShow=false;
				};
			},
			// 对账
			sendToService(){
				var _this=this;
				var params={'orderNo':this.out_trade_no};
				axios.post('/order/toTradeQueryZFB.html',params,config)
				.then(function(res){
					if(res.data.result=='1'){
						_this.isShow=true;
						_this.isPayOk=true;
						_this.autoJudgePage();
					}else{
						_this.isShow=true;
						_this.isPayOk=false;
					}
				});
			},
			// 页面自动跳转
			autoJudgePage(){
				var _this=this;
				var timer=setInterval(function(){
					if( _this.toOtherPage >0 ){
						_this.toOtherPage--;
					}else{
						_this.$router.replace('/memberCenter');
						clearInterval(timer);
						timer=null;
					}
				},1000);
			},
			backPrev(){
				this.$router.push('/memberCenter');
			}
		}
	}
</script>
<style scoped>
	.header{width:100%;height:.9rem;background:url(../../../static/images/bj-25.jpg);position:fixed;top:0;text-align: center;z-index:10000;}
    .header .back,.area_select{padding-left:10px;}
    .header .title_head{line-height:.9rem;color:#fff;font-size: 0.36rem;}

	.success{width:40px;height:40px;background:url(../../../static/images/judge.png) no-repeat -10px -1px;}
	.failed{width:40px;height:40px;background:url(../../../static/images/judge.png) no-repeat -55px -1px;}
	.pay_result{margin-top:50px;}

	.pay_box{margin-top: 100px;text-align: center}
	.pay_box p{margin-top: 20px;font-size: 0.32rem;}
	.pay_box p.time_warn{font-size: 0.28rem;}
	.pay_box img{width:1rem;}
	.finish{margin-top:15px;width:80%;padding:0.15rem 0;background:#3D9DD0;color:#fff;border-radius: 5px;-webkit-border-radius: 5px;-moz-border-radius: 5px;-o-border-radius: 5px;}
</style>