<template>
	<div v-title data-title="订单支付" id="pay_html">
		<!-- 头部 -->
		<div class="header">
			<table width="100%" class="head_table">
				<tr>
					<td width="25%" align='left'>
						<!-- 返回按钮 -->
				        <div class="back left" @click="backPrev">
				            <img src="/static/images/fff.png" alt="安徽继续教育网" style="height:0.35rem;display:block">
				        </div>
					</td>
					<td width="50%" align='center'>
						<!-- 标题 -->
	        			<p class="title_head">订单支付</p>
					</td>
					<td width="25%" align='right'>
						<!-- 右侧首页按钮 -->
						<div class="to_home">
							<router-link to="/">	
								<img src="/static/images/homebg.png" alt="安徽继续教育网">
							</router-link>
						</div>
					</td>
				</tr>
			</table>
	    </div>
		
		<div class='main'>
			<img src="/static/images/wddd_03.png" alt="安徽继续教育网" width="100%" style="vertical-align: top;">

			<!-- 订单信息 -->
			<div class="order_msg">
				<div class="order_code">
					<p>订单编号：<span>{{dataMsg.ordNo}}</span></p>
					<p>订单金额：<span>￥{{dataMsg.ordTotalMoney}}</span></p>
				</div>

				<div class="tab_box">
					<table v-for="msg in dataMsg.list">
						<tr>
							<td rowspan='2' class="img_box">
								<img :src="msg.classImage" alt="安徽继续教育网" v-show="msg.classImage != null">
								<img src="/static/images/noimg.png" alt="安徽继续教育网" v-show="msg.classImage == null">
							</td>
							<td border='0'><h4>{{msg.className}}</h4></td>
						</tr>
						<tr>
							<td>
								<p><!-- 专业分类: -->{{msg.codeNameParent}}({{msg.codeName}})</p>
								<p><span>地区:{{msg.cityName}}</span><span class="right class_price">￥{{msg.price}}</span></p>
								<p>学时:{{msg.credit}}学时</p>
							</td>
						</tr>
					</table>
				</div>

				<!-- 账户或积分抵扣 非微信-->
				<div class="select_pay">

					<div class="pay_count">
						<!-- 账户金额为零 -->
						<span v-show="dataMsg.balance == '0'" :class="dataMsg.balance == '0' ? 'hover' : '' "> 使用学习账户金额<span>0</span>元 ( 剩余金额0元 )</span>
						<!-- 账户金额小于等于支付金额 -->
						<span v-show="(dataMsg.balance != '0') && (dataMsg.balance <= dataMsg.ordTotalMoney) " :class=" (dataMsg.balance != '0') && (dataMsg.balance <= dataMsg.ordTotalMoney) ? 'hover' : '' "> 使用学习账户抵扣<span>{{dataMsg.balance}}</span>元 <!-- ( 剩余金额0元 ) --></span>
						<!-- 账户金额大于支付金额 -->
						<span v-show="(dataMsg.balance != '0') && (dataMsg.balance > dataMsg.ordTotalMoney) " :class=" (dataMsg.balance != '0') && (dataMsg.balance > dataMsg.ordTotalMoney) ? 'hover' : '' "> 使用学习账户抵扣<span>{{dataMsg.ordTotalMoney}}</span>元 <!-- ( 剩余金额{{dataMsg.balance-dataMsg.ordTotalMoney}}元 ) --></span>
						
						<!-- 单选框 -->
						<div class="rdo_box right" @click='toggleChosed' name='01'></div>

						<div class="clear"></div>
					</div>
					<div class="pay_grade">
						<!-- 账户积分为零 -->
						<span v-show=" dataMsg.surplusIntegral=='0' " :class=" dataMsg.surplusIntegral=='0' ? 'hover' : '' ">使用0积分抵用<span>0</span>元 ( 剩余{{0}}积分 )</span>
						<!-- 账户积分小于等于支付金额 -->
						<span v-show=" (dataMsg.surplusIntegral !='0') && (dataMsg.surplusIntegral/30 <= dataMsg.ordTotalMoney) " :class=" (dataMsg.surplusIntegral !='0') && (dataMsg.surplusIntegral/30 <= dataMsg.ordTotalMoney) ? 'hover' : '' ">使用{{dataMsg.surplusIntegral}}积分抵用<span>{{(dataMsg.surplusIntegral/30).toFixed(2)}}</span>元<!--  ( 剩余0积分 ) --></span>
						<!-- 账户积分大于支付金额 -->
						<span v-show=" (dataMsg.surplusIntegral !='0') && (dataMsg.surplusIntegral/30 > dataMsg.ordTotalMoney) " :class=" (dataMsg.surplusIntegral !='0') && (dataMsg.surplusIntegral/30 > dataMsg.ordTotalMoney) ? 'hover' : '' ">使用{{dataMsg.ordTotalMoney*30}}积分抵用<span>{{dataMsg.ordTotalMoney}}</span>元<!--  ( 剩余{{dataMsg.surplusIntegral-dataMsg.ordTotalMoney*30}}积分 ) --></span>
						
						<!-- 单选框 -->
						<div class="rdo_box right" @click='toggleChosed' name='02'></div>

						<div class="clear"></div>
					</div>
				</div>
			</div>

			<!-- 不是微信时显示-->
			<div class="alipay" v-show="!isWx">
				<table>
					<!-- 支付宝支付    -->
					<tr class="bank_main_way">
						<td class="bank_img_box">
						<img src="/static/images/zfb.png" alt="安徽继续教育网" style="width:0.36rem;display:block">
						</td>
						<td class="bank_title_box" style="padding-left:5px;">支付宝支付</td>
						<td class="rdo_box_box">
							<!-- 单选框 -->
							<div v-show="needPay != 0" class= "rdo_box right hover single_select" @click='payMethodToggle' name='07'></div>

							<!-- 支付金额为零时显示 -->
							<div v-show="needPay == 0" class= "rdo_box right hover1"></div>
						</td>
					</tr>

					<!-- 微信支付 -->
					<tr class="bank_main_way">
						<td class="bank_img_box">
							<img src="/static/images/wxpay.png" alt="安徽继续教育网" style="width:0.36rem;display:block">
						</td>
						<td class="bank_title_box" style="padding-left:5px;">微信支付</td>
						<td class="rdo_box_box">
							<!-- 单选框 -->
							<div v-show="needPay != 0" class= "rdo_box right single_select" @click='payMethodToggle'  name='0902'></div>

							<!-- 支付金额为零时显示 -->
							<div v-show="needPay == 0" class= "rdo_box right hover1"></div>
						</td>
					</tr>
				</table>
			</div>

			<!-- 微信时显示 -->
			<div class="wx_pay" v-show="isWx">
				<table>
					<tr class="bank_main_way">
						<td class="bank_img_box">
							<img src="/static/images/wxpay.png" alt="安徽继续教育网" style="width:0.36rem;display:block">
						</td>
						<td class="bank_title_box" style="padding-left:5px;">微信支付</td>
						<td class="rdo_box_box">
							<!-- 单选框 -->
							<div :class="(needPay != 0)?'rdo_box right hover':'rdo_box right hover1' "></div>
						</td>
					</tr>

					<tr class="bank_main_way">
						<td class="bank_img_box">
							<img src="/static/images/zfb.png" alt="安徽继续教育网" style="width:0.36rem;display:block">
						</td>
						<td class="bank_title_box" style="padding-left:5px;" colspan="2">手机浏览器可支付宝缴费，网址：m.ahsjxjy.com</td>
					</tr>
				</table>
			</div>


		</div>

		<!-- 提交订单 -->
		<div class="commit_order">
			<p class="still_pay"><!-- 还需 -->支付:<span style="color:#EB681A">{{needPay}}元</span></p>
			<a @click='payMoney'><button>订单支付</button></a>
		</div>
		
		<!-- 微信支付结果弹框 -->
		<div class='pool_box' v-show='isClickWxPayBtn'>
			<div class="wxwx_result">
				<div class="wx_result_header">请确认微信支付是否已完成</div>
				<div class="wx_result_ok" @click='wxH5PayOk'>已完成支付</div>
				<div class="wx_result_wrong" @click='wxH5Question'>支付遇到问题，重新支付</div>
			</div>
		</div>

		<!-- 微信支付订单报错弹框 -->
		<div class="wx_error_box">
			<div class="wx_error">
				<p>微信不支持更改订单金额或支付渠道，请删除订单重新报名</p>
				<button class="cancle_btn control_button" @click='closeAlertBox'>取消</button>
				<router-link to="/orderList"><button class="ensure_btn control_button">确定</button></router-link>
				<div class="clear"></div>
			</div>
		</div>
	</div>
