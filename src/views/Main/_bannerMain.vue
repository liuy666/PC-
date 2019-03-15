<template>
    <div id="_bannerMain">
        <div v-show="isHasBackGround" id="skeleton"></div>
        <div v-show="!isHasBackGround" id="swiper"></div>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: 'realBannerMain',
        data() {
            return {
                isHasBackGround: true,
            }
        },
        async created() {
            // 获取banner图信息
            const bannerInfo = await this.$api.get2(this.lee + '/ec/home/v1/getHomeDsListBanner',{
                url: window.location.hostname
            });
            // console.log(bannerInfo);

            let _bannerList = [];
            // 如果获取数据失败，则查看本地存储是否有缓存，有则用之，无则显示占位框
            if(!bannerInfo || !bannerInfo.data || !bannerInfo.data.dsListBanner || !bannerInfo.data.dsListBanner.length) {
                let bannerList = JSON.parse(sessionStorage.getItem('bannerList'));
                if(!bannerList) {
                    // console.log('bannerMain');
                    $('#skeleton').height($('#skeleton').width() / 1903 * 470);
                    this.isHasBackGround = true;
                    return;
                } else {
                    _bannerList = [...bannerList];
                }
            } else { // 如果获取数据成功，则存入本地缓存
                sessionStorage.setItem('bannerList',JSON.stringify(bannerInfo.data.dsListBanner));
                _bannerList = bannerInfo.data.dsListBanner;
            }
            
            // 初始化banner轮播图
            this.isHasBackGround = false;
            let swiperList = _bannerList.map(item => {
                return {
                    href: '#',
                    src: item.logoPic
                }
            });
            let boxWidth = $('#swiper').width();
            let boxHeigth = boxWidth / 1903 * 470;
            $('#swiper').height(boxHeigth);
            $('#swiper').carousel({
                width: boxWidth,
                height: boxHeigth,
                speed: 1000,
                type: 'slide',
                duration: 5000,
                isAutoPlay: true,
                aImg: swiperList
            });
        }
    }
</script>

<style lang="less" scoped>
    #skeleton {
        height: 470px;
        background-color: #eaeaea;
        width: 100%;
    }
    #swiper {
        height: 470px;
        width: 100%;
    }
</style>
