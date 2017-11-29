<template>
	<div id="loading">
		<div class="loading_pool"></div>
		<div class="loading_box">
			<div class="loading">
				<img src="/static/images/loading.png" alt="安徽继续教育网">
				<p class="loading_text">加载中...</p>
			</div>
		</div>
	</div>
</template>
<style scoped>
	#loading{display:none;}
	.loading_pool{background:#fff;opacity:0;position: fixed;top:0;left:0;right:0;bottom:0;}
	.loading_box{position: fixed;top:0;left:0;right:0;bottom:0;z-index:100000000;}
	.loading{width:2rem;height:2rem;position: absolute;top:50%;left:50%;margin-top:-1rem;margin-left: -1rem;background:rgba(255,255,255,.9);text-align: center;border-radius: 4px;-webkit-border-radius: 4px;-moz-border-radius: 4px;-o-border-radius: 4px;}
	.loading_text{margin-top: 0.3rem;text-align: center;color:#f50;}

	.loading img{width:0.6rem;margin-top: 0.4rem;position: relative;animation: bounce 1.2s linear 0s infinite normal;-webkit-animation: bounce 1.2s linear 0s infinite normal;-moz-animation: bounce 1.2s linear 0s infinite normal;-o-animation: bounce 1.2s linear 0s infinite normal;}
	@keyframes bounce{
	    0%   {top: 0;}
	    25%  {top:0.3rem;}
	    50%  {top:0;}
	    75%  {top:-0.3rem;}
	    100% {top:0;}
	}
	@-webkit-keyframes bounce{
	    0%   {top: 0;}
	    25%  {top:0.3rem;}
	    50%  {top:0;}
	    75%  {top:-0.3rem;}
	    100% {top:0;}
	}
	@-moz-keyframes bounce{
	    0%   {top: 0;}
	    25%  {top:0.3rem;}
	    50%  {top:0;}
	    75%  {top:-0.3rem;}
	    100% {top:0;}
	}
	@-o-keyframes bounce{
	    0%   {top: 0;}
	    25%  {top:0.3rem;}
	    50%  {top:0;}
	    75%  {top:-0.3rem;}
	    100% {top:0;}
	}
</style>