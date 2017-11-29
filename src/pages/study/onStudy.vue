<template>
	<div v-title data-title="我的课程">
		<!-- 头部 -->
		<heade :titlehead="headTitle"></heade>

		<div class="jqxx">
	        <div class="tab_box">
	            <ul class="tab">
	                <li>
	                    <a href="#">
	                        <div><img src="static/images/43.png" alt="安徽继续教育网" width="30px" height="35px"></div>
	                        <p>培训班</p>
	                    </a>
	                </li>
	                <li>
	                    <a href="#">
	                        <div><img src="static/images/44.png" alt="安徽继续教育网" width="30px" height="35px"></div>
	                        <p>在学课程</p>
	                    </a>
	                </li>
	                <li>
	                    <a href="#">
	                        <div><img src="static/images/45.png" alt="安徽继续教育网" width="30px" height="35px"></div>
	                        <p>课程考试</p>
	                    </a>
	                </li>
	            </ul>
	        </div>


	        <div class="main">
	            <div class="list_top list_top1">
	                <span class="left">近期学习<strong class="line left"></strong></span>
	            </div>

	            <div class="cou_box">
	                <table>
	                	<tr><td colspan="2"><h4>习近平治国理政</h4></td></tr>
	                    <tr>
	                        <td width="30%" class="cou_img"><img src="static/images/cou_03.png" alt="安徽继续教育网" width="100%"></td>
	                        <td class="cou_detail">
	                            <div class="left">
	                                <p>学习中/不需要考试</p>
	                                <p>总学时：20学时</p>
	                                <p>完成学时：15学时</p>
	                                <p class="cou_warn">需完成课程学习才能考试</p>
	                            </div>
	                            <div class="right study_box">
	                                <a href="#" class="btn_study">学习</a>
	                            </div>
	                        </td>
	                    </tr>
	                </table>
	            </div>

	            <div class="cou_box">
	                <table>
	               	 	<tr><td colspan="2"><h4>习近平治国理政</h4></td></tr>
	                    <tr>
	                        <td width="30%" class="cou_img"><img src="static/images/cou_03.png" alt="安徽继续教育网" width="100%"></td>
	                        <td class="cou_detail">
	                            <div class="left">
	                                <p>学习中/不需要考试</p>
	                                <p>总学时：20学时</p>
	                                <p>完成学时：15学时</p>
	                                <p class="cou_warn">需完成课程学习才能考试</p>
	                            </div>
	                            <div class="right study_box">
	                                <a href="#" class="btn_study">学习</a>
	                            </div>
	                        </td>
	                    </tr>
	                </table>
	            </div>

	            <div class="cou_box">
	                <table>
	                	<tr><td colspan="2"><h4>习近平治国理政</h4></td></tr>
	                    <tr>
	                        <td width="30%" class="cou_img"><img src="static/images/cou_03.png" alt="安徽继续教育网" width="100%"></td>
	                        <td class="cou_detail">
	                            <div class="left">
	                                <p>学习中/不需要考试</p>
	                                <p>总学时：20学时</p>
	                                <p>完成学时：15学时</p>
	                                <p class="cou_warn">需完成课程学习才能考试</p>
	                            </div>
	                            <div class="right study_box">
	                                <a href="#" class="btn_study">学习</a>
	                            </div>
	                        </td>
	                    </tr>
	                </table>
	            </div>
	        </div>
	    </div>
	</div>
</template>
<script>
	import heade from '@/components/common/header'
	export default{
		data(){
			return{
				headTitle:"我的课程"
			} 
		},
		components:{
			heade
		}
	}
</script>
<style scoped>
	.main{width:97%;margin:0 auto;padding-bottom: 200px;padding-top:20px;}
    .tab_box{background: url(../../../static/images/xxbj_03.png);padding:8px 0 8px 0;}
    .tab{width:80%;overflow: hidden;margin:0 auto;}
    .tab li{float: left;width:33%;text-align: center}
    .tab li>div{height:40px;}
    .jqxx{margin-top:.9rem;}

    .list_top{overflow: hidden;}
    .list_top strong{color:#53ACCC;}
    .list_top span{color:#53ACCC;font-size: 1.1em;position: relative;margin-left:7px;}
    .list_top strong.line{width:3px;height:15px;background:#53ACCC;position: absolute;top:50%;left:-7px;margin-top:-8px;}
    
    .cou_box{width: 100%;border-radius:5px;-moz-border-radius:5px;-o-border-radius:5px;-webkit-border-radius:5px;border: 1px solid #EAEAEA;padding:3px;margin-top:10px;border-bottom: 2px solid #51B6DA}
    .cou_img img{vertical-align: middle;}
    .cou_box .cou_detail{padding-left: 3px;}
    .cou_box .cou_detail h4{font-size: 1em}
    .cou_box .cou_detail>div p{font-size: 0.9em;color:#868787;margin-top:1px;}
    .cou_box .cou_detail>div p.cou_warn{color:#C67171;}
    .btn_study{padding:3px 15px;border:1.5px solid #C3C3C3;border-radius:3px;-moz-border-radius:3px;-o-border-radius:3px;-webkit-border-radius:3px;color:#797A7A;}
    .study_box{margin-top:15px;}
</style>