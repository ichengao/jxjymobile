<template>
    <div v-title data-title="我的信息" class="main_box">
        <!-- 头部 -->
        <div class="header">
            <img src="static/images/bj-45.jpg" alt="安徽继续教育网" width="100%" class="bg_img">
            <table width="100%">
                <tr>
                    <td width="25%" style='padding-left:5px;' @click='backPrev'><img src="static/images/retrun-57.png" alt="安徽继续教育网" style="height:.35rem;display:block"></td>
                    <td width="50%" align="center">
                        <p class="title_head">我的信息</p>
                    </td>
                    <td width="25%"></td>
                </tr>
            </table>

            <div class="img_box">
                <div class="left img_u">
                    <img :src="dataMsg.userphoto" alt="安徽继续教育网" style="width:0.86rem;height:1.22rem;border-radius: 3px;-webkit-border-radius: 3px;-moz-border-radius: 3px;-o-border-radius: 3px;" v-show="dataMsg.userphoto!=null"><img src="static/images/grzl_03.png" alt="安徽继续教育网" style="width:0.86rem;height:1.22rem;border-radius: 3px;-webkit-border-radius: 3px;-moz-border-radius: 3px;-o-border-radius: 3px;" v-show="dataMsg.userphoto==null">
                    <input type="file" class="form-control" @change="onFileChange" id="img_control" accept="image/*">
                </div>
                <div class="left u_msg">
                    <p class="u_name"><span class="name">{{dataMsg.realname}}</span><span class="u_level">{{dataMsg.levelName}}</span></p>
                    <p class="u_percent">
                        <img src="static/images/27.png" alt="安徽继续教育网">
                        <span class="u_lev"><span class="u_lev1" :style="'width:'+(filePercent/13*4.93)+'rem'"></span></span>
                    </p>
                    <p class="u_warn">提醒继续教育报名前务必填写完整的个人信息，否则无法登记学时证明</p>
                </div>
            </div>
        </div>

        <!-- 主体 -->
        <div class="main">
            <div class="m_msg">
                <p class="m_level">会员等级 : {{dataMsg.levelName1}}<router-link to="/upLevel"><img src="static/images/0_03.png" alt="安徽继续教育网"><span>升级规则</span></router-link></p>
                <p v-if="dataMsg.levelName1 === '小学生'">累计积分 : {{dataMsg.totalIntegral}}（还需积分{{1000-dataMsg.totalIntegral}}可升级为中学生）</p>
                <p v-if="dataMsg.levelName1 === '中学生'">累计积分 : {{dataMsg.totalIntegral}}（还需积分{{2000-dataMsg.totalIntegral}}可升级为大学生）</p>
                <p v-if="dataMsg.levelName1 === '大学生'">累计积分 : {{dataMsg.totalIntegral}}（还需积分{{3000-dataMsg.totalIntegral}}可升级为学霸）</p>
                <p v-if="dataMsg.levelName1 === '学霸'">累计积分 : {{dataMsg.totalIntegral}}（你已获得最高级别）</p>
                <p class="m_level">当前积分 : {{dataMsg.surplusIntegral}}<router-link to="/wdjf"><span>(明细)</span></router-link></p>
            </div>
            <div class="m_change">
                <!-- 身份信息 -->
                <div class="sfxx m_list">
                    <div class="cx_top hover" @click='typeToggle'>
                        <img src="static/images/0_07.png" alt="安徽继续教育网" class="left dot">
                        <span class="left">身份信息</span>
                        <img src="static/images/icon-01.png" alt="安徽继续教育网" class="right director">
                    </div>
                    <div class="cx_body hover">
                        <ul>
                            <li class="cx_list">
                                <span class="left">用户名</span>
                                <input type="text" class="left" :value='dataMsg.userName' readonly >
                            </li>
                            <li class="cx_list">
                                <span class="left">姓名</span>
                                <input type="text" class="left" :value='dataMsg.realname' readonly >
                            </li>
                            <li class="cx_list">
                                <span class="left">身份证号</span>
                                <input type="text" class="left" :value='dataMsg.cardno' readonly>
                            </li>
                            <li class="cx_list sele gender_box" >
                                <span class="left">性别</span>
                                <input type="text" class="left" readonly ref='gender' v-model='sexMsg'  @click='showGender' placeholder="必填项" >
                            </li>
                        </ul>
                    </div> 
                </div>
                <!-- 联系方式 -->
                <div class="lxfs m_list">
                    <div class="cx_top hover"  @click='typeToggle'>
                        <img src="static/images/0_10.png" alt="安徽继续教育网" class="left dot">
                        <span class="left">联系方式</span>
                        <img src="static/images/icon-01.png" alt="安徽继续教育网" class="right director">
                    </div>
                    <div class="cx_body hover">
                        <ul>
                            <li class="cx_list">
                                <span class="left">手机号码</span>
                                <input type="text" class="left" :value='dataMsg.mobile' readonly>
                            </li>
                            <router-link :to="{path:'/memberDataSingle',query:{'single':dataMsg.phone,'typeMsg':'联系电话','type':'phone'}}">
                            <li class="cx_list sele">
                                <span class="left">联系电话</span>
                                <input type="text" class="left" :value='dataMsg.phone' v-on:blur="phone" @click="save()" placeholder="请输入联系电话" ref="phone">
                            </li>
                            </router-link>
                            <router-link :to="{path:'/memberDataSingle',query:{'single':dataMsg.email,'typeMsg':'电子邮箱','type':'email'}}">
                            <li class="cx_list sele">
                                <span class="left">电子邮箱</span>
                                <input type="text" class="left" :value='dataMsg.email' v-on:blur="email"  @click="save()"  placeholder="请输入电子邮箱" ref="email">
                            </li>
                            </router-link>
                            <router-link :to="{path:'/memberDataSingle',query:{'single':dataMsg.address,'typeMsg':'地址','type':'address'}}">
                            <li class="cx_list sele">
                                <span class="left">地址</span>
                                <input type="text" class="left" :value='dataMsg.address' @click="save()"  placeholder="请输入地址" ref="address">
                            </li>
                            </router-link>
                        </ul>
                    </div>
                </div>
                <!-- 工作单位 -->
                <div class="gzdw m_list">
                    <div class="cx_top hover" @click='typeToggle'>
                        <img src="static/images/0_12.png" alt="安徽继续教育网" class="left dot">
                        <span class="left">工作单位</span>
                        <img src="static/images/icon-01.png" alt="安徽继续教育网" class="right director">
                    </div>
                    <div class="cx_body hover">
                        <ul>
                            <router-link :to="{path:'/memberDataSingle',query:{'single':dataMsg.organization,'typeMsg':'单位名称','type':'organization'}}">
                            <li class="cx_list sele">
                                <span class="left">单位名称</span>
                                <input type="text" class="left" :value='dataMsg.organization' @click="save()"  placeholder="必填项" ref="organization">
                            </li>
                            </router-link>
                            <router-link :to="{path:'/memberDataSingle',query:{'single':dataMsg.provinceCity,'typeMsg':'所在地区','type':'area'}}">
                            <li class="cx_list sele">
                                <span class="left">所在地区</span>
                                <input type="text" class="left" :value='dataMsg.provinceCity' @click="save()"  placeholder="必填项" ref="area">
                            </li>
                            </router-link>
                            <router-link :to="{path:'/memberDataSingle',query:{'single':dataMsg.infoAddress,'typeMsg':'单位地址','type':'infoAddress'}}">
                            <li class="cx_list sele">
                                <span class="left">单位地址</span>
                                <input type="text" class="left" :value='dataMsg.infoAddress' @click="save()"  placeholder="必填项" ref="infoAddress">
                            </li>
                            </router-link>
                        </ul>
                    </div>
                </div>
                <!-- 专业水平 -->
                <div class="zysp m_list">
                    <div class="cx_top hover" @click='typeToggle'>
                        <img src="static/images/0_14.png" alt="安徽继续教育网" class="left dot">
                        <span class="left">专业水平</span>
                        <img src="static/images/icon-01.png" alt="安徽继续教育网" class="right director">
                    </div>
                    <div class="cx_body hover">
                        <ul>
                            <router-link :to="{mothod:'save',path:'/memberDataSingle',query:{'single':dataMsg.major,'typeMsg':'职称','type':'major'}}">
                            <li class="cx_list sele">
                                <span class="left">职称</span>
                                <input type="text" class="left" :value='dataMsg.major' @click="save()" placeholder="必填项" ref="Major">
                            </li>
                            </router-link>
                            <li class="cx_list sele">
                                <span class="left">学历</span>
                                <input type="text" class="level" v-model='eduMsg' readonly ref='education' @click='showEducation' placeholder="请选择学历">
                            </li>
                        </ul>
                    </div>
                </div>
            </div>

            <foot></foot>
        </div>
        <div class="pool" v-show="isSelectBox"></div>
        <div class="select_box" v-show="isSelectBox">
            <div class="select_box1">
                <!-- 性别选择 -->
                <ul v-show="isSelectGender">
                    <li @click='selectGender' name='01'>男</li>
                    <li @click='selectGender' name='02'>女</li>
                </ul>
                <!-- 学历选择 -->
                <ul v-show="isSelectEducation">
                    <li @click='selectEducation' name='01'>大专以下</li>
                    <li @click='selectEducation' name='02'>大专</li>
                    <li @click='selectEducation' name='03'>本科</li>
                    <li @click='selectEducation' name='04'>硕士</li>
                    <li @click='selectEducation' name='05'>博士</li>
                    <li @click='selectEducation' name='09'>其他</li>
                </ul>
            </div>
            <!-- 取消按钮 -->
            <div class="cancel_btn" @click='closeGender'>取消</div>
        </div>
        
    </div>
