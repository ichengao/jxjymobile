<template>
    <div v-title data-title="发票详情">
    
        <!-- 头部 -->
        <heade :titlehead="headTitle"></heade>

        <!-- 主体 -->
        <div class="main">
            <div class="tab_box">
                <table class="t_detail">
                    <tbody>
                        <tr>
                            <td class="list">发票批次：</td>
                            <td class="detail">{{invoiceList.invoiceBatch}}</td>
                        </tr>
                        <tr>
                            <td class="list">发票抬头：</td>
                            <td class="detail">{{invoiceList.invoiceHeader}}</td>
                        </tr>
                        <tr>
                            <td class="list">纳税人识别号：</td>
                            <td class="detail">{{invoiceList.identifyNum}}</td>
                        </tr>
                        <tr>
                            <td class="list">发票金额：</td>
                            <td class="detail">￥{{invoiceList.invoicePrice}}</td>
                        </tr>
                        <tr>
                            <td class="list">发票号：</td>
                            <td class="detail">{{invoiceList.invoiceNo}}</td>
                        </tr>
                        <tr>
                            <td class="list">发票状态：</td>
                            <td class="detail" v-show="invoiceList.invoiceState == '00'">发票作废</td>
                            <td class="detail" v-show="invoiceList.invoiceState == '01'">打印中</td>
                            <td class="detail" v-show="invoiceList.invoiceState == '02'">已打印</td>
                            <td class="detail" v-show="invoiceList.invoiceState == '03'">已领取</td>
                            <td class="detail" v-show="invoiceList.invoiceState == '04'">未打印</td>
                            <td class="detail" v-show="invoiceList.invoiceState == '05'">已寄送</td>
                            <td class="detail" v-show="invoiceList.invoiceState == '06'">未领取</td>
                        </tr>
                        <tr>
                            <td class="list">领取方式：</td> 
                            <td class="detail" v-show="invoiceList.receive == '00'">未领</td> 
                            <td class="detail" v-show="invoiceList.receive == '01'">自领</td> 
                            <td class="detail" v-show="invoiceList.receive == '02'">代领</td> 
                            <td class="detail" v-show="invoiceList.receive == '03'">邮寄</td> 
                            <td class="detail" v-show="invoiceList.receive == '04'">现场发放</td> 
                        </tr>
                        <tr>
                            <td class="list">代领状态：</td>
                            <td class="detail" v-show="invoiceList.leadState == '00'">无</td>
                            <td class="detail" v-show="invoiceList.leadState == '01'">申请代领</td>
                            <td class="detail" v-show="invoiceList.leadState == '02'">同意代领</td>
                            <td class="detail" v-show="invoiceList.leadState == '03'">不同意代领</td>
                        </tr>
                        <tr>
                            <td class="list">姓名：</td>
                            <td class="detail">{{sysUserList.realname}}</td>
                        </tr>
                        <tr>
                            <td class="list">身份证：</td>
                            <td class="detail">{{sysUserList.cardno}}</td>
                        </tr>
                        <tr>
                            <td class="list">运单号：</td>
                            <td class="detail">{{eOrderExpressList.expressNo}}</td>
                        </tr>
                        <tr>
                            <td class="list">运单金额：</td>
                            <td class="detail">{{eOrderExpressList.expressTotalMoney}}</td>
                        </tr>
                        <tr>
                            <td class="list">支付金额：</td>
                            <td class="detail" v-show="eOrderExpressList.expressState == '20'">{{eOrderExpressList.expressPrice}}</td>
                        </tr>
                        <tr>
                            <td class="list">支付方式：</td>
                            <td class="detail" v-show="eOrderExpressList.expressState == '20' && eOrderExpressList.expressPayType == '00'">其他</td>
                            <td class="detail" v-show="eOrderExpressList.expressState == '20' && eOrderExpressList.expressPayType == '01'">在线支付</td>
                            <td class="detail" v-show="eOrderExpressList.expressState == '20' && eOrderExpressList.expressPayType == '02'">学习账户</td>
                            <td class="detail" v-show="eOrderExpressList.expressState == '20' && eOrderExpressList.expressPayType == '03'">现金面付</td>
                            <td class="detail" v-show="eOrderExpressList.expressState == '20' && eOrderExpressList.expressPayType == '04'">银行汇款</td>
                            <td class="detail" v-show="eOrderExpressList.expressState == '20' && eOrderExpressList.expressPayType == '05'">邮政汇款</td>
                            <td class="detail" v-show="eOrderExpressList.expressState == '20' && eOrderExpressList.expressPayType == '06'">支付宝</td>
                            <td class="detail" v-show="eOrderExpressList.expressState == '20' && eOrderExpressList.expressPayType == '07'">微信</td>
                        </tr>
                        <tr>
                            <td class="list">支付时间：</td>
                            <td class="detail" v-show="eOrderExpressList.expressState == '20'">{{eOrderExpressList.expressPayTime}}</td>
                        </tr>
                        <tr>
                            <td class="list">支付渠道：</td>
                            <td class="detail" v-show="eOrderExpressList.expressState == '20' && eOrderExpressList.expressPaySource == '01'">电脑web</td>
                            <td class="detail" v-show="eOrderExpressList.expressState == '20' && eOrderExpressList.expressPaySource == '02'">手机网站</td>
                            <td class="detail" v-show="eOrderExpressList.expressState == '20' && eOrderExpressList.expressPaySource == '03'">手机app</td>
                        </tr>
                        <tr>
                            <td class="list">减免清单：</td>
                            <td class="detail" v-show="eOrderExpressList.expressAccountMoney > 0">
                            减免金额:￥{{eOrderExpressList.expressAccountMoney}}元，减免方式:学习账户
                            </td>
                            <td class="detail" v-show="eOrderExpressList.expressIntegralMoney > 0">
                            减免金额:￥{{eOrderExpressList.expressIntegralMoney}}元，减免方式:积分抵用
                            </td>
                        </tr>
                        <tr>
                            <td class="list">支付状态：</td>
                            <td class="detail" v-show="eOrderExpressList.expressState == '00'">无</td>
                            <td class="detail" v-show="eOrderExpressList.expressState == '01'">未付款</td>
                            <td class="detail" v-show="eOrderExpressList.expressState == '02'">付款中</td>
                            <td class="detail" v-show="eOrderExpressList.expressState == '20'">已付款</td>
                        </tr>
                        <tr>
                            <td class="list">收件信息：</td>
                            <!--
                            <td class="detail" v-show="eOrderExpressList.expressState == '20'">
                            收件人:{{eOrderExpressList.addressName}},电话:{{eOrderExpressList.addressPhone }},地区:{{eOrderExpressList.addressArea }},地址:{{eOrderExpressList.addressDesc }}
                            </td>
                            -->
                            <td class="detail" v-show="eOrderExpressList.expressState == '01' || eOrderExpressList.expressState == '02' || eOrderExpressList.expressState == '20'">
                            收件人:{{eOrderExpressList.addressName}},电话:{{eOrderExpressList.addressPhone }},地区:{{eOrderExpressList.addressArea }},地址:{{eOrderExpressList.addressDesc }}
                            </td>
                        </tr>
                        <tr>
                            <td class="list">物流号：</td>
                            <td class="detail">{{eOrderExpressList.lodisticeNo}}</td>
                        </tr>
                        <tr>
                            <td class="list">报名订单：</td>
                            <td class="detail">{{invoiceList.invoiceOrdno}}</td>
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

