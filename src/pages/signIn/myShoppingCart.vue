<template>
	<div v-title data-title="购物车">
		<!-- 头部 -->
		<div class="header">
			<table width="100%">
				<tr>
					<td width="25%"></td>
					<td width="50%" align="center">
						<p class="title_head">购物车</p>
					</td>
					<td width="25%" align="right">
						<!-- 编辑 -->
				        <div class="list" @click='setToggleStatus' v-show='isHaveData'>
				            <span class="edit" v-show='!isDelete'>编辑</span>
				            <span class='edit' v-show='isDelete'>完成</span>
				        </div>
					</td>
				</tr>
			</table>
	    </div>
	
		<!-- 主体 -->
	    <div class="gwc">

	        <img src="static/images/gwc_03.png" alt="安徽继续教育网" class='nav_img'>

	        <div class="main">
	        	<div class="tab_box" @touchstart="_touchStart" @touchmove="_touchMove" @touchend="_touchEnd" v-for="(msg,index) in dataMsg" :id=" 'tab' + index  " v-show='isHaveData'>
	        		<table class="tab_content">
		                <tbody>
		                    <tr>
		                        <td rowspan='3' class="chk_width" @click='getChosedData'>
		                            <repeatcheck ref="cbks"></repeatcheck>
									<!-- 课程总数量，班级id -->
		                            <input type="hidden" :value='msg.totalCourse' class="course_total" :name='msg.trainClass.id' >
		                        	<!-- 考试总数量 -->
									<input type="hidden" :value="msg.totalExam" class="totalExam">
									<!-- 课程总学时 -->
									<input type="hidden" :value="msg.totalCourseCredit" class="totalCourseCredit">
									<!-- 考试总学时 -->
									<input type="hidden" :value="msg.totalExamCredit" class="totalExamCredit">
								</td>

		                        <td width="30%" class="msg_img" rowspan='3'>
									<img :src="msg.trainClass.classImage" alt="安徽继续教育网" width="100%" v-show="msg.trainClass.classImage != null">
									<img src="/static/images/noimg.png" alt="安徽继续教育网" width="100%" v-show="msg.trainClass.classImage == null">
								</td>
		                        <td class="msg_detail">
		                            <h4>{{msg.trainClass.className}}({{msg.trainClass.province.cityname}})</h4>
		                        </td>
		                    </tr>
		                    <tr>
		                    	<td class="class_detail">{{msg.trainClass.classYear}}年度 {{msg.trainClass.trainProject.sysCode.sysCode.codeName}}({{msg.trainClass.trainProject.sysCode.codeName}}) <br><span v-show="msg.trainClass.classPaytype == '01' ">在线</span><span v-show="msg.trainClass.classPaytype == '02' ">面授</span><span v-show="msg.trainClass.classPaytype == '03' ">混合</span> <span class="course_hour">{{msg.totalCredit}}</span>学时 <span>{{msg.totalCourse}}门课程</span></td>
		                    </tr>
		                    <tr>
		                    	<td class="class_for_check">
		                    		<router-link :to="{path:'/shoppingCartCourse',query:{'classId':msg.trainClass.id}}" class="left look_for_course">报名内容>></router-link>
		                    		<div class="right msg_price">￥{{msg.totalPrice}}</div>
	                    		</td>
	                    	</tr>
		                </tbody>
		            </table>
		            <!-- 删除 -->
		            <div class="delete_slide" @click='deleteBtn' :name='msg.trainClass.id'><span>删除</span></div>
	        	</div>

	        	<!-- 购物车为空时显示 --> 
		        <div class='none_cart' v-show="!isHaveData">
		        	<div class="cart_img_box">
		        		<img src="static/images/cart.png" alt="安徽继续教育网">
	        		</div>
	        		<p>购物车空荡荡的!</p>
	        		<router-link to='/chooseClass' class="to_choose_class">去选课</router-link>
		        </div>

	        </div>
	    </div>
	    

	    <!-- 加入购物车 -->
	    <div class="add_cart" v-show="(!isDelete) && (isHaveData)">

	        <div class="cart_control">
	        	<div class="left select_all_box" @click='getChosedData'>
	        		<repeatcheckall class="left ckb"></repeatcheckall>
	        		<p>全选</p>
	        	</div>

	        	<a class="add_in" @click='createOrder'>结算({{classQuantity}})</a>

	        	<div class="select_msg_box ">
	        		<div class="other_msg"><i>课程: </i><span class="cart_data">{{courseHours}}学时({{courseQuantity}})</span>&nbsp; <i>考试: </i><span class="cart_data">{{examHour}}学时({{examQuantity}})</span></div>
	        		<div class="main_msg"><i>报名费用: </i><span class="cart_data">{{signPrice}}元</span></div>
        		</div>
	        	
	        </div>
	    </div>
	     
	    <!-- 删除 -->
	    <div class="delete_cart" v-show="isDelete && isHaveData">
	    	<div class="cart_control">
	        	<div class="left select_all_box" @click='getChosedData'>
	        		<repeatcheckall class="left ckb"></repeatcheckall>
	        		<p>全选</p>
	        	</div>
	            <a class="add_delete" @click='doDeleteList'>删除</a>
	        </div>
	    </div>

	    <!-- 底部导航 -->
		<navBottom></navBottom>

	</div>