</template>
<script>
	import heade from '@/components/common/header';
	import axios from "axios";
	import config from "@/api/base.js"; 
	export default{
		data(){
			return{
				dataMsg:{},
				needPay:0,                  //还需要支付的钱
				derateType:"00",            //减免方式        01账户减免  02积分减免
				ordPaytype:'07',            //支付方式        01在线支付  07手机支付宝支付   0901公众号支付     
				isWx:true,                  //是否是微信      默认false 不是
				isInit:false,               //微信配置初始化
				isHavaCode:false,           //是否有code值
				code:'',                    //code值
				linkTo:'',                  //跳转链接
				isClickWxPayBtn:false,      //是否点击微信支付按钮
				isCanClickPayBtn:true,      //是否可以点击支付按钮
			}
		},
		created(){
			this.isWeiXin();
		},
		mounted(){
			this.getData();
		},
		methods:{
			// 返回订单列表
			backPrev(){
				this.$router.push("/orderList");
			},
			getData(){
				var _this=this;

				var params={'orderId':_this.$route.query.orderId};
				axios.post('/order/toPayOrder.do',params,config)
				.then(function(res){
					_this.dataMsg=res.data;
					_this.needPay=_this.dataMsg.ordTotalMoney;
				});
			},
			getCode(){
				var redirect_uri=window.location.href;

				window.location.href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wxb5a6b364f89bf7e0&redirect_uri="+redirect_uri+"&response_type=code&scope=snsapi_base&state=wx_state";
			},
			// 付款
            payMoney(){
            	// 微信外浏览器支付
            	if(!this.isWx && this.isCanClickPayBtn){
					// 将点击按钮置为不可点击
					this.isCanClickPayBtn=false;

            		var _this=this;
	            	if( (_this.needPay==0)&&(_this.derateType!='00') ){
	            		var params={'orderId':_this.dataMsg.ordId,'derateType':_this.derateType};
	            	}else if( (_this.needPay==0)&&(_this.derateType=='00') ){
	            		var params={'orderId':_this.dataMsg.ordId};
	            	}else if( (_this.needPay!=0)&&(_this.derateType!='00')){
	            		var params={'orderId':_this.dataMsg.ordId,'derateType':_this.derateType,'ordPaytype':_this.ordPaytype};
	            	}else if( (_this.needPay!=0)&&(_this.derateType=='00')){
	            		var params={'orderId':_this.dataMsg.ordId,'ordPaytype':_this.ordPaytype};
	            	};
	            	
        			axios.post('/order/payEnd.do',params,config)
					.then(function(res){
						// 将点击按钮置为可点击
						_this.isCanClickPayBtn=true;
						
						switch(_this.ordPaytype){
							// 支付宝支付
							case '07' :
								var state=history.state;
								history.replaceState(state,'',window.location.href.split('&')[0]);

								if((_this.needPay!=0)){
									$("#pay_html").html(res.data+"");
								}else if( (_this.needPay==0)){
									_this.$router.push('/memberCenter');
								};
								break;
							// 微信支付
							case '0902' :
								var redirect_url=encodeURIComponent(window.location.href.split('&')[0] + '&isClickWxPayBtn=true');

								var dataAll = res.data.mWebUrl + '&redirect_url='+redirect_url;
								if((_this.needPay!=0) && (res.data.result=='1')){
									window.location.href=dataAll;
								}else if( (_this.needPay==0) && (res.data.result=='1')){
									_this.$router.push('/memberCenter');
								}else if(res.data.result=='0' && (res.data.resultMsg == "201 商户订单号重复")){
									// 错误，打印错误信息
									$(".wx_error_box").fadeIn();
								}else if(res.data.result=='0' && (res.data.resultMsg != "201 商户订单号重复")){
									// 错误，打印错误信息
									alert(res.data.resultMsg);
								};
								break;
						}

						
					});
					
            	}else if(this.isWx && this.isCanClickPayBtn){
					// 将点击按钮置为不可点击
					this.isCanClickPayBtn=false;

            		// 微信内公众号支付
            		var _this=this;
	            	if( (_this.needPay==0)&&(_this.derateType!='00') ){
	            		var params={'orderId':_this.dataMsg.ordId,'derateType':_this.derateType};
	            	}else if( (_this.needPay==0)&&(_this.derateType=='00') ){
	            		var params={'orderId':_this.dataMsg.ordId};
	            	}else if( (_this.needPay!=0)&&(_this.derateType!='00')){
	            		var params={'orderId':_this.dataMsg.ordId,'derateType':_this.derateType,'ordPaytype':_this.ordPaytype};
	            	}else if( (_this.needPay!=0)&&(_this.derateType=='00')){
	            		var params={'orderId':_this.dataMsg.ordId,'ordPaytype':_this.ordPaytype};
	            	};

            		axios.post('/order/payEnd.do',params,config)
					.then(function(res){
						// 将点击按钮置为可点击
						_this.isCanClickPayBtn=true;

						// 若需要支付的金额不为零调用微信支付
						if((_this.needPay != 0) && (res.data.result=='1')){
							_this.wxPay(res.data.appId,res.data.timeStamp,res.data.nonceStr,res.data.package,res.data.signType,res.data.paySign);
						}else if( (_this.needPay==0) && (res.data.result=='1')){
							// 不用额外支付，支付成功直接跳转个人中心页面
							_this.$router.push('/memberCenter');
						}else if(res.data.result=='0' && (res.data.resultMsg == "201 商户订单号重复")){
							// 错误，打印错误信息
							$(".wx_error_box").fadeIn();
						}else if(res.data.result=='0' && (res.data.resultMsg != "201 商户订单号重复")){
							// 错误，打印错误信息
							alert(res.data.resultMsg);
						};
					});
            	}
            },
            // 微信支付
            wxPay(appId,timeStamp,nonceStr,prepayId,signType,paySign){
            	var _this=this;
            	function onBridgeReady(){
				   	WeixinJSBridge.invoke(
				       	'getBrandWCPayRequest', {
				           	"appId":appId,                 //公众号名称，由商户传入     
				           	"timeStamp":timeStamp,         //时间戳，自1970年以来的秒数     
				           	"nonceStr":nonceStr,           //随机串     
				           	"package":prepayId,     
				           	"signType":signType,           //微信签名方式：     
				           	"paySign":paySign              //微信签名 
				       	},
				       	function(res){     
				           	if(res.err_msg == "get_brand_wcpay_request:ok" ) {
				           		_this.$router.push({'path':'/wxPayResult',query:{'is_success':'T'}});
				           	}else{
				           		_this.$router.push({'path':'/wxPayResult',query:{'is_success':'F'}});
				           	}     
				           	// 使用以上方式判断前端返回,微信团队郑重提示：res.err_msg将在用户支付成功后返回    ok，但并不保证它绝对可靠。 
				       	}
				   	); 
				}
				if (typeof WeixinJSBridge == "undefined"){
				   	if( document.addEventListener ){
				       	document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
				   	}else if(document.attachEvent){
				       	document.attachEvent('WeixinJSBridgeReady', onBridgeReady); 
				       	document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
				   	}
				}else{
				   	onBridgeReady();
				}
            },
            // 支付方式单选框切换
            payMethodToggle(e){
            	var a=e.target || e.srcELement;
            	var b=$(a).hasClass('hover');
            	if(!b){
            		$(a).addClass('hover').parent().parent().siblings('tr').children('td').last().children('.single_select').removeClass('hover');
            		// 切换时修改支付方式
            		this.ordPaytype=$(a).attr('name');
            	};
            },
            // 单选框切换
			toggleChosed(e){
				var a=e.target || e.srcELement;
				var b=$(a).hasClass('hover');
				if(b){
					$(a).removeClass('hover');
					// 设置还需支付的价格
					this.needPay=this.dataMsg.ordTotalMoney;
					// 将减免方式设置为空  00为空
					this.derateType='00';
				}else{
					$(a).addClass('hover').parent().siblings().children('.rdo_box').removeClass('hover');
					this.needPay=(this.dataMsg.ordTotalMoney-($(a).siblings('span.hover').children('span').html())).toFixed(2);
					// 设置减免方式
					this.derateType=$(a).attr('name');
				};
			},
      		// 判断是否是微信
      		isWeiXin(){ 
				var ua = window.navigator.userAgent.toLowerCase(); 
				if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
					this.isWx=true; 
					this.ordPaytype='0901';
					
					this.code=this.$route.query.code;
					if(this.code){
						this.getWxConfigParams(this.code);
					}else{
						this.getCode();
					}
				}else{ 
					// 若不是微信，判断是否需要显示弹框
					if(this.$route.query.isClickWxPayBtn == 'true'){
						this.isClickWxPayBtn=true;
					}
					this.isWx=false;
				} 
			},
			// 获取微信初始化配置信息
			getWxConfigParams(code){
				var _this=this;
				var url=window.location.href;
				if (location.hash.length){
				    url = url.substr(0, url.indexOf(location.hash));
				};
				var params={'url':url,'code':code};
				axios.post('/order/toWxPayInitByUrl.do',params,config)
				.then(function(res){
					console.log(res);
				});
			},
			// 微信已完成支付点击
			wxH5PayOk(){
				var _this=this;
				var params={'orderNo':_this.dataMsg.ordNo};
				axios.post('/order/toTradeQueryWx.html',params,config)
				.then(function(res){
					if(res.data.result == '1'){
						_this.$router.replace('/memberCenter');
					}else{
						_this.isClickWxPayBtn=false;
						alert(res.data.resultMsg);
						_this.$router.replace('/memberCenter');
					}
				});
			},
			// 微信遇到问题点击
			wxH5Question(){
				this.isClickWxPayBtn=false;
			},
			// 201错误取消弹框
			closeAlertBox(){
				$(".wx_error_box").fadeOut();
			}
		}
	}
