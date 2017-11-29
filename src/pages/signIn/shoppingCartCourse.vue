<template>
	<div v-title data-title="报名内容">
		<!-- 头部 -->
		<heade :titlehead="headTitle"></heade>
		 <!--30  0.28   26 -->
		<div class="main">
			<div class="box">
				<!-- 班级名称 -->
				<div class="class_title">
					<img src="static/images/ban2.png" alt="安徽继续教育网">
					<p>{{classNameTitle}}</p>
					<img src="static/images/ban1.png" alt="安徽继续教育网">
				</div>
				
				<!-- 独立考试列表 -->
				<div class="indepence_list" v-show="dataMsgA != null && dataMsgA != ''">
					<!-- 标题 -->
					<div class="list_top">
						<span class="left">独立考试列表<strong class="line left"></strong></span>
					</div>

					<div class="course_single" v-for='msg in dataMsgA'>
						<img src="static/images/111.png" alt="安徽继续教育网" class="course_img left">
						<div class="course_detail left">
							<p class="course_title">{{msg.examQuiz.name}}</p>
							<div class="line_two">
								<p class="course_detail_list">
									总分/及格分数：{{msg.examQuiz.totalPoint}}/{{msg.examQuiz.passscore}}分
								</p>
								<p class="course_detail_price">
									￥{{msg.examQuiz.price}}
								</p>
							</div>
							<div class="line_three">
								<p class="course_detail_list">
									学时：{{msg.examQuiz.credit}}学时
								</p>
							</div>
							<div class="line_four">
								<p class="course_detail_list">
									考试时长：{{msg.examQuiz.timelimit}}分钟
								</p>
							</div>
						</div>
						<div class="clear"></div>
					</div>
				</div>
				
				<!-- 课程列表 -->
				<div class="course_list" v-show="dataMsg != null && dataMsg != ''">
					<!-- 标题 -->
					<div class="list_top">
						<span class="left">课程列表<strong class="line left"></strong></span>
					</div>

					<div class="course_single" v-for='msg in dataMsg'>
						<img src="static/images/111.png" alt="安徽继续教育网" class="course_img left">
						<div class="course_detail left">
							<p class="course_title">{{msg.resCourse.cname}}</p>
							<div class="line_two">
								<p class="course_detail_list">
									授课老师：{{msg.resCourse.sysTeacher.realname}}
								</p>
								<p class="course_detail_price">
									￥{{msg.resCourse.cprice}}
								</p>
							</div>
							<div class="line_three">
								<p class="course_detail_list">
									学时：{{msg.resCourse.ccredithour}}学时
								</p>

								<img src="static/images/garbage.png" alt="安徽继续教育网" class="delete_img" :name="msg.resCourse.id" @click='deleteCourse' v-show="msg.trainClass.isAskHours == '01'">
							</div>
						</div>
						<div class="clear"></div>
					</div>
				</div>
			</div>
			
			<!-- 警告 -->
			<div class="warn" v-show="canDelete == '02'">
				*本班需按要求学时报名，如需调课请在购物车删班重报
			</div>

			<!-- 删除课程弹框 -->
			<div class="pool"></div>
			<div class='delete_order_box'>
				<div class="delete_order">
					<p class='delete_warn'>是否确定删除该课程？</p>
					<button class='cancle' @click='cancleControlOrder'>取消</button>
					<button class="ensure" @click='ensureCancleOrder'>确定</button>
				</div>
			</div>
		</div>
	</div>
</template>
<script>
	import heade from '@/components/common/header'
	import axios from "axios";
	import config from "@/api/base.js";

	export default{
		data(){
			return{
				headTitle:"报名内容",
				dataMsg:{},                 //班级列表
				dataMsgA:{},                //独立考试列表
				isHaveData:false,           //是否有数据
				deleteCourseId:"",          //删除课程id
				classNameTitle:"",          //班级名称
				canDelete:"",               //是否能删除
			}
		},
		components:{
			heade,
		},
		created(){
			this.getData();
		},
		mounted(){
			this.setHeaderBackBtn();
		},
		methods:{
			getData(){
				var _this=this;
				var params={'classId':_this.$route.query.classId};
				axios.post('/order/toCourseCk.do',params,config)
				.then(function(res){
					var resu=res.data.result;
					_this.dataMsg=res.data.courseCartList;
					_this.dataMsgA=res.data.examCartList;
					_this.classNameTitle=(res.data.courseCartList != null && res.data.courseCartList != undefined && res.data.courseCartList != "")?res.data.courseCartList[0].trainClass.className:res.data.examCartList[0].trainClass.className;
					_this.canDelete=(res.data.courseCartList != null && res.data.courseCartList != undefined && res.data.courseCartList != "")?res.data.courseCartList[0].trainClass.isAskHours:false;
					if(resu == '0'){
						_this.isHaveData=false;
					}
				})
			},
			deleteCourse(e){
				var a=e.target || e.srcElement;
				this.deleteCourseId=$(a).attr('name');
				$('.pool,.delete_order_box').fadeIn();
			},
			// 确定取消订单
			ensureCancleOrder(){
				var _this=this;
				var params={'courseId':_this.deleteCourseId};
				axios.post('/order/doDelShoppingCartByCourseId.do',params,config)
				.then(function(res){
					var resu=res.data.result;
					if(resu == '1'){
						$("img[name='"+_this.deleteCourseId+"']").parent().parent().parent().remove();
						$('.pool,.delete_order_box').fadeOut();
					}else{
						_this.openAlert('操作失败，请重试！');
					};
				});
			},
			// 取消操作订单
			cancleControlOrder(){
				this.cancleOrderNum='';
				$('.pool,.delete_order_box').fadeOut();
			},
			// 设置是否显示头部返回按钮
            setHeaderBackBtn(){
                this.$store.commit('showHeaderBack',true);
            },
		}
	}
