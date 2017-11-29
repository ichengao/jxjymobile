<template>
	<div v-title data-title="注册">
		<!-- 头部 -->
		<heade :titlehead="headTitle"></heade>

		<div class="main" ref='main'>
			<!-- 警告提示 -->
			<div class="warn_box">
				<div class="warn"></div>
			</div>

			<!-- 输入框 -->
			<div class="register_box">
				<input type="text" class="insert uname" ref="uname" placeholder="请输入用户名" v-on:focus='unameWarn=true' v-on:blur='username'>
				<div class="username_warn single_warn_box">
					<p v-show='unameWarn'>
					<img src="static/images/reg8.png" alt="安徽继续教育网">
					<span>支持中文、字母、数字、“_” “-”的组合，4-20个字符，区分大小写(不能是纯数字)</span></p>
				</div>
				
				<!-- 手机号码 -->
				<input type="text" class="insert phone none_top" ref="phone" placeholder="请输入手机号" v-on:keyup='phoneva' v-on:focus="phoneWarn=true" v-on:blur="phoneWarn=false">
				<div class="phone_warn single_warn_box">
					<p v-show='phoneWarn'><img src="static/images/reg8.png" alt="安徽继续教育网"><span>手机号码是您账号服务的重要凭证，找回密码和客户服务等都需要通过手机短信验证，请勿泄露给第三方，手机号码更换请及时在网站更新</span></p>
				</div>
				
				<!-- 短信验证码 -->
				<div class="text_code_box none_top">
					<input type="text" class="insert text_code"placeholder="短信验证码" readonly v-show='!imgCodeOk'>
					<input type="text" class="insert text_code" ref="text_code" placeholder="短信验证码" v-show='imgCodeOk' v-on:blur='textCodeTest'>

					<p ref="get_text_code" class="get_text_code" @click='getCodeNum'>{{codeNum}}</p>
				</div>
				
				<!-- 密码框 -->
				<div class="pwd_box">
					<input type="password" class="insert pwd" ref="pwd" placeholder="请输入密码" v-on:focus='pwdWarn=true' v-on:blur='pwdLoseFocus' v-on:keyup="pwdva">
					<!-- 密码强弱提示 -->
					<p ref="pwd_level" class="pwd_level" v-show='pwdLevel'>弱</p>
				</div>
				<div class="pwd_warn single_warn_box">
					<p v-show='pwdWarn'><img src="static/images/reg8.png" alt="安徽继续教育网"><span>建议使用字母、数字和符号两种及以上的组合6-20个字符</span></p>
				</div>
				
				<!-- 重复密码 -->
				<input type="password" class="insert repwd none_top" placeholder="再次输入密码"v-show="!isRepeatInsertPwd" readonly>
				<input type="text" class="insert repwd none_top" ref="repwd" placeholder="再次输入密码" v-on:blur="repwdva" v-on:focus="repwdGetFocus" v-show="isRepeatInsertPwd">

				<!-- 姓名 -->
				<input type="text" class="insert name" ref="name" placeholder="请输入姓名" v-on:blur='nameva' v-on:focus="nameWarn=true">
				<div class="name_warn single_warn_box">
					<p v-show='nameWarn'><img src="static/images/reg8.png" alt="安徽继续教育网"><span>请仔细核对姓名和身份证，注册成功后不允许自行更改，如有错误请联系客服</span></p>
				</div>

				<!-- 身份证 -->
				<input type="text" class="insert id_card none_top" ref="id_card" placeholder="请输入身份证" v-on:focus='idCardWarn=true' v-on:blur='cardva'>
				<div class="id_card_warn single_warn_box">
					<p v-show="idCardWarn"><img src="static/images/reg8.png" alt="安徽继续教育网"><span>为确保您学习的学时有效，注册要求输入准确的个人身份和工作单位信息，我们将严格为您保密</span></p>
				</div>
				
				<!-- 地区 -->
				<input type="text" class="insert area none_top" ref="area" placeholder="请选择地区" v-on:blur='areaWarn=false' v-on:focus="areaShow" v-model='areaMsg' readonly>
				<div class="area_warn single_warn_box">
					<p v-show='areaWarn'><img src="static/images/reg8.png" alt="安徽继续教育网"><span>请填写工作单位所在地区</span></p>
				</div>
			</div>
			
			<div class="btn_register">
				<button class="register hover" @click='regist'><span>注</span><span>册</span></button>
			</div>

			<!-- 协议 -->
			<div class="procetol">
				注册即同意<router-link to="/registerProtocol">《安徽继续教育网注册协议》</router-link>
			</div>
		</div>

		<!-- 验证码 -->
		<div class="pool"></div>
		<div class="image_code">
			<div class="image_code_top"></div>
			<div class="image_code_main">
				<div class="image_code_box">
					<a  @click='codeFresh'><imgTest class="yzm left"></imgTest></a>
					<p class="right next_image_code" @click='codeFresh'>看不清，换一张</p>
					<div class="clear"></div>
				</div>
				<div class="insert_for_image_code">
					<input type="text" placeholder="请输入图形验证码" v-on:keyup='imagesCodeTest' ref='image_code_insert' maxlength='4'>
					<img src="static/images/imagewrong.png" alt="安徽继续教育网" class="insert_for_image_warn" v-show='!isImageOk'>
				</div>
			</div>
			<!-- 关闭 -->
			<div class="image_code_bottom">
				<div class="image_code_close" @click='closeImageAlert'>
					<div class="image_code_line"></div>
				</div>
				
			</div>
		</div>

	    <addressselect :child-msg="msg" v-on:colseArea="areaClose" v-on:showAreaToParent="showAreaView"></addressselect>
	</div>
