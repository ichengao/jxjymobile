<template>
    <div v-title data-title="证书详情">
        <!-- 头部 -->
        <heade :titlehead="headTitle"></heade>

        <div class="main">
            <table>
                <tr>
                    <td class="msg_list" width="28%">证书名称</td>
                    <td class="msg_detail">{{dataMsg.certName}}</td>
                </tr>
                <tr>
                    <td class="msg_list" width="28%">证书编号</td>
                    <td class="msg_detail">{{dataMsg.certNo}}</td>
                </tr>
                <tr>
                    <td class="msg_list">年度</td>
                    <td class="msg_detail">{{dataMsg.year}}</td>
                </tr>
                <tr>
                    <td class="msg_list">类型</td>
                    <td class="msg_detail">{{dataMsg.codeName}}</td>
                </tr>
                <tr>
                    <td class="msg_list">完成学时</td>
                    <td class="msg_detail">{{dataMsg.credit}}</td>
                </tr>
                <tr>
                    <td class="msg_list" width="28%">证书状态</td>
                    <td class="msg_detail" v-show="dataMsg.printFlag == '01'">未打印</td>
                    <td class="msg_detail" v-show="dataMsg.printFlag == '02'">打印中</td>
                    <td class="msg_detail" v-show="dataMsg.printFlag == '03'">已寄送</td>
                    <td class="msg_detail" v-show="dataMsg.printFlag == '04'">已打印</td>
                    <td class="msg_detail" v-show="dataMsg.printFlag == '09'">已领取</td>
                </tr>
                <tr>
                    <td class="msg_list" width="28%">领取方式</td>
                    <td class="msg_detail" v-show="dataMsg.receiveType == ''||dataMsg.receiveType == null||dataMsg.receiveType == '00'">未领</td>
                    <td class="msg_detail" v-show="dataMsg.receiveType == '01'">自领</td>
                    <td class="msg_detail" v-show="dataMsg.receiveType == '02'">代领</td>
                    <td class="msg_detail" v-show="dataMsg.receiveType == '03'">邮寄</td>
                    <td class="msg_detail" v-show="dataMsg.receiveType == '04'">现场发放</td>
                </tr>
                <tr v-if="dataMsg.receiveType == '02'">
                    <td class="msg_list" width="28%">代领状态</td>
                    <td class="msg_detail" v-show="dataMsg.leadState == ''||dataMsg.leadState == null||dataMsg.leadState == '00'">无</td>
                    <td class="msg_detail" v-show="dataMsg.leadState == '01'">申请代领</td>
                    <td class="msg_detail" v-show="dataMsg.leadState == '02'">同意代领</td>
                    <td class="msg_detail" v-show="dataMsg.leadState == '03'">不同意代领</td>
                </tr>
                <tr v-if="dataMsg.receiveType == '02' &&(dataMsg.leadState == '01' || dataMsg.leadState == '02')">
                    <td class="msg_list" width="28%">代领人姓名</td>
                    <td class="msg_detail">{{dataMsg.sysUserLead.realname}}</td>
                </tr>
                <tr v-if="dataMsg.receiveType == '02' && (dataMsg.leadState == '01' || dataMsg.leadState == '02')">
                    <td class="msg_list" width="28%">代领人身份证</td>
                    <td class="msg_detail">{{dataMsg.sysUserLead.cardno}}</td>
                </tr>
                <tr v-if="dataMsg.receiveType == '02'">
                    <td class="msg_list" width="28%">被代领人姓名</td>
                    <td class="msg_detail">{{dataMsg.sysUser.realname}}</td>
                </tr>
                <tr v-if="dataMsg.receiveType == '02'">
                    <td class="msg_list" width="35%">被代领人身份证</td>
                    <td class="msg_detail">{{dataMsg.sysUser.cardno}}</td>
                </tr>
                <tr v-if="dataMsg.eOrderExpress != null">
                    <td class="msg_list" width="28%">运单号</td>
                    <td class="msg_detail">{{dataMsg.eOrderExpress.expressNo}}</td>
                </tr>
                <tr v-if="dataMsg.eOrderExpress != null">
                    <td class="msg_list">运单金额</td>
                    <td class="msg_detail">{{dataMsg.eOrderExpress.expressTotalMoney}}</td>
                </tr>
                <tr v-if="dataMsg.eOrderExpress != null">
                    <td class="msg_list" width="28%">支付金额</td>
                    <td class="msg_detail">{{dataMsg.eOrderExpress.expressPrice}}</td>
                </tr>
                <tr v-if="dataMsg.eOrderExpress != null">
                    <td class="msg_list" width="28%">支付方式</td>
                    <td class="msg_detail" v-show="dataMsg.eOrderExpress.expressPayType == '01'">在线支付</td>
                    <td class="msg_detail" v-show="dataMsg.eOrderExpress.expressPayType == '02'">学习帐户</td>
                    <td class="msg_detail" v-show="dataMsg.eOrderExpress.expressPayType == '03'">现金面付</td>
                    <td class="msg_detail" v-show="dataMsg.eOrderExpress.expressPayType == '04'">银行汇款</td>
                    <td class="msg_detail" v-show="dataMsg.eOrderExpress.expressPayType == '05'">邮局汇款</td>
                    <td class="msg_detail" v-show="dataMsg.eOrderExpress.expressPayType == '06'">支付宝</td>
                    <td class="msg_detail" v-show="dataMsg.eOrderExpress.expressPayType == '07'">微信</td>
                    <td class="msg_detail" v-show="dataMsg.eOrderExpress.expressPayType == '00'">其他</td>
                </tr>
                <tr v-if="dataMsg.eOrderExpress != null">
                    <td class="msg_list" width="28%">支付时间</td>
                    <td class="msg_detail">{{dataMsg.eOrderExpress.expressPayTime}}</td>
                </tr>
                <tr v-if="dataMsg.eOrderExpress != null">
                    <td class="msg_list">支付渠道</td>
                    <td class="msg_detail" v-show="dataMsg.eOrderExpress.expressPaySource == '01'">电脑web</td>
                    <td class="msg_detail" v-show="dataMsg.eOrderExpress.expressPaySource == '02'">手机app</td>
                    <td class="msg_detail" v-show="dataMsg.eOrderExpress.expressPaySource == '03'">手机app网站</td>
                </tr>
                <tr v-if="dataMsg.eOrderExpress != null">
                    <td class="msg_list" width="28%">减免清单</td>
                    <td class="msg_detail" v-show="dataMsg.eOrderExpress.expressAccountMoney > 0">减免金额:{{dataMsg.eOrderExpress.expressAccountMoney }}元,减免方式:学习账户</td>
                    <td class="msg_detail" v-show="dataMsg.eOrderExpress.expressIntegral > 0">减免金额:{{dataMsg.eOrderExpress.expressIntegral/30}}元,减免方式:积分抵用</td>
                </tr>
                <tr v-if="dataMsg.eOrderExpress != null">
                    <td class="msg_list" width="28%">支付状态</td>
                    <td class="msg_detail" v-show="dataMsg.eOrderExpress.expressState == '00'">无</td>
                    <td class="msg_detail" v-show="dataMsg.eOrderExpress.expressState == '01'">未付款</td>
                    <td class="msg_detail" v-show="dataMsg.eOrderExpress.expressState == '20'">已付款</td>
                </tr>
                <tr v-if="dataMsg.eOrderExpress != null">
                    <td class="msg_list" width="28%">收件人</td>
                    <td class="msg_detail">{{dataMsg.eOrderExpress.addressName}}</td>
                </tr>
                <tr v-if="dataMsg.eOrderExpress != null">
                    <td class="msg_list" width="28%">联系电话</td>
                    <td class="msg_detail">{{dataMsg.eOrderExpress.addressPhone}}</td>
                </tr>
                <tr v-if="dataMsg.eOrderExpress != null">
                    <td class="msg_list" width="28%">所在地区</td>
                    <td class="msg_detail">{{addressArea}}</td>
                </tr>
                <tr v-if="dataMsg.eOrderExpress != null">
                     <td class="msg_list" width="28%">收件地址</td>
                     <td class="msg_detail">{{dataMsg.eOrderExpress.addressDesc}}</td>
                 </tr>
                <tr v-if="dataMsg.eOrderExpress != null">
                    <td class="msg_list">物流号</td>
                    <td class="msg_detail">{{dataMsg.eOrderExpress.lodisticeNo}}</td>
                </tr>
                <tr>
                    <td class="msg_list">操作</td>
                    <td class="msg_detail"><router-link :to="{path:'zsscan',query:{id:idNum}}">查看证书</router-link></td>
                </tr>
            </table>
        </div>

        <!-- 底部 -->
        <foote></foote>
    </div>
