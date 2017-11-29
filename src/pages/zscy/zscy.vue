<template>
	<div v-title data-title="证书查验" class="main_box">
		<!-- 头部 -->
		<heade :titlehead="headTitle"></heade>

		<div class="main">
			<div class="zs">
				<div class="cx_top hover" @click="toggle" name="1">
					<span class="left">证书查询</span>
	                <img src="static/images/icon-01.png" alt="安徽继续教育网" class="right"> 
				</div>
				<div class="cx_body hover">
					<div class="select_box">
						<div class="select_box1">
							<ul>
								<li name="sfxx" @click='changeBox'>身份信息</li>
								<li name="zsbh" @click='changeBox'>证书编号</li>
							</ul>
						</div>
					</div>
					<ul>
						<li class="cx_list se_btn" @click="hideBox">
							<span class="left">查询方式</span>
							<div class="se_top right">
								<ul class="left">
									<li class="get_select">身份信息</li>
								</ul>
								<img src="static/images/icon-02.png" alt="安徽继续教育网" class="right">
							</div>
						</li>
						<li class="cx_list sfxx sear">
							<span class="left">姓名</span>
							<input type="text" class="left" ref="uname">
						</li>
						<li class="cx_list sfxx sear">
							<span class="left">身份证</span>
							<input type="text" class="left" ref="idCard">
						</li>
						<li class="cx_list zsbh sear" style="display:none">
							<span class="left">证书编号</span>
							<input type="text" class="left" ref="bookNum">
						</li>
						<li class="cx_list">
							<span class="left">验证码</span>
							<input type="text" class="left yzm_in" ref="code1" placeholder="请输入验证码">
							<a @click="codeFresh"><imgTest></imgTest></a>
						</li>
						<li class="cx_btn" @click="zsSearch">
							<a class="search">查询</a>
						</li>
					</ul>
				</div>
			</div>

	        <div class="xs">
				<div class="cx_top" @click="toggle" name="2">
					<span class="left">学时查询</span>
	                <img src="static/images/icon-01.png" alt="安徽继续教育网" class="right"> 
				</div>
				<div class="cx_body">
					<ul>
						<li class="cx_list">
							<span class="left">姓名</span>
							<input type="text" class="left" ref="uname1">
						</li>
						<li class="cx_list">
							<span class="left">身份证</span>
							<input type="text" class="left" ref="idCard1">
						</li>
						<li class="cx_list">
							<span class="left">验证码</span>
							<input type="text" class="left yzm_in" ref="code2">
							<a @click="codeFresh"><imgTest></imgTest></a>
						</li>
						<li class="cx_btn" @click="xsSearch">
							<a class="search">查询</a>
						</li>
					</ul>
				</div>
			</div>
		</div>

 		<!-- 底部 -->
		<foote></foote>
	</div>
