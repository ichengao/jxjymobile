<template>
	<div v-title data-title="积分规则">
		<!-- 头部 -->
		<heade :titlehead="headTitle"></heade>

		<div class="main">
            <p>
                1）积分获取方式包括会员注册、资料完善、生日赠送、会员签到、网站评价、消费支付、邀请好友、特定链接分享、网站促销等方式<br/>
                2）不同等级会员享受不同倍率的积分，小学生1倍、中学生1.1倍、大学生1.3倍、学霸1.5倍<br/>
                3）积分使用方式包括缴费时使用积分抵扣和积分兑换礼品<br/>
                4）积分不可转让、转存、折现、提现，只能用于本网站，抵扣时30分折算成1元（不足1元的部分可按比例抵扣），抵扣金额不能大于订单金额<br/>
                5）积分有效期为1个年度（公历年），不能跨年使用，跨年当前积分清零<br/>
                6）积分如计算后出现小数点，将按四舍五入的原则折合成整数<br/>
                7）积分抵扣金额或兑换礼品，使用积分属于对会员的回馈行为而非交易，不提供发票<br/>
                8）具体积分规则见下表<br/>
            </p>
            <div>
                <img src="static/images/jfgz.png" width='100%'>
            </div>
            <p>
                最终解释权归安徽冠成教育科技有限公司所有<br/>
            </p>


        </div>
	</div>
</template>
<script>
	import heade from '@/components/common/header'
	export default{
		data(){
			return{
				headTitle:"积分规则",
			}
		},
		components:{
			heade
		},
		created(){
			this.setHeaderBackBtn();
		},
		methods:{
			// 设置是否显示头部返回按钮
            setHeaderBackBtn(){
                this.$store.commit('showHeaderBack',true);
            },
		}
	}
</script>
<style scoped>
	.main{margin-top:1rem;padding:0 5px;}
</style>