</template>
<script>
    import heade from '@/components/common/header'
    import foote from '@/components/common/footer'
    import axios from "axios"
    import config from "@/api/base.js";
    import { MessageBox } from 'mint-ui';
    export default{
        data(){
            return {
                headTitle:"证书详情",
                dataMsg:{},
                idNum:"",                //证书标识id
                addressArea:""
            }
        },
        components:{
            heade,
            foote
        },
        created(){
            this.setHeaderBackBtn();
            this.getData();
        },
        methods:{
            getData(){
                var _this=this;
                _this.idNum=this.$route.query.id;
                var params={"id":_this.idNum}
                axios.post('/web/cert/findCertDetailById.html',params,config)
                .then(function(res){
                    if(res.data.result == "0")
                        _this.openAlert("错误或者无数据");
                    else{
                        _this.dataMsg=res.data.cert;
                        _this.dataMsg.codeName=_this.dataMsg.trainClass.trainProject.sysCode.sysCode.codeName;
                        _this.addressArea=res.data.addressArea;
                        if(_this.dataMsg.sysUserLead == null){
                            _this.dataMsg.sysUserLead={'realname':'','cardno':''};
                        }
                    };
                });
            },
            // 设置是否显示头部返回按钮
            setHeaderBackBtn(){
                this.$store.commit('showHeaderBack',true);
            },
            // 弹框提示
            openAlert(a) {                           
                MessageBox.alert(a, '提示');
            }
        }
    }
</script>
<style scoped>
    .main{width:100%;color:#1E1E1E;margin-top:.9rem;z-index: -1;background: #fff}
    table {width:100%;border-collapse: collapse;}
    table tr td{height:40px;border-bottom: 1px solid #F2F1F2}
    .msg_list{padding-left: 3%}
    .msg_detail{padding-right: 3%;text-align: right;color:#B6B5B5}
    .msg_detail a{color:#78CAE2;}
</style>