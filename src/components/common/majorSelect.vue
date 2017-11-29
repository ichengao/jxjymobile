<!-- 示例在底部 -->
<template>
	<!-- 职称选择三级联动列表 -->
	<div class="major_box" v-show="showMajorBox">
		<div class="major_select">
			<section class="title">
          		<h4>选择职称</h4>
          		<span @click='closeMajor'>×</span>
        	</section>
        	<section class="title">
	          	<div :class="isTypeChosed ? 'major_type hover' : 'major_type' " ref="majorType" @click='firstClick'>请选择</div>
	          	<div class="major_type" ref="majorLevel" v-show="isTypeChosed">请选择</div>
	        </section>
	        <ul>
	        	<!-- 分类信息显示 -->
	          	<li class="add_list" v-show='showType' v-for='msg in typeMsg' @click='typeChose(msg.codeNo,msg.codeName)'>{{msg.codeName}}</li>
	          	<!-- 等级信息显示 -->
	          	<li class="add_list" v-show='showLevel' v-for='msg in levelMsg' @click="levelChose(msg.codeNo,msg.codeName)">{{msg.codeName}}</li>
	        </ul>
		</div>
	</div>
</template>
<script>
	import axios from "axios"
	import config from "@/api/base.js";
	import { MessageBox } from 'mint-ui';
	export default{
		data(){
			return{
				typeMsg:{},                //分类信息
				levelMsg:{},               //等级信息
				showType:true,             //分类信息显示
				showLevel:false,           //等级信息显示
				isTypeChosed:false,        //分类信息是否选中
				isLevelChosed:false,       //等级信息是否选中
				majorChosed:'',            //选中的信息
				isFirst:true,              //是否第一次点击
				showMajorBox:false,        //是否显示职称选择弹框
			}
		},
		created(){
			this.getData();
		},
		methods:{
			getData(){
				var _this=this;
				var params={'parent':'20'};
				if(_this.isFirst){
					axios.post('/class/toCode.html',params,config)
					.then(function(res){
						_this.typeMsg=res.data.list;
					});
				};
			},
			// 分类信息选中
			typeChose(codeNo,codeName){
				var _this=this;
				_this.$refs.majorType.innerHTML=codeName;
				_this.majorChosed=codeName;
				_this.isTypeChosed=true;
				_this.showType=false;
				var params={'parent':codeNo};
				axios.post('/class/toCode.html',params,config)
				.then(function(res){
					_this.levelMsg=res.data.list;
					_this.showLevel=true;
				});
			},
			// 等级信息选中
			levelChose(codeNo,codeName){
				// 将选择的信息回传给父组件
				this.$store.commit('setMajor',this.majorChosed+' '+codeName+','+codeNo);
				this.closeMajor();
			},
			// 关闭弹框
			closeMajor(){
				this.showType=true;           
				this.showLevel=false;
				this.showMajorBox=false;
				this.isTypeChosed=false;
				this.$refs.majorType.innerHTML="请选择";
			},
			// 打开弹框
			openMajor(){
				this.showMajorBox=true;
			},
			// 第一个选择点击
			firstClick(){
				this.showType=true;           
				this.showLevel=false;
				this.isTypeChosed=false;
				this.$refs.majorType.innerHTML="请选择";
			},
		}
	}
</script>
<style scoped>
	.major_box{
	  	width:100%;
	  	height:100%;
		position:fixed;
		top:0;
		left:0;
		z-index:120;
		background:rgba(77,82,113,0.8);
	}
	.major_select{
	    position: absolute;
	    bottom: 0;
	    left: 0;
	    z-index: 121;
	    background: #fff;
	    width: 100%;
	}
	.title{
		position: relative;
	}
	.title h4{
	    font-weight: normal;
	    color: #999;
	    padding: 10px 0;
	    text-align: center;
	    border-bottom: 1px solid #ddd;
	    margin-bottom: 10px;
	}
	.title span{
	    position: absolute;
	    right: 10px;
	    top: 10px;
	}
	.major_type{
	    display: inline-block;
	    margin-left: 0.5rem;
	    color: #333;
	}
	.title .hover{
	    color: #0071B8;
	    border-bottom: 0.02rem solid #0071B8;
	}
	.major_select ul li{
	    padding-left: 5%;
	}
	.major_select ul{
		overflow-y:scroll;
	    width: 95%;
    	height: 300px; 
	}
	.major_select ul li.add_list{
        width: 100%;
	    margin-top: 0.1rem;
	    line-height: 0.5rem;
	    color: #333;
	}
</style>
