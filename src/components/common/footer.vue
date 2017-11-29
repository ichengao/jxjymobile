<template>
	<div class="footer3" ref="footer3">
        <img src="static/images/ewm_03.png" alt="安徽继续教育网" width="247px"/>
        <p>Copyright 2012-2017安徽继续教育网  手机版</p>
        <p>All Right Reserved 皖ICP备12002013号</p>
    </div>
</template>
<style scoped>
	.footer3{text-align: center;padding-top:17px;padding-bottom:10px;background:#fff;}
    .footer3 p{font-size:0.16rem;margin-top:7px;}

	.fixed-bottom{position: fixed;bottom: 0;width:100%;}
</style>
<script>
	export default{
		mounted(){
		    var winHeight = window.innerHeight; //可视窗口高度，不包括浏览器顶部工具栏
		    var a=$(this.$refs.footer3).height();
		    var heig=winHeight-a-50;
		    $(".main").css("minHeight",heig);
		    $("body").css("scrollTop",'0')
		}
	}
</script>