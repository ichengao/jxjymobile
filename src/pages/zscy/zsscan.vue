<template>
	<div v-title data-title="证书查验">
		<div class="zs" id="zs">
			<meta content="width=device-width,maximum-scale=1" name="viewport">
	        <img src="static/images/zs-02.jpg" alt="背景色" class="bg">

	        <img src="static/images/gz02.png" alt="章" class="zs_bone">
	        <p class="zs_num">学号 : <span>{{dataMsg.studyNo}}</span></p>
	        <h1>安徽省专业技术人员继续教育登记表</h1>

	        <table class="table1">
	            <tbody>
	            <tr>
	                <td class="td1" style="width:94px;height:42px;">姓  名</td>
	                <td class="td1" style="width:106px">{{dataMsg.realname}}</td>
	                <td class="td1" style="width:104px">身份证号</td>
	                <td class="td2" style="width:227px">{{dataMsg.cardno}}</td>

	                <td rowspan="3" class="td2"><img :src="dataMsg.userphoto" alt="头像" style="width:90px;height:128px;margin-top:1px;" v-show="dataMsg.userphoto != null">
					<img src="static/images/02_03.png" alt="头像" style="width:90px;height:128px;margin-top:1px;" v-show="dataMsg.userphoto == null">
	                </td>
	            </tr>
	            <tr>
	                <td class="td1" style="width:94px;height:54px;">性  别</td>
	                <td class="td1" style="width:106px" v-show="dataMsg.sex == '01'">男</td>
	                <td class="td1" style="width:106px" v-show="dataMsg.sex == '02'">女</td>
	                <td class="td1" style="width:106px" v-show="dataMsg.sex == null"></td>

	                <td class="td1" style="width:104px">工作单位</td>
	                <td class="td2" style="width:227px"><p>{{dataMsg.organization}}</p></td>
	            </tr>
	            <tr>
	                <td colspan="5" style="height:36px;"><span class="zs_qk">接 受 继 续 教 育 情 况</span></td>
	            </tr>
	        </tbody></table>

	        <ul>
	            <li style="width:202px;height:37px;line-height:37px" class="li1">继续教育项目名称</li>
	            <li style="width:422px;height:37px;line-height:37px" class="li2">{{dataMsg.certName}}</li>
	            <li style="width:94px;height:40px;line-height:40px;" class="li1">主办单位</li>
	            <li style="width:210px;height:40px;line-height:40px;" class="li1">安徽冠成教育科技有限公司</li>
	            <li style="width:94px;height:40px;line-height:40px;" class="li1">学习形式</li>
	            <li style="width:226px;height:40px;line-height:40px;" class="li2">在线学习</li>
	            <li style="width:94px;height:40px;line-height:40px;" class="li1">培训时间</li>
	            <li style="width:210px;height:40px;line-height:40px;" class="li1">{{dataMsg.startYear}}年{{dataMsg.startMonth}}月-{{dataMsg.endYear}}年{{dataMsg.endMonth}}月</li>
	            <li style="width:94px;height:40px;line-height:40px;" class="li1">总学时数</li>
	            <li style="width:226px;height:40px;line-height:40px;" class="li2">{{dataMsg.credit}}</li>
	        </ul>
	        <table class="table2">
	            <thead>
	            <tr>
	                <td style="width:201px;height:47px;" class="td1">学习课程</td>
	                <td style="width:37px;" class="td1">学时</td>
	                <td style="width:64px;" class="td1">评定结果</td>
	                <td style="width:212px;" class="td1">学习课程</td>
	                <td style="width:37px;" class="td1">学时</td>
	                <td style="width:68px;" class="td2">评定结果</td>
	            </tr>
	            </thead>
	            <tbody>
	            <tr v-for="i in zsList.length/2">
            		<td class="td1" height="38px"><p>{{zsList[2*i-2].courseName}}</p></td>
		            <td class="td1">{{zsList[2*i-2].credit}}</td>
		            <td class="td1" v-show="zsList[2*i-2].courseName !=''">合格</td>
		            <td class="td1" v-show="zsList[2*i-2].courseName =='' "></td>

		            <td class="td1" height="38px"><p>{{zsList[2*i-1].courseName}}</p></td>
		            <td class="td1">{{zsList[2*i-1].credit}}</td>
		            <td class="td1" v-show="zsList[2*i-1].courseName !='' ">合格</td>
		            <td class="td1" v-show="zsList[2*i-1].courseName =='' "></td>
	            </tr>
	        </tbody>
	        </table>

	        <p class="zs_z">培训单位（盖章）</p>

	        <p class="zs_date"><span>{{dataMsg.createYear}}</span>年<span>{{dataMsg.createMonth}}</span>月<span>{{dataMsg.createDay}}</span>日</p>


	        <div id="ewm">
	            <img :src="dataMsg.ewm" alt="二维码" width="70" height="70"  class="left"/>
	            <p class="left">扫描<br />查验<br />证书</p>
	        </div>
	        

	    </div>

	    <a @click="backPrev" style="height: 60px;float: left;background: #48A5CF;color: #fff;border-radius: 4px;line-height: 60px;text-align: center;width:711px;;margin:30px 0 30px 20px;font-size:36px;outline:none;text-decoration:none">返回</a>
	</div>
