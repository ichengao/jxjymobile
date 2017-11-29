<template>
	<div v-title data-title="课程详情">
		<!-- 头部 -->
		<heade :titlehead="headTitle"></heade>
		
		<!-- 主体 -->
	    <div class="kcxq">
	        <div class="top">
	            <table>
                	<tr>
                		<td colspan='2'>
                			<h4 v-show="dataMsgA.isExam=='01'">{{dataMsgA.cname}}(无需考试)</h4>
                			<h4 v-show="dataMsgA.isExam=='02'">{{dataMsgA.cname}}(需要考试)</h4>
            			</td>
                	</tr>
	            	<tr>
	            		<td rowspan='4' width="30%">
	            			<img :src="dataMsgA.cimage" alt="安徽继续教育网" class="left cou_img" v-show="dataMsgA.cimage != null">
							<img src="/static/images/noimg.png" alt="安徽继续教育网" class="left cou_img" v-show="dataMsgA.cimage == null">
            			</td>
	            		<td>
	            			<p class="cou_detail1">年份：{{dataMsgC.classYear}}年</p>
	            		</td>
	            	</tr>
	            	<tr>
	            		<td>
	            			<p class="cou_detail1">学时：{{dataMsgA.ccredithour}}学时</p>
	            		</td>
	            	</tr>
	            	<tr>
	            		<td>
	            			<p class="cou_detail1" v-show="dataMsgA.cmode=='01'">培训方式：在线</p>
	            			<p class="cou_detail1" v-show="dataMsgA.cmode=='02'">培训方式：面授</p>
	            			<p class="cou_detail1" v-show="dataMsgA.cmode=='03'">培训方式：混合</p>
	            		</td>
	            	</tr>
	            	<tr>
	            		<td>
	            			 <p class="cou_detail2">￥{{dataMsgA.cprice}}</p>
	            		</td>
	            	</tr>
	            </table>
	            <div class="clear"></div>
	            <div class="cou_intro">
	            	<p>授课老师：{{dataMsgA.sysTeacher}}</p>
	                <p>学习时间：{{dataMsgA.cstarttime}}—{{dataMsgA.cendtime}} &emsp;<span class="exam_rule_btn" @click="openExamRuleAlert('02',dataMsgA.id)" v-show="dataMsgA.isExam == '02'">考试规则>></span></p>
	            </div>
	        </div>

	        <div class="main">
	            <!-- 班级介绍、报名须知 -->
	            <div class="know_box" v-show="(dataMsgA.cdesc !=null) || (dataMsgA.cdesc!=' ')">
	                <div class="know">
	                    <div class="list_top">
	                        <span class="left">课程介绍<strong class="line left"></strong></span>
	                    </div>
	                    <div class='clear'></div>
	                    <p ref="introduce"></p>
	                </div>
	            </div>
	             

	            <!-- 课程列表 -->
	            <div class="cou_list">
	                <div class="list_top list_top1">
	                    <span class="left">课程章节<strong class="line left"></strong></span>
	                </div>

	                <!-- 章节列表 -->
	                <div class="list_box">
	                    <ul class="list_big">
	                        <li class="list_tab" v-for='i in dataList.length/2'>
	                            <ul class="list_sm">
	                                <li>
	                                    <p class='list_sm_num'>第{{2*i-1}}节</p>
	                                    <p class="list_sm_title">{{dataList[2*i-2].cwName}}</p>
	                                    <div class="list_sm_time">
	                                        <span class="left">{{dataList[2*i-2].creditnum}}学时</span>
	                                    </div>
	                                </li>
	                                <li v-show="(dataList[2*i-1].cwName != null) && (dataList[2*i-1].creditnum != null)">
	                                    <p class='list_sm_num'>第{{2*i}}节</p>
	                                    <p class="list_sm_title">{{dataList[2*i-1].cwName}}</p>
	                                    <div class="list_sm_time">
	                                        <span class="left">{{dataList[2*i-1].creditnum}}学时</span>
	                                    </div>
	                                </li>
	                            </ul>
	                        </li>
	                    </ul>

	                    <!-- 加载 -->
	                    <div align="center" style="margin:10px 0;" class="load">
	                    </div>
	                </div>
	            </div>
	        </div>

	    </div>

	    <!-- 考试规则弹框 -->
		<examRule ref="exam_rule"></examRule>
	</div>
