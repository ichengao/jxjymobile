<template>
	<!--居住地址三级联动选项-->
    <section class="showChose" v-show="showChose || childMsg">
      	<section class="address">
        	<section class="title">
          		<h4>选择地区</h4>
          		<span @click="closeAdd()">×</span>
        	</section>
	        <section class="title" ref="areaSelected">
	          	<div class="area" @click="provinceSelected()">{{Province?Province:'省份'}}</div>
	          	<div class="area" @click="citySelected()" :class="City?'':'active'">{{City?City:'请选择'}}</div>
	          	<div class="area" @click="districtSelected()" :class="District?'':'active'" v-show="City">{{District?District:'请选择'}}</div>
	        </section>
	        <ul>
	          	<li class="addList" v-for="(v,k) in info" @click="getProvinceId(v.id, v.name, k)" v-show="showProvince" :class="v.selected ? 'active' : ''">{{v.name}}</li>
	          	<li class="addList" v-for="(v,k) in showCityList" @click="getCityId(v.id, v.name, k)" v-show="showCity" :class="v.selected ? 'active' : ''">{{v.name}}</li>
	          	<li class="addList" v-for="(v,k) in showDistrictList" @click="getDistrictId(v.id, v.name, k)" v-show="showDistrict" :class="v.selected ? 'active' : ''">{{v.name}}</li>
	        </ul>
      	</section>
    </section>
</template>
<script>
	import axios from "axios"
	import config from "@/api/base.js";
	import { MessageBox } from 'mint-ui';
	export default {
  		name: 'myAddress',
  		data () {
	    	return {
	      		showChose: false,
	      		showChoseToParent:false,    //将弹框状态回传给父组件
	      		showProvince: true,
	      		showCity: false,
	      		showDistrict: false,
		      	showCityList: false,
		      	showDistrictList: false,
		      	province: 5,
		      	city: 3,
		      	district: 57,
		      	GetProvinceId: 2,
		      	District: false,
		      	Province: false,
		      	City: false,
		      	areaMsg:[],                 //保存选择的区域信息
		      	// v-for循环判断是否为当前
		      	selected: false,
		     	info: [
		          	{id: 34, name: '安徽', city: [
		              	// {id: 98, name: '合肥市', district: [
		                  	// {id: 934, name: '瑶海区'},
		                  	// {id: 935, name: '庐阳区'},
		                  	// {id: 936, name: '蜀山区'},
		                  	// {id: 937, name: '包河区'},
		                  	// {id: 938, name: '长丰县'},
		                  	// {id: 939, name: '肥东县'},
		                  	// {id: 940, name: '肥西县'}
		              	// ]}
		          	]}
		      	],
		      	getClick:[]                    //保存点击过的信息，防止重复请求
	    	}
  		},
  		props:{
  			childMsg:Boolean
  		},
	  	methods: {
	    	choseAdd: function() {
	      		this.showChose = true;
	    	},
	    	closeAdd: function() {
	      		// 选择行政区后将弹框状态的信息回传给父组件
	      		this.showChoseToParent=this.showChose;
	      		this.$emit('colseArea',this.showChoseToParent);
	    	},
	    	_filter(add,name,code) {
	    		var result = [];
		      	for(var i=0;i<add.length;i++) {
		        	if(code == add[i].id){
		          		result = add[i][name];
		        	}
		      	}
	      		return result;
	    	},
	    	// 获取市级区域  安徽省默认编码34
	    	getProvinceId: function(code,input,index) {
	      		this.province = code;
	      		this.Province = input;
	      		this.showProvince=false;
	      		this.showCity=true;
	      		this.showDistrict = false;
	      		this.showCityList = this._filter(this.info,'city',this.province);
	      		// 点击选择当前
	     		this.info.map( a => a.selected = false );
	      		this.info[index].selected = true;
	      		//保存选择的省信息
	      		this.areaMsg.provice=this.info[index].name;  

	      		// 发送请求获取市级区域信息
	      		var _this=this;
	      		var params={"parent":"34"};
	      		
	      		if(_this.getClick.indexOf(_this.info[index].id) == "-1"){
	      			axios.post('/user/toArea.html',params,config)
		  			.then(function(res){
		  				var dataMsg=res.data.list;
		  				var getData={};
		  				_this.getClick.push(_this.info[index].id);

		  				if(res.data.result == '1'){
		  					for(var i=0;i<dataMsg.length;i++){
								getData={id:"",name:"",district:[]};
		  						getData.id=dataMsg[i].codeid;
		  						getData.name=dataMsg[i].cityname;
		  						_this.info[0].city.push(getData);
		  					}
		  				}else if(res.data.result == '0')
		  					_this.openAlert("错误或无数据");
		  			})
	      		}
	  			       
	    	},
	   		provinceSelected: function() {
	      		// 清除市级和区级列表
	      		this.showCityList = false;
	      		this.showDistrictList = false;
	      		// 清除市级和区级选项
	      		this.City = false;
	      		this.District = false;
	      		// 选项页面的切换
	      		this.showProvince = true;
	      		this.showCity = false;
	      		this.showDistrict = false;
	   		},
	   		// 获取行政区信息 
	    	getCityId: function(code, input, index) {
	      		this.city = code;
	      		this.City = input;
	      		this.showProvince=false;
	      		this.showCity=false;
	      		this.showDistrict = true;
	      		this.showDistrictList = this._filter(this.showCityList,'district',this.city);
	      		// 选择当前添加active
	      		this.showCityList.map( a => a.selected = false );
	      		this.showCityList[index].selected = true;
	      		//保存选择的城市信息
	      		this.areaMsg.city=this.showCityList[index].name;	

	      		// 获取行政区列表
	      		var _this=this;
	      		var a=this.showCityList[index].id;
	      		var params={"parent":a};

	      		if(_this.getClick.indexOf(a) == "-1"){
	      			axios.post('/user/toArea.html',params,config)
		  			.then(function(res){
		  				var dataMsg=res.data.list;
		  				var getData={};
		  				// 将点击过的存入数组，防止多次请求数据
		  				_this.getClick.push(a);
		  				if(res.data.result == '1'){
		  					// 将获得数据存入info
		  					for(var i=0;i<dataMsg.length;i++){
								getData={id:"",name:""};
		  						getData.id=dataMsg[i].codeid;
		  						getData.name=dataMsg[i].cityname;
		  						_this.info[0].city[index].district.push(getData);
		  					}
		  				}else if(res.data.result == '0'){
		  					getData={id:_this.showCityList[index].id,name:_this.showCityList[index].name};
	  						_this.info[0].city[index].district.push(getData);
		  				}	
		  			});
	      		}
	    	},
	    	citySelected: function() {
	    		if(!this.showProvince){
	    			this.showProvince=false;
		      		this.showCity=true;
		      		this.showDistrict = false;
	    		}
	    	},
			getDistrictId: function(code, input, index) {
	      		this.district = code;
	      		this.District = input;
	      		// 选择当前添加active
	      		this.showDistrictList.map( a => a.selected = false );
	      		this.showDistrictList[index].selected = true;
	      		//保存选择的区信息
      			this.areaMsg.district=this.showDistrictList[index].name;	
      			//将选择的区域信息传递给父组件
      			this.$emit('showAreaToParent',this.areaMsg);
      			// 选择行政区后将弹框状态的信息回传给父组件
	      		this.showChoseToParent=this.showChose;
	      		this.$emit('colseArea',this.showChoseToParent);

	      		// 将选择的地区信息保存到vuex
	      		this.$store.commit('addrSelectSave',this.showDistrictList[index].id);
	    	},
	    	districtSelected: function() {
    			this.showProvince=false;
      			this.showCity=false;
      			this.showDistrict = true;
	    	},
			// 弹框提示
			openAlert(a) {                           
        		MessageBox.alert(a, '提示');
      		}
	  	}
	}
