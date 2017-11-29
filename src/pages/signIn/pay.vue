<template>
	<div v-title data-title="支付" class="main_bg">
		<!-- 头部 -->
		<heade :titlehead="headTitle"></heade>
		
		<!-- 支付方式选择 -->
		<div class="pay_box">
			<!-- 支付宝支付 -->
			<div class="tab_box">
				<table>
					<tr class="bank_main_way">
						<td class="bank_img_box"><div class='zfb_logo'></div></td>
						<td class="bank_title_box">支付宝支付</td>
						<td class="rdo_box_box">
							<!-- 单选框 -->
							<div :class="(dataMsg.money!='0')?'rdo_box right hover':'rdo_box right hover1' " @click='payMethodToggle' name='06'></div>
						</td>
					</tr>
				</table>
			</div>
			<!-- 微信支付 -->
			<div class="tab_box tab_wx_box">
				<table>
					<tr class="bank_main_way">
						<td class="bank_img_box"><div class='wx_logo'></div></td>
						<td class="bank_title_box">微信支付</td>
						<td class="rdo_box_box">
							<!-- 单选框 -->
							<div :class="(dataMsg.money!='0')?'rdo_box right':'rdo_box right hover1' "  @click='payMethodToggle'></div>
						</td>
					</tr>
				</table>
			</div>

			<!-- 网银支付 -->
			<div class="tab_box tab_wy_box">
				<table>
					<tr class="bank_main_way">
						<td class="bank_img_box"><div class='wy_logo'></div></td>
						<td class="bank_title_box">银行卡支付</td>
						<td class="rdo_box_box">
							<!-- 单选框 -->
							<div :class="(dataMsg.money!='0')?'rdo_box right':'rdo_box right hover1' "  @click='payMethodToggle' name='01'></div>
						</td>
					</tr>
					<tr @click='showBankList'>
						<td class="bank_img_box"></td>
						<td class="bank_title_box bank_example">中国工商银行</td>
						<td class='bank_example bank_arrow'>
							<span class='right'>></span>
						</td>
					</tr>
				</table>
			</div>
		</div>

		<!-- 确认支付按钮 -->
		<div class='pay_btn_box'>
			<div class="pay_btn" @click='moneyPay'>确认支付<span>￥{{dataMsg.money}}</span></div>
		</div>

		<!-- 银行卡选择弹框 -->
		<div class="bank_select_box">
			<div class="bank_list_header">
				<p>选择银行卡</p><span class="bank_list_close" @click='closeBankList'>×</span>
			</div>
			<div class="bank_list_content">
				<table>
					<tr @click='chosedToggle'>
						<td width='20px'><div class="bank_list_img bank_gs"></div></td>
						<td align='left'>中国工商银行</td>
						<td align='center' width="30px" class='hover logo_ok'><span>√</span></td>
					</tr>

					<tr @click='chosedToggle'>
						<td width='20px'><div class="bank_list_img bank_js"></div></td>
						<td align='left'>中国建设银行</td>
						<td align='center' width="30px" class='logo_ok'><span>√</span></td>
					</tr>

					<tr @click='chosedToggle'>
						<td width='20px'><div class="bank_list_img bank_zs"></div></td>
						<td align='left'>招商银行</td>
						<td align='center' width="30px" class='logo_ok'><span>√</span></td>
					</tr>

					<tr @click='chosedToggle'>
						<td width='20px'><div class="bank_list_img bank_zgny"></div></td>
						<td align='left'>中国农业银行</td>
						<td align='center' width="30px" class='logo_ok'><span>√</span></td>
					</tr>

					<tr @click='chosedToggle'>
						<td width='20px'><div class="bank_list_img bank_pf"></div></td>
						<td align='left'>浦发银行</td>
						<td align='center' width="30px" class='logo_ok'><span>√</span></td>
					</tr>

					<tr @click='chosedToggle'>
						<td width='20px'><div class="bank_list_img bank_jt"></div></td>
						<td align='left'>交通银行</td>
						<td align='center' width="30px" class='logo_ok'><span>√</span></td>
					</tr>

					<tr @click='chosedToggle'>
						<td width='20px'><div class="bank_list_img bank_zgms"></div></td>
						<td align='left'>中国民生银行</td>
						<td align='center' width="30px" class='logo_ok'><span>√</span></td>
					</tr>

					<tr @click='chosedToggle'>
						<td width='20px'><div class="bank_list_img bank_pa"></div></td>
						<td align='left'>平安银行</td>
						<td align='center' width="30px" class='logo_ok'><span>√</span></td>
					</tr>

					<tr @click='chosedToggle'>
						<td width='20px'><div class="bank_list_img bank_zg"></div></td>
						<td align='left'>中国银行</td>
						<td align='center' width="30px" class='logo_ok'><span>√</span></td>
					</tr>

					<tr @click='chosedToggle'>
						<td width='20px'><div class="bank_list_img bank_gd"></div></td>
						<td align='left'>中国光大银行</td>
						<td align='center' width="30px" class='logo_ok'><span>√</span></td>
					</tr>

					<tr @click='chosedToggle'>
						<td width='20px'><div class="bank_list_img bank_xy"></div></td>
						<td align='left'>兴业银行</td>
						<td align='center' width="30px" class='logo_ok'><span>√</span></td>
					</tr>

					<tr @click='chosedToggle'>
						<td width='20px'><div class="bank_list_img bank_zx"></div></td>
						<td align='left'>中信银行</td>
						<td align='center' width="30px" class='logo_ok'><span>√</span></td>
					</tr>

					<tr @click='chosedToggle'>
						<td width='20px'><div class="bank_list_img bank_hx"></div></td>
						<td align='left'>华夏银行</td>
						<td align='center' width="30px" class='logo_ok'><span>√</span></td>
					</tr>

					<tr @click='chosedToggle'>
						<td width='20px'><div class="bank_list_img bank_zgyzcx"></div></td>
						<td align='left'>中国邮政储蓄银行</td>
						<td align='center' width="30px" class='logo_ok'><span>√</span></td>
					</tr>

					<tr @click='chosedToggle'>
						<td width='20px'><div class="bank_list_img bank_yl"></div></td>
						<td align='left'>中国银联</td>
						<td align='center' width="30px" class='logo_ok'><span>√</span></td>
					</tr>
				</table>
			</div>
		</div>
		<div id="pay_page"></div>
		<!-- 遮罩层 -->
		<div class="bg_box"></div>
		
	</div>
