<template>
	<div v-title data-title="祝您在安徽继续教育网学习愉快！" style="position:relative">
		<!-- 头部 -->
		<div class="header">
	        <div class="back" @click="backPrev">
	            <img src="static/images/fff.png" alt="安徽继续教育网" style="height:.35rem;display:black">
	        </div>
	        <p>祝您在安徽继续教育网学习愉快！</p>
	    </div>

		<!-- 播放器 -->
		<div class="videoBox">
			<videoPlayer :options="playerOptions" ref="player" @play="onPlayerPlay($event)"  @pause="onPlayerPause($event)"></videoPlayer>
		</div>

		<!-- 当前播放视频信息 -->
		<div class="current_play_msg">
			<div>
				<p class="course_name" style="color:#000;font-size:0.36rem">{{dataMsg.cwName}}</p>
				<!-- <p class="chapter_name">章节学时：8</p>
				<p class="chapter_name">章节状态：请问</p> -->
				<p class="chapter_name">所属课程：{{dataMsg.cName}}</p>
			</div>
		</div>

		<!-- 温馨提示 -->
		<div class="play_warn">
			<p class="play_warn_title">温馨提示：</p>
			<p>1、学习前务必填写完整的个人信息，否则无法登记学时证明</p>
			<p>2、如果视频无法播放，请使用电脑端360极速浏览器，选择极速模式</p>
			<!-- <p>3、为保证教学质量，启用失焦停播功能，学习过程中鼠标不要离开播放画面或切换到其他窗口，否则系统自动停止播放</p> -->
			<p>3、需要考试的课程必须通过考试才能取得学时</p>
			<p>4、课程通过后可自主打印学时证明</p>
			<!-- <p>6、请您对学习课程评价，我们将参考您的意见持续改进教学质量，您的支持是我们最大的动力</p> -->
			<!-- <p>7、如您需要发票请到缴费订单模块中领取，支持发票代领</p> -->
		</div>

		<!-- 弹框 -->
		<div class="msgBox" v-show="playAll"></div>
		<div class="msgBox1" v-show="playAll">
			<div class="alertBox">
				<div class="alert_header">
					<div class="alert_title">提示</div>
				</div>
				<div class="alert_content">
					<div class="alert_msg">视频已播放完！</div>
				</div>
				<div class="alert_btns">
					<button class="alert_btn alert_again" @click='playAgain'>重看</button>
					<button class="alert_btn alert_return" @click='backPrev'>返回</button>
				</div>
			</div>
		</div>

		<!-- 安卓警告弹框 -->
		<div class="warn_alert_anriod"><!-- 为获得最佳观看效果，请用浏览器观看视频！ -->
			微信不支持从上次观看位置继续学习，请手工拖动到上次的学习时间继续观看
		</div>
	</div>
