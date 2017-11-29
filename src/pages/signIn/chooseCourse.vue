<template>
 	<div v-title data-title="选择学习课程">
		<!-- 头部 -->
		<heade :titlehead="headTitle" @click="backToPrev()"></heade>

 		<!-- 主体 -->
	    <div class="xzxxkc">
	        <img src="static/images/xz_03.png" alt="安徽继续教育网" class='nav_img'>

	        <div class="main">
				<!-- 独立考试列表 -->
				<div class="indepence_list" v-show="dataMsg.independentExamList != null && dataMsg.independentExamList != ''">
					<!-- 标题 -->
					<div class="list_top">
						<span class="left">独立考试列表<strong class="line left"></strong></span>
					</div>

					<div class="indepence_list_content">
						<table cellspacing="0" v-for="msg in dataMsg.independentExamList">
							<tr>
								<td></td>
								<td colspan="2" class="indepence_title">{{msg.examQuiz.name}}</td>
							</tr>
							<tr>
								<td rowspan="2" class="selected_box" align="center">
									<!-- 不可选 -->
									<repeatcheckgray class="check_select hover"></repeatcheckgray>
								</td>
								<td class="indepence_grade">总分/及格分数 : {{msg.examQuiz.totalPoint}}/{{msg.examQuiz.passscore}}分</td>
								<td rowspan="2" class="indepnece_price">￥{{msg.examQuiz.price}}</td>
							</tr>
							<tr>
								<td class="indepence_time">考试时长/学时 : {{msg.examQuiz.timelimit}}分钟/{{msg.examQuiz.credit}}学时</td>
							</tr>
						</table>
					</div>
				</div>

				<!-- 课程列表 -->
				<div class="course_list" v-show="dataMsg.classCourseList != null && dataMsg.classCourseList != ''">
					<!-- 标题 -->
					<div class="list_top">
						<span class="left">课程列表<strong class="line left"></strong></span>
					</div>

					<table cellspacing='0' v-for='msg in dataMsg.classCourseList'>
						<tbody>
							<tr>
								<td rowspan="2" class="line" width="10%" align="center" @click='getChosedData'>
									<!-- 选择框 -->
									<repeatcheck :class="(msg.resCourse.isShopping == '01') ? 'check_select hover' : 'check_select' " :name="msg.resCourse.id"></repeatcheck>
									<!-- 不可选 -->
									<repeatcheckgray :class="(msg.resCourse.isShopping == '02') ? 'check_select hover' : 'check_select' "></repeatcheckgray>
								</td>
								<td class="msg_top" width="75%">{{msg.resCourse.cname}}</td>
								<td rowspan="2" class="line msg_price">￥{{msg.resCourse.cprice}}</td>
							</tr>
							<tr>
								<td class="line msg_bottom">{{msg.resCourse.sysTeacher.realname}}/<span class="msg_study">{{msg.resCourse.ccredithour}}</span>学时/需要考试</td>
							</tr>
						</tbody>
					</table>
				</div>
	        </div>
	    </div>
	    
	    <!-- 加入购物车 -->
	    <div class="add_cart">
			
			<!-- 警告 -->
			<p class="warn_box">相同的课程不允许重复加入购物车</p>

	    	<div class="select_all left" @click='getChosedData'>
	    		<repeatcheckall class="left"></repeatcheckall>
	    		<span class='select_all_span left'>全选</span>
	    	</div>

	    	<a class="add_in right"><button class="none_cart" v-show="chosedPrice == '0' ">加入购物车</button><button class="have_cart" v-show="chosedPrice != '0' " @click="addToCart">加入购物车<!-- ({{chosedQuantity}}) --></button></a>

	        <p class="add_msg">
	            <span class="msg_time">课程:<strong class="m_time">{{chosedHour}}学时(<span>{{chosedQuantity}}</span>)</strong> 考试:<strong>{{indepenceCredit}}学时(<span>{{indepenceNum}}</span>)</strong></span>
	            <br><span>报名费用:<strong class="m_price">{{chosedPrice}}元</strong></span>
	        </p>
	    </div>

 	</div>