</template>
<script>
	import heade from '@/components/common/header'
	import axios from "axios";
	import config from "@/api/base.js";
	export default{
		data(){
			return{
				headTitle:"支付",
				dataMsg:{},
				ordPaytype:'06',               //支付方式   01在线 06支付宝
			}
		},
		components:{
			heade,
		},
		created(){
			this.setHeaderBackBtn();
			this.needPay();
		},
		methods:{
			moneyPay(){
				// 付款方式选择
				switch(this.ordPaytype){
					// 支付宝支付
					case '06' :
						this.alipay();
						break;
				}
			},
			// 支付宝支付
			alipay(){
				var _this=this;
				var params={'orderId':'4028815e5dc0cf02015dc0d071c70002','ordPaytype':'06'};
				axios.post('/order/payEnd.do',params,config)
				.then(function(res){
					$("#pay_page").html(res.data);
				});
			},
			// 设置是否显示头部返回按钮
            setHeaderBackBtn(){
                this.$store.commit('showHeaderBack',true);
            },
            // 支付方式切换
            payMethodToggle(e){
            	var a=e.target || e.srcElement;
            	if(this.dataMsg.money != '0'){
            		$(a).addClass('hover').parent().parent().parent().parent().siblings('.tab_box').children().children('.bank_main_way').children('.rdo_box_box').children().removeClass('hover');
            		this.ordPaytype=$(a).attr('name');
            	}
            },
            // 银行卡选择切换
            chosedToggle(e){
            	var a=e.currentTarget;
            	$(a).children('.logo_ok').addClass('hover').parent().siblings().children('.logo_ok').removeClass('hover');
            },
            // 显示银行卡选择框
            showBankList(){
            	if(this.dataMsg.money != '0'){
            		$(".bank_select_box,.bg_box").fadeIn();
            	}
            },
            // 关闭银行卡选择框
            closeBankList(){
            	$(".bank_select_box,.bg_box").fadeOut();
            },
            // 付款
            needPay(){
            	this.dataMsg.money=sessionStorage.getItem('applicationPay');
            }
		}
	} 
