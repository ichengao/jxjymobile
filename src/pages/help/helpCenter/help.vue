<template>
	<div v-title data-title="headTitle">
		<!-- 头部 -->
		<heade :titlehead="headTitle"></heade>

		<!-- 主体 -->
	    <div class="main">
	    	<div style="height:10px;"></div>
	        <div class="content" v-for="msg in dataMsg">
	        	<router-link :to="{path:'/helpDetail',query:{'codeNo':codeNo,'name':msg.name}}">
		            <table>
		                <tr>
		                    <td class="c_title"><p>{{msg.title}}</p></td>
		                    <td class="c_time"><a>{{msg.publishtime.split(" ")[0]}}</a></td>
		                </tr>
		                <tr>
		                    <td colspan="2" class="c_content">{{msg.summary}}</td>
		                </tr>
		            </table>
	            </router-link>
	        </div>
	        <!-- 点击加载更多 -->
           <!--  <div class="loadMore" v-show="sw&&isHaveData">上拉加载更多</div>
            <div class="loadMore" v-show="(!sw)&&isHaveData">数据已加载完！</div>
            <div class="loadMore" v-show="!isHaveData">暂无数据！</div> -->
	    </div>
	</div>
</template>
<script>
	import heade from '@/components/common/header'
	import axios from "axios";
	import config from "@/api/base.js";
	import { MessageBox } from 'mint-ui';
	export default{
		data(){
			return{
				headTitle:"",
				dataMsg:{},
				pages:'1',           	  //当前页码
				pageSize:'10',	     	  //每页多少条
				area:'',           	      //地区编号
				codeNo:'',                //分类编号
				allNum:true,              //是否取得全部数据
        		sw:true,                  //设置一个开关来避免重复请求数据
        		isHaveData:true,          //是否有数据
        		beforeLeave:true,         //滚动加载数据开关
			}
		},
		components:{
			heade,
		},
		created(){
			this.setHeaderBackBtn();
			this.getData();
		},
		mounted(){
			this.goScroll();
			this.headerSet();
		},
		methods:{
			getData(){
				var _this=this;
				var jxjyCity=sessionStorage.getItem('jxjySetChooseCity');
				_this.codeNo=_this.$route.query.codeNo;
				if(jxjyCity!="" && jxjyCity!=null && jxjyCity!=undefined){
					var params={'codeNo':_this.codeNo,'pages':_this.pages,'area':jxjyCity.split('?')[1]};
				}else{
					var params={'codeNo':_this.codeNo,'pages':_this.pages};
				};
				axios.post('/info/toInfoMessage.html',params,config)
				.then(function(res){
					_this.dataMsg=res.data.list;
					// 判断是否有数据
					_this.isHaveData=(_this.dataMsg.length==0)?false:true;

					// 如果页码乘以每页数量大于总数据数量，停止滚动加载数据
					_this.canGetData=(_this.pages*_this.pageSize>res.data.num)?false:true;
					_this.sw = (_this.pages*_this.pageSize>res.data.num)?false:true;
					_this.pages++;
				});
			},
			// 头部设置
			headerSet(){
				var type=this.$route.query.codeNo;
				switch(type){
					case '151102':
						this.headTitle="网站功能";
						break;
					case '151103':
						this.headTitle="常见问题";
						break;
					case '151104':
                        this.headTitle="业务流程";
                        break;
                    case '151105':
                        this.headTitle="操作手册";
                        break;
				}
			},
			// 滚动事件
			goScroll(){
				// 缓存指针  
	            var _this = this;   
	    		// 注册scroll事件并监听  
	            window.addEventListener('scroll',function(){  
	                // 判断是否滚动到底部  
	                if((document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) && _this.canGetData && _this.beforeLeave ) { 
                        _this.canGetData = false;  
                        _this.loadMore();
	                }  
	            }); 
			},
			//加载更多内容
	      	loadMore(){         
    			var _this=this;

	    		var jxjyCity=sessionStorage.getItem('jxjySetChooseCity');
				if(jxjyCity!="" && jxjyCity!=null && jxjyCity!=undefined){
					var params={'codeNo':_this.$route.query.codeNo,'pages':_this.pages,'area':jxjyCity.split('?')[1]};
				}else{
					var params={'codeNo':_this.$route.query.codeNo,'pages':_this.pages};
				};
	    		axios.post('/info/toInfoMessage.html',params,config)
	    		.then(function(res){
	    			_this.dataMsg=_this.dataMsg.concat(res.data.list);
	    			_this.sw = (_this.pages*_this.pageSize>res.data.num)?false:true;

	    			_this.canGetData=(_this.pages*_this.pageSize>res.data.num)?false:true;
	    			_this.pages++;
	    		});
	    	},
			// 设置是否显示头部返回按钮
			setHeaderBackBtn(){
				this.$store.commit('showHeaderBack',true);
			},
		},
		beforeDestroy() {
	      	this.beforeLeave=false;
	    },
	}
</script>
<style scoped>
    .main{margin-top:.9rem;padding-bottom:50px;}
	.content table{width:100%;background:#fff;border-top:1px solid #e6e6e6;border-bottom:1px solid #e6e6e6;margin-bottom: 10px;}
    .c_title{color:#544B49;width:70%;padding-top: 18px;}
    .c_title p{width:5rem;overflow-x: hidden;height:19px;white-space: nowrap;text-overflow: ellipsis;}
    .c_time{ white-space: nowrap;position: relative;text-align: right}
    .c_time a{background:#F4A432;font-size: 0.22rem;color:#fff;position: absolute;padding:5px 10px;top:-2px;right:0;}
    .c_content{padding:10px 0;font-size: 0.22rem;color:#8D8D8D;}
</style>