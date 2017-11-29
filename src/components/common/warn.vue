<!-- 接口异常提醒 -->
<template>
	<div id="warn_alert">
		<div class="pool"></div>
		<div class="warn_box">
			<div class="warn">服务异常，请稍后再试</div>
		</div>
	</div>
</template>
<style scoped>
	.pool{position: fixed;top:0;left:0;right:0;bottom:0;background:#fff;opacity:0;z-index: 10000;}
	.warn_box{position: fixed;width:3.5rem;height:0.7rem;line-height:0.7rem;top:50%;left:50%;margin-top: -0.35rem;margin-left: -1.75rem;background:#000;opacity:0.7;border-radius: 5px;-webkit-border-radius: 5px;-moz-border-radius: 5px;-o-border-radius: 5px;}
	.warn{color:#fff;text-align: center;}
	#warn_alert{display:none;}
</style>