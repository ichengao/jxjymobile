<template>
    <div v-title data-title="发票列表">
    
        <!-- 头部 -->
        <heade :titlehead="headTitle"></heade>
    
        <!-- 主体 -->
        <div class="ddlb">

            <div class="main">
                <div style="height:10px;"></div>
                <!-- 发票列表 -->
                <div style="text-align:center;margin-top:50px" v-show="!isHaveData">暂无数据！</div>

                <div class="tab_box"  v-show="isHaveData" v-for="invoice in invoiceList">
                    <p class="tab_header tab_header_first">运单编号 : {{invoice.eOrderExpress.expressNo}}</p>
                    <p class="tab_header">发票批次 : {{invoice.invoiceBatch}}</p>
                    <div class="tab_line"></div>

                    <router-link :to="{path:'/invoiceDetail',query:{'invoiceId':invoice.id}}">
                        <table class="tab_content_box">
                            <tr>
                                <td>
                                    <p class="tab_content" >发票抬头 : {{invoice.invoiceHeader}}</p>
                                </td>
                                <td rowspan='5'><img src="../../../../static/images/dianjiann.png" alt="安徽继续教育网" width="15px"></td>
                            </tr>
                            <tr>
                                <td>
                                    <p class="tab_content">发票金额 : <span>￥{{invoice.invoicePrice}}</span></p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p class="tab_content" v-show="invoice.invoiceState == '00'">发票状态 : 发票作废</p>
                                    <p class="tab_content" v-show="invoice.invoiceState == '01'">发票状态 : 打印中</p>
                                    <p class="tab_content" v-show="invoice.invoiceState == '02'">发票状态 : 已打印</p>
                                    <p class="tab_content" v-show="invoice.invoiceState == '03'">发票状态 : 已领取</p>
                                    <p class="tab_content" v-show="invoice.invoiceState == '04'">发票状态 : 未打印</p>
                                    <p class="tab_content" v-show="invoice.invoiceState == '05'">发票状态 : 已寄送</p>
                                    <p class="tab_content" v-show="invoice.invoiceState == '06'">发票状态 : 未领取</p>
                                    <p class="tab_content" v-show="invoice.invoiceState == undefined || invoice.invoiceState == ''">发票状态 : </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p class="tab_content" v-show="invoice.receive == '00'">领取方式 : 未领</p>
                                    <p class="tab_content" v-show="invoice.receive == '01'">领取方式 : 自领</p>
                                    <p class="tab_content" v-show="invoice.receive == '02'">领取方式 : 代领</p>
                                    <p class="tab_content" v-show="invoice.receive == '03'">领取方式 : 邮寄</p>
                                    <p class="tab_content" v-show="invoice.receive == '04'">领取方式 : 现场发送</p>
                                    <p class="tab_content" v-show="invoice.receive == undefined || invoice.receive == ''">领取方式 : </p>
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    <p class="tab_content" v-show="invoice.eOrderExpress.expressState == '00'">支付状态 : 无</p>
                                    <p class="tab_content" v-show="invoice.eOrderExpress.expressState == '01'">支付状态 : 未付款</p>
                                    <p class="tab_content" v-show="invoice.eOrderExpress.expressState == '02'">支付状态 : 付款中</p>
                                    <p class="tab_content" v-show="invoice.eOrderExpress.expressState == '20'">支付状态 : 已付款</p>
                                    <p class="tab_content" v-show="invoice.eOrderExpress.expressState == undefined || invoice.eOrderExpress.expressState == ''">支付状态 : </p>
                                </td>
                            </tr>
                        </table>
                    </router-link>
          
                    <div class="clear"></div>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
    import heade from '@/components/common/header'
    import axios from "axios"
    import config from "@/api/base.js";
    import { MessageBox } from 'mint-ui';
    import { Toast } from 'mint-ui';

    export default {
        name: 'invoiceList',
        data() {
            return {
                headTitle: '我的发票',
                invoiceList: [],
                isHaveData: true //是否有数据
            }
        },
        components: {
            heade
        },
        methods: {
            getData() {
                var _this=this;

                var params={};
                axios.post('/invoice/toEOrderInvoiceList.do',params,config)
                .then(function(res){
                    if (res.data.result == 1) {
                        _this.invoiceList = res.data.eOrderInvoiceList;
                        // 判断是否有数据
                        _this.isHaveData = (res.data.eOrderInvoiceList.length == 0)?false:true;
                    } else {
                        _this.isHaveData = false;
                    }
                })
            },
            getInvoiceByState(state) {
                var _this=this;
                var params={'invoiceState':state};
                axios.post('/invoice/toEOrderInvoiceList.do',params,config)
                .then(function(res){
                    if (res.data.result == 1) {
                        _this.invoiceList = res.data.eOrderInvoiceList;
                        // 判断是否有数据
                        _this.isHaveData = (res.data.eOrderInvoiceList.length == 0)?false:true;
                    }else{
                        _this.isHaveData = false;
                    }
                })
            },
        },
        created() {
            this.getData();
        },
    }
</script>

<style scoped>
  .ddlb{margin-top: .9rem;padding-bottom: 50px;}
  .main table{width:100%;border-collapse: collapse;}
  .tab_box{padding:10px 5px;background:#fff;border-top:1px solid #e6e6e6;border-bottom:1px solid #e6e6e6;margin-bottom: 10px;width:100%;position: relative;}
  .tab_line{height:3px;border-top: 1px solid #FCE2BA;border-bottom: 1px solid #FCE2BA;margin: 5px 0;}
  .tab_header{font-size: 0.28rem;color:#000;margin-top: 5px;}
  .tab_header_first{margin-top: 0 !important;}
  .tab_content{margin-bottom: 3px;font-size: 0.28rem}

  .tab_line1{height:3px;border-top: 1px solid #8D8D8D;margin: 5px 0;}
  .tab_btn{text-align: right;}
  .tab_btn button{padding:5px 10px;background:#bdbdbd;color:#fff;margin-right:5px;border-radius: 3px;-webkit-border-radius: 3px;-moz-border-radius: 3px;}
  .tab_btn button.invoice_head{background:#EB681A;}
</style>