</script>
<style scoped>
	.pay_box{padding-bottom:500px;margin-top:.9rem;}
	.tab_box{background:#fff;padding:0 5px;}
	.tab_box table{width:100%;}
	.tab_box table td{padding:10px 0;border-bottom:1px solid #eee;}
	.tab_box.tab_wx_box table td,.tab_box.tab_wy_box table td{border-bottom: 0}
	.tab_box.tab_wx_box,.tab_box.tab_wy_box{border-bottom:1px solid #E6E6E6;}
	.tab_box.tab_wy_box{border-top:1px solid #E6E6E6;}
	.zfb_logo,.wy_logo,.wx_logo{width:22px;height:22px;background:url(../../../static/images/banklogo.png) no-repeat -27px -4px;}
	.wy_logo{background:url(../../../static/images/banklogo.png) no-repeat -4px -73px !important;}
	.wx_logo{background:url(../../../static/images/wxpay.png) no-repeat 0 2px !important;}

	.bank_img_box{padding:0 10px;width:10%;}
	.bank_title_box{font-size: 1rem;text-align: left}
	.bank_example{border-top:1px solid #eee;}
	.bank_title_box.bank_example{font-size: 0.8rem;color:#aaa;}
	.bank_arrow span{font-size: 1.1rem;color:#aaa;margin-right: 4px;}

	.pay_btn{width:95%;text-align: center;margin:10px auto;background:#f50 !important;padding:10px 0;border-radius: 5px;-webkit-border-radius: 5px;-moz-border-radius: 5px;color:#fff;font-size: 1.0rem}
	.pay_btn span{color:#fff;font-size: 1.1rem}
	.pay_btn_box{position: fixed;bottom:0;left:0;right:0;background:#fff;}
	.tab_wy_box{margin-top:10px;}

	.rdo_box{width:20px;height:20px;border:1px solid #ddd;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;}
	.rdo_box.hover{background:url(../../../static/images/checkbox.png) no-repeat;background-size: 20px 20px;border: 0;}
	.rdo_box.hover1{background:url(../../../static/images/checkbox1.png) no-repeat;background-size: 20px 20px;border: 0;}

	.bg_box{position: fixed;top:0;left:0;right:0;bottom:0;background:#000;opacity:0.5;display: none}
	.bank_select_box{width:260px;height:300px;background:#fff;position: fixed;top:50%;left:50%;margin-top:-150px;margin-left: -130px;z-index: 100;border-radius: 5px;-webkit-border-radius: 5px;-moz-border-radius: 5px;display:none;}
	.bank_list_header{text-align: center;height:40px;line-height:40px;font-size:0.9rem;border-bottom: 1px solid #FF5500}
	.bank_list_close{position: absolute;right:10px;top:0;font-size: 1.3rem}
	.bank_list_content{max-height: 260px;overflow: scroll;}
	.bank_list_content table{border-collapse: collapse;width:100%;}
	.bank_list_content table tr td{padding:10px 5px 10px 10px;border-bottom:1px solid #eee;}
	.bank_list_content table tr td:last-child span{display:none;}
	.bank_list_content table tr td.hover:last-child span{display:block;color:#f50;}
	.bank_list_content table tr:last-child td{border-bottom:0;}
	.bank_list_img{width:17px;height:16px;}
	.bank_gs{background:url(../../../static/images/ghlogo.jpg) no-repeat -2px 0;}
	.bank_js{background:url(../../../static/images/banklogomin.png) no-repeat -65px -3px;}
	.bank_zs{background:url(../../../static/images/banklogomin.png) no-repeat -18px -19px;}
	.bank_zgny{background:url(../../../static/images/banklogomin.png) no-repeat -2px -2px;}
	.bank_pf{background:url(../../../static/images/banklogomin.png) no-repeat -81px -35px;}
	.bank_jt{background:url(../../../static/images/banklogomin.png) no-repeat -49px -19px;}
	.bank_zgms{background:url(../../../static/images/banklogomin.png) no-repeat -34px -19px;}
	.bank_pa{background:url(../../../static/images/banklogomin.png) no-repeat -65px -35px;}
	.bank_zg{background:url(../../../static/images/banklogomin.png) no-repeat -49px -2px;}
	.bank_gd{background:url(../../../static/images/banklogomin.png) no-repeat -81px -2px;}
	.bank_xy{background:url(../../../static/images/banklogomin.png) no-repeat -97px -2px;}
	.bank_zx{background:url(../../../static/images/banklogomin.png) no-repeat -2px -19px;}
	.bank_hx{background:url(../../../static/images/banklogomin.png) no-repeat -2px -35px;}
	.bank_zgyzcx{background:url(../../../static/images/banklogomin.png) no-repeat -49px -35px;}
	.bank_yl{background:url(../../../static/images/banklogomin.png) no-repeat -2px -50px;}
</style>