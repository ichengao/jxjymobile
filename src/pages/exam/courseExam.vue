<template>
	<div v-title data-title="课程考试">
		<!-- 头部 -->
		<heade :titlehead="headTitle"></heade>

		<!-- 主体 -->
        <div class="main">
            <!-- 课程考试列表 -->
            <div class="indepence_list_box">
                <div class="indepence_list">
                    <div class="indepence_list_header">
						<h4>市政道桥转岗培训考试</h4>		
					</div>
                    <div class="indepence_list_content">
						<table width="100%">
							<tr>
								<td rowspan="6" class="indepence_course_img"><img src="static/images/111.png" alt="安徽继续教育网"></td>
								<td>
									总分/及格分数: 100/80分 
								</td>
							</tr>
							<tr>
								<td>
									学时: 30学时&emsp;考试时长: 90分钟
								</td>
							</tr>
							<tr>
								<td>
									最大答题次数: 3次
								</td>
							</tr>
							<tr>
								<td>
									继续答题: 允许
								</td>
							</tr>
							<tr>
								<td>
									评分办法: 最高
								</td>
							</tr>
							<tr>
								<td>
									考试状态: 已开通
								</td>
							</tr>
						</table>
					</div>
                    <div class="indepence_list_footer">
						<div class="indepence_list_footer_left">
							<p>考试成绩: 80分&emsp;考试次数: 1次</p>
							<p>考试时间: 2017.09.21-2017.10.10</p>
						</div>
						<div style="flex:1"></div>
						<div class="indepence_list_footer_right">
							<a @click="openExamNeedKnow('03')">考试须知</a>
							<router-link to="/examHistory">考试记录</router-link>
						</div>

						<div class="clear"></div>
					</div>
                </div>

                <div class="indepence_list">
                    <div class="indepence_list_header">
						<h4>市政道桥转岗培训考试</h4>		
					</div>
                    <div class="indepence_list_content">
						<table width="100%">
							<tr>
								<td rowspan="6" class="indepence_course_img"><img src="static/images/111.png" alt="安徽继续教育网"></td>
								<td>
									总分/及格分数: 100/80分 
								</td>
							</tr>
							<tr>
								<td>
									学时: 30学时&emsp;考试时长: 90分钟
								</td>
							</tr>
							<tr>
								<td>
									最大答题次数: 3次
								</td>
							</tr>
							<tr>
								<td>
									继续答题: 允许
								</td>
							</tr>
							<tr>
								<td>
									评分办法: 最高
								</td>
							</tr>
							<tr>
								<td>
									考试状态: 已开通
								</td>
							</tr>
						</table>
					</div>
                    <div class="indepence_list_footer">
						<div class="indepence_list_footer_left">
							<p>考试成绩: 80分&emsp;考试次数: 1次</p>
							<p>考试时间: 2017.09.21-2017.10.10</p>
						</div>
						<div style="flex:1"></div>
						<div class="indepence_list_footer_right">
							<a @click="openExamNeedKnow('03')">考试须知</a>
							<router-link to="/examHistory">考试记录</router-link>
						</div>

						<div class="clear"></div>
					</div>
                </div>
            </div>
        </div>

		<!-- 考试须知弹框 -->
		<examNeedKnow ref="examNeedKnow"></examNeedKnow>
	</div>
</template>
<script>
	import heade from '@/components/common/header';
	import examNeedKnow from '@/components/common/examNeedKnow';
	import axios from 'axios';
    import config from "@/api/base.js";
	export default{
		data(){
			return{
				headTitle:"课程考试",
			} 
		},
		components:{
			heade,
			examNeedKnow
		},
		created(){
			this.setHeaderBackBtn();
		},
		methods:{
			// 设置是否显示头部返回按钮
            setHeaderBackBtn(){
                this.$store.commit('showHeaderBack',true);
			},
			// 打开考试须知弹框
			openExamNeedKnow(params){
				this.$refs.examNeedKnow.openExamNeedKnow(params);
			}
		}
	}
</script>
<style scoped>
	.main{margin-top:.9rem;}
	.indepence_list{background:#fff;padding:.15rem .15rem 0 .15rem;margin-bottom: .2rem;}
	.indepence_list_header h4{font-size: .32rem;}
	.indepence_list_content tr td{font-size: .26rem;color:#737373}
	.indepence_course_img{width:2.25rem;padding-right:.1rem;}
	.indepence_course_img img{width:100%;}
	.indepence_list_footer{margin-top:.1rem;width:100%;border-top:1px solid #DCDCDD;height:.92rem; padding:.1rem 0;display:-webkit-flex;display: -ms-flex;display:-o-flex;display: flex;align-items: center;justify-content: space-between;}
	.indepence_list_footer_left p{color:#737373;font-size: .26rem;}
	.indepence_list_footer_left p:first-child{color:#FF6946;}
	.indepence_list_footer_right a{display: inline-block;padding:.08rem;color:#737373;border:1px solid #737373;border-radius:3px;-webkit-border-radius:3px;-moz-border-radius:3px;-o-border-radius:3px;font-size: .26rem;}
</style>