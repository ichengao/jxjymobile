<template>
	<div v-title data-title="课程章节">
		<!-- 头部 -->
		<heade :titlehead="headTitle"></heade>

		<!-- 主体 -->
	    <div class="jqxx">
	        <div class="main">
				<div class="haveData" v-show="!haveData">暂无数据！</div>

	            <div class="cou_box" v-for='i in dataList.length/2'>
	                <ul>
	                    <li>
	                        <router-link :to="{path:'/player',query:{'courseId':dataList[2*i-2][1],'coursewareId':dataList[2*i-2][3],'chapterId':dataList[2*i-2][0]}}">
                            	<h4>第{{2*i-1}}节</h4>
	                            
	                            <p style="min-height:50px;font-size: 0.26rem;">{{dataList[2*i-2][4]}}</p>
	                            <div>
	                            	<span>
		                            	<span style="font-size:0.26rem" class="study_hour">{{dataList[2*i-2][5]}}学时</span>
			                            <span v-show="dataList[2*i-2][10] == '01' " class="studyStatus">未学习</span>
										<span v-show="dataList[2*i-2][10] == '02' " class="studyStatus">学习中</span>
										<span v-show="dataList[2*i-2][10] == '03' " class="studyStatus">已学习</span>
		                            </span>
	                            </div>
	                            <p class="line_percent left"><span class="line_num" v-bind:style="{ width: dataList[2*i-2][9] +'%'}"></span></p>
	                            <a class="left player_img"><img src="static/images/play_03.png" alt="安徽继续教育网" width="15px;"></a>
	                            <div class="clear"></div>
	                        </router-link>    
	                    </li>
						
	                    <li v-show="dataList[2*i-1] != '' ">
	                        <router-link :to="{path:'/player',query:{'courseId':dataList[2*i-1][1],'coursewareId':dataList[2*i-1][3],'chapterId':dataList[2*i-1][0]}}">
                        		<h4>第{{2*i}}节</h4>
	                            <p style="min-height:50px;font-size: 0.26rem;">{{dataList[2*i-1][4]}}</p>
	                            <div>
	                            	<span>
		                            	<span style="font-size:0.26rem" class="study_hour">{{dataList[2*i-1][5]}}学时</span>
			                            <span v-show="dataList[2*i-1][10] == '01' " class="studyStatus">未学习</span>
										<span v-show="dataList[2*i-1][10] == '02' " class="studyStatus">学习中</span>
										<span v-show="dataList[2*i-1][10] == '03' " class="studyStatus">已学习</span>
		                            </span>
	                            </div>
	                            <p class="line_percent left"><span class="line_num" v-bind:style="{ width: dataList[2*i-1][9] +'%'}"></span></p>
	                            <a class="left player_img"><img src="static/images/play_03.png" alt="安徽继续教育网" width="15px;"></a>
	                            <div class="clear"></div>
	                         </router-link>    
	                    </li>
	                </ul>
	            </div>
	            
	        </div>
	    </div>
	</div>
