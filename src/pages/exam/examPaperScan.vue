<template>
	<div v-title data-title="试卷预览">
		<meta content="width=device-width,minimum-scale=1,maximum-scale=1.0,user-scalable=no" name="viewport">
		<div class="main">
			<!-- 试卷 -->
			<div id="test_paper">
				<!-- 标题、答题须知 -->
				<div class="test_paper_header">
					<h2>2017年一级见着是考试《市政公用工程实物》</h2>

					<p class="test_paper_time">总分100分，80分及格，考试时长90分钟</p>

					<!-- 考试须知 -->
					<div class="test_paper_warn">
						<div class="test_paper_warn_list">
							<table>
								<tr>
									<td width=24><img src="static/images/paper3.png" alt=""></td>
									<td width='65'>考试须知 : </td>
									<td>本卷共分为3答题10小题，作答时间60分钟，总分100分，80分及格。本卷共分为3答题10小题，作答时间60分钟，总分100分，80分及格。本卷共分为3答题10小题，作答时间60分钟，总分100分，80分及格。</td>
								</tr>
							</table>
						</div>

						<div class="test_paper_warn_list">
							<table>
								<tr>
									<td width=24><img src="static/images/paper3.png" alt=""></td>
									<td width='65'>做题说明 : </td>
									<td>本卷共分为3答题10小题，作答时间60分钟，总分100分，80分及格。本卷共分为3答题10小题，作答时间60分钟，总分100分，80分及格。本卷共分为3答题10小题，作答时间60分钟，总分100分，80分及格。</td>
								</tr>
							</table>
						</div>

						<div class="test_paper_warn_list">
							<table>
								<tr>
									<td width=24><img src="static/images/paper3.png" alt=""></td>
									<td width='65'>试卷内容 : </td>
									<td>本卷共分为3答题10小题，作答时间60分钟，总分100分，80分及格。本卷共分为3答题10小题，作答时间60分钟，总分100分，80分及格。本卷共分为3答题10小题，作答时间60分钟，总分100分，80分及格。</td>
								</tr>
							</table>
						</div>
					</div>
				</div>

				<!-- 题目 -->
				<div class="test_paper_content">
				
					<!-- 单选 -->
					<div id="single_select_box">
						<div class="question_title single_select_title">一、单项选择题（共10题）</div>
						
						<!-- 单选题目 -->
						<div class="single_select_question" id="single_select">

							<div class="single_select_list" id="single_select_1">
								<div class="single_select_question_title">
									<span>1： ( 2分 ) </span>不错位，不越位，三部委，是团队领导中哪一项能力（ ）
								</div>
								<!-- 选项 -->
								<div class="single_select_question_content">
									<!-- table加hover加背景为选中 -->
									<table name="a">
										<tr>
											<td>
												<!-- 加component_single_box_click后里面的单选框可以点击 -->
												<!-- 单选组件 -->
												<div class="component_single_box component_single_box_click">
													<div class="components_single"></div>
												</div>
											</td>
											<td>
												A.气质
											</td>
										</tr>
									</table>
									<table name="b">
										<tr>
											<td>
												<!-- 单选组件 -->
												<div class="component_single_box component_single_box_click">
													<div class="components_single"></div>
												</div>
											</td>
											<td>
												B.气质
											</td>
										</tr>
									</table>
									<table name="c">
										<tr>
											<td>
												<!-- 单选组件 -->
												<div class="component_single_box component_single_box_click">
													<div class="components_single"></div>
												</div>
											</td>
											<td>
												C.气质
											</td>
										</tr>
									</table>
									<table name="d">
										<tr>
											<td>
												<!-- 单选组件 -->
												<div class="component_single_box component_single_box_click">
													<div class="components_single"></div>
												</div>
											</td>
											<td>
												D.气质
											</td>
										</tr>
									</table>
								</div>

							</div>

							<div class="single_select_list" id="single_select_2">
								<div class="single_select_question_title">
									<span>2： ( 2分 ) </span>不错位，不越位，三部委，是团队领导中哪一项能力（ ）
								</div>
								<!-- 选项 -->
								<div class="single_select_question_content">
									<table>
										<tr>
											<td>
												<!-- 单选组件 -->
												<div class="component_single_box  component_single_box_click">
													<div class="components_single"></div>
												</div>
											</td>
											<td>
												A.气质
											</td>
										</tr>
									</table>
									<table>
										<tr>
											<td>
												<!-- 单选组件 -->
												<div class="component_single_box component_single_box_click">
													<div class="components_single"></div>
												</div>
											</td>
											<td>
												B.气质
											</td>
										</tr>
									</table>
									<table>
										<tr>
											<td>
												<!-- 单选组件 -->
												<div class="component_single_box component_single_box_click">
													<div class="components_single"></div>
												</div>
											</td>
											<td>
												C.气质
											</td>
										</tr>
									</table>
									<table>
										<tr>
											<td>
												<!-- 单选组件 -->
												<div class="component_single_box component_single_box_click">
													<div class="components_single"></div>
												</div>
											</td>
											<td>
												D.气质
											</td>
										</tr>
									</table>
								</div>
							</div>

						</div>
					</div>

					<!-- 多选 -->
					<div id="mutiple_select_box">
						<div class="question_title mutiple_select_title">二、多项选择题（共10题）</div>
						
						<!-- 多选题目 -->
						<div class="mutiple_select_question" id="mutiple_select">

							<div class="single_select_list" id="mutiple_select_1">
								<div class="single_select_question_title">
									<span>1： ( 2分 ) </span>招标工程清单是根据（ ）编制的 
								</div>
								<!-- 选项 -->
								<div class="single_select_question_content">
									<!-- table加hover为选中状态，改变背景 -->
									<table name="a">
										<tr>
											<td>
												<!-- 加入component_mutiple_box_click后可点击 -->
												<!-- 多选组件 -->
												<div class="component_mutiple_box component_mutiple_box_click">
													<div class="components_mutiple"></div>
												</div>
											</td>
											<td>
												A.气质
											</td>
										</tr>
									</table>
									<table name="b">
										<tr>
											<td>
												<!-- 多选组件 -->
												<div class="component_mutiple_box component_mutiple_box_click">
													<div class="components_mutiple"></div>
												</div>
											</td>
											<td>
												B.气质
											</td>
										</tr>
									</table>
									<table name="c">
										<tr>
											<td>
												<!-- 多选组件 -->
												<div class="component_mutiple_box component_mutiple_box_click">
													<div class="components_mutiple"></div>
												</div>
											</td>
											<td>
												C.气质
											</td>
										</tr>
									</table>
									<table name="d">
										<tr>
											<td>
												<!-- 多选组件 -->
												<div class="component_mutiple_box component_mutiple_box_click">
													<div class="components_mutiple"></div>
												</div>
											</td>
											<td>
												D.气质
											</td>
										</tr>
									</table>
								</div>
							</div>

							<div class="single_select_list" id="mutiple_select_2">
								<div class="single_select_question_title">
									<span>2： ( 2分 ) </span>招标工程清单是根据（ ）编制的 
								</div>
								<!-- 选项 -->
								<div class="single_select_question_content">
									<table>
										<tr>
											<td>
												<!-- 加入component_mutiple_box_click后可点击 加hover为选中-->
												<!-- 多选组件 -->
												<div class="component_mutiple_box component_mutiple_box_click">
													<div class="components_mutiple"></div>
												</div>
											</td>
											<td>
												A.气质
											</td>
										</tr>
									</table>
									<table class="hover">
										<tr>
											<td>
												<!-- 多选组件 -->
												<div class="component_mutiple_box component_mutiple_box_click">
													<div class="components_mutiple"></div>
												</div>
											</td>
											<td>
												B.气质
											</td>
										</tr>
									</table>
									<table>
										<tr>
											<td>
												<!-- 多选组件 -->
												<div class="component_mutiple_box component_mutiple_box_click">
													<div class="components_mutiple"></div>
												</div>
											</td>
											<td>
												C.气质
											</td>
										</tr>
									</table>
									<table>
										<tr>
											<td>
												<!-- 多选组件 -->
												<div class="component_mutiple_box component_mutiple_box_click">
													<div class="components_mutiple"></div>
												</div>
											</td>
											<td>
												D.气质
											</td>
										</tr>
									</table>
								</div>
							</div>

						</div>
					</div>
					
					<!-- 判断 -->
					<div id="judge_question_box">
						<div class="question_title judge_question_title">三、判断题（共10题）</div>
						
						<!-- 判断题目 -->
						<div class="mutiple_select_question" id="judge_question">

							<div class="single_select_list" id="judge_question_1">
								<div class="single_select_question_title judge_question_title">
									<div class="judge_question_title_left left">
										<span>1： ( 2分 ) </span>招标工程清单是根据（ ）编制的
									</div> 
									<div class="right judge_question_title_right">
										<!-- 选的对号 白勾 红勾 -->
										<!-- status1位选的错号  status2位选的对号-->
										<img src="static/images/paper8.png" alt="安徽继续教育网"  class="judge_question_selected_right_black status1" style="margin-right: 36px;">
										<img src="static/images/paper10.png" alt="安徽继续教育网" class="judge_question_selected_right_red status2" style="display:none;margin-right: 36px;">
										
										
										<!-- 选的错号 白× 红× -->
										<img src="static/images/paper9.png" alt="安徽继续教育网" class="judge_question_selected_wrong_black status2">
										<img src="static/images/paper7.png" alt="安徽继续教育网" class="judge_question_selected_right_red status1" style="display:none">
										
									</div>
									<div class="clear"></div>
								</div>
							</div>
							
							<div class="single_select_list" id="judge_question_2">
								<div class="single_select_question_title judge_question_title">
									<div class="judge_question_title_left left">
										<span>2： ( 2分 ) </span>招标工程清单是根据（ ）编制的
									</div> 
									<div class="right judge_question_title_right">
										<!-- 选的对号 白勾 红勾 -->
										<!-- status1位选的错号  status2位选的对号-->
										<img src="static/images/paper8.png" alt="安徽继续教育网"  class="judge_question_selected_right_black status1" style="margin-right: 36px;">
										<img src="static/images/paper10.png" alt="安徽继续教育网" class="judge_question_selected_right_red status2" style="display:none;margin-right: 36px;">
										
										
										<!-- 选的错号 白× 红× -->
										<img src="static/images/paper9.png" alt="安徽继续教育网" class="judge_question_selected_wrong_black status2">
										<img src="static/images/paper7.png" alt="安徽继续教育网" class="judge_question_selected_right_red status1" style="display:none">
										
									</div>
									<div class="clear"></div>
								</div>
							</div>

							<div class="single_select_list" id="judge_question_3">
								<div class="single_select_question_title judge_question_title">
									<div class="judge_question_title_left left">
										<span>2： ( 2分 ) </span>招标工程清单是根据（ ）编制的
									</div> 
									<div class="right judge_question_title_right">
										<!-- 选的对号 白勾 红勾 -->
										<!-- status1位选的错号  status2位选的对号-->
										<img src="static/images/paper8.png" alt="安徽继续教育网"  class="judge_question_selected_right_black status1" style="margin-right: 36px;">
										<img src="static/images/paper10.png" alt="安徽继续教育网" class="judge_question_selected_right_red status2" style="display:none;margin-right: 36px;">
										
										
										<!-- 选的错号 白× 红× -->
										<img src="static/images/paper9.png" alt="安徽继续教育网" class="judge_question_selected_wrong_black status2">
										<img src="static/images/paper7.png" alt="安徽继续教育网" class="judge_question_selected_right_red status1" style="display:none">
										
									</div>
									<div class="clear"></div>
								</div>
							</div>
						</div>
					</div>

					<!-- 简答 -->
					<div id="simple_question_box">
						<div class="question_title simple_question_title">四、简答题（共10题）</div>
						
						<div class="mutiple_select_question simple_question_content" id="simple_question">
							
							<!-- 题目 -->
							<div class="single_select_list" id="simple_question_1">
								<div class="single_select_question_title judge_question_title">
									<span>1： ( 2分 ) </span>招标工程清单是根据什么编制的?
								</div>

								<!-- 答题 -->
								<div class="reading_note">
									<div class="reading_note_insert_box">
										<textarea class="reading_note_insert" maxlength="3000"></textarea>
									</div>
									
									<div class="reading_note_warn">已输入<span>0</span>字符，建议不超过500字</div>
									<input type="hidden">
								</div>
								
							</div>

						</div>
					</div>

					<!-- 阅读理解 -->
					<div id="reading_undestand_box">
						<div class="question_title reading_undestand_title">五、阅读理解题（共10题）</div>
						
						<div class="mutiple_select_question" id="reading_undestand">
							<div class="single_select_question_title reading_undestand_question">
								<span>1： ( 10分 ) </span>不错位，不越位，三部委，是团队领导中哪一项能力不错位，不越位，三部委，是团队领导中哪一项能力不错位，不越位，三部委，是团队领导中哪一项能力不错位，不越位，三部委，是团队领导中哪一项能力不错位，不越位，三部委，是团队领导中哪一项能力不错位，不越位，三部委，是团队领导中哪一项能力不错位，不越位，三部委，是团队领导中哪一项能力
							</div>
							
							<!-- 单选 -->
							<div class="single_select_list none_border_select_list" id="reading_undestand_1-1">
								<div class="single_select_question_title">
									<span>1：单选题 ( 2分 ) </span>不错位，不越位，三部委，是团队领导中哪一项能力（ ）
								</div>
								<!-- 选项 -->
								<div class="single_select_question_content">
									<!-- table加hover加背景为选中 -->
									<table>
										<tr>
											<td>
												<!-- 加component_single_box_click后里面的单选框可以点击 -->
												<!-- 单选组件 -->
												<div class="component_single_box component_single_box_click">
													<div class="components_single"></div>
												</div>
											</td>
											<td>
												A.气质
											</td>
										</tr>
									</table>
									<table>
										<tr>
											<td>
												<!-- 单选组件 -->
												<div class="component_single_box component_single_box_click">
													<div class="components_single"></div>
												</div>
											</td>
											<td>
												B.气质
											</td>
										</tr>
									</table>
									<table>
										<tr>
											<td>
												<!-- 单选组件 -->
												<div class="component_single_box component_single_box_click">
													<div class="components_single"></div>
												</div>
											</td>
											<td>
												C.气质
											</td>
										</tr>
									</table>
									<table>
										<tr>
											<td>
												<!-- 单选组件 -->
												<div class="component_single_box component_single_box_click">
													<div class="components_single"></div>
												</div>
											</td>
											<td>
												D.气质
											</td>
										</tr>
									</table>
								</div>
							</div>

							<!-- 多选 -->
							<div class="single_select_list none_border_select_list" id="reading_undestand_1-2">
								<div class="single_select_question_title">
									<span>2： 多选题( 2分 ) </span>招标工程清单是根据（ ）编制的 
								</div>
								<!-- 选项 -->
								<div class="single_select_question_content">
									<!-- table加hover为选中状态，改变背景 -->
									<table>
										<tr>
											<td>
												<!-- 加入component_mutiple_box_click后可点击 -->
												<!-- 多选组件 -->
												<div class="component_mutiple_box component_mutiple_box_click">
													<div class="components_mutiple"></div>
												</div>
											</td>
											<td>
												A.气质
											</td>
										</tr>
									</table>
									<table>
										<tr>
											<td>
												<!-- 多选组件 -->
												<div class="component_mutiple_box component_mutiple_box_click">
													<div class="components_mutiple"></div>
												</div>
											</td>
											<td>
												B.气质
											</td>
										</tr>
									</table>
									<table>
										<tr>
											<td>
												<!-- 多选组件 -->
												<div class="component_mutiple_box component_mutiple_box_click">
													<div class="components_mutiple"></div>
												</div>
											</td>
											<td>
												C.气质
											</td>
										</tr>
									</table>
									<table>
										<tr>
											<td>
												<!-- 多选组件 -->
												<div class="component_mutiple_box component_mutiple_box_click">
													<div class="components_mutiple"></div>
												</div>
											</td>
											<td>
												D.气质
											</td>
										</tr>
									</table>
								</div>
							</div>

							<!-- 判断 -->
							<div class="single_select_list none_border_select_list" id="reading_undestand_1-3">
								<div class="single_select_question_title judge_question_title">
									<div class="judge_question_title_left left">
										<span>3： 判断题( 2分 ) </span>招标工程清单是根据（ ）编制的
									</div> 
									<div class="right judge_question_title_right">
										<!-- 选的对号 白勾 红勾 -->
										<!-- status1位选的错号  status2位选的对号-->
										<img src="static/images/paper8.png" alt="安徽继续教育网"  class="judge_question_selected_right_black status1" style="margin-right: 36px;">
										<img src="static/images/paper10.png" alt="安徽继续教育网" class="judge_question_selected_right_red status2" style="display:none;margin-right: 36px;">
										
										
										<!-- 选的错号 白× 红× -->
										<img src="static/images/paper9.png" alt="安徽继续教育网" class="judge_question_selected_wrong_black status2">
										<img src="static/images/paper7.png" alt="安徽继续教育网" class="judge_question_selected_right_red status1" style="display:none">
										
									</div>
									<div class="clear"></div>
								</div>

							</div>

							<!-- 简答 -->
							<div class="single_select_list none_border_select_list" id="reading_undestand_1-4">
								<div class="single_select_question_title judge_question_title">
									<span>4： 简答题( 2分 ) </span>招标工程清单是根据什么编制的?
								</div>

								<!-- 答题 -->
								<div class="reading_note">
									<div class="reading_note_insert" contenteditable></div>
									<div class="reading_note_warn">已输入<span>0</span>字符，建议不超过500字</div>
									<input type="hidden">
								</div>
							</div>
						</div>
						
					</div>

				</div>
			</div>

			<!-- 答题卡 -->
			<div id="test_answer">
				<!-- 状态 -->
				<div class="test_answer_header">
					<div class="test_answer_header_box">
						<span class="test_answer_header_left left">
							<p class="time_last"> 剩余 <span>10:00:05</span></p>
							<p class="when_finish_warn">考试结束自动提交试卷</p>	
						</span>
						<span class="test_answer_header_line left"></span>
						<span class="test_answer_header_right right" onclick="submitExam()">交卷</span>
						<div class="clear"></div>
					</div>
				</div>

			</div>
		</div>
	</div>