</template>
<script>
	import repeatcheck from '@/components/common/checkbox/checkBox'
	import repeatcheckall from '@/components/common/checkbox/checkBoxAll'
	import navBottom from '@/components/common/navBottom'
	import { MessageBox } from 'mint-ui';
	import axios from "axios"
	import config from "@/api/base.js";
	export default{
		data(){
			return{
				headTitle:"购物车", 
				dataMsg:{},
              	startX: 0,                        //触摸位置
                moveX: 0,                         //滑动时的位置
                disX: 0,                          //移动距离
                classQuantity:0,                  //班级数量
                courseQuantity:0,	              //课程数量
                courseHours:0,                    //课程学时
				examHour:0,                       //考试学时
				examQuantity:0,                   //考试数量
                signPrice:0,                      //报名费用
                isDelete:false,                   //是否是全选删除状态 false时显示加入购物车   编辑模式
                deleteBox:'',                     //放选中的要删除的班级id
                payBox:'',                        //放选中的要结算的班级id
                chosedDeleteBox:[],               //选择的元素集合
                isHaveData:true,                  //购物车是否有商品
			}
		},
		components:{
			repeatcheck,
			repeatcheckall,
			navBottom
		},
		created(){
			this.getData();
			this.setNavBottom();
			this.$store.commit('setClickCheckBoxAll',false);
      		this.$store.commit('setCheckBoxAll',false);
		},
		beforeDestory(){
			this.$store.commit('setClickCheckBoxAll',false);
      		this.$store.commit('setCheckBoxAll',false);
		},
		methods:{
			getData(){
				var _this=this;
				var params={};
				axios.post('/order/toShoppingCart.do',params,config)
				.then(function(res){
					var resu=res.data.result;
					if(resu == '1'){
						// 购物车有商品
						_this.dataMsg=res.data.sCartList;
						_this.isHaveData=true;
					}else if(resu == '0'){
						// 购物车为空
						_this.dataMsg=res.data.sCartList;
						_this.isHaveData=false;
					}
				});
			},
			// 购物车滑动事件
			_touchStart: function(ev) {
                ev = ev || event;
                if(ev.touches.length == 1){
                    // 手指按下的时候记录按下的位置
                    this.startX = ev.touches[0].clientX;
                }
            },
            _touchMove: function(ev){
                ev = ev || event;
                if(ev.touches.length == 1){
                    // 滑动过程中的实时位置
                    this.moveX = ev.touches[0].clientX
                    // 滑动过程中实时计算滑动距离
                    this.disX = this.startX - this.moveX;
                    // 如果是向左滑动添加显示删除按钮，向右滑动隐藏删除按钮
                    if (this.disX > 50) {
						$(ev.currentTarget).addClass('hover');
                    }else if(this.disX < -50){
                    	$(ev.currentTarget).removeClass('hover');
                    }
                }
            },
            _touchEnd: function(ev) {
                if (event.changedTouches.length == 1) {
                    this.startX = 0;
                    // 手指移动结束后的水平位置
                    let endX = event.changedTouches[0].clientX;
                    // 触摸开始与结束,手指移动的距离
                    this.disX = this.startX - endX;
                    //如果距离小于删除按钮的1/2，不显示删除按钮
                }
            },
            // 左滑删除按钮
            deleteBtn(e){
            	var _this=this;
            	var a=e.currentTarget;
            	var classId=$(a).attr('name');
            	var params={'classIds':classId};
            	axios.post('/order/doDelShoppingCartByClassIds.do',params,config)
            	.then(function(res){
            		if(res.data.result == '1'){
            			// 删除成功，删除对应的dom
            			$(a).parent().remove();
            			_this.isHaveData=($(".main .tab_box").length == 0)?false:true; 
            		}else if(res.data.result == '0'){
            			_this.openAlert('操作失败，请重试！');
            		}
            	});
            },
            // 生成订单
            createOrder(){
            	var _this=this;
            	if(_this.payBox !="" && _this.payBox !=undefined && _this.payBox !=null){
            		var params={'classIds':_this.payBox};
            		axios.post('/order/toGenerateOrder.do',params,config)
            		.then(function(res){
            			var resu=res.data;
            			switch(resu.result){
            				case '0' :
            					_this.openAlert('失败！');
            					break;
            				case "1" :
            					_this.$router.push({'path':'/myOrder/pay',query:{'orderId':resu.orderId}});
            					break;
            				case "2" :
            					_this.openAlert('所选班级已不在购物车！');
            					break;
            				case "3" :
            					_this.openAlert('您有未支付订单，不能再次报名，请前往缴费订单模块处理！');
            					break;
            			}
            		});
            	}
            },
            // 编辑状态时删除集合
            doDeleteList(){
            	var _this=this;
            	var a=(_this.deleteBox != " ") && (_this.deleteBox != undefined) && (_this.deleteBox != null);
            	if(a){
            		// 选择了班级
            		var params={'classIds':_this.deleteBox};
            		axios.post('/order/doDelShoppingCartByClassIds.do',params,config)
            		.then(function(res){
            			var resu=res.data.result;
            			if(resu == '1'){
            				var b=_this.chosedDeleteBox.join(",#");
            				$('#'+b).remove();
            				_this.isHaveData=($(".main .tab_box").length == 0)?false:true;
            			}else if(resu == '0'){
            				_this.openAlert('操作失败，请重试！');
            			}
            		});
            	}
            },
            // 获取选中的班级数据   
            getChosedData(){
            	// 非编辑模式
            	if(!this.isDelete){
            		var a=0,b=0,c=0,d="",len=0,e=0,f=0;
	            	len=$('.main .check_box.bg_img').length;
	            	for(var i=0;i<len;i++){
	            		a+=parseInt($('.main .check_box.bg_img').eq(i).siblings('.totalCourseCredit').val());
	            		b+=Number($('.main .check_box.bg_img').eq(i).parent().parent().next().next().children().children('.msg_price').html().slice(1,));
	            		c+=parseInt($('.main .check_box.bg_img').eq(i).siblings('.course_total').val());
	            		d+=$('.main .check_box.bg_img').eq(i).next('.course_total').attr('name')+',';
						e+=parseInt($('.main .check_box.bg_img').eq(i).siblings('.totalExam').val());
						f+=parseInt($('.main .check_box.bg_img').eq(i).siblings('.totalExamCredit').val());
					};
					//班级数量
					this.classQuantity=len;
					//课程学时
	            	this.courseHours=a;
					// 价格
	            	this.signPrice=b.toFixed(2);
					//课程数量
	            	this.courseQuantity=c;
					// 考试id
	            	this.payBox=d.slice(0,-1);
					// 考试数量
					this.examQuantity=e;
					// 考试学时
					this.examHour=f;
            	}else{
            		// 编辑模式
            		this.deleteBox=" ";
            		var len=$('.main .check_box.bg_img').length,a="",b=new Array();
            		for(var i=0;i<len;i++){
            			a+=$('.main .check_box.bg_img').eq(i).next('.course_total').attr('name')+',';
            			// 获取选择的dom元素的id 
            			b.push($('.main .check_box.bg_img').eq(i).parent().parent().parent().parent().parent().attr('id'));
            		};
            		this.deleteBox=a.slice(0,-1);
            		this.chosedDeleteBox=b;
            	}
            },
            //头部返回按钮
            backPrev(){					
	      		this.$router.back();
	      	},
	      	// 将全选按钮置为false
	      	setToggleStatus(){
	      		this.isDelete=(this.isDelete==true)?false:true;
	      		// 切换时取消全选状态
	      		this.$store.commit('setClickCheckBoxAll',false);
	      		this.$store.commit('setCheckBoxAll',false);
	      		for(var i=0;i<this.$refs.cbks.length;i++){
	      			this.$refs.cbks[i].setStatus('01');
	      		};
	      		
	      		this.classQuantity=this.courseQuantity=this.courseHours=this.signPrice=0;
	      	},
	      	// 弹框提示
			openAlert(a) {                           
        		MessageBox.alert(a, '提示');
      		},
      		// 设置底部导航状态
			setNavBottom(){
				this.$store.commit('setNavOnBottomStatus',['0','0','1','0','0']);
			},
		},
	}
