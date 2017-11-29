<template>
	<div v-title data-title="班级详情">

		<!-- 头部 -->
		<heade :titlehead="headTitle"></heade>

		<!-- 主体 -->
	    <div class="bjxq">
	   	    <div class="top">
	   	    	<div class="img_box">
	                <table width='100%'>
	                	<tr><td colspan="2"><h4 style="font-size:0.36rem;color:#474747;margin-bottom:3px;">{{dataMsgA.className}}</h4></td></tr>
	                	<tr>
	                		<td rowspan='5' width="37%">
								<img :src="dataMsgA.classImage" alt="安徽继续教育网" class="left" width='100%' v-show="dataMsgA.classImage != null">
								<img src="/static/images/noimg.png" alt="安徽继续教育网" class="left" width='100%' v-show="dataMsgA.classImage == null">
							</td>
	                		<td class="tab_right"><p class="cou_detail1" style="margin-top:0">{{dataMsgA.class1}}({{dataMsgA.class2}})</p></td>
	                	</tr>
	                	<tr>
	                		<td class="tab_right"><p class="cou_detail1">地区：{{dataMsgA.cityname}}&emsp;学时：{{dataMsgA.classCredithour}}学时</p></td>
                		</tr>
                		<tr>
	                		<td class="tab_right"><p class="cou_detail1">招生人数：{{dataMsgA.classPeopleNumber}}人/<span v-show="dataMsgA.classType == '01'" style="color:#666">在线</span><span v-show="dataMsgA.classType == '02'" style="color:#666">面授</span><span v-show="dataMsgA.classType == '03'" style="color:#666">混合</span></p></td>
                		</tr>
                		<tr>
	                		<td class="tab_right">
	                			<p class="cou_detail2 left">￥{{dataMsgA.classPrice}}&emsp;</p>
								<p class="left give_integral" v-show="dataMsgA.giveIntegral != '0' ">额外赠送{{dataMsgA.giveIntegral}}积分</p>
                			</td>
                		</tr>
                		<tr>
	                		<td class="tab_right">
	                			<div class="btn_group">
	                				<!-- 查看评价 -->
			                		<!-- <a href="#" v-show='dataMsgA.isEva == "02" '><img src="static/images/btn_06.png" alt="安徽继续教育网"></a> -->
			                		<!-- 购买 -->
			                		<router-link :to="{path:'/ensureClass',query:{'classId':dataMsgA.id}}" v-show=" (dataMsgA.classEnrolStatus == '02') && (dataMsgA.timeFlag == '02') && ( dataMsgA.classPeopleNumber-dataMsgA.classEnrolNumber>0 ) "><img src="static/images/btn_08.png" alt="安徽继续教育网"></router-link>
			                	</div>
                			</td>
                		</tr>
	                </table>
	   	    	</div>
	            <div class="clear"></div>
	   	    	<div class="cou_intro">
	   	    		<p>课程总数：{{dataMsgB.length}}门</p>
	   	    		<p>授课老师：{{dataMsgA.teachers}}</p>
	   	    		<p>报名时间：{{dataMsgA.classEnrolStarttime}}—— {{dataMsgA.classEnrolEndtime}}</p>
	   	    		<p>上课时间：{{dataMsgA.classStarttime}}—— {{dataMsgA.classEndtime}}</p>
	   	    	</div>
	   	    </div>

	   	    <div class="main">
	            <!-- 班级介绍、报名须知 -->
	   	    	<div class="know_box">
	   	    		<div class="know">
	   	    			<div class="tab_list">
	   	    				<ul>
		   	    			    <li class="left hover tab_list_header" name="tab_list_1" @click="toggleTab">班级介绍</li>
		   	    			    <li class="line_cut"></li>
		   	    			    <li class="left tab_list_header" name="tab_list_2" @click="toggleTab">报名须知</li>
		   	    			    <li class="line_cut" v-show="dataMsgA.isClassExam"></li>
		   	    			    <li class="left tab_list_header" name="tab_list_4" @click="toggleTab" v-show="dataMsgA.isClassExam">班级考试</li>
		   	    			    <li class="line_cut" v-show="dataMsgA.isIndependentExam"></li>
		   	    			    <li class="left tab_list_header" name="tab_list_5" @click="toggleTab" v-show="dataMsgA.isIndependentExam">独立考试</li>
								<li class="line_cut" v-show="dataMsgA.isCourseExam"></li>
								<li class="left tab_list_header" name="tab_list_3" @click="toggleTab"  v-show="dataMsgA.isCourseExam">课程考试</li>
		   	    			    <div class="clear"></div>
		   	    		    </ul>
	   	    			</div>
	                    
	                    <div class="tab_list_content">
	                    	<div class="tab_list_1 hover">{{dataMsgA.classDesc}}</div>
		   	    		    <div class="tab_list_2">{{dataMsgA.classDemo}}</div>
		   	    		    <div class="tab_list_3">
		   	    		    	<span>针对课程学习效果的考核，学习完课程才能参加考试，考试合格才能取得课程的学时</span>
								<p><a @click="scrollToType('#course_list')">考试规则》</a></p>
		   	    		    </div>
		   	    		    <div class="tab_list_4">
		   	    		    	<span>针对班级整体培训的结业考核，完成班级中报名的课程和考试后才能参加班级结业考试，考试合格才能取得班级学时和证书</span>
		   	    		    	<p><a @click="openExamRuleAlert('03',dataMsgA.id)">考试规则》</a></p>
		   	    			</div>
		   	    		    <div class="tab_list_5">
		   	    		    	<span>考核相关知识点掌握情况，无需参加学习直接考试，考试合格才能取得对应的学时</span>
		   	    		    	<p><a @click="scrollToType('#indepence_list')">考试规则》</a></p>
		   	    		    </div>
	                    </div>
	   	    		    
	   	    		</div>
	   	    		
	   	    	</div>
	             
				<!-- 独立考试列表 -->
	            <div class="cou_list" id="indepence_list" v-show="dataMsgD != null && dataMsgD != ''">
	            	<div class="list_top">
	            		<span class="left">独立考试列表<strong class="line left"></strong></span>
	            	</div>

	            	<div class="list_box">
	            		<ul id="course">
	            			<li class="class_list" v-for='msgD in dataMsgD'>
								<table width="100%"  @click="openExamRuleAlert('01',msgD.examQuiz.id)">
									<tr>
										<td colspan='2'><h4>{{msgD.examQuiz.name}}</h4></td>
									</tr>
									<tr>
										<td rowspan='3' width='25%' class="course_img_box"><img :src="msgD.examQuiz.quizImage" alt="安徽继续教育网" width='100%' v-show="msgD.quizImage!=null"><img src="static/images/noimg.png" alt="安徽继续教育网" width='100%' v-show="msgD.quizImage==null"></td>
										<td class="tab_right">
											<p class="cou_line left">总分/及格分数 : {{msgD.examQuiz.totalPoint}}/80分</p>
										</td>
									</tr>
									<tr>
										<td class="tab_right t_box">
											<p class="cou_line left">考试时长 : {{msgD.examQuiz.timelimit}}分钟<strong class="price">￥{{msgD.examQuiz.price}}</strong></p>
										</td>
									</tr>
									<tr>
										<td class="tab_right">
											<div class="study_time_box">
												<span class="study_time">{{msgD.examQuiz.credit}}学时</span>
											</div>
										</td>
									</tr>
								</table>
		            			<div class="class_list_footer">
		            				<p class="left">考试时间 : </p><p> {{msgD.examQuiz.timeopen}}至<br>{{msgD.examQuiz.timeclose}}</p>
		            				<button @click="openExamRuleAlert('01',msgD.examQuiz.id)">考试规则</button>
		            			</div>
	            			</li>
	            		</ul>

	            	</div>
	            </div>

	            <!-- 课程列表 -->
	            <div class="cou_list" v-show="dataMsgB != null && dataMsgB != ''" id="course_list">
	            	<div class="list_top">
	            		<span class="left">课程列表<strong class="line left"></strong></span>
	            	</div>

	            	<div class="list_box">
	            		<ul id="course">
	            			<li class="class_list" v-for='msgB in dataMsgB'>
	            				<router-link :to="{path:'/courseDetail',query:{'classNo':dataMsgA.classNo,'courseNo':msgB.resCourse.cno}}">
		            				<table width="100%">
		            					<tr>
		            						<td colspan='2'><h4>{{msgB.resCourse.cname}}</h4></td>
	            						</tr>
	            						<tr>
	            							<td rowspan='4' width='25%' class="course_img_box"><img :src="msgB.resCourse.cimage" alt="安徽继续教育网" width='100%' v-show="msgB.resCourse.cimage!=null"><img src="static/images/noimg.png" alt="安徽继续教育网" width='100%' v-show="msgB.resCourse.cimage==null"></td>
	            							<td class="tab_right">
	            								<p class="cou_line left" v-show="msgB.resCourse.isExam  == '01' ">是否考试：否</p><p class="cou_line left" v-show="msgB.resCourse.isExam  == '02' ">是否考试:是</p>
	            							</td>
	            						</tr>
										<tr>
											<td class="tab_right">
												<p class="cou_line left" v-show='msgB.resCourse.cmode == "01" '>培训方式:在线</p><p class="cou_line left" v-show='msgB.resCourse.cmode == "02"'>培训方式:面授</p><p class="cou_line left" v-show='msgB.resCourse.cmode == "03"'>培训方式:混合</p>
											</td>
										</tr>
										<tr>
											<td class="tab_right"><p class="t_box cou_line"><span class="cou_teacher">授课老师:{{msgB.resCourse.sysTeacher.realname}}</span><strong class="price">￥{{msgB.resCourse.cprice}}</strong></p></td>
										</tr>
										<tr>
											<td class="tab_right">
												<div class="study_time_box">
		            								<span class="study_time">{{msgB.resCourse.ccredithour}}学时</span>
												</div>
	            							</td>
										</tr>
		            				</table>
		            			</router-link>
		            			<div class="class_list_footer1" v-show="msgB.resCourse.isExam == '02'">
		            				<button @click="openExamRuleAlert('02',msgB.resCourse.id)">考试规则</button>
		            			</div>
	            			</li>
	            		</ul>

	            	</div>
	            </div>
	   	    </div>
	    </div>

	    <!-- 底部 -->
		<foote></foote>
		
		<!-- 考试规则弹框 -->
		<examRule ref="exam_rule"></examRule>
	</div>
