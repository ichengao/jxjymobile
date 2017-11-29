<template>
  	<div id="app">
    	<router-view></router-view>
        <loading ref='loading'></loading>
  		<warnBox ref="warn_box"></warnBox>
  	</div>
</template>

<script>
import warnBox from './components/common/warn'
import loading from './components/common/loading'
import axios from 'axios'
import config from "@/api/base.js";
export default {
  	name: 'app',
  	components:{
  		warnBox,
  		loading,
  	},
    created(){
        this.isWx();
        this.getData();
    },
    methods:{
        getData(){
            if(!sessionStorage.getItem('uuid')){
                axios.post('/getUuid.html',{},config)
                .then(function(res){
                    sessionStorage.setItem("uuid",res.data.uuid);
                });
            }
        },
        isWx(){
            var ua = window.navigator.userAgent.toLowerCase(); 
            if(ua.match(/MicroMessenger/i) == 'micromessenger'){ 
                sessionStorage.setItem('isWx','true');
            }else{ 
                sessionStorage.setItem('isWx','false');
            }
        }
    }
}
</script>

