import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  	mode:'history',
    scrollBehavior (to, from, savedPosition) {
      	if (savedPosition) {
        	return savedPosition
     	} else {
        	return { x: 0, y: 0 }
      	}
    },
  	routes: [
      	{   //首页
        	path:'/',                                          
        	name:'index',
        	component:function(resolve){
          		require(["@/pages/index"],resolve);
        	}
		},
      	{   //轮播图详情
			path:'/carouselFigureDetail',                      
			name:'carouselFigureDetail',
        	component:function(resolve){
          		require(["@/pages/carouselFigure/carouselFigureDetail"],resolve);
        	}
		},
      	{	//注册
			path:'/register',                                   
			name:'register',
			component:function(resolve){
          		require(["@/pages/register"],resolve);
        	}
      	},
      	{	//登录
			path:'/login',                                     
			name:'login',
			component:function(resolve){
          		require(["@/pages/login"],resolve);
        	}
      	},
      	// 个人中心模块
      	{	//个人中心
			path:'/memberCenter',                                 
			name:'grzx',
			component:function(resolve){
          		require(["@/pages/self/grzx"],resolve);
        	}
      	},
      	{	//我的证书
			path:'/wdzs',                                          
			name:'wdzs',
			component:function(resolve){
          		require(["@/pages/self/wdzs/zsList"],resolve);
        	}
      	},
      	{	//我的证书
			path:'/myZsDetail',                                     
			name:'myZsDetail',
			component:function(resolve){
          		require(["@/pages/self/wdzs/zsDetail"],resolve);
        	}
      	},
      	{	//签到
			path:'/checkIn',                                        
			name:'checkIn',
			component:function(resolve){
          		require(["@/pages/self/checkIn/checkIn"],resolve);
        	}
      	},
      	{	//我的积分
			path:'/wdjf',                                       
			name:'wdjf',
			component:function(resolve){
          		require(["@/pages/self/wdjf"],resolve);
        	}
      	},
      	{	//我的账户
			path:'/zhgl',                                       
			name:'zhgl',
			component:function(resolve){
          		require(["@/pages/self/zhgl"],resolve);
        	}
      	},
      	{	 //个人资料
			path:'/memberData',                                  
			name:'memberData',
			component:function(resolve){
          		require(["@/pages/self/memberData/memberData"],resolve);       
       		}
      	},
      	{ 	//个人资料单项
			path:'/memberDataSingle',                            
			name:'memberDataSingle',
			component:function(resolve){
          		require(["@/pages/self/memberData/memberDataSingle"],resolve);       
       		}
      	},
      	//  个人中心-证书查验模块
      	{	//证书查验
			path:'/zscy',                                       
			name:'zscy',
			component:function(resolve){
          		require(["@/pages/zscy/zscy"],resolve);
        	}
      	},
      	{	//证书列表
			path:'/zslb',                                       
			name:'zslb',
			component:function(resolve){
          		require(["@/pages/zscy/zsList"],resolve);       
        	}
      	},
      	{ 	//证书详情
			path:'/zsdetail',                                   
			name:'zsdetail',
			component:function(resolve){
          		require(["@/pages/zscy/zsdetail"],resolve);       
        	}
      	},
      	{	//证书图文预览
			path:'/zsscan',                                     
			name:'zsscan',
			component:function(resolve){
          		require(["@/pages/zscy/zsscan"],resolve);       
        	}
      	},
      	{	//学时证明列表
			path:'/xslb',                                       
			name:'xslb',
			component:function(resolve){
          		require(["@/pages/zscy/xsList"],resolve);       
        	}
      	},
      	{	//学时证明详情
			path:'/xsdetail',                                  
			name:'xsdetail',
			component:function(resolve){
          		require(["@/pages/zscy/xsdetail"],resolve);       
        	}
     	},
      	{ 	//学时证明图文预览
			path:'/xsscan',                                    
			name:'xsscan',
			component:function(resolve){
          		require(["@/pages/zscy/xsscan"],resolve);       
        	}
      	},
      	// 课程学习模块
      	{	//我的培训班
			path:'/myClass',                                    
			name:'myClass',
			component:function(resolve){
          		require(["@/pages/study/myClass"],resolve);       
        	}
      	},
      	{	//我的课程
			path:'/myCourse',                                    
			name:'myCourse',
			component:function(resolve){
          		require(["@/pages/study/myCourse"],resolve);       
        	}
      	},
      // {
      //   path:'/onStudy',                                  //在学课程
      //   name:'onStudy',
      //   component:function(resolve){
      //     require(["@/pages/study/onStudy"],resolve);       
      //   }
      // },
      	{	//课程章节
			path:'/courseChapter',                                 
			name:'courseChapter',
			component:function(resolve){
          		require(["@/pages/study/courseChapter"],resolve);       
        	}
      	},
      	{	//学时证明
			path:'/xsLook',                                         
			name:'xsLook',
			component:function(resolve){
          		require(["@/pages/study/xsScan"],resolve);       
      	  	}
      	},
      	{	//视频播放
			path:'/player',                                         
			name:'player',
			meta: {keepAlive: false},
			component:function(resolve){
          		require(["@/pages/study/player"],resolve);       
        	}
      	},
      	// 报名选课模块
      	{	//选择班级
			path:'/chooseClass',                                    
			name:'chooseClass',
			component:function(resolve){
          		require(["@/pages/signIn/chooseClass"],resolve);       
        	}
      	},
      	{ 	//班级详情
			path:'/classDetail',                                   
			name:'classDetail',
			component:function(resolve){
          		require(["@/pages/signIn/classDetail"],resolve);       
        	}
      	},
      	{	//班级详情
			path:'/courseDetail',                                   
			name:'courseDetail',
			component:function(resolve){
          		require(["@/pages/signIn/courseDetail"],resolve);       
        	}
      	},
      	{	//确认报名班级
			path:'/ensureClass',                                    
			name:'ensureClass',
			component:function(resolve){
          		require(["@/pages/signIn/ensureClass"],resolve);       
        	}
      	},
      	{	//选择学习课程
			path:'/chooseCourse',                                  
			name:'chooseCourse',
			component:function(resolve){
          		require(["@/pages/signIn/chooseCourse"],resolve);       
        	}
      	},
      	{	//购物车
			path:'/shoppingCart',                                   
			name:'shoppingCart',
			component:function(resolve){
          		require(["@/pages/signIn/myShoppingCart"],resolve);       
        	},
      	},
      	{ 	//选择查看购物车班级里课程
			path:'/shoppingCartCourse',                             
			name:'shoppingCartCourse',
			component:function(resolve){
          		require(["@/pages/signIn/shoppingCartCourse"],resolve);       
        	}
      	},
      	{	//微信订单生成
			path:'/myOrder/pay',                                   
			name:'wxpay',
			component:function(resolve){
          		require(["@/pages/signIn/myOrder"],resolve);       
        	},
      	},
      // {
      //   path:'/pay',                                          //支付       暂时不用
      //   name:'pay',
      //   component:function(resolve){
      //     require(["@/pages/signIn/pay"],resolve);       
      //   }
      // },
      	{	//支付结果返回
			path:'/payResult',                                       
			name:'payResult',
			component:function(resolve){
          		require(["@/pages/signIn/payResult"],resolve);       
        	}
      	},
      	{	//微信支付结果返回
			path:'/wxPayResult',                                      
			name:'wxPayResult',
			component:function(resolve){
          		require(["@/pages/signIn/wxPayResult"],resolve);       
        	}
      	},
      	// 个人中心-订单模块   
      	{ 	//订单列表
			path:'/orderList',                                      
			name:'orderList',
			component:function(resolve){
          		require(["@/pages/self/orderManage/orderList"],resolve);       
        	}
      	},
      	{	//订单详情
			path:'/orderDetail',                                     
			name:'orderDetail',
			component:function(resolve){
          		require(["@/pages/self/orderManage/orderDetail"],resolve);       
        	}
      	},
      	{	//取消订单跳转页面用
			path:'/orderClear',                                     
			name:'orderClear',
			component:function(resolve){
          		require(["@/pages/self/orderManage/clear"],resolve);       
        	}
      	},
      	// 个人中心-发票模块
      	{	//发票列表
			path:'/invoiceList',                                       
			name:'invoiceList',
			component:function(resolve){
          		require(["@/pages/self/invoiceManage/invoiceList"],resolve);       
        	}
      	},
      	{	//发票详情
			path:'/invoiceDetail',                                     
			name:'invoiceDetail',
			component:function(resolve){
          		require(["@/pages/self/invoiceManage/invoiceDetail"],resolve);       
        	}
      	},
      	// 个人中心  寄送地址模块
      	{	//寄送地址
			path:'/jsdz',                                            
			name:'jsdz',
			component:function(resolve){
            	require(["@/pages/self/address/jsdz"],resolve);
        	}
      	},
      	{ 	//新增寄送地址
			path:'/xzjsdz',                                         
			name:'xzjsdz',
			component:function(resolve){
            	require(["@/pages/self/address/xzjsdz"],resolve);
        	}
      	},
      	// 新闻模块
      	{ 	//新闻资讯
			path:'/notify',                                         
			name:'notify',
			component:function(resolve){
          		require(["@/pages/news/notify"],resolve);       
        	}
      	},
      	{	//新闻资讯详情
			path:'/notifyDetail',                                    
			name:'notifyDetail',
			component:function(resolve){
          		require(["@/pages/news/notifyDetail"],resolve);       
       		}
      	},
      	// 帮助模块
      	{ 	//注册协议
			path:'/registerProtocol',                                
			name:'registerProtocol',
			component:function(resolve){
          		require(["@/pages/help/registerProtocol"],resolve);
        	}
      	},
      	{	//升级规则
			path:'/upLevel',                                            
			name:'upLevel',
			component:function(resolve){
          		require(["@/pages/help/upLevel"],resolve);
        	}
      	},
      	{	//积分规则
			path:'/integralRule',                                       
			name:'integralRule',
			component:function(resolve){
          		require(["@/pages/help/integralRule"],resolve);
        	}
      	},
      	{	//帮助中心
			path:'/helpCenter',                                         
			name:'helpCenter',
			component:function(resolve){
          		require(["@/pages/help/helpCenter/bzzx"],resolve);
        	} 
      	},
      	{	//帮助中心大类
			path:'/helpType',                                           
			name:'helpType',
			component:function(resolve){
          		require(["@/pages/help/helpCenter/help"],resolve);
        	} 
      	},
      	{	//帮助中心详情
			path:'/helpDetail',                                         
			name:'helpDetail',
			component:function(resolve){
          		require(["@/pages/help/helpCenter/helpDetail"],resolve);
        	} 
		},
		{	//考试入口
			path:'/examEntry',                                         
			name:'examEntry',
			component:function(resolve){
          		require(["@/pages/exam/examEntry"],resolve);
        	} 
		},
		{	//独立考试
			path:'/indepenceExam',                                         
			name:'indepenceExam',
			component:function(resolve){
          		require(["@/pages/exam/indepenceExam"],resolve);
        	} 
		},
		{	//班级考试考试查询
			path:'/classExamSearch',                                         
			name:'classExamSearch',
			component:function(resolve){
          		require(["@/pages/exam/classExamSearch"],resolve);
        	} 
		},
		{	//考试记录
			path:'/examHistory',                                         
			name:'examHistory',
			component:function(resolve){
          		require(["@/pages/exam/examHistory"],resolve);
        	} 
		},
        {   //试卷预览
            path:'/examPaperScan',                                         
            name:'examPaperScan',
            component:function(resolve){
                require(["@/pages/exam/examPaperScan"],resolve);
            } 
        },
      	{//默认指向
        	path:'*',                                                 
        	redirect:'/'                     
      	}
  	]
})

