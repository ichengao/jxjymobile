<!-- 验证码组件 -->
<template>
	<img :src="getUuid()" alt="安徽继续教育网">
</template>
<script>
	import axios from "axios";
	import config from "@/api/base.js";
	export default{
		data(){
			return{
				uuid:"",                     //验证码标示
				num:0,
				yzmCode:''                   //验证码                 
			}
		},
		created(){
			this.getUuid();
		},
		computed:{
			codeChange(){
				return this.GLOBAL.urlBase+'/getValideCode.html?uuid='+this.uuid+'&n='+this.$store.state.codeNum;
			}
		},
		methods:{
			getUuid(){
				var _this=this;

				// 获取uuid标示符，如果没有就获取，如果有直接发送
				var uuid=sessionStorage.getItem("uuid");
				if(uuid == null || uuid == "" || uuid == undefined){
					axios.post('/getUuid.html',{},config)
					.then(function(res){
						sessionStorage.setItem("uuid",res.data.uuid);
						_this.uuid=sessionStorage.getItem("uuid");
						// 刷新页面同时加时间戳，用来防止微信页面缓存导致的页面不刷新
						var tt=Date.parse(new Date());
						window.location.href=_this.$route.fullPath+'?t='+tt;
						// _this.$router.replace(_this.$route.fullPath+'?t='+tt);
					});
				}else{
					_this.uuid=sessionStorage.getItem("uuid");
					_this.needFresh=false;
					return _this.codeChange;
				};
			}
		}
	}
</script>