</template>
<style scoped>
	*{ padding:0; margin:0; font-family:微软雅黑, Helvetica, sans-serif;color:#474747;box-sizing: border-box;-webkit-user-select: none;-webkit-touch-callout:none;-webkit-text-size-adjust: none;-webkit-appearance: none;}
	html{min-height:100%;background: #e8e8e8;}
	a{text-decoration:none; color:#474747; border:0;cursor: pointer;-webkit-tap-highlight-color:rgba(0,0,0,0)}
	li{ list-style:none;}
	img{ border:0;}
	input{outline:none;font-size:14px;-webkit-user-select:auto !important;}
	p,li,a,span,h1,h2,h3,h4,h5{ padding:0; margin:0;}
	a,button,input{-webkit-tap-highlight-color:rgba(255,0,0,0);}
	h1,h2,h3,h4{font-weight: normal}
	button{outline:none;border:0}
	body{font-size:14px;padding:0;font-family:微软雅黑,Helvetica,sans-serif;margin:0 auto;color:#474747;}
	.left{float:left}
	.right{float:right}
	.clear{clear: both}
	input::-webkit-input-placeholder{
	  /* WebKit browsers */
	  color: #A9A9A9;
	}
	input:-moz-placeholder {
	  /* Mozilla Firefox 4 to 18 */
	  color: #A9A9A9;
	}
	input::-moz-placeholder {
	  /* Mozilla Firefox 19+ */
	  color: #A9A9A9;
	}
	input:-ms-input-placeholder {
	  /* Internet Explorer 10+ */
	  color: #A9A9A9;
	}

	/*主体*/
	.main{width:1024px;margin:0 auto;position: relative;}

	/*单选组件*/
	.component_single_box{width:19px;height:19px;background: url(../../../static/images/redio2.png) no-repeat 0 0;cursor: pointer;}
	.component_single_box.hover{background: url(../../../static/images/redio1.png) no-repeat 0 0;}
	/*多选组件*/
	.component_mutiple_box{position:relative;width:19px;height:19px;border:1px solid #B4B0B0;cursor: pointer;}
	.component_mutiple_box.hover .components_mutiple{display:block;}
	.component_mutiple_box .components_mutiple{display:none;position:absolute;width:10px;height:10px;top:50%;left:50%;margin-top:-5px;margin-left:-5px;background:#E45C40;}


	/*试卷*/
	#test_paper{width:715px;background:#fff;padding-top: 30px;}
	.test_paper_header{text-align: center;padding:0  30px 0 35px;}
	.test_paper_header h2{font-size: 24px;}
	.test_paper_content{padding:0 15px;}
	.test_paper_time{margin-top: 15px;text-align: center;font-size: 16px;}
	.test_paper_warn{border-top: 1px dashed #DBDCDE !important;border:1px dashed #6E727A;margin-top:10px;padding:15px 10px 20px 10px;}
	.test_paper_warn_list table td{text-align: left;vertical-align: top;font-size: 12px;}
	.test_paper_warn_list table tr td:nth-child(3){color:#6E727A}
	.test_paper_warn .test_paper_warn_list{margin-top: 20px;}
	.test_paper_warn .test_paper_warn_list:first-child{margin-top: 0;}

	#mutiple_select_box,#judge_question_box,#simple_question_box,#reading_undestand_box{margin-top: 30px;}
	.test_paper_content{padding-bottom: 180px;margin-bottom: 190px;}
	.test_paper_content>div:last-child{padding-bottom: 180px;}

	#judge_question_box{border-bottom: 1px dashed #DDDDDD;}
	.question_title{height:30px;padding-left: 20px;line-height:30px;text-align: left;background:#FFF9E9;margin: 0 10px 0 20px;}
	.single_select_title{margin-top: 13px;font-size: 14px;}
	.single_select_list{padding:0 20px 0 30px;}
	.single_select_question_title{margin-top: 20px;padding-left: 15px;}
	.single_select_question_title span{color:#E45C40}
	.single_select_question_content{margin-top: 20px;}
	.single_select_question_content table{width:100%}
	.single_select_question_content table.hover tr{background:#f4f4f4}
	.single_select_question_content table tr td{height:29px;vertical-align: middle;}
	#judge_question_box #judge_question .single_select_list:last-child{margin-bottom: 45px;}

	.single_select_question_content table tr td:first-child{padding-left: 40px;width:60px;}
	.single_select_question_content table tr td:nth-child(2){padding-left: 25px;}
	.right_answer{margin-top: 30px;background:#F4F4F4;height:35px;line-height:35px;padding-left: 13px;font-size: 16px;}
	.right_answer span{color:#47AD76;font-size: 16px;}
	.right_answer img{margin-left: 15px;}
	.question_intro_list{margin-top: 12px;}
	.question_intro_list.hover .question_intro_content{display:block}
	.question_intro_header{background:#F4F4F4;height:35px;line-height:35px;padding-left: 13px;}
	.question_intro_header p{cursor:pointer;height:35px;line-height:35px;background:url(../../../static/images/paper5.png) no-repeat 585px 14px;}
	.question_intro_list.hover p{background:url(../../../static/images/paper11.png) no-repeat 585px 14px;}
	.simple_question_grade{margin-top: 5px;text-align: right}
	.simple_question_grade span{color:#E45C40}
	.simple_question_grade input{width:60px;padding:3px 0 3px 5px;border: 1px solid #ddd;border-radius: 3px;-webkit-border-radius: 3px;-moz-border-radius: 3px;-o-border-radius: 3px;}

	.question_intro_list p{font-size: 16px;}
	.question_intro_content{padding:10px;border:1px solid #CCCDCE;border-top: 0;display:none}
	.judge_question_title_left{width:530px;}
	.judge_question_title_right img{cursor: pointer}
	.student_answer{color:#E45C40;padding:15px 10px 10px 10px;background:#F4F4F4;margin-top: 10px;}
	.reading_undestand_question{padding:0 20px 0 45px}
	.none_border_select_list{border-bottom: 0 !important;}
	.reading_note{margin-top: 12px;}
	.reading_note_insert_box{border: 1px solid #ddd;border-bottom:0;}
	.reading_note_insert{resize:none;width:100%;max-width:100%;min-height:120px;border:0;outline: none;padding: 10px 10px 0 10px;border-bottom: none;color:#B4B3B3;}
	.reading_note_insert>div,.reading_note_insert>p{color:#B4B3B3;}
	.reading_note_warn{height:25px;text-align: right;padding:0 10px 10px 10px;border: 1px solid #ddd;border-top: none;color:#B4B3B3;}
	.reading_note_warn span{color:#B4B3B3;}
	.reading_note_ensure{padding:10px 10px 0 40px;color:#B4B3B3}

	/*答题卡*/
	#test_answer{position: absolute;top:0;right:0;width:300px;}
	.test_answer_header{background:#fff;}
	.test_answer_header_box{height:70px;}
	.test_answer_header_left{margin:10px 0 0 10px;width: 195px;}
	.test_answer_header_left .time_last{font-size: 24px;}
	.test_answer_header_left span{margin-left: 3px;color:#E45C40;}
	.test_answer_header_left .when_finish_warn{color:#6E727A;font-size: 15px;}

	.test_answer_header_line{height:100%;border-left:3px solid #B6B8BC;margin:0 10px 0 0; }
	.test_answer_header_right{color:#fff;margin: 16px 10px 0 0;font-size: 20px;background:#E45C40;width:70px;height:30px;text-align: center;line-height:30px;border-radius: 3px;-webkit-border-radius: 3px;-moz-border-radius: 3px;-o-border-radius: 3px;cursor: pointer;}

	.test_answer_content{padding:5px 15px 15px 15px;background:#fff;margin-top: 10px;}
	.test_answer_example{border-bottom: 1px dashed #DDDDDD;padding-bottom: 5px;text-align:center;}
	.test_answer_example span{display: inline-block;height:15px;vertical-align: top;line-height: 15px;font-size: 13px;}
	.example_color{width:15px;border:1px solid #B6B8BC;}

	/*颜色 1已做  2未做*/  
	.example_color1{background:#74C9F7;}
	.example_color2{background:#B6B8BC;}

	.example_text{margin-right: 16px;}
	.test_answer_example .example_text:last-child{margin-right: 0}

	#test_answer_single{margin-top: 12px;border-bottom: 1px dashed #ddd;padding-bottom: 10px;}
	.test_answer_title{font-size:14px;height:20px;line-height:20px;vertical-align: middle;padding-left:22px;background:url(../../../static/images/paper2.png) no-repeat 0 center;color:#6E727A}
	.test_answer_list{margin-top: 5px;}
	.test_answer_list ul li{border:1px solid #F2F3F5;cursor:pointer;margin-bottom:5px;font-size:12px;float: left;width:25px;height:25px;background:#B1B6BF;margin-right: 2px;text-align: center;line-height: 22px;vertical-align: middle;color:#fff;}
	.test_answer_list ul li:nth-child(10n){margin-right: 0}
	.test_answer_list ul li.list_number{border:1px solid #fff;}

	/*颜色 hover已做  hover1未做*/
	.test_answer_list ul li.hover{background:#74C9F7;}
	.test_answer_list ul li.hover1{background:#B6B8BC;}

	.test_answer_list ul li.box{width:45px;background:#fff;border-bottom:1px solid #B6B8BC;color:#6E727A;}
	.list_number{background: #fff !important;color:#6E727A !important;}

	.return_btn{cursor:pointer;font-size:18px;width:235px;height:50px;background:#A0A5AF;color:#fff;text-align: center;line-height:50px;vertical-align: middle;margin: 30px auto 19px auto;border-radius: 2px;-webkit-border-radius: 2px;-moz-border-radius: 2px;-o-border-radius: 2px;}



	/*弹框*/
	.ensure_submit_exam_box{position: fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.7);display: none}
	.ensure_submit_exam{width:344px;height:150px;position: absolute;top:50%;left:50%;margin-top: -75px;margin-left: -177px;background: #fff;border:1px solid #B3B7BD;border-radius: 5px;-webkit-border-radius: 5px;-moz-border-radius: 5px;-o-border-radius: 5px;}
	.ensure_submit_exam_header{text-align: right;height:25px;padding-right: 10px;padding-top: 5px;}
	.ensure_submit_exam_header img{cursor: pointer;}
	.ensure_submit_exam_content{text-align: center;margin-top: 14px;font-size: 16px;}
	.ensure_submit_exam_footer{margin-top:35px;text-align: center;}
	.ensure_submit_exam_footer button{width:85px;height:25px;text-align: center;line-height: 25px;border-radius: 3px;-webkit-border-radius: 3px;-moz-border-radius: 3px;background: #9FA5AD;cursor: pointer;color: #fff;}
	.ensure_submit_exam_footer button.ensure_submit_exam_ensure{background: #E45C40;margin-left: 20px;}

	/* 自动提交试卷提示框 */
	.auto_submit_exam_box{position: fixed;top:0;left:0;right:0;bottom:0;background:rgba(0,0,0,.7);display: none}
	.auto_submit_exam{width:344px;height:150px;position: absolute;top:50%;left:50%;margin-top: -75px;margin-left: -177px;background: #fff;border:1px solid #B3B7BD;border-radius: 5px;-webkit-border-radius: 5px;-moz-border-radius: 5px;-o-border-radius: 5px;}
	.auto_submit_exam_header{text-align: right;height:25px;padding-right: 10px;padding-top: 5px;}
	.auto_submit_exam_header img{cursor: pointer;}
	.auto_submit_exam_content{text-align: center;margin-top: 39px;font-size: 16px;}
	.auto_submit_exam_content span{color:#E45C40}
</style>