</template>
<script>
	import heade from '@/components/common/header';
	import examRule from "@/components/common/examRuleAlert";
	import axios from "axios";
	import config from "@/api/base.js";
	export default{
		data(){
			return{
				headTitle:"课程详情",
				dataMsgA:{},
				dataMsgB:{},
				dataList:[],
				dataMsgC:{},
				haveData:true,                 //是否有数据
				allData:false,                 //是否取得全部数据
				pages:1,                       //页码
				beforeLeave:true,              //滚动加载数据开关
				pageSize:10,                   //每页条数
			}
		},
		components:{
			heade,
			examRule
		},
		created(){
			this.setHeaderBackBtn();
			this.getData();
		},
		mounted(){
			this.scrollData();
		},
		beforeLeave(){
			this.beforeLeave=false;
		},
		methods:{
			getData(){
				var _this=this;
				var list=[];

				var params={'classNo':_this.$route.query.classNo,'courseNo':_this.$route.query.courseNo,'pages':_this.pages,'pageSize':_this.pageSize}
				axios.post('/class/toCourseDetail.html',params,config)
				.then(function(res){
					_this.dataMsgA=res.data.course;
					_this.dataMsgA.sysTeacher=_this.dataMsgA.sysTeacher.realname;
					_this.$refs.introduce.innerHTML=_this.dataMsgA.cdesc;

					_this.dataMsgC=res.data.tClass;

					var ret=res.data.num;
					if(ret == "0" || ret == null || ret == undefined){
						_this.haveData=false;
					}else{
						// 判断数据是否为奇数，若为奇数传入一个空数组
						if(res.data.couCwList.length % 2 == 0){
							_this.haveData=true;
							_this.dataMsgB=res.data;
							_this.dataList=_this.dataMsgB.couCwList;
						}else{
							res.data.couCwList=res.data.couCwList.concat(list);
							_this.haveData=true;
							_this.dataMsgB=res.data;
							_this.dataList=_this.dataMsgB.couCwList;
						};
						for(var i=0;i<_this.dataList.length;i++){
							if(_this.dataList[i].resCourseware){
								_this.dataList[i].cwName=_this.dataList[i].resCourseware.cwName;
								_this.dataList[i].creditnum=_this.dataList[i].resCourseware.creditnum;
							}else{
								_this.dataList[i].cwName=null;
								_this.dataList[i].creditnum=null;
							};
						}
					};
					// 是否取得全部数据
			        _this.allData = (ret > _this.pages*_this.pageSize) ? false:true;

					// 页码加1
					_this.pages++;

				});
			},
			// 滚动
			scrollData(){
				var _this=this;
				window.addEventListener('scroll',function(){
					if((document.body.scrollTop + window.innerHeight >= document.body.offsetHeight) && !_this.allData && _this.beforeLeave) {
						_this.allData=true;
						_this.loadMore();
					}
				});
			},
			// 加载更多
			loadMore(){
				var _this=this;
				_this.beforeLeave=false;

				var list=new Object();

				var courseId=_this.$route.query.classId;
				var params={'classNo':_this.$route.query.classNo,'courseNo':_this.$route.query.courseNo,'pages':_this.pages,'pageSize':_this.pageSize};
				axios.post('/class/toCourseDetail.html',params,config)
				.then(function(res){
					var ret=res.data.num;
					if(ret == "0" || ret == null || ret == undefined){
						_this.haveData=false;
					}else{
						// 判断数据是否为奇数，若为奇数传入一个空数组
						if(res.data.couCwList.length % 2 == 0){
							_this.haveData=true;
							_this.dataMsgB=res.data.couCwList;
							_this.dataList=_this.dataList.concat(_this.dataMsgB);
						}else{
							res.data.couCwList=res.data.couCwList.concat(list);
							_this.haveData=true;
							_this.dataMsgB=res.data.couCwList;
							_this.dataList=_this.dataList.concat(_this.dataMsgB);
						};
						for(var i=0;i<_this.dataList.length;i++){
							if(_this.dataList[i].resCourseware){
								_this.dataList[i].cwName=_this.dataList[i].resCourseware.cwName;
								_this.dataList[i].creditnum=_this.dataList[i].resCourseware.creditnum;
							}else{
								_this.dataList[i].cwName=null;
								_this.dataList[i].creditnum=null;
							};
						};
					};

					// 是否取得全部数据
			        _this.allData = (ret > _this.pages*_this.pageSize) ? false:true;

			        _this.beforeLeave=true;

					// 页码加1
					_this.pages++;

				});
			},
			// 设置是否显示头部返回按钮
			setHeaderBackBtn(){
				this.$store.commit('showHeaderBack',true);
			},
			// 打开考试规则弹框
			openExamRuleAlert(quizType,id){
				this.$refs.exam_rule.openExamRuleAlert(quizType,id);
			},
			// 关闭考试规则弹框
			closeExamRuleAlert(){
				this.$refs.exam_rule.closeExamRuleAlert();
			}
		}
	}