</template>
<script>
	import axios from "axios"
	import config from "@/api/base.js";
	import { MessageBox } from 'mint-ui';
	export default{
		data(){
			return{
				dataMsg:{},
				zsList:[]       //证书数据
			}
		},
		created(){
			var _this=this;
			// 获取证书唯一id
			var idNum=this.$route.query.id;
			var params={"id":idNum};
			axios.post('/web/cert/findCert.html',params,config)
			.then(function(res){
				_this.dataMsg=res.data;

				// 将证书信息转为数组存起来
				var len=_this.dataMsg.list.length;
				var falsedata={"credit":"","courseName":""};
				for(var i=0;i<18;i++){
					if(i<len){
						_this.zsList.push(_this.dataMsg.list[i]);
					}else{
						_this.zsList.push(falsedata);
					}
				};
			});
		},
		methods:{
			backPrev(){					//返回按钮
	      		this.$router.back();
	      	}
		}
	}
</script>
<style scoped>
	table{
	  border-collapse: collapse;
	  border-spacing: 0;
	}
    #ewm{position: absolute;bottom:65px;left:100px;border:1px solid #bbb;padding:3px 10px;}
    #ewm p{margin:12px 0 0 10px;}
	.zs {
	  font-size: 14px;
	  color: #000000;
	  width: 751px;
	  height: 1061px;
	  margin: 0 auto;
	  padding: 117px 67px 64px 62px;
	  position: relative;
	}
	.zs .bg {
	  position: absolute;
	  top: 0;
	  left: 0;
	  z-index: -10;
	}
	.zs .zs_bone {
	  position: absolute;
	  bottom: 65px;
	  right: 115px;
	}
	.zs .zs_num {
	  padding-left: 420px;
	}
	.zs h1 {
	  margin-top: 15px;
	  text-align: center;
	  font-size: 25px;
	  font-weight: 600;
	}
	.zs .table1 {
	  width: 624px;
	  border: 2px solid #B2B2B2;
	  border-left: none;
	  border-right: none;
	  margin-top: 20px;
	}
	.zs .table1 tr td {
	  text-align: center;
	}
	.zs .table1 tr td .zs_qk {
	  font-size: 25px;
	}
	.zs .table1 tr td p {
	  text-align: left;
	  padding-left: 10px;
	}
	.zs .table1 tr .td1 {
	  border-right: 2px solid #B2B2B2;
	  border-bottom: 2px solid #B2B2B2;
	}
	.zs .table1 tr .td2 {
	  border-bottom: 2px solid #B2B2B2;
	}
	.zs ul {
	  width: 624px;
	  overflow: hidden;
	}
	.zs ul li {
	  float: left;
	  text-align: center;
	}
	.zs ul .li1 {
	  border-right: 2px solid #B2B2B2;
	  border-bottom: 2px solid #B2B2B2;
	}
	.zs ul .li2 {
	  border-bottom: 2px solid #B2B2B2;
	}
	.zs .table2 {
	  width: 624px;
	}
	.zs .table2 tr td {
	  text-align: center;
	  padding: 3px 0;
	}
	.zs .table2 tr td p {
	  padding: 0 12px;
	  text-align: left;
	}
	.zs .table2 tr .td1 {
	  border-right: 2px solid #B2B2B2;
	  border-bottom: 2px solid #B2B2B2;
	}
	.zs .table2 tr .td2 {
	  border-bottom: 2px solid #B2B2B2;
	}
	.zs .zs_z {
	  padding-left: 300px;
	  margin-top: 20px;
	  position: absolute;
	  top: 910px;
	  left: 169px;
	}
	.zs .zs_date {
	  padding-left: 325px;
	  margin-top: 20px;
	  position: absolute;
	  top: 950px;
	  left: 180px;
	}
	.zs .zs_date span {
	  display: inline-block;
	  margin: 0 7px;
	}
</style>