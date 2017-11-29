<template>
	<div v-title data-title="订单列表">
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
	        			<p class="title_head">订单列表</p>
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

		<!-- 列表 -->
		<div class="main">
			
			<!-- 选项卡 -->
			<div class="tab_toggle">
				<ul>
					<li class="hover tab_all" @click='showToggle'>全部</li>
					<li class="tab_have_pay" @click='showToggle'>已支付</li>
					<li class="tab_none_pay" @click='showToggle'>未支付</li>
					<div class="clear"></div>
				</ul>
				<div class="clear"></div>
			</div>

			<div id="tab_box" ref='tab_box'>
				<!-- 全部 -->
				<div class="tab_all1" ref="tab_all1">
					<div v-show='!isHaveData' align='center' style="margin-top:50px;">暂无数据！</div>
					<!-- 订单列表 -->
					<div class="tab_box" v-for="msg in dataMsg" v-show='isHaveData'>
						<!-- 完成的章 -->
						<img src="static/images/cartfinish.png" alt="安徽继续教育网" class="cart" v-show="msg.ordStatus == '20'">

						<p class="tab_header tab_header_first">订单编号 : {{msg.ordNo}}</p>
						<p class="tab_header">订单金额 : <span class="tab_price">￥{{msg.ordTotalMoney}}</span></p>
						<div class="tab_line"></div>

						<router-link :to="{path:'/orderDetail',query:{'orderId':msg.id}}">
							<table class="tab_content_box">
								<tr>
									<td width="90%">
										<p class="tab_content" v-show="(msg.ordType == '01') && (msg.ordStatus != '01' )">支付金额 : ￥{{msg.ordMoneysum}}</p>
										<p class="tab_content" v-show="(msg.ordType != '01') && (msg.ordStatus != '01')">支付金额 : ￥{{msg.ordTotalMoney}}</p>
										<p class="tab_content" v-show="msg.ordStatus == '01'">支付金额 : 无</p>
									</td>
									<td rowspan='5'><img src="static/images/dianjiann.png" alt="安徽继续教育网" width="15px"></td>
								</tr>
								<tr>
									<td><p class="tab_content">
										发票批次 : <span v-show="msg.eOrderInvoice.invoiceBatch == '' ">无</span><span v-show="msg.eOrderInvoice.invoiceBatch != '' ">{{msg.eOrderInvoice.invoiceBatch}}</span>

										<!-- 状态:<span v-show="msg.ordPaytime == '01' ">未支付</span><span v-show="msg.ordPaytime == '20' ">已支付</span> --></p></td>
								</tr>
								<tr>
									<td>
										<p class="tab_content" v-show="msg.invoiceClainType == '01' ">生成发票 : 否</p>
										<p class="tab_content" v-show="msg.invoiceClainType == '02' ">生成发票 : 是</p>
									</td>
								</tr>
								<tr>
									<td>
										<p class="tab_content" v-show="msg.ordType == '01' ">订单类型 : 个人</p>
										<p class="tab_content" v-show="msg.ordType == '02' ">订单类型 : 集体</p>
										<p class="tab_content" v-show="msg.ordType == '03' ">订单类型 : 机构</p>
									</td>
								</tr>
								<tr>
									<td>
										<p class="tab_content" v-show="(msg.ordPaytime != null) && (msg.ordStatus != '01')">支付时间 : {{msg.ordPaytime}}</p>
										<p class="tab_content" v-show="(msg.ordPaytime == null) || (msg.ordStatus == '01')">支付时间 : 无</p>
									</td>
								</tr>
							</table>
						</router-link>
						<div class="clear"></div>

						
						<div class="tab_line1" v-show="msg.ordStatus == '01'"></div>
						<div class="tab_btn" v-show="msg.ordStatus == '01' ">
							<input type="hidden" :value="msg.ordPaytype">
							<button class="cancel_order" :name="msg.id" @click='cancelOrder' :title="msg.ordNo">取消订单</button>
							<router-link :to="{path:'/myOrder/pay',query:{'orderId':msg.id}}"><button class="pay_order">支付订单</button></router-link>
						</div>
					</div>
					<div class="clear"></div>
				</div>
				
				<!-- 已支付 -->
				<div class="tab_have_pay1">
					<div v-show='!isHaveData' align='center' style="margin-top:50px;">暂无数据！</div>
					<!-- 订单列表 -->
					<div class="tab_box" v-for="msg in dataMsg2" v-show='isHaveData'>
						<!-- 完成的章 -->
						<img src="static/images/cartfinish.png" alt="安徽继续教育网" class="cart" v-show="msg.ordStatus == '20'">

						<p class="tab_header tab_header_first">订单编号 : {{msg.ordNo}}</p>
						<p class="tab_header">订单金额 : <span class="tab_price">￥{{msg.ordTotalMoney}}</span></p>
						<div class="tab_line"></div>

						<router-link :to="{path:'/orderDetail',query:{'orderId':msg.id}}">
							<table class="tab_content_box">
								<tr>
									<td width="90%">
										<p class="tab_content" v-show="(msg.ordType == '01') && (msg.ordStatus != '01' )">支付金额 : ￥{{msg.ordMoneysum}}</p>
										<p class="tab_content" v-show="(msg.ordType != '01') && (msg.ordStatus != '01')">支付金额 : ￥{{msg.ordTotalMoney}}</p>
										<p class="tab_content" v-show="msg.ordStatus == '01'">支付金额 : 无</p>
									</td>
									<td rowspan='5'><img src="static/images/dianjiann.png" alt="安徽继续教育网" width="15px"></td>
								</tr>
								<tr>
									<td><p class="tab_content">
										发票批次 : <span v-show="msg.eOrderInvoice.invoiceBatch == '' ">无</span><span v-show="msg.eOrderInvoice.invoiceBatch != '' ">{{msg.eOrderInvoice.invoiceBatch}}</span>

										<!-- 状态:<span v-show="msg.ordPaytime == '01' ">未支付</span><span v-show="msg.ordPaytime == '20' ">已支付</span> --></p></td>
								</tr>
								<tr>
									<td>
										<p class="tab_content" v-show="msg.invoiceClainType == '01' ">生成发票 : 否</p>
										<p class="tab_content" v-show="msg.invoiceClainType == '02' ">生成发票 : 是</p>
									</td>
								</tr>
								<tr>
									<td>
										<p class="tab_content" v-show="msg.ordType == '01' ">订单类型 : 个人</p>
										<p class="tab_content" v-show="msg.ordType == '02' ">订单类型 : 集体</p>
										<p class="tab_content" v-show="msg.ordType == '03' ">订单类型 : 机构</p>
									</td>
								</tr>
								<tr>
									<td>
										<p class="tab_content" v-show="(msg.ordPaytime != null) && (msg.ordStatus != '01')">支付时间 : {{msg.ordPaytime}}</p>
										<p class="tab_content" v-show="(msg.ordPaytime == null) || (msg.ordStatus == '01')">支付时间 : 无</p>
									</td>
								</tr>
							</table>
						</router-link>
						<div class="clear"></div>

						<!-- <div class="tab_line1"></div> -->
					</div>
					<div class="clear"></div>
				</div>

				<!-- 未支付 -->
				<div class="tab_none_pay1">
					<div v-show='!isHaveData' align='center' style="margin-top:50px;">暂无数据！</div>
					<!-- 订单列表 -->
					<div class="tab_box" v-for="msg in dataMsg1"  v-show='isHaveData'>
						<p class="tab_header tab_header_first">订单编号:{{msg.ordNo}}</p>
						<p class="tab_header">订单金额:<span class="tab_price">￥{{msg.ordTotalMoney}}</span></p>
						<div class="tab_line"></div>

						<router-link :to="{path:'/orderDetail',query:{'orderId':msg.id}}">
							<table class="tab_content_box">
								<tr>
									<td width="90%">
										<p class="tab_content" v-show="(msg.ordType == '01') && (msg.ordStatus != '01' )">支付金额:￥{{msg.ordMoneysum}}</p>
										<p class="tab_content" v-show="(msg.ordType != '01') && (msg.ordStatus != '01')">支付金额:￥{{msg.ordTotalMoney}}</p>
										<p class="tab_content" v-show="msg.ordStatus == '01'">支付金额:无</p>
									</td>
									<td rowspan='5'><img src="static/images/dianjiann.png" alt="安徽继续教育网" width="15px"></td>
								</tr>
								<tr>
									<td><p class="tab_content">
										发票批次:<span v-show="msg.eOrderInvoice.invoiceBatch == '' ">无</span><span v-show="msg.eOrderInvoice.invoiceBatch != '' ">{{msg.eOrderInvoice.invoiceBatch}}</span>
										<!-- 状态:<span v-show="msg.ordPaytime == '01' ">未支付</span><span v-show="msg.ordPaytime == '20' ">已支付</span> --></p></td>
								</tr>
								<tr>
									<td>
										<p class="tab_content" v-show="msg.invoiceClainType == '01' ">生成发票:否</p>
										<p class="tab_content" v-show="msg.invoiceClainType == '02' ">生成发票:是</p>
									</td>
								</tr>
								<tr>
									<td>
										<p class="tab_content" v-show="msg.ordType == '01' ">订单类型:个人</p>
										<p class="tab_content" v-show="msg.ordType == '02' ">订单类型:集体</p>
										<p class="tab_content" v-show="msg.ordType == '03' ">订单类型:机构</p>
									</td>
								</tr>
								<tr>
									<td>
										<p class="tab_content" v-show="(msg.ordPaytime != null) && (msg.ordStatus != '01')">支付时间:{{msg.ordPaytime}}</p>
										<p class="tab_content" v-show="(msg.ordPaytime == null) || (msg.ordStatus == '01')">支付时间:无</p>
									</td>
								</tr>
							</table>
						</router-link>
						<div class="clear"></div>

						<div class="tab_line1"></div>
						<div class="tab_btn">
							<input type="hidden" :value="msg.ordPaytype">
							<button class="cancel_order" :name="msg.id" @click='cancelOrder' :title="msg.ordNo">取消订单</button>

							<router-link  :to="{path:'/myOrder/pay',query:{'orderId':msg.id}}"><button class="pay_order">支付订单</button></router-link>
						</div>
					</div>
					<div class="clear"></div>
				</div>
			</div>
			
			
			
			<div class="clear"></div>
			<!-- 底部 -->
			<div style="height:50px;"></div>
		</div>
		
		<!-- 取消订单弹框 -->
		<div class="pool"></div>
		<div class='delete_order_box'>
			<div class="delete_order">
				<p class='delete_warn'>是否确定取消该订单？</p>
				<button class='cancle' @click='cancleControlOrder'>取消</button>
				<button class="ensure" @click='ensureCancleOrder'>确定</button>
			</div>
		</div>

		
	</div>