</template>
<script>
 	import heade from '@/components/common/header'
 	import repeatcheck from '@/components/common/checkbox/checkBox'
 	import repeatcheckall from '@/components/common/checkbox/checkBoxAll'
 	import repeatcheckgray from '@/components/common/checkbox/checkBoxGray'
 	import axios from "axios"
	import config from "@/api/base.js";
	import { MessageBox } from 'mint-ui';
	export default{
		data(){
			return{
				headTitle:"选择学习课程",
				dataMsg:{},
				chosedQuantity:0,                    //选中的课程数量 
				chosedHour:0,                        //选中的课程学时
				chosedPrice:0,                       //选中的课程价格
				chosedId:"",                         //选中的课程id集合
				indepenceNum:0,                      //独立考试数量
				indepenceCredit:0,                   //独立考试学时
				indepencePrice:0,                    //独立考试价格
			}
		},
		components:{
			heade,
			repeatcheck,
			repeatcheckall,
			repeatcheckgray
		},
		created(){
			this.setHeaderBackBtn();
			this.getData();
			this.$store.commit('setClickCheckBoxAll',false);
      		this.$store.commit('setCheckBoxAll',false);
		},
		methods:{
			getData(){
				var _this=this;

				var params={'classId':_this.$route.query.classId};
				axios.post('/class/toSelectLeaningCourse.do',params,config)
				.then(function(res){
					_this.dataMsg=res.data;

					_this.indepenceNum=res.data.num;
					_this.indepenceCredit=res.data.totalCredit;
					_this.indepencePrice=res.data.totalPrice;
					_this.chosedPrice=_this.indepencePrice;
				});
			},
			// 加入购物车
			addToCart(){
				var _this=this;
				var params={'classId':_this.dataMsg.classId,'courseIds':_this.chosedId};
				axios.post('/order/doShoppingCart.do',params,config)
				.then(function(res){
					switch (res.data.result){
						case "1" :
							// 跳转到我的购物车页面
							_this.$router.push('/shoppingCart');
							break;
						case "2" :
							_this.openAlert('您必须选够班级要求学时才能报名');
							break;
						case "3" :
							_this.openAlert('相同的课程不允许重复加入购物车');
					};
				});
			},
			// 弹框提示
			openAlert(a) {                           
        		MessageBox.alert(a, '提示');
      		},
			// 设置是否显示头部返回按钮
			setHeaderBackBtn(){
				this.$store.commit('showHeaderBack',true);
			},
			// 获取选中的课程数据   
			getChosedData(){
				// 获取购物车班级数量
				var len=$('.main .course_list table').length;
				var a=0,b=0,c=0,e='';
				this.chosedQuantity=$('.main .course_list table .check_box.bg_img.hover').length;
				var d=$('.main .course_list table .check_box.bg_img.hover').length;

				for(var i=0;i<d;i++){
					b+=parseInt($(".main .course_list table .check_box.bg_img.hover").eq(i).parent().parent().next().children().children().html());
					c+=Number($(".main .course_list table .check_box.bg_img.hover").eq(i).parent().siblings('.msg_price').html().slice(1,));
					e+=$(".main .course_list table .check_box.bg_img.hover").eq(i).attr('name')+',';
				};
				this.chosedHour=b;
				this.chosedPrice=(c+Number(this.indepencePrice)).toFixed(2);
				this.chosedId=e.slice(0,-1);
			}
		}
	}
</script>
<style scoped>
	.xzxxkc{padding-bottom: 100px;}
	.xzxxkc .nav_img{margin-top:.9rem;width:100%;}
    .main{width:100%;margin:0 auto;}
    .main table{width:100%;background:#fff;padding:0 5px;border-top:1px solid #E6E6E6;border-bottom:1px solid #E6E6E6;}
    .main table tbody tr td{height:30px;}
    .main table tbody tr td.msg_top{vertical-align: bottom;font-size: 0.30rem}
    .main table tbody tr td.msg_bottom{vertical-align: top;color:#939393;font-size: 0.28rem}
    .main table tbody tr td.msg_bottom span{color:#939393;}
    .main table tbody tr td.msg_price{color:#BE1A20;font-size: 0.30rem;text-align: center}
    .main table .msg_all{margin-right: 3px;margin-left:3%;margin-top:4px;}
    .main table .msg_warn{color:#EE7D63;margin-left: 10px;}
    .main table tfoot td{padding-top:10px;}
    .main table tr td .check_select{display:none;}
    .main table tr td .check_select.hover{display:block;}

    .add_cart{position: fixed;width:100%;background:#fff;bottom:0;left:0;padding:0 5px;}
    .add_in button{padding:0 10px;height:45px;line-height:45px;color: #fff;font-size: 0.28rem;position: relative;left:5px;background:#BCBCBC;}
    .have_cart{background:#f50 !important}
    .warn_box{position: absolute;top:-31px;left:0;width:100%;color: #EA9F36;text-align: right;background: #FFFBF1;padding: 0 10px;height:31px;line-height:31px;font-size: 0.26rem;}

    .add_msg{height:45px;padding-left: 1.2rem;}
    .add_msg strong,.add_msg strong span{font-weight: 100;color:#EA6144;}
    .add_msg span{height:22.5px;line-height:22.5px;font-size: 0.26rem;color:#737575;}

    .select_all{height:20px;position: absolute;top:50%;margin-top:-10px;}
    .select_all_span{margin-left: 5px;font-size: 0.26rem;height:0.28rem;line-height:0.32rem;position: absolute;top:50%;margin-top:-0.14rem;width:0.6rem;}
	
	.list_top{overflow: hidden;padding:.2rem 0 .2rem 10px;background: #fff}
    .list_top strong{color:#53ACCC;}
    .list_top span{color:#53ACCC;font-size: 0.32rem;position: relative;margin-left:7px;}
    .list_top strong.line{width:3px;height:0.26rem;background:#53ACCC;position: absolute;top:50%;left:-7px;margin-top:-0.13rem;}
	.course_list{margin-top:.2rem;}

    /*独立考试*/
    .indepence_list_content table{padding:0 5px .2rem 5px;width: 100%}
    .indepence_list_content .selected_box{width:10%;vertical-align: top;}
    .indepence_grade{vertical-align: top;color: #939393;font-size: 0.28rem}
    .indepence_time{color: #939393;font-size: 0.28rem}
    .indepnece_price{color: #BE1A20;font-size: 0.30rem;text-align: center;}
    .indepence_list_content .indepence_title{font-size: 0.30rem;padding: .22rem 0;}
	.indepence_list_content table:last-child,.course_list table:last-child{border-bottom:0;}
</style>