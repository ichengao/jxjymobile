<template>
	<div v-title data-title="订单详情">
		<!-- 头部 -->
		<heade :titlehead="headTitle"></heade>

		<!-- 详情 -->
		<div class="main">
			<div class="tab_box">
				<table class="t_detail">
		            <tbody>
		                <tr>
		                    <td class="list">订单编号：</td>
		                    <td class="detail">{{dataMsg.ordNo}}</td>
		                </tr>
		                <tr>
		                    <td class="list">订单金额：</td>
		                    <td class="detail">￥{{dataMsg.ordTotalMoney}}</td>
		                </tr>
		                <tr v-show="dataMsg.ordStatus != '01'">
		                    <td class="list">支付金额：</td>
		                    <td class="detail">￥{{dataMsg.ordMoneysum}}</td>
		                </tr>
		                <tr v-show="dataMsg.ordStatus != '01'">
		                    <td class="list">支付方式：</td>
		                    <td class="detail" v-show="dataMsg.ordPaytype == '01' ">在线支付</td>
		                    <td class="detail" v-show="dataMsg.ordPaytype == '02' ">学习账户</td>
		                    <td class="detail" v-show="dataMsg.ordPaytype == '03' ">现金面付</td>
		                    <td class="detail" v-show="dataMsg.ordPaytype == '04' ">银行汇款</td>
		                    <td class="detail" v-show="dataMsg.ordPaytype == '05' ">邮局汇款</td>
		                    <td class="detail" v-show="dataMsg.ordPaytype == '06' ">支付宝</td>
							<td class="detail" v-show="dataMsg.ordPaytype == '07' ">手机支付（支付宝）</td>
							<td class="detail" v-show="dataMsg.ordPaytype == '0901' ">微信公众号</td>
							<td class="detail" v-show="dataMsg.ordPaytype == '0902' ">微信WAP</td>
							<td class="detail" v-show="dataMsg.ordPaytype == '08' ">刷卡支付</td>
							<td class="detail" v-show="dataMsg.ordPaytype == '00' ">其它</td>
		                </tr>
		                <tr v-show="dataMsg.ordStatus != '01'">
		                    <td class="list">支付时间：</td>
		                    <td class="detail" v-show="dataMsg.ordPaytime != null ">{{dataMsg.ordPaytime}}</td>
		                    <td class="detail" v-show="dataMsg.ordPaytime == null ">无</td>
		                </tr>
		                <tr v-show="dataMsg.ordStatus != '01'">
		                    <td class="list">支付渠道：</td>
		                    <td class="detail" v-show="dataMsg.ordPaySource == '01' ">电脑web</td>
		                    <td class="detail" v-show="dataMsg.ordPaySource == '02' ">手机网站</td>
		                    <td class="detail" v-show="dataMsg.ordPaySource == '03' ">手机app</td>
		                </tr>
		                <tr>
		                    <td class="list">减免清单：</td>
		                    <td class="detail" v-show="dataMsg.ordAccountMoney != 0 ">减免金额：{{dataMsg.ordAccountMoney}}元</td>
		                    <td class="detail" v-show="dataMsg.ordIntegralMoney != 0 ">减免金额：{{dataMsg.ordIntegralMoney}}元</td>
		                    <td class="detail" v-show="(dataMsg.ordIntegralMoney == 0) && (dataMsg.ordAccountMoney == 0) ">减免金额：0元</td>
		                </tr>
		                <tr>
		                    <td class="list">减免方式：</td>
		                    <td class="detail" v-show="dataMsg.ordAccountMoney != 0 ">学习账户抵用</td>
		                    <td class="detail" v-show="dataMsg.ordIntegralMoney != 0 ">积分抵用</td>
		                    <td class="detail" v-show="(dataMsg.ordIntegralMoney == 0) && (dataMsg.ordAccountMoney == 0) ">无</td>
		                </tr>
		                <tr>
		                    <td class="list">支付状态：</td>
		                    <td class="detail" v-show="dataMsg.ordStatus == '01' ">未支付</td>
		                    <td class="detail" v-show="dataMsg.ordStatus == '20' ">已支付</td>
		                    <td class="detail" v-show="dataMsg.ordStatus == '10' ">无</td>
		                    <td class="detail" v-show="dataMsg.ordStatus == '11' ">无</td>
		                </tr>
		                <tr>
		                    <td class="list">订单类型：</td>
		                    <td class="detail" v-show="dataMsg.ordType == '01' ">个人</td>
		                    <td class="detail" v-show="dataMsg.ordType == '02' ">集体</td>
		                    <td class="detail" v-show="dataMsg.ordType == '03' ">机构</td>
		                </tr>
		                <tr>
		                    <td class="list">生成发票：</td>
		                    <td class="detail" v-show="dataMsg.invoiceClainType == '01' ">否</td>
		                    <td class="detail" v-show="dataMsg.invoiceClainType == '02' ">是</td>
		                </tr>
		                <tr>
		                    <td class="list">发票批次：</td>
		                    <td class="detail" v-show="dataMsg.invoiceBatch == '' ">无</td>
		                    <td class="detail" v-show="dataMsg.invoiceBatch != '' ">{{dataMsg.invoiceBatch}}</td>
		                </tr>
		            </tbody>
		        </table>

		        <table class="course_list">
		            <thead>
		                <tr>
		                    <td>班级</td>
		                    <td>课程/考试</td>
		                </tr>
		            </thead>
		            <tbody>
		                <tr v-for="msg in dataMsg.orderDetailList">
		                    <td>{{msg.trainClass.className}}</td>
		                    <td>{{msg.resCourse.cname}}</td>
		                </tr>
						<tr v-for="msg in dataMsg.independentExamList">
		                    <td>{{msg.trainClass.className}}</td>
		                    <td>{{msg.examQuiz.name}}</td>
		                </tr>
		            </tbody>
		        </table>
			</div>
		</div>
	</div>
</template>
<script>
	import heade from '@/components/common/header'
	import axios from "axios"
	import config from "@/api/base.js";
	export default{
		data(){
			return{
				headTitle:'订单详情',     //头部信息
				dataMsg:{},
			}
		},
		components:{
			heade,
		},
		created(){
			this.setHeaderBackBtn();
			this.getData();
		},
		methods:{
			getData(){
				var _this=this;
				var params={'orderId':_this.$route.query.orderId};
				axios.post('/order/toOrderDetail.do',params,config)
				.then(function(res){
					_this.dataMsg=res.data;
				});
			},
			// 设置是否显示头部返回按钮
			setHeaderBackBtn(){
				this.$store.commit('showHeaderBack',true);
			},
		}
	}
</script>
<style scoped>
	.main{margin-top: .9rem;padding-bottom: 30px;}
	.t_detail,.course_list{background:#fff;padding:0 5px;border-top:1px solid #e6e6e6;border-bottom:1px solid #e6e6e6;}
	.list{width:25%;text-align: center;color:#000;}
    .detail{padding-left: 5px;}
    table.t_detail{width:100%;border-collapse: collapse;}
    table.t_detail td{border-bottom: 1px dashed #eee;height:40px;}

    .course_list{padding:0 5px;margin-top:20px;border-collapse: collapse;padding-top: 2px;border-top:1px solid #e6e6e6;border-bottom:1px solid #e6e6e6;width:100%;}
    .course_list thead td{color:#000;}
    .course_list td{border:1px solid  #eee;height:32px;padding:5px;}
    .course_list tbody tr td{border-bottom: 1px solid #F0EFEF;width:50%;}
    .course_list tbody tr:last-child td{border-bottom:0;}
    .course_list thead tr td{text-align: center;}
</style>