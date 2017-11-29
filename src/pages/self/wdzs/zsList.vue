<template>
	<div v-title data-title="我的证书">
		<!-- 头部 -->
		<heade :titlehead="headTitle"></heade>
		<div class="main">
			<div align='center' style='margin-top:50px' v-show="!isHaveData">暂无数据！</div>
			<ul v-show='isHaveData'>
				<li v-for="msg in dataMsg">
					<p class="zs_code" v-if="flag != '01'"><span>证书编号：{{msg.certNo}}</span><router-link class="right" :name="msg.id" :to="{path:'/myZsDetail',query:{id:msg.id}}">查看详情</router-link></p>
					<p class="zs_code" v-if="flag == '01'"><span>证书编号：{{msg.certNo}}</span><router-link :to="{path:'/zsscan',query:{id:msg.id}}">查看证书</router-link></p>
					<p class="zs_name">证书名称：{{msg.certName}}</p><p class="zs_name">年度：{{msg.year}}</p>
					<p class="zs_name" v-if="msg.trainClass == null && msg.certType ==='0701'">类型：共需</p>
					<p class="zs_name" v-if="msg.trainClass == null && msg.certType ==='0702'">类型：专业</p>
					<p class="zs_name" v-if="msg.trainClass == null && msg.certType ==='0703'">类型：转岗</p>
                    <p class="zs_name" v-if="msg.trainClass != null">类型：{{msg.trainClass.trainProject.sysCode.sysCode.codeName}}</p>
					<p class="zs_name">完成学时：{{msg.credit}}</p>
					<p class="zs_name" v-if="flag != '01'" v-show="msg.printFlag == '01'">打印状态：未打印</p>
					<p class="zs_name" v-if="flag != '01'" v-show="msg.printFlag == '02'">打印状态：打印中</p>
					<p class="zs_name" v-if="flag != '01'" v-show="msg.printFlag == '03'">打印状态：已寄送</p>
					<p class="zs_name" v-if="flag != '01'" v-show="msg.printFlag == '04'">打印状态：已打印</p>
					<p class="zs_name" v-if="flag != '01'" v-show="msg.printFlag == '09'">打印状态：已领取</p>
				</li>
			</ul>
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
			return{
			    dataMsg:{},
			    flag:'',
				headTitle:"我的证书",
				isHaveData:true,               //是否有数据
			}
		},
		components:{
			heade,
			foote
		},
		created(){
		    this.getData();
			this.setHeaderBackBtn();
		},
		methods:{
		    // 证书查询
            getData(){
                var _this=this;
                var params={};
                axios.post("/web/cert/doMyCertVerify.do",params,config)
                .then(function(res){
                    var ret=res.data.result;
                    switch(ret){
                        case "0" :
                            _this.openAlert("系统其他错误");
                            break;
                        case "1" :
                            if(res.data.trainCertList.length == 0){
                                // 姓名和身份证不匹配的时候无法查询到证书信息
                                _this.openAlert("无证书信息");
                            } else {
                                _this.dataMsg=res.data.trainCertList;
                                _this.flag=res.data.flag;
                            }
                            break;
                        case "3" :
                            _this.isHaveData=false;
                            break;
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
	.main{width:100%;color:#1E1E1E;margin-top:.9rem;z-index: -1;padding-top:5px;min-height: 700px;}
	.main ul li{width:100%;background:#fff;border-top: 1px solid #EBEAEA;border-bottom: 1px solid #EBEAEA;margin-bottom: 10px;}
	.main ul li p{height:35px;line-height:35px;padding:0 3%;}
	.zs_code{border-bottom:1px solid #EBEAEA; }
	.zs_code a{color:#3B9ACC;padding:0 0 0 10px;border-left: 1px solid #EBEAEA;height:30px;line-height: 30px;margin-top: 2.5px;}
	.zs_name{color:#A09F9F;}
</style>