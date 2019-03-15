<template>
    <div>
        <Carousel autoplay  loop :height="470">
            <CarouselItem>
                <div class="demo-carousel">
                    <!--<img src="assets/1.jpg">-->
                    111111111ssss11
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">
                    <!--<img src="assets/2.jpg">-->
                    22222222sss22222
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">
                    <!--<img src="assets/3.jpg">-->
                    333333333sss3333
                </div>
            </CarouselItem>
            <CarouselItem>
                <div class="demo-carousel">
                    <!--<img src="assets/4.jpg">-->
                    44444444sss4444444
                </div>
            </CarouselItem>
        </Carousel>
        <!--<div class="demo" v-focus>-->
            <!--<div class="slides">-->
                <!--<div><img src="../../../assets/img/1.jpg"></div>-->
                <!--<div><img src="../../../assets/img/2.jpg"></div>-->
                <!--<div><img src="../../../assets/img/3.jpg"></div>-->
                <!--<div><img src="../../../assets/img/4.jpg"></div>-->
                <!--<div><img src="../../../assets/img/5.jpg"></div>-->
                <!--<div><img src="../../../assets/img/6.jpg"></div>-->
                <!--<div><img src="../../../assets/img/7.jpg"></div>-->
            <!--</div>-->
        <!--</div>-->
        <router-view/>
    </div>

</template>

<script>
    export default {
        name: "sowingMap",
        directives:{
            focus: {
                inserted: function(el){
                    this.bamboo(el,'roll');
                }
            }
        }
    }
</script>

<style scoped>
    .demo {
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        margin: auto;

        width: 500px;
        height: 250px;
        overflow: hidden;
        border: 10px solid #fefefe;
        box-shadow: 1px 1px 8px 2px rgba(0, 0, 0, .1);
    }
</style>