<template>

    <div class="lunbo-container common-second">
        <div class="lunbo">
            <div class="slides">
                <!--<div><img src="../../assets/img/1.jpg"></div>-->
            </div>
        </div>
        <div class="z-ht" v-for="item in listBanner" :key="item.seq"></div>
        <!--<img :src="item.logoPic">-->

        <!--<router-view/>-->
    </div>

</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "sowingMap",
        data:function(){
            return{
                flag:0
            }
        },
        computed:mapState({
            listBanner:state=>{
                // console.log(state.home.listBanner);
                return state.home.listBanner;
            }
        }),

        watch:{
            listBanner(curVal){
                // console.log('wwwwwwwwwwwwwwwwwwwwwwwwwwwwww');
                // console.log(curVal);
                if(this.flag !== 0){
                    return
                }
                if(!curVal.length){
                    return
                }
                this.flag = 1;
                let element = document.querySelector('.lunbo'),
                    slides = document.querySelector('.slides'),
                    innerhtml = '';
                // this.slideshow.stop();
                curVal.forEach(function(data){
                    if(data.logoPic){
                        innerhtml += '<div><img src='+data.logoPic+'></div>'
                    }else{
                        innerhtml += '<div><img src='+data.url+'></div>'
                    }

                })
                slides.innerHTML = innerhtml;
                console.log(this);
                this.sildeshow = bamboo(element, 'roll');
                console.log(this);
                this.sildeshow.run();
            }
        }
    }
</script>

<style scoped lang="less">
    .lunbo {
        /*position: absolute;*/
        /*top: 0;*/
        /*left: 0;*/
        /*right: 0;*/
        /*bottom: 0;*/
        margin: auto;
        width: 100%;
        height: 470px;
        border: none !important;
        overflow: hidden;
        border: 10px solid #fefefe;
        /*box-shadow: 1px 1px 8px 2px rgba(0, 0, 0, .1);*/
        img{
            -webkit-transform: translate(-50%, -50%);
            height: 470px;
        }
    }

    .show-none{
        height: 0px;
        overflow: hidden;
    }

</style>