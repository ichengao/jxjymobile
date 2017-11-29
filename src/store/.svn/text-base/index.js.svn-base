import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex)

const store =new Vuex.Store({
	state:{
		certTest:{},                              //证书查验
		xsMsg:{},                                 //学时证明信息
		addrNum:"",              				  //地区选择组件选择的地区编号
		codeNum:0,               				  //验证码刷新
		showBackBtn:true,        				  //头部是否显示返回按钮
		navOnBottomStatus:[],    				  //底部导航栏显示状态
		checkBoxAll:false,       				  //设置多选框全选状态   默认false取消全选 
		clickCheckBoxAll:false,  				  //多选框状态单独设置 
		chooseCity:'',                            //选择的城市
		needPay:'0',                              //需要支付的价格  
		chooseMajor:"",                           //选择的专业  
	},
	getters:{
		// 证书模块
		zsData(state){
			// 将证书的数据取出并且转化为对象
			if(state.certTest == "")
				return JSON.parse(state.certTest)
			else
				return JSON.parse(sessionStorage.getItem("zsData"));
		},
		xsData(state){
			// 将证书的数据取出并且转化为对象
			if(state.xsMsg == "" || state.xsMsg == null)
				return JSON.parse(state.xsMsg)
			else
				return JSON.parse(sessionStorage.getItem("xsMsg"));
		}
	},
	mutations:{
		// 证书模块
		zsSave(state,data){
			state.certTest=data;
			// 将数据存在localstorage，防止刷新没有数据
			sessionStorage.setItem("zsData",data);
		},
		xsSave(state,data){
			state.xsMsg=data;
			// 将数据存在localstorage，防止刷新没有数据
			sessionStorage.setItem("xsMsg",data);
		},

		// 地区选择
		addrSelectSave(state,data){
			state.addrNum=data;
		},
		
		//验证码刷新
		codeFresh(state){
			state.codeNum++;
		},

		//头部是否显示返回按钮，默认显示
		showHeaderBack(state,data){
			state.showBackBtn=data;
		},

		// 设置底部导航栏状态
		setNavOnBottomStatus(state,data){
			state.navOnBottomStatus=data;
		},

		// 设置多选框是否全选
		setCheckBoxAll(state,data){
			state.checkBoxAll=data;
		},
		setClickCheckBoxAll(state,data){
			state.clickCheckBoxAll=data;
		},

		//设置选中的城市
		setChooseCity(state,data){
			state.chooseCity=data;
		},

		//需要支付的价格
		setNeedPay1(state,data){
			state.needPay=data;
		},

		//选择的专业
		setMajor(state,data){
			state.chooseMajor=data;
		}
	}
});
export default store;