</script>      
<style scoped>
	.main{margin-top:.9rem;/*padding-top: 0.15rem;*/margin-bottom: 1rem;}
	.box{margin:0;padding:0 0 0.3rem 0;}
	.class_title{font-size: 0.3rem;text-align: center;padding:0.19rem .2rem;background:#fff;}
	.class_title p{font-size: 0.3rem;display: inline-block;max-width: 5.5rem;overflow: hidden;white-space: nowrap;}
	.class_title img{width:0.3rem;position: relative;top: -0.05rem;}

	.course_single{margin-top: 0.3rem;border-bottom:1px dashed #E1DFDF;padding-bottom: 0.15rem;}
	.indepence_list .course_single:last-child,.course_list .course_single:last-child{border-bottom:0;}
	.course_img{width:1.55rem;}
	.course_detail{margin-left: 0.15rem;}
	.course_title{font-size: 0.28rem;width: 5rem;white-space: nowrap;overflow: hidden;height:0.4rem;}
	.line_two p,.line_three p,.line_four p{ display: inline-block;font-size: 0.26rem;color:#7C7C7C;height:0.3rem;}
	.indepence_list{margin-top: .1rem;padding:0 5px;background: #fff;}
	.course_list{margin-top:.25rem;padding:0 5px;background: #fff;}
	.course_list .line_two p,.course_list .line_three p{height:0.35rem;}
	.line_two p.course_detail_price{color:#D1211A !important;}
	.course_detail_list{width:3.75rem;}
	.delete_img{width:0.35rem;margin-left:0.75rem;float:right;margin-top: 0.12rem;}

	.warn{background:#FFFBF1;height:0.6rem;line-height:0.6rem;position: fixed;bottom:0;left:0;width:100%;text-align: center;color:#FC6E51;font-size: 0.26rem;}

	.pool{position: fixed;top:.9rem;left:0;right:0;bottom:0;background:#000;opacity:0.6;z-index: 200;display:none;}
	.delete_order_box{position: fixed;top:.9rem;left:0;right:0;bottom:0;text-align: center;z-index: 300;font-size: 1rem;display:none;}
	.delete_order{height:1.6rem;position: absolute;top:50%;margin-top: -0.8rem;background:#fff;width:4rem;left:50%;margin-left: -2rem;border-radius: 0.1rem;-webkit-border-radius:  0.1rem;-moz-border-radius:  0.1rem;-o-border-radius:  0.1rem;}
	.delete_warn{height:0.8rem;line-height:0.8rem;font-size: 0.28rem;}
	.delete_order button{width:50%;height:0.8rem;line-height:0.8rem;border:0;float:left;background:#fff;border-top:1px solid #eee;font-size: 0.28rem}
	.cancle{border-right:1px solid #eee !important;border-bottom-left-radius: 0.1rem;-moz-border-bottom-left-radius: 0.1rem;-webkit-border-bottom-left-radius: 0.1rem;-o-border-bottom-left-radius: 0.1rem;}
	.ensure{border-bottom-right-radius: 0.1rem;-moz-border-bottom-right-radius: 0.1rem;-webkit-border-bottom-right-radius: 0.1rem;-o-border-bottom-right-radius: 0.1rem;}

	.list_top{overflow: hidden;padding:.2rem 0 .2rem 0;background: #fff}
    .list_top strong{color:#53ACCC;}
    .list_top span{color:#53ACCC;font-size: 0.32rem;position: relative;margin-left:7px;}
    .list_top strong.line{width:3px;height:0.26rem;background:#53ACCC;position: absolute;top:50%;left:-7px;margin-top:-0.13rem;}
</style>