</script>
<style scoped>
	.myAddress{
	  width: 100%;
	  background-color: white;
	  border-top: 4px solid rgba(245,245,245,1);
	  color:#333;
	}	
	.myAddress .cont{
	  border-bottom: 1px solid rgba(245,245,245,0.8);
	}
	.myAddress .cont span{
	  display: inline-block;
	  font-size: 1rem;
	  color: #333;
	  line-height:1rem;
	  margin-left: 0.32rem;
	}
	.myAddress .cont section{
	  float:left;
	}
	.myAddress .cont p{
	  display: inline-block;
	  font-size: 1rem;
	  color: #333333;
	  line-height: 1rem;
	  margin-left: 1rem;
	}
	.myAddress .cont .pic2{
	  float: right;
	  width: 1rem;
	  height: 1rem;
	  margin: 0.32rem 0.32rem 0.32rem 0;
	}
	.myAddress .cont p.text{
	  margin-left: 0.72rem;
	}
	.showChose{
	  width:100%;
	  height:100%;
	  position:fixed;
	  top:0;
	  left:0;
	  z-index:120;
	  background:rgba(77,82,113,0.8);
	}
	.address{
	  position:absolute;
	  bottom:0;
	  left:0;
	  z-index:121;
	  background:#fff;
	  width:100%;
	}
	.title{
		position: relative;
	}
	.title h4{
	  font-weight:normal;
	  color:#999;
	  padding: 10px 0;
	  text-align:center;
	  border-bottom: 1px solid #ddd;
	  margin-bottom: 10px;
	}
	.title span{
		position: absolute;
		right:10px;
		top:10px;
	}
	.area{
	  display:inline-block;
	  margin-left:0.5rem;
	  color:#333;
	}
	.addList{
	  width:100%;
	  margin-top:0.1rem;
	  line-height:0.5rem;
	  color:#333;
	}
	.address ul{
	  width:95%;
	  height: 300px;
	  overflow:auto;
	}
	.address ul li{
	  padding-left:5%;
	}
	.address .title .active{
	  color:#0071B8;
	  border-bottom:0.02rem solid #0071B8;
	}
	.address ul .active{
	  color:#0071B8;
	}
</style>