</template>
<script>
	import { videoPlayer } from 'vue-video-player'
	import { MessageBox } from 'mint-ui';
	import axios from 'axios'
    import config from "@/api/base.js";

	export default{
		data(){
			return {
				headTitle:"祝您在安徽继续教育网学习愉快！",
				playAll:false,                         //是否显示弹框
				playerOptions:{
					start:0,                           //视频开始时间
					controls:true,                     //是否显示进度条
					playsinline:true,    
					webkitPlaysinline:true,            //ios 10中设置可以让视频在小窗内播放
					x5VideoPlayerType:"h5",            //启用H5播放器,是wechat安卓版特性
					autoplay:true,                     //自动播放
					muted:false,                       //设置默认播放音频：true/false
					language:'zh-CN',
					fluid: true,                       //是否自适应布局
					notSupportedMessage: false,        //video.js无法播放媒体源是否提示
					sources:[{                         //资源列表
						type:'video/mp4',
						src:''
					}]
					// ,
					// poster:"/static/images/rx.png"
				},
				timer1:null,                           //定时器
				timer2:null,
				timer3:null,
				progressStart:0,
				progressEnd:0,
				progressMost:0,                        //视频最大播放进度
				isFirst:true,                          //是否是刚开始播放
				dataMsg:[],                            //视频播放信息
				lessonStatus:'',                       //视频播放状态  not attempted无、incomplete未学完、completed已学完
				nowPlay:0,                             //当前视频播放时间
				timeBack:120000                        //回调播放进度的时间间隔 
			}
		},
		components:{
			videoPlayer
		},
		created(){
			this.getData();
			this.playOnAndroidWeChat();
		},
		mounted(){
			this.voiceSet();
			this.timeReturn();
			this.setProgress();
		},
		methods:{
			// 获取数据
			getData(){
				var _this=this;
				// 课程id  课件id
				var params={"courseId":_this.$route.query.courseId,'coursewareId':_this.$route.query.coursewareId,'chapterId':''};
				axios.post('/user/toStudy.do',params,config)
				.then(function(res){
					_this.dataMsg=res.data;
					// 设置播放链接  和视频播放状态
					_this.playerOptions.sources[0].src=_this.dataMsg.launch+'.mp4';
					// 若视频已播放完，重新开始播放，否则从上次断点处开始播放
					_this.playerOptions.start=( _this.dataMsg.lessonStatus == 'completed') ? 0 : _this.dataMsg.chapterhours;
					// 视频播放状态
					_this.lessonStatus=_this.dataMsg.lessonStatus;
					// 最大播放进度,如果视频状态为完成就设置为最大，未完成就设置为播放节点时间
					_this.progressMost=( _this.dataMsg.lessonStatus == 'completed') ? _this.dataMsg.mediaduration : _this.dataMsg.chapterhours;

					_this.judgeFirst();
				});
			},
			// 音量设置
			voiceSet(){
				this.$refs.player.player.volume(0.5);
			},
			// 判断是不是第一次进入页面
			judgeFirst(){
				this.progressEnd = (this.isFirst == true) ? this.playerOptions.start : 0;
				this.isFirst=false;	
			},
			// 获取播放时间
			goNextTime(){
				var _this=this;
				_this.timer1=setTimeout(function(){
					_this.progressEnd=_this.$refs.player.player.currentTime();
				},1000);
			},
			// 每隔1s检测播放进度
			setProgress(){
				var _this=this;
				_this.timer2=setInterval(function(){
					_this.progressStart = _this.$refs.player.player.currentTime();
					// 存储最大播放时间，如果大于就更新，否则不变
					_this.progressMost = (_this.progressEnd > _this.progressMost) ? _this.progressEnd : _this.progressMost;
					// 如果播放时间间隔大于1s，那么返回原播放时间   但是播放过地方可以快进快退
					if((parseInt(_this.progressStart - _this.progressEnd) > 1) && ( parseInt(_this.progressStart) > parseInt(_this.progressMost+1) ) ){
						_this.$refs.player.player.currentTime(_this.progressEnd);
					};
					// 视频是否播放完，如果播放完显示弹框
					_this.playAll = ( Math.ceil(_this.progressStart+1) >= parseInt(_this.dataMsg.mediaduration) ) ? true : false;

					_this.goNextTime();
				},1000);
			},
			// 播放
			onPlayerPlay(player) {
				this.setProgress();
				this.timeReturn();
	      	},
	      	// 暂停
	      	onPlayerPause(player){
	      		// 清除定时器，并且清除由于视频重新开始带来的2s误差
	      		clearTimeout(this.timer1);
	      		clearInterval(this.timer2);
	      		clearInterval(this.timer3);
	      		this.timer1=this.timer2=this.timer3=null;
	      		this.progressEnd+=2;
	      	},
	      	// 视频进度返回
	      	returnMsg(){
	      		var _this=this;
	      		var position=_this.nowPlay,                              //当前视频播放时长
	      		duration=_this.dataMsg.mediaduration,                    //章节总时长
	      		courseId=_this.dataMsg.courseId,                         //课程id
	      		coursewareId=_this.dataMsg.coursewareId,                 //课件id
	      		chapterId=_this.dataMsg.chapterId,                       //章节id
	      		trackMode=_this.dataMsg.trackMode,                       //视频跟踪类型（01按时间点跟踪、02按知识点跟踪）
	      		lessonStatus=_this.lessonStatus,                         //学习状态  
	      		lessonLocation=_this.dataMsg.lessonLocation,             //当前章节时长
	      		suspendData=_this.dataMsg.suspendData, 
	      		flag='0';                                                //是否为老学员，默认0
	      		var params={'position':position,'duration':duration,'courseId':courseId,'coursewareId':coursewareId,'chapterId':chapterId,'trackMode':trackMode,'lessonStatus':lessonStatus,'lessonLocation':lessonLocation,'suspendData':suspendData,'flag':flag};
	      		axios.post('/user/updateDBTrack.do',params,config).then(function(res){
	      			if(res.data.result == false)console.log(res.data);
	      		});
	      	},
	      	// 周期返回播放进度
	      	timeReturn(){
	      		var _this=this;
	      		_this.timer3=setInterval(function(){
	      			// 改变视频状态 如果是未观看状态修改为未完成
	      			if( _this.lessonStatus == 'not attempted')_this.lessonStatus='incomplete';

	      			_this.nowPlay=_this.$refs.player.player.currentTime();
	      			if(_this.dataMsg.mediaduration - _this.nowPlay <= 119)_this.lessonStatus='completed';

	      			_this.returnMsg();
	      		},_this.timeBack);
	      	},
	      	// 返回上一级
	      	backPrev(){
	      		// 清除定时器
	      		clearTimeout(this.timer1);
	      		clearInterval(this.timer2);
	      		clearInterval(this.timer3);
	      		this.timer1=this.timer2=this.timer3=null;
	      		this.$router.back();

	      		var _this=this;
	      		// 改变视频状态 如果是未观看状态修改为未完成
      			if( _this.lessonStatus == 'not attempted')_this.lessonStatus='incomplete';
      			// 返回上一级的时候返回播放进度
      			_this.nowPlay=_this.$refs.player.player.currentTime();
      			if(_this.dataMsg.mediaduration - _this.nowPlay <= 119)_this.lessonStatus='complete';

      			_this.returnMsg();
	      	},
	      	// 视频播放完成重新播放
	      	playAgain(){
	      		this.$refs.player.player.currentTime(0);
	      		this.playAll=false;
	      	},
	      	// 弹框提示
			openAlert(a) {                           
        		MessageBox.alert(a, '提示');
      		},
      		// 安卓微信端弹框提醒
      		playOnAndroidWeChat(){
      			if(this.isWeiXin() && this.isAndroid()){
      				var timerAlert=setTimeout(function(){
      					$(".warn_alert_anriod").fadeOut();
      				},10000);
      			}
      		},
      		// 判断是否是微信
      		isWeiXin(){ 
				var ua = window.navigator.userAgent.toLowerCase(); 
				if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
					return true; 
				}else{ 
					return false; 
				} 
			},
			// 判断是否是安卓系统
			isAndroid(){
				var u = navigator.userAgent;
				var isAndroid1 = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //android终端
				return isAndroid1;
			}

		}
	}