</template>
<script>
	import heade from '@/components/common/header'
	import axios from "axios"
	import config from "@/api/base.js";
	import { MessageBox } from 'mint-ui';
	export default{
		data(){
			return {
				headTitle:'订单列表',     //头部信息
				ordStatus:"00",           //订单支付状态   00不传  01未支付  20已支付
				dataMsg:{},               //全部订单
				dataMsg1:{},              //未支付订单
				dataMsg2:{},              //已支付订单
				isHaveData:true,          //是否有数据
				firstGetAll:true,         //第一次获取全部数据
				firstGetPay:true,         //第一次获取已支付数据
				firstGetNone:true,        //第一次获取未支付数据
				isAllData:true,           //全部是否有数据
				isNoneData:true,          //未支付是否有数据
				isPayData:true,           //已支付否有数据
				cancleOrderNum:'',        //取消订单编号
			}
		},
		components:{
			heade,
		},
		created(){
			this.setHeaderBackBtn();
			this.getData();
		},
		updated(){
			this.setCss();
		},
		methods:{
			// 返回订单列表
			backPrev(){
				this.$router.push("/memberCenter");
			},
			// 全部订单
			getData(){
				var _this=this;
				var params={};
				if(_this.firstGetAll){
					_this.firstGetAll=false;
					axios.post('/order/toOrderList.do',params,config)
					.then(function(res){
						_this.dataMsg=_this.dataMsg1=_this.dataMsg2=res.data.orderList;
						var resu=res.data.result;
						if(resu=='1'){
							_this.isAllData=true;
							// 如果发票批次eOrderInvoice为null，添加字段invoiceBatch以免报错
							var len=_this.dataMsg.length;
							for(var i=0;i<len;i++){
								if(_this.dataMsg[i].eOrderInvoice == null){
									_this.dataMsg[i].eOrderInvoice=new Object();
									_this.dataMsg[i].eOrderInvoice.invoiceBatch="";
								}
							};
						}else if(resu=='0'){
							_this.isAllData=false;
						};
						_this.isHaveData=_this.isAllData;
					});
				};
				_this.isHaveData=_this.isAllData;
			},
			// 未支付订单
			getNonePayOrder(){
				var _this=this;
				var params={'ordStatus':'01'};
				if(_this.firstGetNone){
					axios.post('/order/toOrderList.do',params,config)
					.then(function(res){
						_this.firstGetNone=false;
						_this.dataMsg1=res.data.orderList;
						var resu=res.data.result;
						if(resu == "1"){
							_this.isNoneData=true;
							// 如果发票批次eOrderInvoice为null，添加字段invoiceBatch以免报错
							var len=_this.dataMsg1.length;
							for(var i=0;i<len;i++){
								if(_this.dataMsg1[i].eOrderInvoice == null){
									_this.dataMsg1[i].eOrderInvoice=new Object();
									_this.dataMsg1[i].eOrderInvoice.invoiceBatch="";
								}
							};
						}else if(resu == "0"){
							_this.isNoneData=false;
						};
						_this.isHaveData=_this.isNoneData;
					});
				};
				_this.isHaveData=_this.isNoneData;
			},
			// 已支付订单
			getHavePayOrder(){
				var _this=this;
				var params={'ordStatus':'20'};
				if(_this.firstGetPay){
					_this.firstGetPay=false;
					axios.post('/order/toOrderList.do',params,config)
					.then(function(res){
						_this.dataMsg2=res.data.orderList;
						var resu=res.data.result;
						if(resu == "1"){
							_this.isPayData=true;
							var len=_this.dataMsg2.length;
							for(var i=0;i<len;i++){
								if(_this.dataMsg2[i].eOrderInvoice == null){
									_this.dataMsg2[i].eOrderInvoice=new Object();
									_this.dataMsg2[i].eOrderInvoice.invoiceBatch="";
								}
							};
						}else if(resu == "0"){
							_this.isPayData=false;
						};
						_this.isHaveData=_this.isPayData;
					});
				};
				_this.isHaveData=_this.isPayData;
			},
			// 取消订单
			cancelOrder(e){
				var _this=this;
				var a=e.target || e.srcELement;

				_this.cancleOrderNum=$(a).attr('name');
				// 订单编号
				var ordNo=$(a).attr("title");

				var ordPaytype=$(a).prev("input[type=hidden]").val();

				// 根据支付类型进行对账
				switch(ordPaytype){
					case "06" :
						_this.zfbSendToService1(ordNo);
						break;
					case "07" :
						_this.zfbSendToService1(ordNo);
						break;	
					case "0901" :
						_this.wxSendToService(ordNo);
						break;
					case "0902" :
						_this.wxSendToService(ordNo);
						break;
					default :
						_this.zfbSendToService(ordNo);
						break;
				}
			},
			// 支付宝和微信配合对账流程
			zfbSendToService(ordNo){
				var _this=this;
				var params={'orderNo':ordNo};
				axios.post('/order/toTradeQueryZFB.html',params,config)
				.then(function(res){
					// 若是支付宝已支付状态则弹出警告，否则进行微信支付对账
					if(res.data.result=='1'){
						// _this.openAlert("该订单已支付");
						alert("该订单已支付");
						_this.$router.replace('/orderClear');
					}else{
						_this.wxSendToService(ordNo);
					}
				});
			},
			// 微信对账
			wxSendToService(ordNo){
				var _this=this;
				var params={'orderNo':ordNo};
				axios.post('/order/toTradeQueryWx.html',params,config)
				.then(function(res){
					// 若是微信已支付弹出警告框，否则将取消框弹出
					if(res.data.result=='1'){
						// _this.openAlert("该订单已支付");
						alert("该订单已支付");
						_this.$router.replace('/orderClear');
					}else{
						$('.pool,.delete_order_box').fadeIn();
						$("html,body").css({"height":"100%","overflow":"hidden"});
					}
				});
			},
			// 支付宝单独对账
			zfbSendToService1(ordNo){
				var _this=this;
				var params={'orderNo':ordNo};
				axios.post('/order/toTradeQueryZFB.html',params,config)
				.then(function(res){
					if(res.data.result=='1'){
						// _this.openAlert("该订单已支付");
						alert("该订单已支付");
						_this.$router.replace('/orderClear');
					}else{
						$('.pool,.delete_order_box').fadeIn();
						$("html,body").css({"height":"100%","overflow":"hidden"});
					}
				});
			},
			// 确定取消订单
			ensureCancleOrder(){
				var _this=this;
				var params={'orderId':_this.cancleOrderNum};
				axios.post('/order/toDeleterOrder.do',params,config)
				.then(function(res){
					var resu=res.data.result;
					if(resu == '1'){
						$("button[name='"+_this.cancleOrderNum+"']").parent().parent().remove();
						$('.pool,.delete_order_box').fadeOut();
						$("html,body").css({"height":"auto","overflow":"visible"});
					}else{
						_this.openAlert('操作失败，请重试！');
					}
				});
			},
			// 取消操作订单
			cancleControlOrder(){
				this.cancleOrderNum='';
				$('.pool,.delete_order_box').fadeOut();
				$("html,body").css({"height":"auto","overflow":"visible"});
			},
			// 选项卡切换
			showToggle(e){
				// 将页面滚动到最顶部
				$(window).scrollTop(0);
				$('html,body').scrollTop(0);
				// 获取点击的对象
				var a=e.target || e.srcElement;
				$(a).addClass('hover').siblings('li').removeClass('hover');
				var b=$(a).hasClass('tab_all');
				var c=$(a).hasClass('tab_have_pay');
				var d=$(a).hasClass('tab_none_pay');
				if(b){
					$('.tab_all1,.tab_have_pay1,.tab_none_pay1').removeClass('hover');
					$('.tab_all1,.tab_have_pay1,.tab_none_pay1').removeClass('hover1');
					this.getData();
				}else if(c){
					// 点击已支付订单
					$('.tab_all1,.tab_have_pay1,.tab_none_pay1').addClass('hover').removeClass('hover1');
					this.getHavePayOrder();
				}else if(d){
					// 点击未支付订单
					$('.tab_all1,.tab_have_pay1,.tab_none_pay1').addClass('hover1').removeClass('hover');
					this.getNonePayOrder();
				};
			},
			// 设置是否显示头部返回按钮
			setHeaderBackBtn(){
				this.$store.commit('showHeaderBack',true);
			},
			// 样式设置，清除定位带来的影响
			setCss(){
				var heig=this.$refs.tab_all1.clientHeight+Number(50)+'px';
				this.$refs.tab_box.style.height=heig;
			},
			// 弹框提示
			openAlert(a) {                           
        		MessageBox.alert(a, '提示');
      		}
		}
	}