</template>
<script>
    import heade from '@/components/common/header'
    import foot from '@/components/common/footer'
    import {MessageBox} from 'mint-ui';
    import axios from "axios"
    import config from "@/api/base.js";
    export default {
        data() {
            return {
                dataMsg:[],               //页面信息显示
                headTitle:'我的信息',     //头部信息
                msg:false,                //地址选择组件显示隐藏
                major:false,              //职位选择组件显示隐藏
                areaMsg:'',               //选择的区域信息
                isSelectGender:false,     //是否显示性别选择框
                isSelectEducation:false,  //是否显示学历选择框
                isSelectBox:false,        //是否显示选择框
                majorMsg:"",
                eduMsg:"",
                sexMsg:"",
                edu:"",
                sex:"",
                photova:false,
                imageName:"",               //图片名称
                filePercent:0,              //资料完整度
            };
        },
        components:{
            heade,
            foot
        },
        created(){
            this.setHeaderBackBtn();
            this.getData();
        },
        methods: {
            getFileUrl(obj){
                var url;
                return url = window.URL.createObjectURL(obj.files.item(0));
            },
            onFileChange(e) {
                var files = e.target.files || e.dataTransfer.files;
                this.dataMsg.userphoto=this.getFileUrl(e.srcElement);
                if (!files.length)
                    return;
                this.createImage(files[0]);
            },
            createImage(file) {
                var image = new Image();
                var reader = new FileReader();
                var vm = this;
                if(!/\.(gif|jpg|jpeg|png|GIF|JPG|PNG)$/.test(file.name)){
                    this.photova=false;
                    this.openAlert("请选择正确的图片格式上传！");
                    return;
                };
                this.photova=true;
                this.imageName=file.name;
                reader.onload = (e) => {
                    vm.image = e.target.result;
                    this.image=e.target.result;
                    this.save();
                };
                reader.readAsDataURL(file);
                return;
            },
            save(e,f){
                var _this=this;
                var sex=_this.sex,
                imageName=_this.imageName,
                degree=_this.edu;
                if(e=="edu"){
                   degree=f;
                }
                if(e=="sex"){
                   sex=f;
                };
                var image=_this.image;
                if(!_this.photova){
                    image="";
                };
                var params={"sex":sex,"degree":degree,"image":image,"imageName":imageName};
                axios.post('/user/doUpdatePerson.do',params,config)
                .then(function(res){
                    var ret=res.data.result;
                    switch(ret){
                        case "1":
                            // 保存成功，跳到jsdz
                            //_this.$router.push('/memberCenter');
                            break;
                    };
                    return res.data.result;
                });
            },
            phone(){
                var phone = this.$refs.phone.value;
                var filter=/^\d*$/;
                if(phone!=""&&!filter.test(phone)){
                this.openAlert("联系电话格式不正确");
                this.$refs.phone.value="";
                return;
                }
            },
            email(){
                var emaill = this.$refs.email.value;
                var filter=/\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
                if(emaill!=""&&!filter.test(emaill)){
                this.openAlert("电子邮箱格式不正确");
                this.$refs.email.value="";
                return;
                }
            },
            getData(){
                // 页面数据
                var _this=this;
                _this.$store.state.addrNum="";
                var params={};
                axios.post('/user/toPersonalData.do',params,config)
                .then(function(res){
                    _this.dataMsg=res.data;
                    _this.areaMsg=_this.dataMsg.provinceCity;
                    _this.majorMsg=_this.dataMsg.major;
                    _this.sexMsg=_this.dataMsg.sex;
                    _this.eduMsg=_this.dataMsg.degree;

                    _this.filePercent=_this.dataMsg.fillInNum;
                    // $(".u_lev").width(_this.dataMsg.fillInNum/13*396);
                    if(_this.dataMsg.requiredFlag=="02"&&_this.dataMsg.userphoto!=''){
                        $(".u_lev1").css('background','#04BE44');
                    }
                });
            },
            // 大类切换
            typeToggle(e){
                var a=e.currentTarget;
                var b=($(a).hasClass('hover'))==true?true:false;
                if(b){
                    $(a).removeClass('hover').next().removeClass('hover');
                }else{
                    $(a).addClass('hover').next().addClass('hover');
                }
            },
            // 设置是否显示头部返回按钮
            setHeaderBackBtn(){
                this.$store.commit('showHeaderBack',true);
            },
            // 显示选择的地区信息
            showAreaView:function(data){
                // 如果后两项相同则后一项不显示
                this.areaMsg=(data.city == data.district)?data.provice+' '+data.city:data.provice+' '+data.city+' '+data.district;
            },
            // 关闭地区选择弹框
            areaClose:function(data){
                this.msg=data;
            },
            // 地区选择显示隐藏
            areaShow:function(){
                this.msg=true;
            },
            // 显示性别选择
            showGender(){
                this.isSelectGender=true;
                this.isSelectBox=true;
            },
            // 关闭选择项
            closeGender(){
                this.isSelectGender=false;
                this.isSelectBox=false;
                this.isSelectEducation=false;
            },
            // 显示学历选择
            showEducation(){
                this.isSelectEducation=true;
                this.isSelectBox=true;
            },
            // 选择性别
            selectGender(e){
                var a=e.target || e.srcELement;
                var sex = $(a).attr('name');
                if(sex=='01'){
                    this.sexMsg="男";
                } else{
                    this.sexMsg="女";
                }
                this.$refs.gender.value=$(a).html();
                this.closeGender();
                this.sex=sex;
                this.save("sex",$(a).attr('name'));
            },
            // 选择学历
            selectEducation(e){
                var a=e.target || e.srcELement;
                var edu = $(a).attr('name');
                if(edu=='01'){
                    this.eduMsg="大专以下"
                } else if(edu=='02'){
                    this.eduMsg="大专";
                } else if(edu=='03'){
                    this.eduMsg="本科";
                } else if(edu=='04'){
                    this.eduMsg="硕士";
                } else if(edu=='05'){
                    this.eduMsg="博士";
                } else if(edu=='09'){
                   this.eduMsg="其它";
                }
                this.$refs.education.value=$(a).html();
                this.closeGender();
                this.edu=edu;
                this.save("edu",$(a).attr('name'));
            },
            openMajor(){
                this.$refs.majorBox.openMajor();
            },
            //返回按钮
            backPrev(){
                this.save();
                this.$router.push('/memberCenter');
            },
            // 弹框提示
            openAlert(a) {
                MessageBox.alert(a,'提示');
            },
        },
    };
