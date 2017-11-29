<template>
	<div v-title data-title="选择报名班级">
		<!-- 头部 -->
		<heade :titlehead="headTitle" v-bind:change="getData"></heade>

		<div class="top_fix" ref="top_fix">
			<!-- 流程图 -->
			<img src="static/images/lct_02.png" alt="安徽继续教育网" width="100%" style="position:relative;border:0;verical-align:top;" >

			<!-- 筛选框 -->
			<div class="z_index_box">
				<!-- 搜索 -->
		        <div class="ss">
		            <div class="ss01">
		                <input id="text" type="text" placeholder="课程名称/年份" autocomplete="false" ref='searchBox' v-on:focus="isShowNavBottom=false" v-on:blur="isShowNavBottom=true"/>
		                <p @click='searchBtn'>搜索</p>
		            </div>
		        </div>

				<!-- 筛选框 -->
				<div class="choose_idea">
					<table width="100%" class="choose_idea_box">
						<tr>
							<td v-for='typeMsg in getTypeData' :name="typeMsg.codeNo" @click='fixedBoxClick'>
								<p>
									<span>{{typeMsg.codeName.replace('继续教育','')}}</span><span class="arrow_logo arrow_top">︿</span><span class="arrow_logo hover arrow_down">﹀</span>
								</p>
							</td>
						</tr>
					</table>
				</div>
			</div>
		</div>

		<!-- 专业选择弹框 -->
		<div class="major_select_box">
			<table width="100%" class="choose_idea_box">
				<tr>
					<td @click='clickMajor' v-for='typeMsg in getTypeData' :name="typeMsg.codeNo">
						<p>
							<span>{{typeMsg.codeName.replace('继续教育','')}}</span><span class="arrow_logo arrow_top">︿</span><span class="arrow_logo hover arrow_down">﹀</span>
						</p>
					</td>
				</tr>
			</table>

			<!-- 专业选择框列表 -->
			<div class="major_list">
				<ul class="chosedMajor" ref="chosedMajor">
					<li @click='majorToggle' v-for='majorData in getMajorData' :name='majorData.codeNo'>{{majorData.codeName}}</li>
					
					<div class="clear"></div>
				</ul>
				<div class="clear"></div>
				<div class="btn_box1" v-show="getMajorData.length>20">
					<p>滑动显示更多</p>
				</div>
			</div>
		</div>
		<div class="bg_opacity" @click='hideMajorBox'></div>

		<div class="jxjyw" ref="jxjyw">
	        <!-- 课程 -->
	        <div class="course">
	          	<ul id="course_box" v-show="isHaveData">
	            	<li class="class_list" v-for="msg in dataMsg">
	            		<router-link :to="{path:'/classDetail',query:{'classNo':msg.classNo}} " >
		            		<table width="100%">
		            			<tr>
		            				<td colspan='2'><h4 class="course_title">{{msg.className}}</h4></td>
		            			</tr>
		            			<tr>
		            				<td rowspan='4' width='25%' vertical-align="middle">
										<img :src="msg.classImage" alt="安徽继续教育网" width="100%" v-show="msg.classImage != null ">
										<img src="/static/images/noimg.png" alt="安徽继续教育网" width="100%" v-show="msg.classImage == null ">
									</td>
		            				<td style="padding-left:5px;">
		            					<p>{{msg.trainProject.sysCode.sysCode.codeName}}({{msg.trainProject.sysCode.codeName}})
		            					</p>
	            					</td>
		            			</tr>
		            			<tr>
		            				<td style="position:relative;padding-left:5px;">
		            					<span style="color:#666;font-size:0.28rem" v-show="msg.classType == '01' ">在线</span><span style="color:#666;font-size:0.28rem" v-show="msg.classType == '02' ">面授</span><span style="color:#666;font-size:0.28rem" v-show="msg.classType == '03' ">混合</span><span style="color:#666;font-size:0.28rem">/{{msg.province.cityname}}</span>

		            					<div class="extra_free" v-show="msg.giveIntegral != '0' ">
		            						<span>额外赠送{{msg.giveIntegral}}积分</span>
		            						<div class="top_trangle"></div>
		            						<div class="bottom_trangle"></div>
		            					</div>
		            				</td>
		            			</tr>
		            			<tr>
		            				<td style="padding-left:5px;">
		            					<p class="t_box"><span>授课老师:{{msg.teachers.split(" ")[0]}}</span><strong class="price">￥{{msg.classPrice}}</strong></p>
	            					</td>
		            			</tr>
		            			<tr>
		            				<td style="padding-left:5px;vertical-align:middle">
		            					<div class="left study_time">
			                    			<!-- <img src="" alt="安徽继续教育网" class="left"> -->
			                    			<span class="left">{{msg.classCredithour}}学时</span>
			                  			</div>
		            				</td>
		            			</tr>
		            		</table>
	            		</router-link>
						<!-- 考试分类 -->
						<div class="exam_type_box" @click="openExamTypeAlert(msg.isClassExam,msg.isIndependentExam,msg.isCourseExam)" v-show="(msg.isClassExam || msg.isIndependentExam || msg.isCourseExam)">
							<ul>
								<li class="type_exam_class" v-show="msg.isClassExam">
									<div>
										<img src="static/images/examType_03.png" alt="安徽继续教育网">
										<span>班级考试</span>
									</div>
								</li>
								<li class="type_exam_indepence" v-show="msg.isIndependentExam">
									<div>
										<img src="static/images/examType_01.png" alt="安徽继续教育网">
										<span>独立考试</span>
									</div>
								</li>
								<li class="type_exam_course" v-show="msg.isCourseExam">
									<div>
										<img src="static/images/examType_05.png" alt="安徽继续教育网">
										<span>课程考试</span>
									</div>
								</li>
							</ul>
							<div class="exam_type_intrduce">
								说明<img src="static/images/dianjiann.png" alt="安徽继续教育网">
							</div>
						</div>

						<!-- 立即购买按钮和提示 -->
	            		<div class="btm_box">
	            			<div class="left warn_text" v-show="(msg.classEnrolStatus == '02' ) && (msg.classPeopleNumber-msg.classEnrolNumber>0) && (msg.timeFlag == '02' )">
	            				*报名前请仔细阅读报名须知和班级介绍
	            			</div>
	            			<div class="right btn_box">
	              				<!-- 评价按钮 -->   
	              				<!-- <a href="#" class="judge" v-show="msg.isEva"><img src="static/images/xk_03.png" alt="安徽继续教育网" width="65"></a> -->
	              				<!-- 购买按钮 -->
	                			<router-link :to="{ path:'/ensureClass',query:{'classId':msg.id} }" class="parches" v-show="(msg.classEnrolStatus == '02' ) && (msg.classPeopleNumber-msg.classEnrolNumber>0) && (msg.timeFlag == '02' )"><img src="static/images/xk_05.png" alt="安徽继续教育网" width="65"></router-link>
	              			</div>
	              			<div class="clear"></div>
	            		</div>
	            		
	            	</li>
	          	</ul>
	        </div>
        </div>
		
		<div v-show="showStatus=='01'" class='load_more'>数据已加载完！</div>
        <div v-show="showStatus=='02'" class='load_more'>上拉加载更多</div>
        <div v-show="showStatus=='03'" class='load_more'>暂无数据！</div>

		<!-- 底部导航 -->
		<navBottom v-show='isShowNavBottom'></navBottom>

        <!-- 底部 -->
		<foote></foote>

		<!-- 课程分类说明弹框 -->
		<div class="exam_type_intrduce_alert_box">
			<div class="exam_type_intrduce_alert">
				<div class="exam_type_intrduce_alert_header">
					<span class="line"></span><span>说明</span><span class="line"></span>
				</div>
				<div class="exam_type_intrduce_alert_content">
					<ul>
						<li v-show="isHaveClassExam">
							<div>
								<img src="static/images/examType_03.png" alt="安徽继续教育网">
								<span>班级考试</span>
							</div>
							<p>针对班级整体培训的结业考核，完成班级中报名的课程和考试后才能参加班级结业考试，考试合格才能取得班级学时和证书</p>
						</li>
						<li v-show="isHaveIndependentExam">
							<div>
								<img src="static/images/examType_01.png" alt="安徽继续教育网">
								<span>独立考试</span>
							</div>
							<p>考核相关知识点掌握情况，无需参加学习直接考试，考试合格才能取得对应的学时</p>
						</li>
						<li v-show="isHaveCourseExam">
							<div>
								<img src="static/images/examType_05.png" alt="安徽继续教育网">
								<span>课程考试</span>
							</div>
							<p>针对课程学习效果的考核，学习完课程才能参加考试，考试合格才能取得课程的学时</p>
						</li>
					</ul>
				</div>
				<div class="exam_type_intrduce_alert_footer" @click="closeExamTypeAlert"><button>确 定</button></div>
			</div>
		</div>
		
	</div>
