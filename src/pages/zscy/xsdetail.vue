<template>
	<div v-title data-title="证书查验">
		<!-- 头部 -->
		<heade :titlehead="headTitle"></heade>
		
		<div class="main">
			<table>
				<tr>
					<td class="msg_list" width="30%">班级名称</td>
					<td class="msg_detail">{{dataMsg.className}}</td>
				</tr>
				<tr>
					<td class="msg_list" width="30%">姓名</td>
					<td class="msg_detail">{{dataMsg.realname}}</td>
				</tr>
				<tr>
					<td class="msg_list" width="30%">身份证号</td>
					<td class="msg_detail">{{dataMsg.cardno}}</td>
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
					<td class="msg_detail">{{dataMsg.hasCredit}}</td>
				</tr>
				<tr>
					<td class="msg_list">操作</td>
					<td class="msg_detail"><router-link :to="{path:'/xsscan',query:{userId:dataMsg.userId,classId:dataMsg.classId}}">学时证明</router-link></td>
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
				headTitle:"证书查验",
				dataMsg:{},
				idNum:""                //学时证明标识id
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
				axios.post('/web/cert/findCreditById.html',params,config)
				.then(function(res){
					if(res.data.result == "0"){
						_this.openAlert("错误或者无数据");
					}else{
						_this.dataMsg=res.data.credit;
					}
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
	.main{width:100%;color:#1E1E1E;margin-top:.9rem;z-index: -1;}
	table {width:100%;border-collapse: collapse;background:#fff;}
	table tr td{height:40px;border-bottom: 1px solid #F2F1F2}
	.msg_list{padding-left: 3%}
	.msg_detail{padding-right: 3%;text-align: right;color:#B6B5B5}
	.msg_detail a{color:#78CAE2;}
</style>