</script>
<style scoped type="css/html">
	.main{padding-bottom:50px;margin-top: .9rem;}
	.main table{border-collapse: collapse;margin-bottom: 10px;border-bottom: 1px solid #eee}
	.main table:last-child{border-bottom: 0 !important;margin-bottom: 0 !important;}
	
	.order_msg{margin-top:10px;}
	.order_code{background:#fff;margin-bottom: 10px;border-bottom: 1px solid #E6E6E6;padding:5px;font-size: 0.28rem}
	.order_code p{line-height: .4rem} 
	.order_code span{color:#EB681A;}

	.tab_box{background: #fff;padding:5px;margin-bottom: 10px;border-bottom: 1px solid #E6E6E6;border-top:1px solid #E6E6E6;}
	.img_box{width:35%;padding-right:10px;}
	.img_box img{width:100%;}
	.tab_box h4{font-size: 0.28rem}
	.class_price{color:#D1211A;position: relative;font-size: 0.28rem;top:-3px;}

	.select_pay{background:#fff;padding:5px;border-bottom: 1px solid #E6E6E6;border-top:1px solid #E6E6E6;}
	.select_pay .pay_count{border-bottom: 1px solid #eee}
	.select_pay>div{padding:10px 0;}
	.pay_count>span{float:left}

	.commit_order{position: fixed;bottom:0;left:0;width:100%;background:#fff;height:45px;border:1px solid #e6e6e6}
	.commit_order button{float:right;padding:0 20px;height:45px;line-height: 45px;background:#f50;color:#fff;font-size: 0.28rem;}
	.still_pay{font-size: 0.26rem;height:.26rem;position: absolute;top:50%;right:110px;margin-top: -.13rem;}
	.pay_grade>span{float:left;height:.4rem;line-height:.4rem;}

	.rdo_box{width:.4rem;height:.4rem;border:1px solid #ddd;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;}
	.rdo_box.hover{background:url(../../../static/images/checkbox.png) no-repeat;background-size: .4rem .4rem;-webkit-background-size: .4rem .4rem;-moz-background-size: .4rem .4rem;-o-background-size: .4rem .4rem;border: 0;}
	
	.alipay,.wx_pay{padding:0 5px;background:#fff;margin-top: 10px;border-bottom: 1px solid #E6E6E6;border-top:1px solid #E6E6E6;}
	.alipay table,.wx_pay table{width:100%;}
	.alipay table td,.wx_pay table td{padding:14px 0;}
	.bank_img_box{width:25px;}
	.zfb_logo{width:22px;height:22px;}
	.rdo_box.hover1{background:url(../../../static/images/checkbox1.png) no-repeat;background-size: .4rem .4rem;-webkit-background-size: .4rem .4rem;-moz-background-size: .4rem .4rem;-o-background-size: .4rem .4rem;border: 0;}

	/**微信支付弹框**/
	.pool_box{position: fixed;background:rgba(0,0,0,.7);z-index: 1000;top:0;left:0;right:0;bottom:0;}
	.wxwx_result{width:5rem;height:3.2rem;background:#fff;position: absolute;top:50%;margin-top:-1.6rem;left:50%;margin-left: -2.5rem;border-radius: 5px;-webkit-border-radius: 5px;-moz-border-radius: 5px;-o-border-radius: 5px;}
	.wx_result_header{width:100%;height:1.2rem;border-bottom: 1px solid #ddd;text-align: center;line-height: 1.2rem;font-size: 0.32rem;}
	.wx_result_ok{border-bottom: 1px solid #ddd;color:#e4393c;}
	.wx_result_ok,.wx_result_wrong{height:1rem;line-height: 1rem;text-align: center;font-size: .3rem }

	/*头部*/
	.header{width:100%;height:0.9rem;background:url(../../../static/images/bj-25.jpg) no-repeat;position:fixed;top:0;text-align: center;z-index:10000;background-size:100% 0.9rem;-webkit-background-size:100% 0.9rem;-moz-background-size:100% 0.9rem;-o-background-size:100% 0.9rem;}
    .header .back,.area_select{padding-left:10px;}
    .header .title_head{line-height:0.9rem;color:#fff;font-size: 0.36rem;height: 0.9rem;}
    .to_home{padding-right: 10px;}
    .to_home a{float:right;}
    .to_home img{height:.4rem;display: block;}
    .head_table{border-collapse: collapse;}
    .head_table td{vertical-align: middle}

	/*微信201错误弹框*/
	.wx_error_box{position: fixed;background:rgba(0,0,0,.7);z-index: 300;top:.9rem;left:0;right:0;bottom:0;font-size:.28rem; display: none}
	.wx_error{position: absolute;top:50%;left:50%;background:#fff;width:5rem;margin-left:-2.5rem;margin-top:-1.5rem;border-radius: .1rem;-webkit-border-radius: .1rem;-moz-border-radius: .1rem;-o-border-radius: .1rem;}
	.wx_error p{padding:0.12rem 0.1rem;line-height: .46rem;}
	.wx_error .control_button{float:left;width:50%;border-top: 1px solid #eee;height:.8rem;line-height: .8rem;text-align: center;background: #fff;font-size:.28rem;}
	.wx_error .cancle_btn{border-right: 1px solid #eee;border-bottom-left-radius: .1rem;-webkit-border-bottom-left-radius: .1rem;-moz-border-bottom-left-radius: .1rem;-o-border-bottom-left-radius: .1rem;}
	.wx_error .ensure_btn{border-bottom-right-radius: .1rem;-webkit-border-bottom-right-radius: .1rem;-moz-border-bottom-right-radius: .1rem;-o-border-bottom-right-radius: .1rem;}
</style>

