export default{
	baseURL:'http://192.168.1.222:7001',       //香
	// baseURL:'http://192.168.1.88:8888',
	// baseURL:'http://192.168.1.199:7001/ahsjxjy_api',    //张乔
	// baseURL:'http://m.ahsjxjy.com',         //Apache代理
	// baseURL:'http://m.ahsjxjy.com/api',      //正式
	// baseURL:'http://weixin.ahsjxjy.com/api',         //微信支付测试
	method:'POST',
	headers: {'Content-Type':'application/x-www-form-urlencoded'},
	transformRequest: [
	    function(data) {
	      	let ret = ''
	      	for (let it in data) {
	        	ret += encodeURIComponent(it) +
	          	'=' +
	          	encodeURIComponent(data[it]) +
	          	'&'
	      	}
	      	return ret
	    }
	],
	timeout: 15000
}