export default {
    data() {
        return {
            headTitle: '发票详情',
            invoiceList: [],
            sysUserList: [],
            eOrderExpressList: []
        }
    },
    components: {
        heade
    },
    created() {
        this.getData();    
    },
    methods: {
        getData() {
            var _this=this;

            var params={'invoiceId':this.$route.query.invoiceId};
            axios.post('/invoice/toEOrderInvoiceDetail.do',params,config)
            .then(function(res){
                _this.invoiceList = res.data.eOrderInvoice;
                // _this.sysUserList = res.data.eOrderInvoice.sysUser;
                _this.sysUserList = res.data.eOrderInvoice.sysUserLead;
                _this.eOrderExpressList = res.data.eOrderInvoice.eOrderExpress;
            });
        },
    },
}
</script>

<style scoped>

  .main{margin-top: .9rem;padding-bottom: 50px;}
  .t_detail,.course_list{background:#fff;padding:0 5px;border-top:1px solid #e6e6e6;border-bottom:1px solid #e6e6e6;}
  .list{width:30%;text-align: center;color:#000;}
  .detail{padding-left: 5px;}
  table.t_detail{width:100%;border-collapse: collapse;}
  table.t_detail td{border-bottom: 1px dashed #eee;height:40px;word-break: break-all;}
</style>
