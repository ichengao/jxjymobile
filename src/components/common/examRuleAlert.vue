<template>
	<!-- 考试规则弹框 -->
	<div class="exam_test_rule_alert_box">
		<div class="exam_test_rule_alert">
			<div class="exam_test_rule_alert_header">
				<span class="line"></span><span>考试规则</span><span class="line"></span>
				<p>{{dataMsg.name}}</p>
			</div>
			<div class="exam_test_rule_alert_content">
				<table cellspacing="0">
					<tr>
						<td>总分/及格分数 : </td>
						<td>{{dataMsg.totalPoint}}/{{dataMsg.passscore}}分</td>
					</tr>
					<tr>
						<td>学时 : </td>
						<td>{{dataMsg.credit}}学时</td>
					</tr>
					<tr>
						<td>考试时长 : </td>
						<td>{{dataMsg.timelimit}}分钟</td>
					</tr>
					<tr>
						<td>考试时间 : </td>
						<td>{{dataMsg.timeopen}}至{{dataMsg.timeclose}}</td>
					</tr>
					<tr>
						<td>最大答题次数 : </td>
						<td v-show="dataMsg.maxallowed != 0">{{dataMsg.maxallowed}}次</td>
						<td v-show="dataMsg.maxallowed == 0">不限制</td>
					</tr>
					<tr>
						<td>继续答题 : </td>
						<td v-show="dataMsg.attemptonlast == '02'">允许</td>
						<td v-show="dataMsg.attemptonlast == '01'">不允许</td>
					</tr>
					<tr>
						<td>评分办法 : </td>
						<td v-show="dataMsg.grademethod == '01'">最新</td>
						<td v-show="dataMsg.grademethod == '02'">最高</td>
						<td v-show="dataMsg.grademethod == '03'">平均</td>
					</tr>
					<tr>
						<td>考试须知 : </td>
						<td>{{dataMsg.description}}</td>
					</tr>
				</table>
			</div>
			<div class="exam_test_rule_alert_footer" @click="closeExamRuleAlert">
				<button>确 定</button>
			</div>
		</div>
	</div>
</template>
<script>
	import axios from "axios";
	import config from "@/api/base.js";
	export default{
		data(){
			return{
				dataMsg:{},
				quizType:"",       //上一次查询的数据
				id:"",             //上一次查询的数据
			}
		},
		methods:{
			// 打开考试规则弹框
			openExamRuleAlert(quizType,id){
				// 获取弹框数据  01独立考试，02课程考试，03班级考试
				var params={};

				if(this.quizType != quizType || this.id != id){
					this.dataMsg={};
					switch(quizType){
						case "01" :
							params={"quizType":quizType,"quizId":id};
							this.doRequest(params);
							break;
						case "02" :
							params={"quizType":quizType,"courseId":id};
							this.doRequest(params);
							break;
						case "03" :
							params={"quizType":quizType,"classId":id};
							this.doRequest(params);
							break;
					}
					this.quizType = quizType;
					this.id = id;
				}

				$(".exam_test_rule_alert_box").fadeIn();
				var maxHeight=window.screen.height-$(".exam_test_rule_alert_header").height()-$(".exam_test_rule_alert_footer").height()-$(".header").height()-50;
				$(".exam_test_rule_alert_content").css("maxHeight",maxHeight+"px");
			},
			// 发请求
			doRequest(params){
				var _this=this;
				axios.post('/exam/toExamRule.html',params,config)
				.then(function(res){
					_this.dataMsg=res.data.quiz;
				});
			},
			// 关闭考试规则弹框
			closeExamRuleAlert(){
				$(".exam_test_rule_alert_box").hide();
			}
		}
	}
</script>
<style scoped>
	/*考试规则弹框*/
    .exam_test_rule_alert_box{position: fixed;top:.9rem;right:0;left:0;bottom:0;background:rgba(0,0,0,.7);z-index: 100;display: none}
    .exam_test_rule_alert{background:#fff;position: absolute;bottom:0;left:0;right:0;}
    .exam_test_rule_alert_header{text-align: center;padding-top:.36rem;}
    .exam_test_rule_alert_header span.line{display: inline-block;height:.1rem;border-top: 1px solid #DCDCDC;width:.4rem;}
    .exam_test_rule_alert_header span:nth-child(2){margin-left:.1rem;margin-right: .1rem;font-size: .26rem}
    .exam_test_rule_alert_header p{color:#737575;margin-top: .36rem;font-size: .24rem}
    .exam_test_rule_alert_content{padding:0 .2rem;overflow-y: scroll;}
    .exam_test_rule_alert_content table{width:100%;margin-top: .24rem;}
    .exam_test_rule_alert_content table td{padding:.2rem 0;vertical-align: top;border-bottom: 1px solid #EDEDEE;font-size: .24rem;}
    .exam_test_rule_alert_content table tr:last-child td{border:0;}
    .exam_test_rule_alert_content table tr td:first-child{width:1.9rem;text-align: right;padding-left: 0;}
    .exam_test_rule_alert_content table tr td{padding-left: .3rem;}
    .exam_test_rule_alert_footer button{width:100%;height:40px;background:#31B1DE;color: #fff;line-height:40px;font-size: .28rem;}
</style>