</template>
<script>
	import heade from '@/components/common/header'
	import foote from '@/components/common/footer'
	import navBottom from '@/components/common/navBottom'
	import axios from "axios";
	import config from "@/api/base.js"; 
	export default{
		data(){
			return{
				headTitle:"选课中心",
				dataMsg:[],
				isHaveData:true,                 //是否有数据
				isShowNavBottom:true,            //是否显示底部导航
				codeNo:'',                       //分类编号
				majorNo:'',                      //专业编号
				area:'',                         //地区编号
				className:'',                    //班级名称
				pages:1,                         //当前页码
				pageSize:5,                      //每页多少条
				canGetData:true,                 //能否加载数据
				getTypeData:{},                  //分类数据
				getMajorData:{},                 //专业数据
				beforeLeave:true,                //页面滚动加载数据开关
				isFirstToPage:true,              //是否是刚进入页面
				allMajorData:[],                 //已获取到的专业数据
				firstGetData:false,              //是否是第一次加载数据 
				showStatus:"00",                 //显示状态
				isHaveClassExam:true,            //是否有班级考试
				isHaveIndependentExam:true,      //是否有独立考试
				isHaveCourseExam:true,           //是否有课程考试
			}
		},
		components:{
			heade,
			foote,
			navBottom
		},
		created(){
			this.setHeaderBackBtn();
			this.setNavBottom();
			this.getData();
		},
		mounted(){
			this.scrollData();
			this.getType();
		},
		computed:{
			getChangeArea(){
				return this.$store.state.chooseCity;
			}
		},
		watch:{
			// 动态监控所选城市值的变化
			getChangeArea(newValue, oldValue){
				this.majorNo='';
				this.getData();
				document.body.scrollTop=0;
			}
		},
		methods:{
			getData(){
				var _this=this;

				_this.canGetData=false;
				_this.pages=1;

				var jxjyCity=sessionStorage.getItem('jxjySetChooseCity');

				if(_this.isFirstToPage && (_this.$route.query.codeNo != undefined)){
					// 若第一次进入且有codeNo参数
					_this.codeNo=_this.$route.query.codeNo;
					if(jxjyCity!="" && jxjyCity!=null && jxjyCity!=undefined){
		      			var params={'codeNo':_this.codeNo,'className':_this.className,'pages':_this.pages,'pageSize':_this.pageSize,'area':jxjyCity.split('?')[1]};
					}else{
						var params={'area':_this.$store.state.chooseCity,'codeNo':_this.codeNo,'className':_this.className,'pages':_this.pages,'pageSize':_this.pageSize};
					};
					_this.isFirstToPage=false;
				}else{
					if(jxjyCity!="" && jxjyCity!=null && jxjyCity!=undefined){
		      			var params={'codeNo':_this.codeNo,'className':_this.className,'pages':_this.pages,'pageSize':_this.pageSize,'area':jxjyCity.split('?')[1]};
					}else{
						var params={'area':_this.$store.state.chooseCity,'codeNo':_this.codeNo,'className':_this.className,'pages':_this.pages,'pageSize':_this.pageSize};
					};
					_this.isFirstToPage=false;
				}
	      		
				axios.post('/class/toClassCenter.html',params,config)
				.then(function(res){
					_this.dataMsg=res.data.list;
					// 判断是否有数据
					_this.isHaveData=(_this.dataMsg.length==0)?false:true;

					// 如果页码乘以每页数量大于总数据数量，停止滚动加载数据
					_this.canGetData=(_this.pages*_this.pageSize>=res.data.num)?false:true;
					_this.pages++;
					$('body').scrollTop(0);

					_this.firstGetData=true;

					_this.statusJudge();
				});
			},
			// 状态判断
			statusJudge(){
				if((!this.canGetData)&&this.isHaveData&&this.firstGetData){
					this.showStatus='01';       //01数据已加载完！
				}else if(this.canGetData&&this.isHaveData&&this.firstGetData){
					this.showStatus='02';       //02上拉加载更多！
				}else if((!this.isHaveData)&&this.firstGetData){
					this.showStatus='03';       //03暂无数据！
				}
			},
			// 滚动事件
			scrollData(){
				var _this=this;
				window.addEventListener('scroll',function(){
					if((document.body.scrollTop + window.innerHeight+parseInt(300)  >=document.body.offsetHeight)&&_this.canGetData && _this.beforeLeave ){
						_this.loadMore();
					}
				});
			},
			// 加载更多
			loadMore(){
				var _this=this;

				_this.canGetData=false;
				var jxjyCity=sessionStorage.getItem('jxjySetChooseCity');
				if(jxjyCity!="" && jxjyCity!=null && jxjyCity!=undefined){
					var params={'area':jxjyCity.split('?')[1],'codeNo':_this.codeNo,'className':_this.className,'pages':_this.pages,'pageSize':_this.pageSize};
				}else{
					var params={'area':_this.$store.state.chooseCity,'codeNo':_this.codeNo,'className':_this.className,'pages':_this.pages,'pageSize':_this.pageSize};
				};
				axios.post('/class/toClassCenter.html',params,config)
				.then(function(res){
					_this.dataMsg=_this.dataMsg.concat(res.data.list);
					// 如果页码乘以每页数量大于总数据数量，停止滚动加载数据
					_this.canGetData=(_this.pages*_this.pageSize>=res.data.num)?false:true;

					_this.statusJudge();
					_this.pages++;
				});
			},
			// 隐藏专业下拉框
			hideMajorBox(){
				$('.major_list').removeClass('hover');
				$('.choose_idea_box td.hover').removeClass('hover').children().children('.arrow_logo.hover').removeClass('hover').siblings('.arrow_logo').addClass('hover');
				// 隐藏透明背景
				$('.major_select_box,.bg_opacity').fadeOut();
				this.$refs.top_fix.className="top_fix";

				$("html,body").css({"height":"auto","overflow":"visible"});
			},
			// 搜索框查询
			searchBtn(){
				var _this=this;
				_this.className=_this.$refs.searchBox.value;
				_this.getData();
			},
			// 专业切换
			majorToggle(e){
				var a=e.target||e.srcElement;
				$(a).addClass("hover").siblings("li.hover").removeClass('hover');
				this.majorNo=$(a).attr('name');
				$("body,html").css({"height":"auto","overflow":"visible"});
				this.ensureBtn();
			},
			// 定位弹框点击效果
			fixedBoxClick(e){
				var a=e.currentTarget;
				var getName=$(a).attr('name');
				$('.major_select_box,.bg_opacity').fadeIn();
				$('[name='+getName+'],[name='+getName+'] .arrow_top').addClass('hover');
				$('[name='+getName+'] .arrow_down').removeClass('hover');

				this.$refs.jxjyw.scrollTop="300";
				this.$refs.top_fix.className="top_fix hover";
				this.getMajor(getName);

				$("html,body").css({"height":"100%","overflow":"hidden"});
			},
			// 大类点击效果
			clickMajor(e){
				var a=e.currentTarget;
				var nameVal=$(a).attr('name');
				if($(a).hasClass('hover')){
					$('.major_select_box,.bg_opacity').fadeOut();
					$('[name='+nameVal+'],[name='+nameVal+'] .arrow_top').removeClass('hover');
					$('[name='+nameVal+'] .arrow_down').addClass('hover');
					this.hideMajorBox();

					this.$refs.jxjyw.scrollTop="0";
					this.$refs.top_fix.className="top_fix";
				}else{
					$(a).addClass('hover').siblings('td.hover').removeClass('hover');
					// 箭头切换
					$(a).children().children('.arrow_top').addClass('hover').siblings('.arrow_down').removeClass('hover').parent('p').parent('td').siblings('td').children().children('.arrow_top').removeClass('hover').siblings('.arrow_down').addClass('hover');

					$('.major_list').addClass('hover').children().children('li.hover').removeClass('hover');
					this.majorNo='';
					// 获取存储在name属性里的大类编号
					var getName=$(a).attr('name');
					var idxNum=$(a).children('.idx_num').val();
					this.getMajor(getName);
				}

			},
			// 专业分类查询
			ensureBtn(){
				var _this=this;
				$('.major_list').removeClass('hover');
				$('.choose_idea_box td.hover').removeClass('hover').children().children('.arrow_top').removeClass('hover').siblings('.arrow_down').addClass('hover');

				_this.codeNo=_this.majorNo;
				_this.getData();
				// 隐藏透明背景
				$('.major_select_box,.bg_opacity').fadeOut();
				this.$refs.top_fix.className="top_fix";
			},
			// 获取专业信息
			getMajorMsg(){
				var _this=this;
				var params={'parent':_this.codeNo};
				axios.post('/class/toCode.html',params,config)
				.then(function(res){
					_this.getMajorData=res.data.list;
				});
			},
			// 获取班级大类分类信息
			getType(){
				var _this=this;
				// 默认大类  07
				var params={'parent':'07'};
				axios.post('/class/toCode.html',params,config)
				.then(function(res){
					_this.getTypeData=res.data.list;
				})
			},
			// 获取班级大类下专业信息
			getMajor(getCode){
				var _this=this;
				var params={'parent':getCode};
				axios.post('/class/toCode.html',params,config)
				.then(function(res){
					_this.getMajorData=res.data.list;
					_this.$refs.chosedMajor.scrollTop=0;
				});
			},
			// 设置是否显示头部返回按钮
			setHeaderBackBtn(){
				this.$store.commit('showHeaderBack',false);
			},
			// 设置底部导航状态
			setNavBottom(){
				this.$store.commit('setNavOnBottomStatus',['0','1','0','0','0']);
			},
			// 打开考试分类弹框
			openExamTypeAlert(param1,param2,param3){
				$(".exam_type_intrduce_alert_box").fadeIn();
				this.isHaveClassExam=param1;
				this.isHaveIndependentExam=param2;
				this.isHaveCourseExam=param3;
			},
			// 关闭考试分类弹框
			closeExamTypeAlert(){	
				$(".exam_type_intrduce_alert_box").fadeOut();
			},
		},
		beforeDestroy() {
	      	this.beforeLeave=false;
	    },
	}
