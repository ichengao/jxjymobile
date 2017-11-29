<template>
	<div v-title data-title="寄送地址">
		<!-- 头部 -->
		<heade :titlehead="headTitle"></heade>

		<div class="main">
            <div align="center" style="margin-top:101px;" v-show='!isHaveData'>暂无数据！</div>

			<div class="tab" v-for="msg in dataMsg">
				<!-- 地址信息 -->
				<div class="tab_header">
					<p class="tab_name">{{msg.name}}</p>
					<p class="tab_phone">{{msg.phone}}</p>
				</div>
				<!-- 地址 -->
				<div class="tab_main">
					{{msg.provinceCity}}{{msg.address}}
				</div>
				<!-- 编辑删除 -->
				<div class="tab_footer">
					<p class="address_ensure" v-show="msg.isDefault == '02'">默认地址</p>

					<div class="right">
						<p class="address_edit"><router-link :to="{path:'/xzjsdz',query:{'addId':msg.id}}">编辑</router-link></p>
						<p class="address_delete" :name="msg.id" @click="deleteControl">删除</p>
					</div>
					<div class="clear"></div>
				</div>
			</div>

		</div>

		<!-- 新增按钮 -->
        <div class="add_btn">
            <router-link to="/xzjsdz">新增收件地址</router-link>
        </div>

        <!-- 删除弹框 -->
		<div class="pool"></div>
		<div class='delete_order_box'>
			<div class="delete_order">
				<p class='delete_warn'>是否确定删除该地址？</p>
				<button class='cancle' @click='cancleControlAddress'>取消</button>
				<button class="ensure" @click='ensureCancleOrderAddress'>确定</button>
			</div>
		</div>
	</div>
</template>
<script>
	import heade from '@/components/common/header'
    import axios from "axios"
    import config from "@/api/base.js"
    import { MessageBox } from 'mint-ui';
    export default{
    	data(){
    		return{
    			headTitle:"寄送地址",
    			dataMsg:{},
    			isHaveData:true,          //是否有数据
    			deleteAddressId:'',       //删除地址id
    		}
    	},
    	components:{
    		heade,
    	},
    	created(){
			this.getData();
		},
    	methods:{
    		getData(){
                var _this=this;
                var params={};
                axios.post('/user/toUserAddress.do',params,config)
                .then(function(res){
                    _this.dataMsg=res.data.addList;
                    _this.isHaveData=(!_this.dataMsg)?false:true;
                });
            },
            // 弹出删除弹框
            deleteControl(e){
            	var a=e.target || e.srcElement;
            	this.deleteAddressId=$(a).attr('name');
            	$(".pool,.delete_order_box").fadeIn();
            },
            // 取消删除
            cancleControlAddress(){
            	$(".pool,.delete_order_box").fadeOut();
            	// 清空保存的地址id
            	this.deleteAddressId="";
            },
            // 确定删除
            ensureCancleOrderAddress(){
            	var _this=this;
                var params={'addId':_this.deleteAddressId};
                axios.post('/user/delAddress.do',params,config)
                .then(function(res){
                    var resu=res.data.result;
                    if(resu == '1'){
                        // 删除成功
                        $('[name='+_this.deleteAddressId+']').parent().parent().parent().remove();
                        $(".pool,.delete_order_box").fadeOut();
                        _this.isHaveData=($('.tab').length=='0')?false:true;
                    }else if(resu == '0'){
                        // 删除失败
                        _this.openAlert('操作失败，请重试！');
                    }
                });
            },
            // 弹框提示
            openAlert(a){                           
                MessageBox.alert(a, '提示');
            },
    	}
    }
</script>
<style scoped>
	.main{margin-top: .9rem;margin-bottom: 61px;}
	.tab{padding:0.3rem 0.3rem 0.3rem 0.35rem;background:#fff;margin-bottom: .2rem;}
	.tab_header p{display:inline-block;font-size: 0.28rem;}
    /*.tab_name{width:3rem;}*/
	.tab_phone{margin-left: 0.3rem;}
	.tab_main{margin-top: 0.2rem;min-height:0.5rem;font-size: 0.24rem;color:#666;border-bottom: 1px dashed #39302D;padding-bottom: 0.25rem;}
	/*.tab_footer p{display: inline-block;margin-top: 0.2rem;color:#666;font-size: 0.24rem;padding-left:0.4rem;height:0.3rem;padding-top: 0.03rem;}*/
    .tab_footer p{display: table;margin-top: 0.2rem;color:#666;font-size: 0.24rem;padding-left:0.4rem;height:0.3rem;padding-top: 0.03rem;}
    .address_ensure{float: left}
	.tab_footer p a{color:#666;}
	.address_ensure{background:url(../../../../static/images/addressensure.png) no-repeat 0 center;background-size: 0.3rem;-webkit-background-size: 0.3rem;-moz-background-size: 0.3rem;-o-background-size: 0.3rem;}
	.address_edit{background:url(../../../../static/images/addresssedit.png) no-repeat 0 center;background-size: 0.35rem;-webkit-background-size: 0.35rem;-moz-background-size: 0.35rem;-o-background-size: 0.35rem;float: left;}
	.address_delete{background:url(../../../../static/images/addressdelete.png) no-repeat 0 center;background-size: 0.35rem;-webkit-background-size: 0.35rem;-moz-background-size: 0.35rem;-o-background-size: 0.35rem;margin-left: 0.3rem;float: left;}
	.add_btn{position: fixed;bottom:0;left:0;right:0;z-index: 10}
    .add_btn a{float:left;width:100%;height:40px;line-height:40px;text-align: center;color:#fff;background:#53ABCD;text-align: center;}

    .pool{position: fixed;top:.9rem;left:0;right:0;bottom:0;background:#000;opacity:0.6;z-index: 200;display:none;}
	.delete_order_box{position: fixed;top:.9rem;left:0;right:0;bottom:0;text-align: center;z-index: 300;font-size: 1rem;display:none;}
	.delete_order{height:1.6rem;position: absolute;top:50%;margin-top: -0.8rem;background:#fff;width:4rem;left:50%;margin-left: -2rem;border-radius: 0.1rem;-webkit-border-radius:  0.1rem;-moz-border-radius:  0.1rem;-o-border-radius:  0.1rem;}
	.delete_warn{height:0.8rem;line-height:0.8rem;font-size: 0.28rem;}
	.delete_order button{width:50%;height:0.8rem;line-height:0.8rem;border:0;float:left;background:#fff;border-top:1px solid #eee;font-size: 0.28rem}
	.cancle{border-right:1px solid #eee !important;border-bottom-left-radius: 0.1rem;-moz-border-bottom-left-radius: 0.1rem;-webkit-border-bottom-left-radius: 0.1rem;-o-border-bottom-left-radius: 0.1rem;}
	.ensure{border-bottom-right-radius: 0.1rem;-moz-border-bottom-right-radius: 0.1rem;-webkit-border-bottom-right-radius: 0.1rem;-o-border-bottom-right-radius: 0.1rem;}
</style>