<template>
	<div v-title data-title="考试">
		<!-- 头部 -->
		<heade :titlehead="headTitle"></heade>

		<!-- 主体 -->
        <div class="exam_entry_box main">
            <!-- 班级考试 -->
            <div class="exam_entry_list">
                <div class="exam_entry_header">
                    <router-link to="/classExamSearch">
                        <div class="exam_entry_header_left">
                            <img src="static/images/examType_03.png" alt="安徽继续教育网">
                            <span>班级考试</span>
                        </div>

                        <img src="static/images/dianjiann.png" alt="安徽继续教育网">
                    </router-link>
                </div>
                <div class="exam_entry_content">
                    针对班级整体培训的结业考核，完成班级中报名的课程和考试后才能参加班级结业考试，考试合格才能取得班级学时和证书
                </div>
            </div>

            <!-- 独立考试 -->
            <div class="exam_entry_list">
                <div class="exam_entry_header">
                    <router-link to="/indepenceExam">
                        <div class="exam_entry_header_left">
                            <img src="static/images/examType_01.png" alt="安徽继续教育网">
                            <span>独立考试</span>
                        </div>

                        <img src="static/images/dianjiann.png" alt="安徽继续教育网">
                    </router-link>
                </div>
                <div class="exam_entry_content">
                    考核相关知识点掌握情况，无需参加学习直接考试，考试合格才能取得对应的学时
                </div>
            </div>

            <!-- 课程考试 -->
            <div class="exam_entry_list">
                <div class="exam_entry_header">
                    <router-link to="/myCourse?classId=ff8080815a96fd68015a970d06f3064b">
                        <div class="exam_entry_header_left">
                            <img src="static/images/examType_05.png" alt="安徽继续教育网">
                            <span>课程考试</span>
                        </div>

                        <img src="static/images/dianjiann.png" alt="安徽继续教育网">
                    </router-link>
                </div>
                <div class="exam_entry_content">
                    针对课程学习效果的考核，学习完课程才能参加考试，考试合格才能取得课程的学时
                </div>
            </div>

            <!-- 提示 -->
            <div class="exam_entry_warn">
                <div class="exam_entry_warn_header">
                    <img src="static/images/courseEntry1.png" alt="安徽继续教育网">
                    <span>提示</span>
                </div>
                <div class="exam_entry_warn_content">
                    <p>考试列表根据班级考试的配置显示课程考试、独立考试和班级考试按钮，没有的不显示</p>  
                    <p>1)课程考试：针对课程学习效果的考核，学习完课程才能参加考试，考试合格才能取得课程的学时</p> 
                    <p>2)独立考试：考核相关知识点掌握情况，无需参加学习直接考试，考试合格才能取得对应的学时</p>
                    <p>3)班级考试：针对班级整体培训的结业考核，完成班级中报名的课程和考试后才能参加班级结业考试，考试合格才能取得班级学时和证书</p>
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
				headTitle:"考试",
			}
		},
		components:{
			heade,
		},
		created(){
			this.setHeaderBackBtn();
		},
		methods:{
			// 设置是否显示头部返回按钮
			setHeaderBackBtn(){
				this.$store.commit('showHeaderBack',true);
			},
		},
	}
</script>
<style scoped>
	.main{margin-top:.9rem;padding-bottom:20px;}
	.exam_entry_header a{background:#fff;height:.9rem;display: flex;display: -webkit-flex;display: -ms-flex;display: -o-flex;align-items: center;padding:0 .3rem 0 .4rem;justify-content:space-between;}
    .exam_entry_header_left{display: flex;align-items: center;height:.9rem;display: -webkit-flex;display: -ms-flex;display: -o-flex;}
    .exam_entry_header_left span{color:#737575}
    .exam_entry_header img:first-child{width:.32rem;margin-right:.1rem;}
    .exam_entry_header img:last-child{width:.1rem;float:right}
    .exam_entry_content{padding:.25rem .35rem;color:#737575}

    .exam_entry_warn{padding:.3rem .4rem .6rem .4rem;background:#fff}
    .exam_entry_warn_header{height:.3rem;display: flex;display: -webkit-flex;display: -ms-flex;display: -o-flex;align-items: center;}
    .exam_entry_warn_header img{height:.3rem;margin-right:.09rem;}
    .exam_entry_warn_header span{color:#737575}
    .exam_entry_warn_content{margin-top:.1rem;}
    .exam_entry_warn_content p{color:#737575}
</style>