</template>
<script>
	import heade from '@/components/common/header'
	import addressselect from '@/components/common/addressSelect'  //地址选择
	import imgTest from '@/components/common/imgTest'
	import axios from "axios"
	import config from "@/api/base.js";
	export default {
		data(){
			return{
				headTitle:"注册",
				cardTh:false,                       //身份证是否通过校验
				unameTh:false,                      //用户名是否通过校验
				phoneTh:false,                      //手机号码是否通过校验
				pwdTh:false,                        //密码是否通过校验
				repwdTh:false,                      //重复密码是否通过校验
				cardTh:false,                       //身份证是否通过校验
				nameTh:false,                       //姓名是否通过校验
				textCodeTh:false,                   //短信验证码是否通过校验
				areaTh:false,                       //地区验证码是否通过校验
				registProtcle:true,                 //是否同意注册协议   默认同意
				cardVal:"",							//身份证信息
				msg:false,							//地址选择组件显示隐藏
				areaMsg:'',                         //选择的区域信息
				codeNum:"获取验证码",               //获取验证码
				canGetCode:true,                    //防止验证码二次点击触发
				getCodeTime:30,               		//再次获取验证码所需时间
				code1:'',                           //验证码时间戳
				imgCodeOk:false,                    //短信验证码是否可以输入
				isImageOk:true,                     //图形验证码是否正确
				prevImageCode:"",                   //上一次输入的图形验证码

				unameWarn:false,                    //用户名提示
				phoneWarn:false,                    //手机号码提示
				pwdWarn:false,                      //密码提示
				nameWarn:false,                     //姓名提示
				idCardWarn:false,                   //身份证提示
				areaWarn:false,                     //地区提示
				pwdLevel:false,                     //密码强弱提示
				isCanRegister:false,                //是否可以注册
				isFirstGetImageCode:true,           //是不是第一次获取图形验证码
				isRepeatInsertPwd:false,            //确认密码是否可以输入
			}
		},
		components:{
			addressselect,
			imgTest,
			heade
		},
		mounted(){
			this.setCss();
			this.setHeaderBackBtn();
		},
		methods:{
	      	// 设置是否显示头部返回按钮
            setHeaderBackBtn(){
                this.$store.commit('showHeaderBack',true);
            },
	      	setCss(){
	      		var heig=$(window).height();
				var heig1=this.$refs.main.clientHeight;
				if(heig > heig1){
					this.$refs.main.style.height=heig+'px';
				}
	      	},
			// 验证码刷新
			codeFresh(){
				this.$store.commit("codeFresh");
			},
			// 点击注册
			regist(){
				var _this=this;
				if(_this.isCanRegister){
					// 注册所需信息  用户名、手机号码、验证码、密码、姓名、身份证号码、地址
					var userName=_this.$refs.uname.value,
					mobile=_this.$refs.phone.value,
					smsCode=_this.$refs.text_code.value,
					password=_this.$refs.repwd.value,
					realname=_this.$refs.name.value,
					cardno=_this.$refs.id_card.value.toLowerCase(),
					area=_this.$store.state.addrNum;

					var params={"userName":userName,"mobile":mobile,"smsCode":smsCode,"password":password,"realname":realname,"cardno":cardno,"area":area};
					axios.post('/user/doRegister.html',params,config)
					.then(function(res){
						var ret=res.data.result;
						switch(ret){
							case "0":
								_this.showWarnBox("请完善注册信息");
								break;
							case "1":
								// 注册成功，跳到个人中心
								localStorage.setItem('jxjy_token',res.data.token);
								_this.$router.push('/memberCenter');
								break;
							case "2":
								_this.showWarnBox("用户名已存在");
								_this.$refs.uname.value = "";
								break;
							case "3":
								_this.showWarnBox("手机号码已存在");
								_this.$refs.phone.value="";
								break;
							case "4":
								_this.showWarnBox("身份证已存在");
								_this.$refs.id_card.value="";
								break;
							case "5":
								_this.showWarnBox("短信验证码错误");
								_this.$refs.text_code.value="";
								break;
							case "5":
								_this.showWarnBox("注册失败");
								_this.$refs.textCode.value="";
								break;
						}
					});
				}
			},
			// 短信验证码校验
			textCodeTest(){
				var len=this.$refs.text_code.value.length;
				if(len >= 4){
					this.textCodeTh=true;
					this.judgeRegisterStatus();
				}else{
					this.textCodeTh=false;
				};
			},
			// 获取短信验证码
			getCodeNum(){
				var mobile=this.$refs.phone.value;
				var get_text_code=this.$refs.get_text_code.innerHTML;
				var getTextCode=get_text_code.indexOf('获取验证码');
				if(this.canGetCode && (getTextCode != -1)){
					if(mobile==""){
						this.showWarnBox("请填写手机号码!");
					}else{
						if(!this.phoneTh){
							this.phoneva();
						}else{
							$('.pool,.image_code').fadeIn();
						}
					}
				};
			},
			// 图形验证码校验
			imagesCodeTest(){
				var _this=this;
				var len=_this.$refs.image_code_insert.value.length;
				var val=_this.$refs.image_code_insert.value;

				_this.isImageOk=false;
				// 若长度为4且这次和上次的值不一样则进行校验
				if((len==4) && (val!=_this.prevImageCode)){
					// 防止二次点击
					_this.canGetCode=false;
					// 验证码符合规则，发送请求
					var _this=this; 
					var uuid=sessionStorage.getItem("uuid");
					var mobile=_this.$refs.phone.value;
					var valideCode=_this.$refs.image_code_insert.value;
					var params={"mobile":mobile,"valideCode":valideCode,"uuid":uuid};
					axios.post('/user/toSendMessage.html',params,config)
					.then(function(res){
						var a=res.data.result;
						if(a == "1"){
							// 成功可以发送短信验证码
							_this.imgCodeOk=true;
							_this.isImageOk=true;
							_this.canGetCode=true;
							$('.pool,.image_code').fadeOut();
							var getCodeTime=_this.getCodeTime;  
							var timer=setInterval(function(){
								getCodeTime--;
								_this.codeNum="已发送"+getCodeTime+"s";
								if(getCodeTime==0){
									clearInterval(timer);
									_this.codeNum="重新获取验证码";
									_this.canGetCode=true;
									// 刷新验证码并清空
									_this.codeFresh();
									_this.$refs.image_code_insert.value="";
								}
							},1000);
						}else if(a == "2"){
							// 图形验证码错误  清空并刷新验证码
							_this.isImageOk=false;
							_this.codeFresh();
							var timer=setTimeout(function(){
								_this.isImageOk=true;
								_this.$refs.image_code_insert.value="";
							},1000);
						}
					})	
				}

				// 将这次输入的值存起来
				_this.prevImageCode=val;
			},
			// 关闭图形验证码弹框
			closeImageAlert(){
				$(".pool,.image_code").fadeOut();
				this.canGetCode=true;
			},
			// 用户名校验
			username:function(){		
				var _this=this;			
				var a=_this.$refs.uname.value;
				_this.unameWarn=false;
				var regTestNum=/^[0-9]{4,20}$/;
				var reg=/^[a-zA-Z0-9\u4e00-\u9fa5_-]{4,20}$/;
				var testResult1=regTestNum.test(a);
				var testResult2=reg.test(a);
				// 验证
				if(a == ""){
					_this.unameTh=false;
				}else if(a != "" && testResult1){
					_this.showWarnBox("用户名不能为纯数字!");
					_this.$refs.uname.value="";
				}else if(a != "" && !testResult1){
					if(!testResult2){
						_this.showWarnBox("用户名不符合规则");
						_this.$refs.uname.value="";
					}else{
						var params={"parameter":a,"type":"userName"};
						axios.post('/user/toOnlyUser.html',params,config)
						.then(function(res){
							if(!res.data.result){
								_this.showWarnBox("用户名已被注册");
								_this.$refs.uname.value="";
								_this.unameTh=false;
							}else{
								// 用户名可用
								_this.unameTh=true;
								_this.judgeRegisterStatus();
							};
						});
					}
				};
			},
			// 手机号码校验
			phoneva:function(){		
				var _this=this;		
				var a=_this.$refs.phone.value;
				var reg=/^0?(10|11|12|13|14|15|18|17|16|19)[0-9]{9}$/;
				if(a.length==11 || a.length == 12){
					if(!reg.test(a)){
						// 不为空且不符合规则，将输入的数据清空
						_this.showWarnBox("手机号码不符合规则!");
						_this.phoneTh=false;
					}else{
						var params={"parameter":a,"type":"mobile"};
						axios.post('/user/toOnlyUser.html',params,config)
						.then(function(res){
							if(!res.data.result){
								_this.showWarnBox("手机号码已被注册!");
								_this.phoneTh=false;
							}else{
								_this.phoneTh=true;
								_this.judgeRegisterStatus();
							}
						});
					}
				}else{
					_this.phoneTh=false;
				}
			},
			// 密码校验
			pwdva:function(){						
				var a=this.$refs.pwd.value;
				var reg=/^[^\u4e00-\u9fa5]+$/;
				if(a.length == 0){
					this.pwdTh=false;
					this.pwdLevel=false;
					this.isRepeatInsertPwd=false;
					this.$refs.repwd.value="";
					this.repwdTh=false;
				}else if(a.length>=6){
					this.pwdLevel=true;
					if(reg.test(a)){
						this.judgePwdLevel(a);
						this.pwdTh=true;
						this.judgeRegisterStatus();
						this.isRepeatInsertPwd=true;
					}else{
						this.showWarnBox("密码不符合规则");
						this.$refs.pwd.value="";
						this.isRepeatInsertPwd=false;
						this.$refs.repwd.value="";
						this.repwdTh=false;
						this.pwdTh=false;
					}
				}
			},
			// 焦点离开时判断密码
			pwdLoseFocus(){
				// 隐藏密码提示
				this.pwdWarn=false;
				var a=this.$refs.pwd.value;
				var b=this.$refs.repwd.value;
				if(a.length >0 && a.length <6){
					this.pwdLevel=false;
					this.showWarnBox("密码不符合规则");
					this.$refs.pwd.value="";
					this.$refs.repwd.value="";
					this.isRepeatInsertPwd=false;
					this.repwdTh=false;
					this.pwdTh=false;
				}else if(b.length != 0){

					if(a != b){
						this.$refs.repwd.value="";
						this.showWarnBox("两次输入的密码不一致");
						this.repwdTh=false;
					}
				}
			},
			// 密码强度判断
			judgePwdLevel(a){
				var pwd=a;
				var reg1 = /[0-9]+$/;
			    var reg2 = /[a-z]+$/;
			    var reg3 = /[A-Z]+$/;
			    var test1 = reg1.test(pwd) || reg2.test(pwd) || reg3.test(pwd);

			    var reg4 = /[0-9]+/;
			    var reg5 = /[a-z]+/;
			    var reg6 = /[A-Z]+/;
			    var test2 = (reg4.test(pwd) && reg5.test(pwd)) || (reg4.test(pwd) && reg6.test(pwd)) || (reg5.test(pwd) && reg6.test(pwd));

			    var test3 = reg4.test(pwd) && reg5.test(pwd) && reg6.test(pwd);
			    if(test3){
			    	this.$refs.pwd_level.innerHTML='强';
			    }else{
			    	if(test2){
			    		this.$refs.pwd_level.innerHTML='中';
			    	}else{
			    		this.$refs.pwd_level.innerHTML='弱';
			    	}
			    }
			},
			// 重复密码校验
			repwdva:function(){						
				var a=this.$refs.pwd.value;
				var b=this.$refs.repwd.value;
				if(a == ""){
					this.repwdTh=false;
				}else{
					if( a != b ){
						// 不为空且不符合规则，将输入的数据清空
						this.showWarnBox("两次输入的密码不一致");
						this.repwdTh=false;
						this.$refs.repwd.value="";
					}else{
						this.repwdTh=true;
						this.judgeRegisterStatus();
					}
				}
			},
			// 重复密码获取焦点
			repwdGetFocus(){
				this.$refs.repwd.type="password";
			},
			// 姓名校验
			nameva:function(){						
				var a=this.$refs.name.value;
				this.nameWarn=false;
				var reg=/^[\u4e00-\u9fa5]{2,10}$/;
				if(a == ""){
					this.nameTh=false;
				}else if(a != ""){
					if(!reg.test(a)){
						// 不为空且不符合规则，将输入的数据清空
						this.showWarnBox("姓名不符合规则");
						this.$refs.name.value="";
						this.nameTh=false;
					}else{
						this.nameTh=true;
						this.judgeRegisterStatus();
					}
				}
			},
			// 判断注册按钮状态
			judgeRegisterStatus(){
				var _this=this;
				var textCode=_this.$refs.text_code.value;
				// 判断短信验证码是否输入
				_this.textCodeTh=(textCode == "")?false:true;
				// 判断是否选择地区
				// _this.areaTh=(_this.$refs.area.value == "")?false:true;
				// 所有信息是否录入
				_this.isCanRegister=_this.cardTh&&_this.unameTh&&_this.phoneTh&&_this.pwdTh&&_this.repwdTh&&_this.cardTh&&_this.nameTh&&_this.textCodeTh&&_this.areaTh;

				// console.log(_this.cardTh,_this.unameTh,_this.phoneTh,_this.pwdTh,_this.repwdTh,_this.cardTh,_this.nameTh,_this.textCodeTh,_this.areaTh);
			},
			// 身份证校验
			cardva:function(){	
				this.idCardWarn=false;					
				var a=this.$refs.id_card.value;
				this.vardVal=a;
				var reg=/\d{17}[\d|x|X]|\d{15}/;
				if(a == ""){
					this.cardTh=false;
				}else if(a != ""){
					if( reg.test(a) && this.checkCard()){
						var _this=this;
						var params={'parameter':a,'type':'cardno'};
						axios.post('/user/toOnlyUser.html',params,config)
						.then(function(res){
							if(!res.data.result){
								_this.showWarnBox("身份证已被注册");
								_this.$refs.id_card.value="";
								_this.cardTh=false;
							}else{
								_this.cardTh=true;
								_this.judgeRegisterStatus();
							}
						});
					}else{
						this.showWarnBox("身份证不符合规则");
						this.cardTh=false;
					}
				}
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
			// 显示选择的地区信息
			showAreaView:function(data){
				// 如果后两项相同则后一项不显示
				this.areaMsg=(data.city == data.district)?data.provice+' '+data.city:data.provice+' '+data.city+' '+data.district;
				// 地区合格
				this.areaTh=true;
				this.judgeRegisterStatus();
			},
			// 关闭地区选择弹框
			areaClose:function(data){
				this.msg=data;
			},
			// 地区选择显示隐藏
			areaShow:function(){
				this.msg=true;
				this.areaWarn=true;
			},
			// 显示提示框
			showWarnBox(a){
				$(".warn").html(a).slideDown();
				var timer=setTimeout(function(){
					$(".warn").slideUp();
				},3000);
			},
		}
	}
</script>
<style scoped>
	.warn_box{text-align: center;min-height:0.6rem;position: fixed;top:.9rem;left:0;right:0;}
	.warn{color:#fff;display: none;padding:0.12rem 0.1rem;background:#FB6D52;font-size: 0.24rem;}

	.main{background:#fff;margin-top: .9rem;}
	.register_box{padding:0 0.54rem;}
	.insert{width:100%;border:1px solid #e8e8e8;border-radius: 3px;-webkit-border-radius: 3px;-moz-border-radius: 3px;-o-border-radius: 3px;/*font-size: 0.28rem;*/margin-top: 0.4rem;vertical-align:middle;/*line-height:0.65rem;*/height:0.65rem;padding:0.185rem 0 0.185rem 0.8rem;}
	.register_box .insert:first-child{margin-top:0.9rem;}
	.none_top{margin-top:0 !important;}
	.single_warn_box{min-height:0.4rem;padding-left: 0.2rem;overflow: hidden;}
	.single_warn_box p span{font-size: 0.22rem;float: left;width:5.5rem;line-height: 0.3rem;margin-top: 0.045rem;}
	.single_warn_box img{width:0.3rem;float:left;margin: 0.03rem 0.05rem 0 0;}
	.pwd_box{border:1px solid #e8e8e8;margin-top: 0.4rem;}
	.pwd{border:1px solid transparent;height:0.65rem;margin-top: 0 !important;width:5.1rem;background:url(../../static/images/reg4.png) no-repeat 0.15rem 0.125rem;background-size: 0.35rem;-webkit-background-size: 0.35rem;-moz-background-size: 0.35rem;-o-background-size: 0.35rem;}
	.pwd_level{display: inline-block;border-left: 1px solid #55b6dd;padding-left: 0.2rem;color:#55b6dd;}
	.text_code_box{border:1px solid #e8e8e8;margin-top: 0.4rem;}
	.text_code{border:1px solid transparent;margin-top: 0 !important;width:3.8rem;background:url(../../static/images/reg3.png) no-repeat 0.15rem 0.125rem;background-size: 0.35rem;-webkit-background-size: 0.35rem;-moz-background-size: 0.35rem;-o-background-size: 0.35rem;}
	.get_text_code{display: inline-block;color:#55b6dd;border-left: 1px solid #55b6dd;padding-left: 0.13rem}
	.get_text_code.hover{color:#b6b5b5;}
	.uname{background:url(../../static/images/reg1.png) no-repeat 0.15rem 0.125rem;background-size: 0.35rem;-webkit-background-size: 0.35rem;-moz-background-size: 0.35rem;-o-background-size: 0.35rem;}
	.phone{background:url(../../static/images/reg2.png) no-repeat 0.15rem 0.125rem;background-size: 0.35rem;-webkit-background-size: 0.35rem;-moz-background-size: 0.35rem;-o-background-size: 0.35rem;}
	.repwd{background:url(../../static/images/reg4.png) no-repeat 0.15rem 0.125rem;background-size: 0.35rem;-webkit-background-size: 0.35rem;-moz-background-size: 0.35rem;-o-background-size: 0.35rem;}
	.name{background:url(../../static/images/reg5.png) no-repeat 0.15rem 0.125rem;background-size: 0.35rem;-webkit-background-size: 0.35rem;-moz-background-size: 0.35rem;-o-background-size: 0.35rem;}
	.id_card{background:url(../../static/images/reg6.png) no-repeat 0.15rem 0.125rem;background-size: 0.35rem;-webkit-background-size: 0.35rem;-moz-background-size: 0.35rem;-o-background-size: 0.35rem;}
	.area{background:url(../../static/images/reg7.png) no-repeat 0.15rem 0.125rem;background-size: 0.35rem;-webkit-background-size: 0.35rem;-moz-background-size: 0.35rem;-o-background-size: 0.35rem;}

	.btn_register{margin-top: 0.6rem;text-align: center}
	.btn_register button{width:5.5rem;height:0.75rem;border-radius: 0.325rem;-webkit-border-radius: 0.325rem;-moz-border-radius: 0.325rem;-o-border-radius: 0.325rem;}
	.register span:first-child{margin-right: 0.4rem;}
	.register span{color:#fff;font-size: 0.3rem;}
	.register{background:#abe3f4;}
	.register.hover{ background: -webkit-linear-gradient(left, #2cbbe5, #3c9ed1);
	  background: -o-linear-gradient(left, #2cbbe5, #3c9ed1);
	  background: linear-gradient(to right, #2cbbe5, #3c9ed1);}
	input::-webkit-input-placeholder {font-size:0.28rem;}
	input:-moz-placeholder {font-size: 0.28rem;}
	input::-moz-placeholder {font-size: 0.28rem;}
	input:-ms-input-placeholder {font-size: 0.28rem;}

	.pool{position: fixed;top:0;left:0;bottom:0;right:0;background:#000;opacity:0.7;display:none;}
	.image_code_bottom{position: absolute;right:0.6rem;top:-0.83rem;}
	/*.image_code_close{position: absolute;width:0.56rem;height:0.56rem;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;-o-border-radius: 50%;border:1px solid #787D82;color:#787D82;font-size: 0.4rem;text-align: center;line-height:0.54rem;}*/
	.image_code_close{position: absolute;width:0.56rem;height:0.56rem;background: url(../../static/images/regclose.png) no-repeat center center;background-size:0.56rem;-webkit-background-size:0.56rem;-moz-background-size:0.56rem;-o-background-size:0.56rem;}
	.image_code_line{position: absolute;bottom:-0.28rem;left:50%;width:0;height:0.3rem;border-left: 2px solid #787D82;}
	.image_code{position: fixed;width:5.7rem;height:3.4rem;top:50%;left:50%;margin-top:-1.7rem;margin-left: -2.85rem;display:none;}

	.image_code_top{height:0.7rem;border-top-left-radius: 0.3rem;-webkit-border-top-left-radius: 0.3rem;-moz-border-top-left-radius: 0.3rem;-o-border-top-left-radius: 0.3rem;border-top-right-radius: 0.3rem;-webkit-border-right-left-radius:0.3rem;-moz-border-top-right-radius: 0.3rem;-o-border-top-right-radius: 0.3rem; background: -webkit-linear-gradient(left, #2cbbe5, #3c9ed1);
	  background: -o-linear-gradient(left, #2cbbe5, #3c9ed1);
	  background: linear-gradient(to right, #2cbbe5, #3c9ed1);}
	.image_code_main{height:2.7rem;background:#fff;border-bottom-left-radius: 0.3rem;-webkit-border-bottom-left-radius: 0.3rem;-moz-border-bottom-left-radius: 0.3rem;-o-border-bottom-left-radius: 0.3rem;border-bottom-right-radius: 0.3rem;-webkit-border-bottom-left-radius:0.3rem;-moz-border-bottom-right-radius: 0.3rem;-o-border-bottom-right-radius: 0.3rem;}
	.image_code_box{padding-top:0.3rem;width:4rem;margin:0 auto;}
	.yzm{width:2rem;height:0.9rem;}
	.next_image_code{height:0.9rem;line-height:0.9rem;font-size: 0.22rem}
	.insert_for_image_code{width:4rem;margin:0.15rem auto 0 auto;border:1px solid #e8e8e8;height:0.9rem;}
	.insert_for_image_code input{width:3.4rem;height:0.9rem;border:none;padding-left: 0.5rem;margin:0;outline: none;background:transparent;}
	.insert_for_image_warn{width:0.45rem;float: right;margin-right: 0.1rem;margin-top: 0.225rem;}
	.procetol{text-align: center;margin-top: 0.4rem;padding-bottom: 0.5rem;}
	.procetol a{color:#55b6dd;}
</style>