</script>
<style scoped>
	.header{width:100%;height:.9rem;background:url(../../../static/images/bj-25.jpg);position:fixed;top:0;text-align: center;z-index:10000;background-size: 100% 0.9rem;-webkit-background-size: 100% 0.9rem;-moz-background-size: 100% 0.9rem;-o-background-size: 100% 0.9rem; }
    .header .back,.area_select{position: absolute;top:18px;left:3%;}
    .header .title_head{line-height:.9rem;color:#fff;font-size: 0.36rem;}
    .header .list{padding-right: 10px;}
    .header .list .edit{color:#fff;font-size: 0.28rem}

	.gwc .nav_img{margin-top:.9rem;width:100%;}
    .main{width:100%;margin:0 auto;padding-bottom: 200px;overflow-x:hidden; }
    .main table{padding:0 5px;border-top:1px solid #E6E6E6;border-bottom:1px solid #E6E6E6;}
    .main table tbody td.msg_detail{padding-left: 5px;}
    .main table tbody td.msg_detail h4{font-size: 0.26rem;min-height: 34px;}
    .class_detail{padding-left: 5px;padding-top:1px;font-size: 0.24rem}
    .class_detail span{font-size: 0.24rem}
    .class_for_check{padding-left: 5px;}
    .look_for_course{color:#409DD0;font-size: 0.26rem}
    td .msg_price{color:#D1211A;font-size: 0.28rem;position: relative;top:-2px;}
    .msg_img{vertical-align: middle;}
	.tab_box{position: relative;background:#fff;left:0;transition:left 0.3s;-moz-transition:left 0.3s;-webkit-transition:left 0.3s;-o-transition:left 0.3s;margin-bottom: 5px;}
	.tab_box.hover{left:-.9rem;transition:left 0.3s;-moz-transition:left 0.3s;-webkit-transition:left 0.3s;-o-transition:left 0.3s;}
	.tab_content{position: relative;}
	.delete_slide{position: absolute;width:60px;background:#e4393c;right:-61px;top:1px;bottom:1px;}
	.delete_slide span{position: absolute;color:#fff;font-size: 18px;width:40px;height:25px;top:50%;left:50%;margin-top:-12.5px;margin-left:-20px;}
	.select_all_box{position: relative;padding-left: 10px;height:45px;}
	.ckb{position: absolute;top:50%;margin-top:-0.2rem;}
	.select_all_box p{margin-left: 0.46rem;font-size: 0.28rem;height:0.28rem;line-height:0.32rem;position: absolute;top:50%;margin-top:-0.14rem;width:0.6rem;}
	.cart_control>a{font-size: 0.28rem}
	.chk_width{width:30px;}

    .cart_control{position: fixed;width:100%;height:45px;background:#F2F2F2;bottom:50px;left:0;background:#fff;}
    .add_in,.add_delete{float:right;padding:0 20px;height:45px;line-height:45px;background:#f50 !important;text-align: center;color:#fff;}
    .add_delete{background:#e4393c !important;}
    
    .add_in.hover,.delete_btn.hover{background:#EB681A;}
    .add_msg{padding-top:8px;padding-left: 5px;background:#FFFBF1;}
    .add_msg span{line-height: 18px;}
	
	.none_cart{text-align: center}
	.cart_img_box{width:1.4rem;height:1.4rem;margin:30px auto 10px auto;text-align: center;background:#CCCCCC;border-radius: 50%;-moz-border-radius: 50%;-webkit-border-radius: 50%;}
    .none_cart img{width:0.8rem;margin-top: 0.3rem;}
    .none_cart p{font-size: 0.3rem}
    .to_choose_class{padding:5px 10px;border:2px solid #ddd;display: inline-block;border-radius: 5px;-moz-border-radius: 5px;-webkit-border-radius: 5px;margin-top: 10px;}

	.select_msg_box{height:45px;padding-left:1.4rem;font-size: 0.26rem}
	.select_msg_box>div{height:22.5px;line-height: 22.5px}
	.select_msg_box span{color:#EB681A;font-size: 0.26rem}
	.select_msg_box i{font-size: 0.26rem;font-style: normal;color:#737575;}

</style>