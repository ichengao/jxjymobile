<template>
	<div v-title data-title="证书查验">
		<!-- 头部 -->
		<heade :titlehead="headTitle"></heade>
		<div class="main">
			<ul>
				<li v-for="msg in dataMsg">
					<p class="zs_code"><span>证书编号：{{msg.certNo}}</span><router-link class="right" :name="msg.id" :to="{path:'zsdetail',query:{id:msg.id}}">查看详情</router-link></p>
					<p class="zs_name">证书名称：{{msg.certName}}</p>
				</li>
			</ul>
		</div>
		
		<!-- 底部 -->
		<!-- <foote></foote> -->
	</div>
</template>
<script>
	import heade from '@/components/common/header'
	import foote from '@/components/common/footer'
	import axios from "axios"
	import config from "@/api/base.js";
	import { MessageBox } from 'mint-ui';
	import { mapGetters } from 'vuex'
	export default{
		data(){
			return{
				headTitle:"证书查验列表"
			} 
		},
		components:{
			heade,
			foote
		},
		computed:{
			...mapGetters({
				dataMsg:"zsData"
			})
		},
		created(){
			this.setHeaderBackBtn();
		},
		methods:{
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
	.main{width:100%;color:#1E1E1E;margin-top:.9rem;z-index: -1;padding-top:5px;}
	.main ul li{width:100%;background:#fff;border-top: 1px solid #EBEAEA;border-bottom: 1px solid #EBEAEA;margin-bottom: 5px;}
	.main ul li p{height:35px;line-height:35px;padding:0 3%;}
	.zs_code{border-bottom:1px solid #EBEAEA; }
	.zs_code a{color:#3B9ACC;padding:0 0 0 10px;border-left: 1px solid #EBEAEA;height:30px;line-height: 30px;margin-top: 2.5px;}
	.zs_name{color:#A09F9F;}
</style>