<template>
	<div class="header">
		<table width="100%" class="head_table">
			<tr>
				<td width="25%" align='left'>
					<!-- 返回按钮 -->
			        <div class="back left" @click="backPrev" v-show='backBtn'>
			            <img src="/static/images/fff.png" alt="安徽继续教育网" style="height:0.35rem;display:block">
			        </div>
					
					<!-- 切换地区 -->
					<div class="area_select" v-show="!backBtn" ref="cityBox">
						<p>
							<span style="color:#fff;font-size:0.28rem;">[</span><span ref="citySelected" :name="chosedCity.split('?')[1]" @click="showCity" class="hover">{{chosedCity.split('?')[0]}}</span><span style="color:#fff;font-size:0.28rem;">]</span> <!-- <b class="left">﹀</b> -->
						</p>
						<div class="clear"></div>
					</div>
					<div class="area_select_box">
						<div class="trangle_box"></div>
						<ul>
							<li>
		                        <p name="34" @click="chooseCity">安徽</p>
		                    </li>
							<li v-for="msg in dataMsg">
								<p :name="msg.codeid" @click="chooseCity">{{msg.cityname}}</p>
							</li>

							<div class="clear"></div>
						</ul>
					</div>
					<div class="pool_box" @click="hideCity"></div>
				</td>
				<td width="50%" align='center'>
					<!-- 标题 -->
        			<p class="title_head">{{titlehead}}</p>
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
</template>
<script>
	import axios from "axios";
	import config from "@/api/base.js";  
	export default {
		data(){
			return{
				dataMsg:{},
				getOnce:true,              //是否第一次调用
				chosedCity:"安徽?34",      //选择的区域  
			}
		},
		props:[
			"titlehead"
		],
		computed:{
			backBtn(){
				return this.$store.state.showBackBtn;
			}
		},
		mounted(){
			this.getBroeserCityMsg();
		},
		methods:{
	      	backPrev(){					//返回按钮
	      		this.$router.back();
	      	},
	      	// 浏览器是否有存储的选择的地区信息
	      	getBroeserCityMsg(){
	      		var a=sessionStorage.getItem('jxjySetChooseCity');
	      		if(a!="" && a!=null && a!=undefined){
	      			this.chosedCity=a;
	      		}
	      	},
	      	// 显示城市下拉框
	      	showCity(){
	      		var a=this.$refs.citySelected.className;
	      		if(a == 'hover'){
	      			// 如果是第一次调用，请求地区接口数据
		      		if(this.getOnce){
		      			var _this=this;
		      			_this.getOnce=false;

		      			var params={'parent':'34'};
		      			axios.post('/user/toArea.html',params,config)
		      			.then(function(res){
		      				_this.dataMsg=res.data.list;
		      			});
		      		};
		      		// 显示下拉框和背景
		      		$(".pool_box").fadeIn();
					$(".area_select_box").slideDown();
					$("html,body").css({"height":"100%","overflow":"hidden"});

		      		this.$refs.citySelected.className="";
	      		}else{
	      			this.hideCity();
	      			this.$refs.citySelected.className="hover";
	      		}
	      		
	      	},
	      	// 隐藏城市下拉框
	      	hideCity(){
	      		$(".pool_box").fadeOut();
				$(".area_select_box").slideUp();
				$("html,body").css({"height":"auto","overflow":"visible"});
	      	},
	      	// 选择城市
	      	chooseCity(e){
	      		var a=e.target || e.srcElement;
	      		var b=a.innerHTML;
	      		var c=$(a).attr('name');
	      		// 将选中的城市的编号存在name和sessionStorsge中
	      		this.$refs.citySelected.innerHTML=b;
	      		this.$refs.citySelected.name=c;
	      		// 切换城市时将数据存入store和sessionStorage
	      		this.$store.commit('setChooseCity',c);
	      		sessionStorage.setItem('jxjySetChooseCity',b+'?'+c);
	      		// 隐藏选择下拉框
	      		this.hideCity();
	      	}
		}
	}
</script>
<style scoped>
    .header{width:100%;height:0.9rem;background:url(../../../static/images/bj-25.jpg) no-repeat;position:fixed;top:0;text-align: center;z-index:10000;background-size:100% 0.9rem;-webkit-background-size:100% 0.9rem;-moz-background-size:100% 0.9rem;-o-background-size:100% 0.9rem;}
    .header .back,.area_select{padding-left:10px;}
    .header .title_head{line-height:0.9rem;color:#fff;font-size: 0.36rem;height: 0.9rem;}
    .area_select span{color:#fff;font-size: 0.28rem}
    .area_select p b{color:#fff;margin:0 0 0 3px;position: relative;top:4px;font-size: 0.9rem}

    .area_select_box{position:absolute;top:63px;left:0;width:100%;padding:0 5px;z-index:1000000 !important;display: none}
    .area_select_box ul{width:100%;background:#fff;padding:5px 0;}
    .area_select_box ul li{float:left;width:25%;padding:10px 0;}
    .area_select_box ul li p{border:1px solid #ddd;width:90%;margin:0 auto;padding:5px 0;border-radius: 5px;text-align: center;font-size: 0.28rem}
    .trangle_box{width:0;height:0;border-bottom:10px solid #fff !important;border:10px solid transparent;position:absolute;top:-19px;left:15px;z-index:998}

    .pool_box{position:fixed;top:0.9rem;left:0;right:0;bottom:0;background:#000;opacity:.7;display: none;z-index: 100000}

    .to_home{padding-right: 10px;}
    .to_home a{float:right;}
    .to_home img{height:.4rem;display: block;}
    .head_table{border-collapse: collapse;}
    .head_table td{vertical-align: middle}
</style>