</template>
<script>
	import heade from '@/components/common/header'
	import axios from 'axios'
    import config from "@/api/base.js";
	export default{
		data(){
			return{
				headTitle:"课程章节",
				dataMsg:[],
				dataList:[],
				haveData:true,             //是否有数据
				page:1,                    //当前页码
				pageSize:10,               //每页的数据条数
				allData:true,              //是否取得全部数据
				beforeLeave:true,          //滚动加载数据开关
			} 
		},
		components:{
			heade
		},
		created(){
			this.getData();
			this.setHeaderBackBtn();
		},
		mounted(){
			this.scrollData();
		},
		beforeLeave(){
			this.beforeLeave=false;
		},
		methods:{
			// 设置是否显示头部返回按钮
			setHeaderBackBtn(){
				this.$store.commit('showHeaderBack',true);
			},
			getData(){
				var _this=this;

				var list=[''];
				var courseId=_this.$route.query.classId;
				var params={'courseId':courseId,'pages':_this.page,'pageSize':_this.pageSize};
				axios.post('/user/toMyCourseware.do',params,config)
				.then(function(res){
					var ret=res.data.num;
					if(ret == "0" || ret == null || ret == undefined){
						_this.haveData=false;
					}else{
						// 判断数据是否为奇数，若为奇数传入一个空数组
						if(res.data.list.length % 2 == 0){
							_this.haveData=true;
							_this.dataMsg=res.data;
							_this.dataList=res.data.list;
						}else{
							res.data.list=res.data.list.concat(list);
							_this.haveData=true;
							_this.dataMsg=res.data;
							_this.dataList=_this.dataMsg.list;
						}
					};
					// 是否取得全部数据
			        _this.allData = (ret > _this.pageSize*_this.page) ? false:true;

					// 页码加1
					_this.page++;

				});
				
			},
			// 滚动
			scrollData(){
				var _this=this;
				window.addEventListener('scroll',function(){
					if((document.body.scrollTop + window.innerHeight >= document.body.offsetHeight)&& !_this.allData && _this.beforeLeave) {
						_this.allData=true;
						_this.loadMore();
					}
				});
			},
			// 加载更多
			loadMore(){
				var _this=this;

				var list=[''];

				var courseId=_this.$route.query.classId;
				var params={'courseId':courseId,'pages':_this.page,'pageSize':_this.pageSize};
				axios.post('/user/toMyCourseware.do',params,config)
				.then(function(res){
					var ret=res.data.num;
					
					if(res.data.list.length % 2 == 0){
						_this.haveData=true;
						_this.dataMsg.list=_this.dataMsg.list.concat(res.data.list);
						_this.dataList=_this.dataList.concat(res.data.list);
					}else{
						res.data.list=res.data.list.concat(list);
						_this.haveData=true;
						_this.dataMsg.list=_this.dataMsg.list.concat(res.data.list);
						_this.dataList=_this.dataList.concat(res.data.list);
					};

					// 是否取得全部数据
			        _this.allData = (ret > _this.pageSize*_this.page) ? false:true;

					// 页码加1
					_this.page++;

				});
			},
	    },
	}
</script>
<style scoped>
	.main{padding:5px 5px 50px 5px;margin:0 auto;}
    
    .jqxx{margin-top:.9rem;}

    .cou_box{width: 100%;border-radius:5px;-moz-border-radius:5px;-o-border-radius:5px;-webkit-border-radius:5px;border: 1px solid #EAEAEA;padding:3px;margin-top:5px;border-bottom: 2px solid #51B6DA;overflow: hidden;background:#fff;}
    .cou_box ul li{width:50%;float: left;padding:5px 3px;}
    .cou_box ul li:first-child{border-right: 1px dashed #666;padding-right: 5px}
    .cou_box ul li:last-child{padding-left: 5px}

    .cou_box ul li p{margin-top: 5px;color:#747474;}
    .cou_box ul li span{color:#747474;}
    .cou_box ul li h4{margin-right: 5px;font-size: 0.28rem}
    .player_img{margin-left: 4px;}
    .line_percent{width:85%;height:8px;border-radius: 4px;-moz-border-radius: 4px;-o-border-radius: 4px;-webkit-border-radius: 4px;background:#E0E0E1;}
    .line_num{height:8px;border-radius: 4px;-moz-border-radius: 4px;-o-border-radius: 4px;-webkit-border-radius: 4px;background:#55ABCC;float:left;}
    .studyStatus{font-size: 0.26rem}
    .haveData{text-align: center;}
    .study_hour{background:url(../../../static/images/sjz_03.png) no-repeat 0 center;padding-left: 0.3rem;background-size: 0.24rem;-webkit-background-size: 0.24rem;-moz-background-size: 0.24rem;-o-background-size: 0.24rem;}
</style>