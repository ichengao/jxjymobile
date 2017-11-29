<template>
	<div v-title data-title="个人中心" class="main_box">
		<!-- 头部 -->
		<div class="header">
			<div class="img_box">
				<img :src="msg.userphoto" alt="安徽继续教育网" class="img_u" style="width:0.9rem;height:1.25rem;"  v-show="touImg">
				<img src="static/images/def-userimg.jpg" alt="安徽继续教育网" class="img_u" style="width:0.9rem;height:1.25rem;" v-show="!touImg">
				
	            <p class="u_msg">
		            <span class="uname">{{msg.realname}}</span>
		            <span class="u_level">{{msg.levelName}}</span>
	            </p>
			</div>

			<!-- 签到 -->
			<router-link to='/checkIn' class='sign_in_logo'>
				<!-- <span>签到</span><img src="static/images/signin.png" alt="安徽继续教育网"> -->
				<img src="static/images/qian.png" alt="安徽继续教育网">
			</router-link>
		</div>

		<div class="main">
			<div class="tab1">
				<ul>
					<router-link to="/myClass">
						<li>
							<img src="static/images/18.png" alt="安徽继续教育网">
							<p>我的培训班</p>
						</li>
					</router-link>
					<router-link to='/wdzs'>
						<li>
							<img src="static/images/19.png" alt="安徽继续教育网">
							<p>我的证书</p>
						</li>
					</router-link>
					<router-link to="/orderList">
						<li>
						    <img src="static/images/20.png" alt="安徽继续教育网">
						    <p>我的订单</p>
						</li>
					</router-link>
					<router-link to='/checkIn'>
						<li>
						    <img src="static/images/21.png" alt="安徽继续教育网">
						    <p>赚取积分</p>
						</li>
					</router-link>
				</ul>
				<div class="bg_warn"><p style='font-size:0.36rem;line-height:350%'>即将上线</p></div>
			</div>

			<div class="tab2">
				<ul>
					<router-link to="zhgl">
						<li>
							<img src="static/images/22.png" alt="安徽继续教育网" class="img_logo left">
							<span class="left tab2_list">账户余额</span>
		                    
							<span class="right tab2_list" style="color:#C7C6C6">￥{{msg.balance}}</span>
						</li>
					</router-link>
					<router-link to="/memberData">
						<li>
						    <img src="static/images/23.png" alt="安徽继续教育网" class="img_logo left">
						    <span class="left tab2_list">个人资料</span>
						</li>
					</router-link>
					<router-link to="/jsdz">
						<li>
						    <img src="static/images/24.png" alt="安徽继续教育网" class="img_logo left">
						    <span class="left tab2_list">寄送地址</span>
						</li>
					</router-link>
					<router-link to="wdjf">
						<li>
							<img src="static/images/25.png" alt="安徽继续教育网" class="img_logo left">
						    <span class="left tab2_list">我的积分</span>
						    <span class="right tab2_list" style="color:#C7C6C6">{{msg.surplusIntegral}}</span>
						</li>
					</router-link>
					<router-link to="invoiceList">
						<li>
							<img src="static/images/26.png" alt="安徽继续教育网" class="img_logo left">
							<span class="left tab2_list">我的发票</span>
							
						</li>
					</router-link>
				</ul>
			</div>

			<div class="quit" @click="quit">退出当前账号</div>
		</div>
		
		<!-- 底部 -->
		<footsection></footsection>

		<!-- 底部导航 -->
		<navBottom></navBottom>
	</div>
</template>