</template>
<script>
	import heade from '@/components/common/header';
	import foote from '@/components/common/footer';
	import examRule from "@/components/common/examRuleAlert";
	import axios from "axios";
	import config from "@/api/base.js";
	export default{
		data(){
			return{
				headTitle:"班级详情",
				dataMsgA:{},
				dataMsgB:{},
				dataMsgC:{},
				dataMsgD:{},           //独立考试列表
			}
		},
		components:{
			heade,
			foote,
			examRule
		},
		created(){
			this.setHeaderBackBtn();
			this.getData();
		},
		mounted(){
			this.cssSet();
		},
		methods:{
			// 设置是否显示头部返回按钮
			setHeaderBackBtn(){
				this.$store.commit('showHeaderBack',true);
			},
			getData(){
				var _this=this;
				var params={'classNo':_this.$route.query.classNo};
				axios.post('/class/toClassDetail.html',params,config)
				.then(function(res){
					_this.dataMsgA=res.data.tClass;
					_this.dataMsgB=res.data.classCourseList;
					_this.dataMsgC=res.data.tClass.province;
					_this.dataMsgD=res.data.independentExamList;


					_this.dataMsgA.classEnrolStarttime=_this.dataMsgA.classEnrolStarttime.slice(0,11);
					_this.dataMsgA.classEnrolEndtime=_this.dataMsgA.classEnrolEndtime.slice(0,11);
					_this.dataMsgA.classStarttime=_this.dataMsgA.classStarttime.slice(0,11);
					_this.dataMsgA.classEndtime=_this.dataMsgA.classEndtime.slice(0,11);
					_this.dataMsgA.class1=_this.dataMsgA.trainProject.sysCode.sysCode.codeName;
					_this.dataMsgA.class2=_this.dataMsgA.trainProject.sysCode.codeName;
					_this.dataMsgA.cityname=_this.dataMsgA.province.cityname;
					
				});
			},
			// 样式设置
			cssSet(){
				var len=$(".know .tab_list ul li").length;
				var wid=0;
				for(var i=0;i<len;i++){
					wid=wid+Math.ceil($(".know .tab_list ul li").eq(i).width())+Math.ceil($(".know .tab_list ul li").eq(i).css("paddingLeft").slice(0,-2))+Math.ceil($(".know .tab_list ul li").eq(i).css("paddingRight").slice(0,-2))+Math.ceil($(".know .tab_list ul li").eq(i).css("marginRight").slice(0,-2))+Math.ceil($(".know .tab_list ul li").eq(i).css("marginLeft").slice(0,-2))+1;
				};
				$(".know .tab_list ul").width(wid+"px");
			},
			// tab页切换
			toggleTab(e){
				var dom=e.target || e.secElement;
				$(dom).addClass('hover').siblings('.tab_list_header.hover').removeClass('hover');
				var domName=$(dom).attr("name");
				$("."+domName).addClass('hover').siblings('.hover').removeClass('hover');
			},
			// 打开考试规则弹框
			openExamRuleAlert(quizType,id){
				this.$refs.exam_rule.openExamRuleAlert(quizType,id);
			},
			// 关闭考试规则弹框
			closeExamRuleAlert(){
				this.$refs.exam_rule.closeExamRuleAlert();
			},
			// 页面滚动到独立考试列表和课程列表
			scrollToType(id){
				var height=$(id).prop("offsetTop");
				$("html,body").animate({scrollTop:height});
			}
		}
	}