</script>
<style scoped>
	.kcxq{margin-top:.9rem;}
    .top{padding:10px 5px 0 5px;background:#fff;}
    .top table{border-collapse: collapse;width:100%;}
    .top table h4{font-size: 0.36rem}
    .top table td{vertical-align: middle;}
    .cou_img{width:100%;padding-right: 5px;}
    .cou_detail1{color:#666;font-size: 0.28rem}
    .cou_detail2{color:#C1272D;font-size: 0.28rem}
    .cou_intro{margin-top:12px;padding-bottom: 12px;}
    .cou_intro p{color:#666;font-size: 0.28rem}

    .main{padding:5px 0 14px 0;}
    .know_box{border-top: 1px solid #E6E6E6;border-bottom: 1px solid #E6E6E6;background:#fff;}
    .know{padding:10px 5px 10px 5px;}
    .know p{margin-top:10px;color:#959595;}
    
    .cou_list{padding:0px 5px 0 5px;margin-top:5px;background:#fff;}
    .list_top{overflow: hidden;}
    .list_top strong{color:#53ACCC;}
    .list_top span{color:#53ACCC;font-size: 0.32rem;position: relative;margin-left:7px;}
    .list_top strong.line{width:3px;height:0.26rem;background:#53ACCC;position: absolute;top:50%;left:-7px;margin-top:-0.13rem;}

    .list_top1{padding-top: 10px;}
    .list_box{width:100%;margin-top: 10px;}
    .list_box .list_tab{width:100%;border:1px solid #EEEEEE;border-bottom: 2px solid #5FB2D2;border-radius: 5px;-moz-border-radius: 5px;-o-border-radius: 5px;-webkit-border-radius: 5px;padding:10px 0;margin-bottom: 8px}
    .list_sm{overflow: hidden;}
    .list_sm li{float: left;width:50%;padding:0 10px;border-right: 1px dashed #EDEDED}
    .list_sm li .list_sm_title{color:#959595;margin-top:4px;min-height:50px;margin-bottom: 2px;}
    .list_sm li .list_sm_time span{color:#959595;background:url(../../../static/images/sjz_03.png) no-repeat 1px center;padding-left: 0.38rem;background-size: 0.28rem !important;-webkit-background-size: 0.28rem !important;-moz-background-size: 0.28rem !important;-o-background-size: 0.28rem !important;height:0.28rem;line-height:0.28rem;}
    .exam_rule_btn{color:#53ACCC;cursor: pointer;}
</style>