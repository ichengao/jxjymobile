<template>
    <!-- 考试须知 -->
    <div class="exam_need_know_box">
        <div class="exam_need_know">
            <div class="exam_need_know_header">
                <span class="line"></span><span>考试须知</span><span class="line"></span>
            </div>
            <div class="exam_need_know_content">
                <!-- 班级考试须知 -->
                <p v-show="show01">班级考试须知班级考试须知班级考试须知班级考试须知班级考试须知</p>
                <!-- 独立考试须知 -->
                <p v-show="show02">独立考试须知独立考试须知独立考试须知独立考试须知独立考试须知独立考试须知独立考试须知独立考试须知</p>
                <!-- 课程考试须知 -->
                <p v-show="show03">课程考试须知课程考试须知课程考试须知课程考试须知课程考试须知课程考试须知课程考试须知</p>
            </div>
            <div class="exam_need_know_footer" @click="closeExamNeedKnow">
                <button>确 定</button>
            </div>
        </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                show01:true,          //班级考试须知
                show02:false,         //独立考试须知
                show03:false,         //课程考试须知
            }
        },
        methods:{
            // 打开考试须知弹框
            openExamNeedKnow(params){
                $(".exam_need_know_box").fadeIn();
                switch(params){
                    case "01" :
                        this.show01=true;
                        this.show02=false;
                        this.show03=false;
                        break;
                    case "02" :
                        this.show01=false;
                        this.show02=true;
                        this.show03=false;
                        break;
                    case "03" :
                        this.show01=false;
                        this.show02=false;
                        this.show03=true;
                        break;
                }
            },
            // 关闭考试须知弹框
            closeExamNeedKnow(){
                $(".exam_need_know_box").fadeOut();
            }
        }
    }
</script>
<style scoped>
    .exam_need_know_box{position: fixed;top:.9rem;left:0;right:0;bottom:0;background:rgba(0,0,0,.7);display: none}
    .exam_need_know{background:#fff;position: absolute;bottom:0;left:0;right:0;}
    .exam_need_know_header{text-align: center;padding-top:.36rem;}
    .exam_need_know_header span:nth-child(2){padding:0 .1rem;}
    .exam_need_know_header span{color:#000000}
    .exam_need_know_header span.line{display: inline-block;height:.1rem;border-top: 1px solid #DCDCDC;width:.4rem;}
    .exam_need_know_content{padding:.35rem .6rem 1.26rem .6rem;}
    .exam_need_know_content p{color:#737575}
    .exam_need_know_footer button{width:100%;height:40px;background:#31B1DE;color: #fff;line-height:40px;font-size: .28rem;}
</style>