</script>
<style scoped>
	.header{width:100%;height:.9rem;background:url(../../../static/images/bj-25.jpg);position:fixed;top:0;text-align: center;z-index:1000;}
    .header .back{position: absolute;top:50%;margin-top:-0.175rem;left:10px;}
    .header p{line-height:.9rem;color:#fff;font-size: 0.36rem;}	
	.videoBox{margin-top: .9rem;}
	.video-js.vjs-custom-skin{z-index: -1}

	/*弹框*/
	.msgBox{position: fixed;left: 0;top: 0;width: 100%;height: 100%;opacity: .5;background: #000;z-index:999;}
	.msgBox1{z-index: 1000;position:absolute;}
	.alertBox{position: fixed;top: 50%;left: 50%;-webkit-transform: translate3d(-50%,-50%,0); transform: translate3d(-50%,-50%,0);background-color: #fff;width: 85%;border-radius: 3px;font-size: 16px;-webkit-user-select: none;overflow: hidden;-webkit-backface-visibility: hidden;backface-visibility: hidden;-webkit-transition: .2s; transition: .2s;}
	.alert_header{padding: 15px 0 0;}
	.alert_title{text-align: center;padding-left: 0;margin-bottom: 0;font-size: 16px;font-weight: 700;color: #333;}
	.alert_content{padding: 10px 20px 15px;border-bottom: 1px solid #ddd;min-height: 36px;position: relative;}
	.alert_msg{color: #999;margin: 0;text-align: center;line-height: 36px;}
	.alert_btns{display: -webkit-box;display: -ms-flexbox;display: flex;height: 40px;line-height: 40px;}
	.alert_btn{line-height: 35px;display: block;background-color: #fff;-webkit-box-flex: 1;-ms-flex: 1;flex: 1;margin: 0;border: 0;color: #26a2ff;}
	.alert_again{width: 50%;border-right: 1px solid #ddd;}
	.alert_return{width: 50%;}
	.play_warn{margin:0 auto;padding:0 5px;border-top:1px solid #eee;}
	.play_warn p.play_warn_title{font-size: 0.36rem;color:#000;margin-top:10px;}
	.play_warn p{margin-bottom:4px;color:#aaa;font-size: 0.28rem}
	.current_play_msg{margin:10px auto;padding:0 5px;}
	.chapter_name{color:#aaa;margin-top:5px;font-size: 0.28rem}

	/*安卓警告弹框*/
	.warn_alert_anriod{position: fixed;width:5rem;background:rgba(0,0,0,.7);color:#fff;padding:0.1rem;border-radius: 3px;-webkit-border-radius: 3px;-moz-border-radius: 3px;-o-border-radius: 3px;top:60%;left:50%;margin-top:-0.5rem;margin-left: -2.5rem;font-size: 0.34rem}
</style>