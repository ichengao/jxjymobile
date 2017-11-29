 <template>
	<div v-title data-title="我的培训班">
		<!-- 头部 -->
		<heade :titlehead="headTitle"></heade>

		<!-- 主体 -->
        <div class="main">
            <p class="cou_warn" v-show="haveData">*要求考试的学时必须通过考试才能计入完成学时</p>
            <div class="haveData"  v-show="!haveData">暂无数据！</div>
            <div class="cou_box" v-show="haveData" v-for="msg in dataMsg.list">
                <table width="100%">
                    <tr><td colspan="3"><h4 style='font-size: 0.32rem;'>{{msg.className}}({{msg.cityName}})</h4></td></tr>
                    <tr>
                        <td width="30%" class="cou_img"><img :src="msg.classImage" alt="安徽继续教育网" width="100%"></td>
                        <td class="cou_detail">
                            <!-- <h4>2017年阜阳工程造价转岗培训班（阜阳）</h4> -->
                            
                            <div class="left cou_detail_left">
                                <p class="change_new">{{msg.codeParentName}}({{msg.codeName}})</p>
                                <p>年度：{{msg.year}}年</p>
                                <p>要求学时：{{msg.classCredithour}}学时</p>
                                <p>完成学时：{{msg.hasCredit}}学时</p>
                                <p v-if="msg.classCredithour <= msg.hasCredit">是否通过：已通过</p>
                                <p v-if="msg.classCredithour > msg.hasCredit">是否通过：未通过</p>
                            </div>
                            <div class="right study_box">
                                <router-link :to="{path:'/myCourse',query:{'classId':msg.classId}}"><span class="btn_study left">学<b style="color:#fff">学课</b>课</span></router-link><br>
                                <router-link to="/examEntry"><span class="btn_study left">考试查询</span></router-link>
                                <br>
                                <router-link :to="{path:'/xsLook',query:{'id':msg.classId}}"><span class="btn_study left">学时证明</span></router-link>
                            </div>
                        </td>
                    </tr>
                </table>
            </div>

            
        </div>

        <!-- 底部导航 -->
        <navBottom></navBottom>
	</div>
</template>
<script>
	import heade from '@/components/common/header'
    import navBottom from "@/components/common/navBottom"
    import axios from 'axios'
    import config from "@/api/base.js";
	export default{
		data(){
			return{
				headTitle:"我的培训班",
                haveData:true,              //是否有数据
                dataMsg:{}      
			} 
		},
		components:{
			heade,
            navBottom
		},
        created(){
            this.getData();
            this.setHeaderBackBtn();
            this.setNavBottom();
        },
        methods:{
            // 设置底部导航按钮状态
            setNavBottom(){
                this.$store.commit('setNavOnBottomStatus',['0','0','0','1','0']);
            },
            // 设置是否显示头部返回按钮
            setHeaderBackBtn(){
                this.$store.commit('showHeaderBack',false);
            },
            getData(){
                var _this=this;
                axios.post('/user/toMyClass.do',{},config)
                .then(function(res){
                    var ret=res.data.result;
                    switch(ret){
                        case "0" :
                            _this.haveData=false;
                            break;
                        case "1" :
                            _this.haveData=true;
                            _this.dataMsg=res.data;
                            break;
                    }
                });
            }
        }
	}
</script>
<style scoped>
	.main{padding:10px 5px 80px 5px;margin:.9rem auto 0 auto;}
    
    .cou_box{width: 100%;border-radius:5px;-moz-border-radius:5px;-o-border-radius:5px;-webkit-border-radius:5px;border: 1px solid #EAEAEA;padding:3px;margin-top:5px;border-bottom: 2px solid #51B6DA;background:#fff;}
    .cou_box .cou_detail{padding-left: 3px;}
    .cou_box .cou_detail h4{font-size: 0.28rem}
    .cou_detail_left{width:65%;}
    .cou_box .cou_detail>div p{font-size: 0.26rem;color:#868787;margin-top:1px;}
    .change_new{font-size: 0.26rem;color:#868787;margin-top:1px;}
    p.cou_warn{color:#C67171;font-size: 0.28rem}
    .cou_img img{vertical-align: middle;}
    .btn_study{padding:4px 5px;margin-top:3px;border:1px solid #C3C3C3;border-radius:3px;-moz-border-radius:3px;-o-border-radius:3px;-webkit-border-radius:3px;color:#797A7A;}
    .haveData{text-align: center;margin-top:20px;}
</style>