<template>
    <!-- 底部导航 -->
	<div class="nav_btm">
        <ul>
            <!-- 首页 -->
            <router-link to="/" v-show="statusSet[0] == '0'"><li><img src="static/images/iconyy_03.png" alt="安徽继续教育网"/></li></router-link>
            <li v-show="statusSet[0] == '1'"><img src="static/images/iconyy_18.png" alt="安徽继续教育网"/></li>

            <!-- 选课 -->
            <router-link to="/chooseClass" v-show="statusSet[1] == '0'"><li><img src="static/images/iconyy_05.png" alt="安徽继续教育网"/></li></router-link>
            <li v-show="statusSet[1] == '1'"><img src="static/images/iconyy_19.png" alt="安徽继续教育网"/></li>

            <!-- 购物车 -->
            <router-link to="shoppingCart" v-show="statusSet[2] == '0'"><li><img src="static/images/iconyy_09.png" alt="安徽继续教育网"/></li></router-link>
            <li v-show="statusSet[2] == '1'"><img src="static/images/iconyy_21.png" alt="安徽继续教育网"/></li>

            <!-- 学习 -->
            <router-link to="/myClass" v-show="statusSet[3] == '0'"><li><img src="static/images/iconyy_07.png" alt="安徽继续教育网"/></li></router-link>
            <li v-show="statusSet[3] == '1'"><img src="static/images/iconyy_20.png" alt="安徽继续教育网"/></li>

            <!-- 我的 -->
            <router-link to="/memberCenter" v-show="statusSet[4] == '0'"><li><img src="static/images/iconyy_11.png" alt="安徽继续教育网"/></li></router-link>
            <li v-show="statusSet[4] == '1'"><img src="static/images/iconyy_23.png" alt="安徽继续教育网"/></li>
        </ul>
    </div>
</template>
<script>
    export default{
        computed:{
            statusSet(){
                return this.$store.state.navOnBottomStatus;
            }
        }
    }
</script>
<style scoped>
	.nav_btm{position: fixed;bottom:0;width:100%;height:50px;background:#fff;border-top:1px solid #D4D2D3;}
    .nav_btm ul li{float: left;width:20%;text-align: center;overflow: hidden}
    .nav_btm ul li img{width:60px;}
</style>