<script>
	import footsection from "@/components/common/footer"
	import navBottom from "@/components/common/navBottom"
	import axios from "axios"
	import config from "@/api/base.js"
	export default {
		data(){
			return{
				msg:{},
				touImg:true
			}
		},
		created(){
			this.setHeaderBackBtn();
			this.setNavBottom();
			this.getData();
		},
		components:{
			footsection,
			navBottom
		},
		methods:{
			getData(){
				var _this=this;
				axios.post('/user/toPersonalCenter.do',{},config).then(function(res){
					var data=res.data;
					if(data.result == "1"){
						_this.msg=data;
						if(_this.msg.userphoto =="" || _this.msg.userphoto == undefined || _this.msg.userphoto == null){
							_this.touImg=false
						}else{
							_this.touImg=true
						};
						
						// 设置区域
						var jxjyCity=sessionStorage.getItem('jxjySetChooseCity');
						if(data.area != null && data.area != undefined && data.area!="" && !jxjyCity){
							sessionStorage.setItem('jxjySetChooseCity',data.city+"?"+data.area.slice(0,4));
						}

					}
				});
			},
			// 设置底部导航按钮状态
			setNavBottom(){
				this.$store.commit('setNavOnBottomStatus',['0','0','0','0','1']);
			},
			// 设置是否显示头部返回按钮
            setHeaderBackBtn(){
                this.$store.commit('showHeaderBack',true);
            },
			// 退出当前账号，清除token，并跳转到登录页
			quit(){
				localStorage.removeItem("jxjy_token");
				localStorage.removeItem("jxjy_name");
				localStorage.removeItem("jxjy_pwd");
				this.$router.push('/login');
			}
		}
	}
</script>
<style scoped>
	.main_box{background:#fff;}
	.sign_in_logo{position: absolute;top:-0.1rem;right:0.4rem;width:0.6rem;}
	.sign_in_logo img{width:0.8rem;float:right;}
	.sign_in_logo span{padding:0.01rem 0.05rem;font-size:0.28rem;border: 2px solid #DC704E;border-radius: 5px;float:right;margin-left: 0.05rem}
    .header{width:100%;height:2.6rem;background:url(../../../static/images/bj-45.png) no-repeat;background-size: 100% 2.6rem;-webkit-background-size: 100% 2.6rem;-moz-background-size: 100% 2.6rem;-o-background-size: 100% 2.6rem;position: relative;overflow: hidden;}
    .back{position: absolute;left:3%;top:7%;}
    .back img{width:11px;}
    .uname{font-size: 0.28rem;}
    .img_box{width:300px;margin:0 auto;padding-top:0.58rem;text-align: center;}
    .img_u{border-radius:10%;-webkit-border-radius:10%;-o-border-radius:10%;-moz-border-radius:10%;}
    .u_msg{margin-top:0.16rem;padding-left:10px;font-size: 0.28rem;}
    .u_level{font-size: 0.24rem;padding:0.02rem 0.08rem;display:inline-block;background:#F0C41D;color:#fff;border-radius:3px;-webkit-border-radius:3px;-o-border-radius:3px;-moz-border-radius:3px;vertical-align: middle}
    
    .tab1 ul{overflow: hidden;margin-top:10px;margin-bottom:10px;}
    .tab1 ul li{width:25%;text-align: center;float: left}
    .tab1 ul li img{width:34px;}
    .tab2{padding:0 5px;margin:0 auto;}
    .tab2 ul li{padding:0.3rem 0.5rem 0.3rem 0.3rem;border-bottom: 1px solid #E8E8E8;overflow: hidden;display:table;width:100%;vertical-align: middle;background:url(../../../static/images/dianjiann.png) no-repeat right 0.05rem top 0.34rem;background-size:0.2rem 0.25rem;-webkit-background-size:0.2rem 0.25rem;-moz-background-size:0.2rem 0.25rem;-o-background-size:0.2rem 0.25rem;}
    .tab2 ul li .img_logo{margin-right:0.1rem;width:0.36rem;height:0.33rem;display: table-cell;vertical-align: middle;position: relative;top: -0.02rem;}
    .tab2_list{height:0.33rem;line-height:0.34rem;display: table-cell;vertical-align: middle}

	/*第一个部分暂未开放，敬请期待*/
	.tab1{position: relative}
	div.bg_warn{position:absolute;top:0;right:5px;bottom:0;background:rgba(0,0,0,.2);text-align: center;left:75%;}
	div.bg_warn p{vertical-align: middle;color:#fff;font-size: 1.3rem;height:100%;line-height: 270%}
	.tab2 ul li{position: relative;}
	.tab2 ul li .bg_img{position:absolute;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.2);text-align: center;}
	.bg_img p{vertical-align: middle;color:#fff;font-size: 1.3rem;height:100%;line-height: 270%}

	.quit{margin:40px 10px;border-radius:5px;-webkit-border-radius:5px;-o-border-radius:5px;-moz-border-radius:5px;text-align: center;padding:10px 0;background:#e4393c;color:#fff;}
</style>