</script>
<style scoped>
    .main_box{background:#fff;}
    #img_control{position: absolute;width:0.86rem;height:1.22rem;top:0;left:0;opacity:0;}
    .img_u{position: relative;}
    /*弹框*/
    .pool{position: fixed;top:.9rem;left:0;right:0;bottom:0;background:#000;opacity:.7;z-index:200;}
    .select_box{position: fixed;top:0;left:0;right:0;bottom:0;z-index:300;font-size: 0.36rem}
    .select_box1{position: absolute;bottom:70px;left:10px;right:10px;border-radius:10px;background:#fff;}
    .cancel_btn{position: absolute;bottom:10px;left:10px;right:10px;border-radius:10px;background:#fff;height:0.8rem;text-align: center;line-height:0.8rem;}
    .select_box1 ul{width:100%;}
    .select_box1 ul li{height:0.8rem;line-height:0.8rem;border-bottom:1px solid #D4D2D3;text-align: center;}
    .select_box1 ul li:last-child{border-bottom: 0}

    .header{width:100%;position: fixed;top:0;overflow: hidden;z-index: 100;height:2.6rem;}
    .header table{border-collapse: collapse;}
    .header .back{position: absolute;top:18px;left:3%;}
    .header .title_head{line-height:.9rem;color:#fff;font-size: 0.36rem;}
    .bg_img{position: absolute;top:0;left:0;z-index: -1;height: 3rem;}
    .back{position: absolute;left:3%;top:7%;}
    .back img{width:11px;}
    .save_msg{padding-right:10px;color:#fff;font-size: 0.85rem}
    .title{margin-top:3%;text-align: center;color:#fff;font-size: 1.1em}
    .img_box{margin-left:3%;margin-top: 0.15rem;}
    .img_box .u_msg{margin-left: 0.15rem;}
    .img_box .u_msg .u_name{margin-top: 1px;}
    .name{font-size: 0.3rem}
    .u_level{background:#F0C41D;color:#fff;margin-left:5px;border-radius: 3px;padding:0 2px;-webkit-border-radius: 3px;-moz-border-radius: 3px;-o-border-radius: 3px;}
    .u_percent{margin-top:5px;position: relative;width:5rem;height:0.25rem;}
    .u_percent img{width:5rem;height:0.25rem;position: absolute;left:0;top:0;}
    .u_percent .u_lev{-webkit-border-radius: 6px;-moz-border-radius: 6px;-o-border-radius: 6px;border-radius: 6px;width:4.93rem;height:0.25rem;float:left;margin-top:0.5px;margin-left:1px;}
    .u_percent .u_lev .u_lev1{-webkit-border-radius: 0.1rem;-moz-border-radius: 0.1rem;-o-border-radius: 0.1rem;border-radius: 0.1rem;margin-top:0.01rem;margin-left:0.01rem;background:#F4BE44;float:left;height:0.2rem;}
    .u_warn{width:5rem;font-size: 0.26rem;margin-top:2px;margin-bottom: 10px;}

    .m_msg{width:94%;margin:0 auto;padding:10px 0;border-bottom: 1px solid #EFEFEF;}
    .m_msg p{margin-bottom:2px;}
    .m_msg .m_level img{width:10px;margin-left:5px;}
    .m_msg .m_level span{color:#BD5B5A;margin-left:3px;}
    .m_get a{color:#BD5B5A;}

    .main{margin-top:2.6rem;}
    .cx_top{height: 0.61rem;background:#F1F1F1;padding:0 4%;line-height: 0.61rem;margin-top:10px;}
    .cx_top img.director{margin-top:15px;width:10px;}
    .cx_top .dot{width:0.16rem;margin-top:0.24rem;margin-right:0.1rem;}
    .cx_body{padding-top:5px;}
    .cx_body ul .cx_list{margin:0 4%;border-bottom:1px solid #F0F0F1;overflow: hidden;padding:0 0 0 13px;height:0.56rem;line-height:0.56rem;}
    .cx_body ul .cx_list>span{width:28%;}
    .cx_body ul .sele{background:url(../../../../static/images/dianjiann.png) no-repeat 99% 8px;background-size: 2.5%}
    .cx_body ul .cx_list ul{margin-right: 20px;}
    .cx_body ul .cx_list .se_top img{margin-top:8px;width:12px;}
    .cx_body ul .cx_list input{width:72%;border:0;text-align: right;color:#B7B7B7;height:0.54rem;}
    .m_change>div .cx_body{display: none}
    .m_change>div .cx_body.hover{display:block;}
    .m_change>div .cx_top.hover .director{transform: rotate(180deg);transition: all 0.3s;-webkit-transition: all 0.3s;-o-transition: all 0.3s;}
    .m_change>div .cx_top .director{transform: rotate(0deg);transition: all 0.3s;-webkit-transition: all 0.3s;-o-transition: all 0.3s;}
</style>