</script>
<style scoped>
	.bjxq{margin-top:.9rem;}
	.top{padding:10px 5px 0 5px;background:#fff;border-top:1px solid #e6e6e6;border-bottom:1px solid #e6e6e6;}
	.give_integral{color:#C1272D;font-size: 0.28rem;}
	.cou_img{width:37%;}
	.cou_detail11{color:#474747;font-size: 0.28rem}
	.cou_detail1{color:#666;font-size: 0.28rem}
	.btn_group img{width:30%;}
	.cou_detail2{color:#C1272D;font-size: 0.28rem}
	.cou_intro{margin-top:12px;padding-bottom:12px;}
    .cou_intro p{color:#666;font-size: 0.28rem;line-height:0.32rem;}
    .cou_title{font-size: 1.1rem}
    .tab_right{padding-left: 5px;}
    .tab_top{padding-bottom:5px;}
    .cou_line{font-size: 0.28rem;color: #666;}
    .cou_teacher{font-size: 0.28rem;color: #666;margin-top: 2px;}
    .t_box{position:relative;}
    .class_list li h4{font-size: 0.32rem}
    .price{position: absolute;right:.3rem;top:-3px;font-size: 0.32rem;color: #C1272D;font-weight: normal;}
    .study_time{color: #666;font-size: 0.28rem}
    .study_time_box{margin-top:2px;background:url(../../../static/images/sjz_03.png) no-repeat 1px center;padding-left: 0.38rem;padding-top:0.02rem;background-size: 0.28rem !important;-webkit-background-size: 0.28rem !important;-moz-background-size: 0.28rem !important;-o-background-size: 0.28rem !important;height:0.28rem;line-height:0.28rem;}
    .course_img_box{vertical-align: middle;}

    .main{padding:5px 0 14px 0;}
    .know_box{border-top: 1px solid #E6E6E6;border-bottom: 1px solid #E6E6E6;background:#fff;padding-top: 5px;}
    .know{padding-left: 5px;padding-bottom:10px;}
    .know .tab_list{width:100%;overflow-x:scroll;}
    .know ul li{padding:4px 6px;position: relative;border-bottom: 1px solid #fff;font-size: 0.26rem}
    .know ul li.hover{color:#53ACCC;border-bottom-color: #54ADCB}
    .know ul li.line_cut{height:15px;width:0;border-left:2px solid #EFEFEF;float:left;margin:5px 5px 0 5px;padding:0;}
    .know p{margin-top:10px;padding-right: 5px;color:#666;font-size: 0.28rem;line-height:0.32rem;}
    .cou_list{padding:10px 5px 10px 5px;margin-top:5px;background:#fff;border-top: 1px solid #E6E6E6;border-bottom: 1px solid #E6E6E6;}
    .list_top{overflow: hidden;}
    .list_top strong{color:#53ACCC;}
    .list_top span{color:#53ACCC;font-size: 0.32rem;position: relative;margin-left:7px;}
    .list_top strong.line{width:3px;height:0.26rem;background:#53ACCC;position: absolute;top:50%;left:-7px;margin-top:-0.13rem;}

	/*tab页*/
    .list_box ul{width:100%;padding:0 1%;}
    .list_box li{padding:5px 3px 0 3px;border:1px solid #EEEEEE;border-radius:5px;-o-border-radius:5px;-webkit-border-radius:5px;-moz-border-radius:5px;border-bottom: 2px solid #5FB2D2;margin-top:10px;overflow: hidden}
    .list_box li h4{padding-bottom: .15rem;color:#474747;}
    .tab_list_content>div{display: none;padding-top: .15rem;padding-right: .05rem;}
    .tab_list_content>div.hover{display: block}
    .tab_list_content>div span{font-size: .24rem;}
    .tab_list_content>div p{text-align: right;margin-top: .3rem;}
    .tab_list_content>div p a{cursor: pointer;color:#EA9F36;}

    /*课程列表按钮*/
    .class_list_footer{display:flex;align-items:center;padding:.1rem .3rem .1rem 0; border-top:1px solid #E5E5E5;margin-top: .15rem;}
    .class_list_footer button{color:#EA9F36;background:#fff;border:1px solid #EA9F36;-webkit-border-radius: .05rem;-moz-border-radius: .05rem;border-radius: .05rem;padding:.05rem;font-size: .28rem;}
	.class_list_footer p:nth-child(2){flex: 1;padding-left:3px;}

	.class_list_footer1{text-align:right;padding:.1rem .3rem .1rem 0; border-top:1px solid #E5E5E5;margin-top: .15rem;}
    .class_list_footer1 button{color:#EA9F36;background:#fff;border:1px solid #EA9F36;-webkit-border-radius: .05rem;-moz-border-radius: .05rem;border-radius: .05rem;padding:.05rem;font-size: .28rem;}
</style>