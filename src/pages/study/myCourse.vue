<template>
	<div v-title data-title="我的课程">
		<!-- 头部 -->
		<heade :titlehead="headTitle"></heade>

		<!-- 主体 -->
	    <div class="jqxx">
	        <div class="main">
	        	<p class="cou_warn" v-show="haveData">*需完成课程学习才能考试</p>
	        	<div class="haveData" v-show="!haveData">暂无数据！</div>
	            <div class="cou_box" v-for="msg in dataMsg.list">
	                <table>
	                	<router-link :to="{path:'courseChapter',query:{'classId':msg.resCourse.id,'cNo':msg.resCourse.cno}}">
		                	<tr><td colspan="3"><h4>{{msg.resCourse.cname}}</h4></td></tr>
		                	<tr>
		                		<td width="30%" rowspan='4' style="vertical-align:middle">
		                			<img :src="msg.resCourse.cimage" alt="安徽继续教育网" width="100%">
		                		</td>
		                		<td class="space">
		                			<p v-show="msg.studystatus == '01' ">学习状态：未学习</p>
	                                <p v-show="msg.studystatus == '02' ">学习状态：学习中</p>
	                                <p v-show="msg.studystatus == '03' ">学习状态：已学习</p>
		                		</td>
		                		<td rowspan="4" style="vertical-align:middle">
		                			<img src="static/images/play_03.png" alt="安徽继续教育网" style="width:0.4rem">
		                		</td>
		                	</tr>
		                	<tr>
		                		<td class="space">
		                			<p v-show="msg.isExam == '01' ">是否需要考试：不需要</p>
	                                <p v-show="msg.isExam == '02' ">是否需要考试：需要</p>
		                		</td>
		                	</tr>
		                	<tr>
		                		<td class="space">
		                			<p class="allTime">
	                                	<span>{{msg.resCourse.ccredithour}}学时</span>
	                                </p>
		                		</td>
		                	</tr>
		                	<tr>
		                		<td class="space">
		                			<div class="cou_percent">
	                                	<!-- 进度条 --> 
	                                	<span class="cou_real" v-bind:style="{ width:(msg.hasCredit*100/msg.resCourse.ccredithour)+'%'}" v-show='msg.hasCredit/msg.resCourse.ccredithour<1'></span>
	                                	<span class="cou_real" style="width:100%" v-show='msg.hasCredit/msg.resCourse.ccredithour>=1'></span>
	                                </div>
		                		</td>
		                	</tr>
	                    </router-link>
	                </table>

					<!-- 考试记录 -->
					<div class="exam_history">
						<router-link to="" class="exam_history_btn">
							考试记录
						</router-link>
					</div>
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
				headTitle:"我的课程",
				dataMsg:[],
				haveData:true,             //是否有数据
				page:1,                    //当前页码
				pageSize:6,                //每页的数据条数
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
		beforedestory(){
			this.beforeLeave=false;
		},
		methods:{
			// 设置是否显示头部返回按钮
            setHeaderBackBtn(){
                this.$store.commit('showHeaderBack',true);
            },
			getData(){
				var _this=this;
				var classId=_this.$route.query.classId;
				var params={'classId':classId,'page':_this.page,'pageSize':_this.pageSize};
				axios.post('/user/toMyClassCourse.do',params,config)
				.then(function(res){
					var ret=res.data.num;
					if(ret == "0" || ret == null || ret == undefined){
						_this.haveData=false;
					}else{
						_this.haveData=true;
						_this.dataMsg=res.data;
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
					if((document.body.scrollTop + window.innerHeight >= document.body.offsetHeight)&&!_this.allData && _this.beforeLeave) {
						_this.allData=true;
						_this.loadMore();
					}
				});
			},
			// 加载更多
			loadMore(){
				var _this=this;

				var classId=_this.$route.query.classId;

				var params={'classId':classId,'pages':_this.page,'pageSize':_this.pageSize};
				axios.post('/user/toMyClassCourse.do',params,config)
				.then(function(res){
					var ret=res.data.num;
					
					_this.dataMsg.list=_this.dataMsg.list.concat(res.data.list);

					// 是否取得全部数据
			        _this.allData = (ret > _this.pageSize*_this.page) ? false:true;

					// 页码加1
					_this.page++;

				});
			},
		}
	}
</script>
<style scoped>
	.main{padding:10px 5px 50px 5px;margin:0 auto;}
    
    .jqxx{margin-top:.9rem;}

    .cou_box{width: 100%;border-radius:5px;-moz-border-radius:5px;-o-border-radius:5px;-webkit-border-radius:5px;border: 1px solid #EAEAEA;padding:3px;margin-top:5px;border-bottom: 2px solid #51B6DA;background:#fff;}
    .cou_box table h4{font-size: 0.32rem;margin-bottom: 4px;}
    .cou_box table p{font-size: 0.28rem;color:#868787;}
    .space{padding-left: 3px;}
    .cou_box table{width:100%;}
    .cou_box table p:first-child{margin-top:0;}
    .cou_box table p.cou_warn{color:#C67171;}
    p.cou_warn{color:#C67171;font-size: 0.26rem}
    .cou_box .cou_img{vertical-align: middle}
    .btn_study{padding:3px 15px;border:1.5px solid #C3C3C3;border-radius:3px;-moz-border-radius:3px;-o-border-radius:3px;-webkit-border-radius:3px;color:#797A7A;}
    .study_box{margin-top:20px;}
    .allTime{background:url(../../../static/images/sjz_03.png) no-repeat 1px center;padding-left: 0.32rem;background-size: 0.24rem !important;-webkit-background-size: 0.24rem !important;-moz-background-size: 0.24rem !important;-o-background-size: 0.24rem !important;}
    .allTime span{color:#868787;}
    .cou_learn{width:85%;}
    .cou_img img{vertical-align: middle}
    .cou_percent{width:90%;height:0.18rem;background:#DCDCDD;border-radius:0.09rem;-moz-border-radius:0.09rem;-o-border-radius:0.09rem;-webkit-border-radius:0.09rem;}
    .haveData{text-align: center;}
    /*进度条*/
    .cou_real{float:left;height:0.18rem;background:#51B6DA;border-radius:0.09rem;-moz-border-radius:0.09rem;-o-border-radius:0.09rem;-webkit-border-radius:0.09rem;}

	.exam_history{border-top:1px solid #EDEDEE;text-align: right}
	.exam_history_btn{padding:.06rem;border: 1px solid #737575;color:#737575;display: inline-block;margin-top:.1rem;border-radius: 3px;-webkit-border-radius: 3px;-moz-border-radius: 3px;-o-border-radius: 3px;}
</style>