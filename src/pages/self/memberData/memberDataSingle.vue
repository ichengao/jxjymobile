<template>
	<div v-title data-title="我的信息">
		<!-- 头部 -->
		<heade :titlehead="'修改'+headTitle"></heade>

		<div class="main">
			<div class="single_msg">
				<div class="single_msg_box">
					<input type="text" id="single" :value=this.$route.query.single v-on:focus="typeShow" v-model='typeMsg' :placeholder="'请输入'+this.headTitle" ref="sValue">
					<div class="delete_box" @click='clear'></div>
				</div>
			</div>

			<div class="save_btn_box">
				<button class="save_btn" @click='save'>保存</button>
			</div>
			
		</div>
		<major ref="majorBox"></major>

		<addressselect :child-msg="msg" v-on:colseArea="areaClose" v-on:showAreaToParent="showAreaView"></addressselect>
	</div>
</template>
<script>
	import heade from '@/components/common/header';
	import addressselect from '@/components/common/addressSelect';
	import major from '@/components/common/majorSelect';
	import axios from "axios";
	import config from "@/api/base.js";
	import {MessageBox} from 'mint-ui';
	export default{
		data(){
			return{
				headTitle:this.$route.query.typeMsg,
				 msg:false,                //地址选择组件显示隐藏
				 typeMsg:'',
			}
		},
		components:{
		    addressselect,
		    major,
			heade
		},
		computed:{
            getMajor(){
                this.majorMsg=this.$store.state.chooseMajor;
                this.typeMsg=this.majorMsg.split(',')[0];
            }
        },
        watch:{
            getMajor(){
                this.majorMsg=this.$store.state.chooseMajor;
            }
        },
        created(){
            this.setHeaderBackBtn();

        },
        mounted(){
            this.getData();
        },
		methods: {
		    clear(){
		        this.$refs.sValue.value="";
		    },
            save(){
                var _this=this;
                var type=_this.$route.query.type+'',
                    sValue=_this.$refs.sValue.value;
                    if(sValue==''){
                        _this.openAlert(_this.headTitle+'不能为空');
                        return;
                    }
                    if(type=='phone'&&!_this.phone(sValue)){
                        return;
                    }
                    if(type=='email'&&!_this.email(sValue)){
                        return;
                    }
                    if(type=='area'){
                        sValue=_this.$store.state.addrNum;
                    }
                    if(type=='major'){
                        sValue=_this.majorMsg.split(',')[1];
                    }
                var params={'type':type,'sValue':sValue};
                    axios.post('/user/doUpdatePerson.do',params,config)
                    .then(function(res){
                        var ret=res.data.result;
                         switch(ret){
                            case "1":
                                _this.$router.push('/memberData');
                                break;
                        }
                    });
            },
            getData(){
                // 页面数据
                var _this=this;
                _this.typeMsg=_this.$route.query.single;
                var type=_this.$route.query.type+'';
                if(type=='area'||type=='major'){
                    $("#single").attr('readonly','readonly');
                };
            },
            phone(phone){
                var filter=/^\d*$/;
                if(phone!=""&&!filter.test(phone)){
                this.openAlert("联系电话格式不正确");
                this.$refs.sValue.value="";
                return false;
                }
                return true;
            },
            email(emaill){
                //var emaill = this.$refs.email.value;
                var filter=/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                if(emaill!=""&&!filter.test(emaill)){
                this.openAlert("电子邮箱格式不正确");
                this.$refs.email.value="";
                return false;
                }
                return true;
            },

            // 显示选择的地区信息
            showAreaView:function(data){
                // 如果后两项相同则后一项不显示
                this.typeMsg=(data.city == data.district)?data.provice+' '+data.city:data.provice+' '+data.city+' '+data.district;
            },
            // 关闭地区选择弹框
            areaClose:function(data){
                this.msg=data;
            },
            // 地区选择显示隐藏
            typeShow:function(){
                var type=this.$route.query.type;
                if(type=='area'){
                    this.msg=true;
                }
                if(type=='major'){
                    this.$refs.majorBox.openMajor();
                }
            },
            // 设置是否显示头部返回按钮
            setHeaderBackBtn(){
                this.$store.commit('showHeaderBack',true);
            },

            //返回按钮
            backPrev(){
                this.$router.back();
            },
            // 弹框提示
            openAlert(a) {
                MessageBox.alert(a,'提示');
            },
        }
	}
</script>
<style scoped>
	.main{margin-top:.9rem;padding-top: 10px;}
	.single_msg_box{border-top:1px solid #e6e6e6;border-bottom:1px solid #e6e6e6;border-left:0;border-right:0;background:#fff;position: relative;}
    .delete_box{width:20px;height:20px;position:absolute;top:50%;margin-top: -10px;right: 10px;background: url(../../../../static/images/regclose.png) no-repeat 0 0;background-size: 20px;}
	.single_msg input{outline: none;border:0;padding:0.18rem 0 0.18rem 10px;width:90%;}
	.save_btn_box{padding: 0 5px;}
	.save_btn{float:left;width:100%;height:.7rem;line-height:.7rem;text-align: center;color:#fff;background:#53ABCD;border-radius: 5px;-moz-border-radius: 5px;-o-border-radius: 5px;-webkit-border-radius: 5px;font-size: 0.32rem;margin-top: 30px;}
</style>