</template>
<script>
	import axios from "axios"
	import { MessageBox } from 'mint-ui';
	import config from "@/api/base.js";
	import heade from '@/components/common/header'
	import foote from '@/components/common/footer'
	import imgTest from '@/components/common/imgTest'
	export default{
		data(){
			return {
				headTitle:"证书查验",
				cardVal:"",							//身份证信息
				can1:true,
				can2:true
			}
		},
		components:{
			heade,
			foote,
			imgTest
		},
		created(){
			this.setHeaderBackBtn();
		},
		methods:{
			// 设置是否显示头部返回按钮
            setHeaderBackBtn(){
                this.$store.commit('showHeaderBack',true);
            },
			// 验证码刷新
			codeFresh(){
				this.$store.commit("codeFresh");
			},
			//切换
			toggle(){              
				var a=$(window.event.target || window.event.srcELement);
				// 获取name值用来刷新验证码
				var num=a.attr("name");
				if(a.hasClass('hover')){
					a.removeClass('hover').next().removeClass('hover');
				}else{
					a.addClass('hover').next().addClass('hover');
					a.parent().siblings().children().removeClass('hover');
				};
				// 刷新验证码
				this.codeFresh();
			},
			//关闭弹框
			hideBox(){              
				$(".select_box").fadeIn();
			},
			//身份证查询和证书编号查询切换
			changeBox(){            
				var a=$(window.event.target || window.event.srcELement);
				var aa=a.html();
	         	$(".select_box").fadeOut();
	         	$(".get_select").html(aa);
	         	var sele=a.attr('name');
	         	if(sele == 'sfxx'){
	         		$("."+sele).show().siblings(".zsbh").hide();
	         	}else{
	         		$("."+sele).show().siblings(".sfxx").hide();
	         	}
			},
			// 学时查询
			xsSearch(){
				if(this.can1){
					this.can1=false;
					var _this=this;
					// 身份证编号
					var idCard1=_this.$refs.idCard1.value;
					// 姓名
					var uname1=_this.$refs.uname1.value;
					// 验证码
					var code2=_this.$refs.code2.value;

					// 身份证校验
					var a=idCard1;
					_this.vardVal=a;
					var reg=/\d{17}[\d|x|X]|\d{15}/;

					if(idCard1 != "" && code2 != "" && uname1 != ""){
						if(reg.test(a) && _this.checkCard()){
							// 校验成功发请求
							var params={"realname":uname1,"cardno":idCard1,"valideCode":code2,"uuid":sessionStorage.getItem("uuid")};
							axios.post('/web/cert/doCreditVerify.html',params,config)
							.then(function(res){
								var ret=res.data.result;
								switch(ret){
									case "0" :
										_this.openAlert('系统其它错误');
										// 清空验证码输入框
			         					_this.$refs.code2.value="";
			         					break;
			         				case "1" :
			         					if(res.data.list.length == 0){
											_this.openAlert('无学时信息');
											// 清空验证码输入框
			         						_this.$refs.code2.value="";
										}else{
											// 查询成功，将证书信息存起来
											_this.$store.commit('xsSave',JSON.stringify(res.data.list));
											// 跳转到学时列表
											_this.$router.push('/xslb');
										};
										break;
									case "2" :
										_this.openAlert('验证码错误');
										// 清空验证码输入框
		         						_this.$refs.code2.value="";
		         						break;
		         					case "3" :
		         						_this.openAlert('无学时信息');
										// 清空验证码输入框
		         						_this.$refs.code2.value="";
		         						break;
								}
								_this.codeFresh();
							});
						}else{
							_this.openAlert("身份证号不符合规则");
							// 刷新验证码
							_this.codeFresh();
							// 清空验证码输入框
	 						_this.$refs.code2.value="";
						};
						_this.can1=true;
					}else if(uname1 == ""){
						_this.openAlert("请输入姓名");
						_this.codeFresh();
						// 清空验证码输入框
						_this.$refs.code2.value="";
						_this.can1=true;
					}else if(idCard1 == ""){
						_this.openAlert("请输入身份证号码");
						_this.codeFresh();
						// 清空验证码输入框
						_this.$refs.code2.value="";
						_this.can1=true;
					}else if(code2 ==""){
						_this.openAlert("请输入验证码");
						_this.codeFresh();
						// 清空验证码输入框
						_this.$refs.code2.value="";
						_this.can1=true;
					}
				};
			},
			// 证书查询
			zsSearch(){
				if(this.can2){
					this.code2=false;
					var _this=this;
					// 姓名
					var uname=_this.$refs.uname.value;
					// 身份证
					var idCard=_this.$refs.idCard.value;
					// 证书编号
					var bookNum=_this.$refs.bookNum.value; 
					// 第一个验证码
					var code1=_this.$refs.code1.value;

					var b=$(".zsbh").css("display");

					if(b=="none"){
						// 通过身份证查询

						// 身份证校验
						var a=idCard;
						_this.vardVal=a;
						var reg=/\d{17}[\d|x|X]|\d{15}/;
						if(a != "" && uname !="" && code1 !=""){
							if(reg.test(a) && _this.checkCard()){
								// 校验成功
								// searchType：身份信息01，证书编号02,realname姓名,cardno身份证,certNo证书编号,验证码 valideCode
								var params={"searchType":"01","realname":uname,"cardno":idCard,"valideCode":code1,"uuid":sessionStorage.getItem("uuid")};
								axios.post("/web/cert/doCertVerify.html",params,config)
								.then(function(res){
									var ret=res.data.result;
									switch(ret){
										case "0" :
											_this.openAlert("系统其他错误");
											// 清空验证码输入框
											_this.$refs.code1.value="";
											break;
										case "1" :
											if(res.data.trainCertList.length == 0){
												// 姓名和身份证不匹配的时候无法查询到证书信息
												_this.openAlert("无证书信息");
												// 清空验证码输入框
												_this.$refs.code1.value="";
											}else{
												// 将返回的数据转化为json存在vuex
												_this.$store.commit('zsSave',JSON.stringify(res.data.trainCertList));
												_this.$router.push("/zslb"); 
											};
											break;
										case "2" :
											_this.openAlert("验证码错误");
											// 清空验证码输入框
											_this.$refs.code1.value="";
											break;
										case "3" :
											_this.openAlert("无证书信息");
											// 清空验证码输入框
											_this.$refs.code1.value="";
											break;
									};
									// 刷新验证码
									_this.codeFresh();
								});
							}else{
								_this.openAlert("身份证号不符合规则");
								// 刷新验证码
								_this.codeFresh();
								// 清空验证码输入框
								_this.$refs.code1.value="";
							};
						}else if(uname ==""){
							_this.openAlert("姓名不能为空");
							_this.codeFresh();
							// 清空验证码输入框
							_this.$refs.code1.value="";
						}else if(a == ""){
							_this.openAlert("请输入身份证号");
							_this.codeFresh();
							// 清空验证码输入框
							_this.$refs.code1.value="";
						}else if(code1 == ""){
							_this.openAlert("请输入验证码");
							_this.codeFresh();
							// 清空验证码输入框
							_this.$refs.code1.value="";
						};
						_this.code2=true;
					}else{
						// 通过证书编号查询
						if(bookNum != "" && code1 !=""){
							var params={"searchType":"02","certNo":bookNum,"valideCode":code1,"uuid":sessionStorage.getItem("uuid")};
							axios.post("/web/cert/doCertVerify.html",params,config)
							.then(function(res){
								var ret=res.data.result;
								switch(ret){
									case "0" :
										_this.openAlert("系统其他错误");
										// 清空验证码输入框
										_this.$refs.code1.value="";
										break;
									case "1" :
										// 将返回的数据存在vuex
										_this.$store.commit('zsSave',res.data.trainCert);
										_this.$router.push("/zslb"); 
										break;
									case "2" :
										_this.openAlert("验证码错误");
										// 清空验证码输入框
										_this.$refs.code1.value="";
										break;
									case "3" :
										_this.openAlert("无证书信息");
										// 清空验证码输入框
										_this.$refs.code1.value="";
										break;
								};
								// 刷新验证码
								_this.codeFresh();
							});
						}else if(bookNum == ""){
							_this.openAlert("请输入证书编号");
							// 刷新验证码
							_this.codeFresh();
							// 清空验证码输入框
							_this.$refs.code1.value="";
						}else if(code1 ==""){
							_this.openAlert("请输入验证码");
							// 刷新验证码
							_this.codeFresh();
							// 清空验证码输入框
							_this.$refs.code1.value="";
						};
						_this.code2=true;
					}
				};
			},
			checkCard:function() {
			    var card =this.vardVal;
			    //检查省份
			    var check=this.checkProvince(card)&&this.checkBirthday(card)&&this.checkParity(card);
			    if(check===false){
			        return false;
			    }else{
			        return true;
			    }
			},
			//取身份证前两位,校验省份
			checkProvince:function(card) {
				var vcity={ 11:"北京",12:"天津",13:"河北",14:"山西",15:"内蒙古",
				    21:"辽宁",22:"吉林",23:"黑龙江",31:"上海",32:"江苏",
				    33:"浙江",34:"安徽",35:"福建",36:"江西",37:"山东",41:"河南",
				    42:"湖北",43:"湖南",44:"广东",45:"广西",46:"海南",50:"重庆",
				    51:"四川",52:"贵州",53:"云南",54:"西藏",61:"陕西",62:"甘肃",
				    63:"青海",64:"宁夏",65:"新疆",71:"台湾",81:"香港",82:"澳门",91:"国外"
				};
			    var province = card.substr(0,2);
			    if(vcity[province] == undefined)
			    {
			        return false;
			    }
			    return true;
			},
			//检查生日是否正确
			checkBirthday:function(card) {
			    var len = card.length;
			    //身份证15位时，次序为省（3位）市（3位）年（2位）月（2位）日（2位）校验位（3位），皆为数字
			    if(len == '15')
			    {
			        var re_fifteen = /^(\d{6})(\d{2})(\d{2})(\d{2})(\d{3})$/;
			        var arr_data = card.match(re_fifteen);
			        var year = arr_data[2];
			        var month = arr_data[3];
			        var day = arr_data[4];
			        var birthday = new Date('19'+year+'/'+month+'/'+day);
			        return this.verifyBirthday('19'+year,month,day,birthday);
			    }
			    //身份证18位时，次序为省（3位）市（3位）年（4位）月（2位）日（2位）校验位（4位），校验位末尾可能为X
			    if(len == '18')
			    {
			        var re_eighteen = /^(\d{6})(\d{4})(\d{2})(\d{2})(\d{3})([0-9]|X|x)$/;
			        var arr_data = card.match(re_eighteen);
			        var year = arr_data[2];
			        var month = arr_data[3];
			        var day = arr_data[4];
			        var birthday = new Date(year+'/'+month+'/'+day);
			        return this.verifyBirthday(year,month,day,birthday);
			    }
			    return false;
			},
			//校验日期
			verifyBirthday:function(year,month,day,birthday) {
			    var now = new Date();
			    var now_year = now.getFullYear();
			    //年月日是否合理
			    if(birthday.getFullYear() == year && (birthday.getMonth() + 1) == month && birthday.getDate() == day)
			    {
			        //判断年份的范围（3岁到100岁之间)
			        var time = now_year - year;
			        if(time >= 3 && time <= 100)
			        {
			            return true;
			        }
			        return false;
			    }
			    return false;
			},
			//校验位的检测
			checkParity:function(card) {
			    //15位转18位
			    card = this.changeFivteenToEighteen(card);
			    var len = card.length;
			    if(len == '18')
			    {
			        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
			        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');

			        var arrCh1 = new Array('1', '0', 'x', '9', '8', '7', '6', '5', '4', '3', '2');//新增

			        var cardTemp = 0, i, valnum;

			        var cardTemp1 = 0, i, valnum1;//新增

			        for(i = 0; i < 17; i ++)
			        {
			            cardTemp += card.substr(i, 1) * arrInt[i];
			            cardTemp1 += card.substr(i, 1) * arrInt[i];//新增
			        }
			        valnum = arrCh[cardTemp % 11];

			        valnum1 = arrCh1[cardTemp1 % 11];  //新增

			        if (valnum == card.substr(17, 1)||valnum1 == card.substr(17, 1))  //修改
			        {
			            return true;
			        }
			        return false;
			    }
			    return false;
			},
			//15位转18位
			changeFivteenToEighteen:function(card) {
			    if(card.length == '15')
			    {
			        var arrInt = new Array(7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2);
			        var arrCh = new Array('1', '0', 'X', '9', '8', '7', '6', '5', '4', '3', '2');
			        var cardTemp = 0, i;
			        card = card.substr(0, 6) + '19' + card.substr(6, card.length - 6);
			        for(i = 0; i < 17; i ++)
			        {
			            cardTemp += card.substr(i, 1) * arrInt[i];
			        }
			        card += arrCh[cardTemp % 11];
			        return card;
			    }
			    return card;
			},
			// 弹框提示
			openAlert(a) {                           
        		MessageBox.alert(a, '提示');
      		}
		}
	}