</script>
<style scoped>
	.warn_text{font-size: 0.26rem;color:#EF856C;position: absolute;height:20px;left:0;top:50%;margin-top: -10px;padding-left: .1rem;}
	.btm_box{position: relative;}
    .jxjyw{padding-bottom: 50px;padding-top:.9rem;margin-top: 2.7rem;}
    .z_index_box{position: relative;background:#fff;top:-10px;z-index: 2}
    .top_fix{position: fixed;top:.88rem;left:0;right:0;z-index: 9999}
    .top_fix.hover{top:-4rem;}
    .top_fix>img{z-index: 2}
    .load_more{text-align: center;padding-bottom: 150px;}
	/*筛选框*/
	.course{position: relative;z-index: 0}
	.choose_idea{position: relative;}
	.choose_idea table{border-collapse: collapse;border:0;}
	.choose_idea_box{width:100%;border-bottom: 1px solid #9C9C9C !important;position: relative;z-index: 100000}
	.choose_idea_box tr td{border-top:1px solid #c8c5c4;text-align: center;padding:2px 0;height:0.7rem;line-height:0.7rem;}
	.choose_idea_box tr td p{height:0.4rem;line-height:0.4rem;border-right:1px solid #c8c5c4;}
	.choose_idea_box tr td:last-child p{border-right:0 !important;}
	.arrow_logo{margin-left:2px;display: none}
	.arrow_logo.hover{display: inline;}
	.arrow_top{position: relative;top:-0.06rem;}
	.arrow_down{position: relative;top:0.07rem;}
	.major_list{position: absolute;top:0.7rem;left:0;width:100%;background: #fff;z-index: 99999}
	.major_list.hover{display:block;}
	.major_list ul li{width:50%;float:left;padding:0 0 0 0.7rem;height:0.7rem;line-height: 0.7rem;border-bottom: 1px solid #E5E4E4;font-size: 0.26rem;}
	.major_list ul li:nth-child(odd){border-right: 1px solid #E5E4E4}
	.major_list ul{padding-bottom: 10px;max-height: 7rem;overflow-y: scroll;}
	.btn_box1{border-bottom:1px solid #ddd;background:#DDDDDD;}
	.btn_box1 p{width:2.2rem;background:url(../../../static/images/scrollGetMore.png) no-repeat right center;background-size:0.4rem;-webkit-background-size:0.4rem;-moz-background-size:0.4rem;-o-background-size:0.4rem;margin:0 auto;text-align: left;height:0.6rem;line-height: 0.6rem;}
	.btn_box1 img{margin:10px 0;}
	.bg_opacity{position: fixed;top:.9rem;left:0;right:0;bottom:0;background:#000;opacity:0.7;display:none;z-index: 9999}

	.choose_idea_box td span{font-size: 0.28rem;}
	.choose_idea_box td.hover span{color:#65A1D7;}

	.major_select_box{position: fixed;top:.9rem;left:0;right:0;z-index: 10000;display: none}
	.major_select_box table{background:#fff;border-collapse: collapse;border:0;}


	.ss{width:100%;margin-bottom: 10px; border-bottom:1px solid #f8f8f8;padding-top:10px;}
    #text{width:5.2rem; height:0.53rem; margin:0px; color:#555555;border:1px solid #ccc; float:left; line-height:0.53rem; border-radius:0.265rem;-moz-border-radius: 0.265rem;
	-webkit-border-radius: 0.265rem; padding-left:5px;background:url(../../../static/images/guancn-55.png) no-repeat 0.11rem center;padding-left: 0.53rem;background-size:0.28rem;font-size: 0.28rem}
    .ss01{display:block;margin:0.05rem auto; width:5.3rem; height:0.53rem;position: relative;}
    .ss01 p{position: absolute;right:0;top:0;width:1.13rem;height:.53rem;line-height: .53rem;background:#17bbe2;color:#fff;text-align: center;border-bottom-right-radius: 0.265rem;-webkit-border-bottom-right-radius: 0.265rem;-moz-border-bottom-right-radius: 0.265rem;border-top-right-radius:0.265rem;-webkit-border-top-right-radius: 0.265rem;-moz-border-top-right-radius: 0.265rem;font-size: 0.34rem}

    .course ul{width:100%;padding:0 5px;}
    .course li.class_list{padding:5px 3px;border:1px solid #EEEEEE;border-radius: 5px;-webkit-border-radius: 5px;-o-border-radius: 5px;border-bottom: 2px solid #5FB2D2;margin-top:5px;background:#fff;}
	.course_title{font-size: 0.34rem;font-weight: 300;color: #000;}
	.class_list td p{font-size: 0.28rem;color:#666;}
	.class_list td p.t_box{position:relative;}
	.class_list td p.t_box span{color: #666;}
	.class_list td p.t_box .price{font-size: 0.32rem;color: #D4412A;position: absolute;top:-2px;right:0;}
	.look_detail{color:#3F9ED1;font-size:0.9rem;margin-top: 4px;float: left}
	.study_time{background:url(../../../static/images/sjz_03.png) no-repeat 1px center;padding-left: 0.34rem;background-size: 0.26rem !important;-webkit-background-size: 0.26rem !important;-moz-background-size: 0.26rem !important;-o-background-size: 0.26rem !important;}
	.study_time span{color:#666;margin-top: 1px;font-size: 0.28rem}
	.study_time img{margin-right: 3px}

	.extra_free{position:absolute;right:-9px;top:0;background:#EB681A;padding:0 5px;height: 0.3rem;line-height: 0.33rem;}
	.extra_free span{color:#fff;font-size:0.28rem}
	.top_trangle{position:absolute;width:0;height:0;border-right:4px solid transparent;border-bottom:4px solid #EB681A;top:-4px;right:0;}

	.exam_type_box{border-top: 1px solid #DCDCDD;border-bottom: 1px solid #DCDCDD;-webkit-display: flex;-o-display: flex;display: flex;height:.5rem;-webkit-align-items: center;-o-align-items: center;align-items: center;margin-bottom: .1rem;}
	.exam_type_box ul li{margin-left: .15rem;float: left;}
	.exam_type_box ul li:first-child{margin-left: 0;}
	.exam_type_box ul li>div{display: flex;align-items: center;}
	.exam_type_box ul li img{height: .32rem;width:.32rem;margin-right: .1rem;}
	.exam_type_intrduce{width: 1rem;color:#B1B0B1;display: -webkit-flex;display: -ms-flex;display: flex;-ms-align-items: center;align-items: center}
	.exam_type_intrduce img{width:.14rem;height:.19rem;margin-left: .1rem;}

	/*弹框*/
	.exam_type_intrduce_alert_box{position: fixed;top:.9rem;left:0;right:0;bottom:0;background: rgba(0,0,0,.7);z-index: 100000;display: none;}
	.exam_type_intrduce_alert{background: #fff;position: absolute;bottom:0;left:0;right:0;}
	.exam_type_intrduce_alert_header{text-align: center;padding-top:.4rem; padding-bottom: .18rem;}
	.exam_type_intrduce_alert_header span.line{display: inline-block;height:.1rem;border-top: 1px solid #DCDCDC;width:.4rem;}
	.exam_type_intrduce_alert_header span:nth-child(2){margin-left:.1rem;margin-right: .1rem;}
	.exam_type_intrduce_alert_content{padding:0 .2rem;}
	.exam_type_intrduce_alert_content ul li{padding-bottom: .28rem;border-bottom: 1px solid #DCDCDD;padding-top: .3rem;}
	.exam_type_intrduce_alert_content ul li:last-child{border-bottom: 0;}
	.exam_type_intrduce_alert_content ul li>div{display: -webkit-flex;display: -o-flex;display: flex;align-items: center;}
	.exam_type_intrduce_alert_content ul li>div img{height:.34rem;margin-right: .1rem;}
	.exam_type_intrduce_alert_content ul li p{padding-left:.44rem;margin-top: .2rem;color:#737575;}
	.exam_type_intrduce_alert_footer button{width:100%;height:40px;background:#31B1DE;color: #fff;line-height:40px;}
</style>