</script>
<style scoped>
	.main{margin-top:.9rem;width:100%;}
	#tab_box{position: relative;overflow: hidden}
	.tab_box{padding:10px 5px;background:#fff;border-top:1px solid #e6e6e6;border-bottom:1px solid #e6e6e6;margin-bottom: 5px;width:100%;position: relative;}
	.tab_line{height:3px;border-top: 1px solid #FCE2BA;border-bottom: 1px solid #FCE2BA;margin: 5px 0;}
	.tab_line1{height:3px;border-top: 1px solid #8D8D8D;margin: 5px 0;}
	.tab_header{font-size: 0.28rem;color:#000;margin-top: 5px;}
	.tab_header_first{margin-top: 0 !important;}
	.tab_content{margin-bottom: 3px;font-size: 0.26rem}
	.tab_btn{text-align: right;}
	.tab_btn button{padding:5px 10px;background:#bdbdbd;color:#fff;margin-right:5px;border-radius: 3px;-webkit-border-radius: 3px;-moz-border-radius: 3px;}
	.tab_btn button.pay_order{background:#EB681A;}
	.arrow_box{margin-top: 30px;}
	.tab_content_box{width:100%;border:0 !important;}

	.tab_toggle{background:#fff;border-bottom: 1px solid #17bbe2;margin-bottom: 10px;position: fixed;top:.9rem;left:0;width:100%;z-index: 100}
	.tab_toggle ul li{float: left;width:33.3%;text-align: center;border-bottom: 2px solid transparent;height:40px;line-height:40px;}
	.tab_toggle ul li.hover{border-bottom: 2px solid #17bbe2;color:#17bbe2;}
	.cart{width:1.6rem;position: absolute;top:15px;right:20px;}

	.tab_all1{width:100%;position:absolute;left:0;top:45px;transition: left 0.3s;-moz-transition:left 0.3s;-webkit-transition:left 0.3s;-o-transition:left 0.3s;}
	.tab_all1.hover{left:-100%;top:45px;transition: left 0.3s;-moz-transition:left 0.3s;-webkit-transition:left 0.3s;-o-transition:left 0.3s;}
	.tab_all1.hover1{left:-200%;top:45px;transition: left 0.3s;-moz-transition:left 0.3s;-webkit-transition:left 0.3s;-o-transition:left 0.3s;}
	.tab_have_pay1{width:100%;position:absolute;left:100%;top:45px;transition: left 0.3s;-moz-transition:left 0.3s;-webkit-transition:left 0.3s;-o-transition:left 0.3s;}
	.tab_have_pay1.hover{left:0;top:45px;transition: left 0.3s;-moz-transition:left 0.3s;-webkit-transition:left 0.3s;-o-transition:left 0.3s;}
	.tab_have_pay1.hover1{left:-100%;top:45px;transition: left 0.3s;-moz-transition:left 0.3s;-webkit-transition:left 0.3s;-o-transition:left 0.3s;}
	.tab_none_pay1{width:100%;position:absolute;top:45px;left:200%;transition: left 0.3s;-moz-transition:left 0.3s;-webkit-transition:left 0.3s;-o-transition:left 0.3s;}
	.tab_none_pay1.hover{left:100%;top:45px;transition: left 0.3s;-moz-transition:left 0.3s;-webkit-transition:left 0.3s;-o-transition:left 0.3s;}
	.tab_none_pay1.hover1{left:0;top:45px;transition: left 0.3s;-moz-transition:left 0.3s;-webkit-transition:left 0.3s;-o-transition:left 0.3s;}

	.pool{position: fixed;top:.9rem;left:0;right:0;bottom:0;background:#000;opacity:0.6;z-index: 200;display:none;}
	.delete_order_box{position: fixed;top:.9rem;left:0;right:0;bottom:0;text-align: center;z-index: 300;font-size: 1rem;display:none;}
	.delete_order{height:1.6rem;position: absolute;top:50%;margin-top: -0.8rem;background:#fff;width:4rem;left:50%;margin-left: -2rem;border-radius: 0.1rem;-webkit-border-radius:  0.1rem;-moz-border-radius:  0.1rem;-o-border-radius:  0.1rem;}
	.delete_warn{height:0.8rem;line-height:0.8rem;font-size: 0.28rem;}
	.delete_order button{width:50%;height:0.8rem;line-height:0.8rem;border:0;float:left;background:#fff;border-top:1px solid #eee;font-size: 0.28rem}
	.cancle{border-right:1px solid #eee !important;border-bottom-left-radius: 0.1rem;-moz-border-bottom-left-radius: 0.1rem;-webkit-border-bottom-left-radius: 0.1rem;-o-border-bottom-left-radius: 0.1rem;}
	.ensure{border-bottom-right-radius: 0.1rem;-moz-border-bottom-right-radius: 0.1rem;-webkit-border-bottom-right-radius: 0.1rem;-o-border-bottom-right-radius: 0.1rem;}

	.header{width:100%;height:0.9rem;background:url(../../../../static/images/bj-25.jpg) no-repeat;position:fixed;top:0;text-align: center;z-index:10000;background-size:100% 0.9rem;-webkit-background-size:100% 0.9rem;-moz-background-size:100% 0.9rem;-o-background-size:100% 0.9rem;}
    .header .back,.area_select{padding-left:10px;}
    .header .title_head{line-height:0.9rem;color:#fff;font-size: 0.36rem;height: 0.9rem;}
    .to_home{padding-right: 10px;}
    .to_home a{float:right;}
    .to_home img{height:.4rem;display: block;}
    .head_table{border-collapse: collapse;}
    .head_table td{vertical-align: middle}
</style>