</script>
<style scoped>
	.main_box{background:#fff;}
	.main{width:100%;color:#1E1E1E;margin-top:.9rem;z-index: -1}
	.main>div .cx_body{display:none;}
	.main>div .cx_body.hover{display:block;}

	.main>div .cx_top.hover img{transform:rotate(180deg);transition:all 0.3s;-webkit-transition:all 0.3s;-o-transition:all 0.3s;}
	.main>div .cx_top img{transform:rotate(0deg);transition:all 0.3s;-webkit-transition:all 0.3s;-o-transition:all 0.3s;}
	
    .cx_top{height:40px;background:#F1F1F1;padding:0 4%;line-height:40px;}
    .cx_top img{margin-top:15px;width:10px;}
    .cx_body{padding-top:5px;}
    .cx_body ul .cx_list{margin:0 4%;border-bottom:1px solid #F0F0F1;overflow: hidden;padding:15px 0 7px 5px;}
    .cx_body ul .cx_list ul{margin-right: 20px;}
    .cx_body ul .cx_list .se_top img{margin-top:8px;width:12px;}
    /*选择框*/
    .select_box{position: fixed;background:rgba(0,0,0,.7);top:0;left:0;right:0;bottom:0;display:none}
    .select_box.hover{display:block;}
    .select_box1{margin:50% 10% 0 10%;border-radius:6px;background:#fff;}
    .select_box1 ul{width:100%;}
    .select_box1 ul li{height:40px;line-height:40px;border-bottom:1px solid #D4D2D3;text-align: center;}
    .select_box1 ul li:last-child{border-bottom: 0}

    .cx_body ul .cx_list input{margin-left:40px;width:55%;border:0;}
    .cx_body ul .cx_list .yzm{width:70px;}
    .cx_body ul .cx_list .yzm_in{width:35%;}
    .cx_body ul .cx_btn{margin:0 7% 25px 7%;overflow: hidden}
    .cx_body ul .search{height:40px;float:left;background:#48A5CF;color:#fff;border-radius: 4px;line-height:40px;text-align: center;width:100%;margin-top:15px;font-size: 1.1em}
    .cx_list>span{width:20%;}

    .footer3{margin-bottom: 30px !important;}

</style>