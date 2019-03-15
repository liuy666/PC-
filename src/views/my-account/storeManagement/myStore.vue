<template>
    <div>
        <Row>
            <Breadcrumb separator=">" :style="{margin: '24px 0'}">
                <BreadcrumbItem>我的账户</BreadcrumbItem>
                <BreadcrumbItem>店铺管理</BreadcrumbItem>
                <BreadcrumbItem>我的店铺</BreadcrumbItem>
            </Breadcrumb>
            <div class="cardTitle2">
                <p>{{ _storeName }}</p>
            </div>
            <Form :model="formDatas"
                  :label-width="140">
                <FormItem :label="'店铺名称：'">
                    <!-- @on-blur="confirmEdit"  -->
                    <Input v-model="formDatas.shopName" style="width: 300px" />
                    <Button type="primary" class="op-btns ok-btn" style="margin-left: 10px" @click="confirmEdit" >保存</Button>
                    <span style="color:#F54112; margin-left: 10px">不超过20个字符</span>
                </FormItem>
                <FormItem :label="'店铺链接：'">
                    <input id="shop-link" :value="formDatas.pcUrl"/>
                    <span :href=formDatas.pcUrl style="font-size: 14px; margin-right: 30px">{{formDatas.pcUrl}}</span>
                    <Button type="primary" class="op-btns ok-btn" @click="copyContent">复制</Button>
                </FormItem>
                <FormItem :label="'店铺二维码：'">
                    <qrcode-vue style="display: inline-block"
                                :value="formDatas.mobileUrl"
                                :size="250"
                                level="Q">
                    </qrcode-vue>
                    <span style="color:#F54112; margin-left: 10px">扫一扫，打开我的店铺</span>
                </FormItem>
                <FormItem :label-width="1">
                    <div class="from-button-center">
                        <!-- <Button type="primary" class="op-btns ok-btn" @click="saveData">
                            保存
                        </Button> -->
                        <Button class="op-btns cancel-btn" @click="downloadCode">
                            下载二维码
                        </Button>
                    </div>
                </FormItem>
            </Form>
            <loading v-if="spinShow"></loading>
        </Row>
    </div>
</template>

<script>
    import QrcodeVue from 'qrcode.vue';
    export default {
        components: {
            QrcodeVue
        },
        name: "myStore",
        data() {
            return {
                spinShow: true,
                formDatas: {},
                storeName: ''
            }
        },
        computed: {
            _storeName() {
                return this.storeName || '易旅通';
            }
        },
        methods: {
            downloadCode() {
                let myCanvas = document.getElementsByTagName('canvas');
                let a = document.createElement("a");
                //设置a标签的href属性（将canvas变成png图片）
                a.href = myCanvas[0].toDataURL('image/png').replace('image/png', 'image/octet-stream');
                //设置下载文件的名字
                a.download = "店铺二维码.png";
                //点击
                a.click()
            },
            copyContent() {    //复制目标内容
                document.getElementById('shop-link').select();
                const text = document.execCommand('Copy') ? '店铺链接复制成功！' : '店铺链接复制失败，请手动复制！';
                this.$req.showMessageModal(this, text, 1)
            },
            async saveData() {
                const url = `${this.lee}/ec/distributorShop/v1/saveDistriborShopInfo?access_token=${sessionStorage.getItem('name')}`;
                try {
                    const res = await this.$http.post(url, this.formDatas);
                    if (res.data.code === 200) {
                        this.$req.showMessageModal(this, '分销商店铺名称保存成功！', 1)
                    } else {
                        this.$req.showMessageModal(this, res, 1)
                    }
                }
                catch (err) {
                    console.log(err)
                }
            },
            getLength(str) {
                return str.replace(/[\u0391-\uFFE5]/g,'aa').length
            },
            // 失去焦点后弹出对话框，确认是否更改
            confirmEdit() {
                // console.log(1)
                if(!this.formDatas.shopName) {
                    this.$req.showMessageModal(this, '店铺名称不能为空', 2);
                    return;
                }
                if(this.getLength(this.formDatas.shopName) > 20) {
                    this.$req.showMessageModal(this, '店铺名称不能超过20个字符', 2);
                    return;
                }
                this.$Modal.confirm({
                    title: '温馨提示',
                    content: '是否确认修改店铺名称为：' + this.formDatas.shopName,
                    onOk: () => {
                        setTimeout(() => {
                            this.storeName = this.formDatas.shopName;
                            this.saveData();
                        },500)
                    },
                    onCancel: () => {
                        this.formDatas.shopName = this.storeName;
                    }
                });
            }
        },
        async created() {
            let szcompanyname = ''
                const res = await this.$http.get(`${this.lee}/ec/home/v1/getGalcompanyName?url=${window.location.hostname}`)
                if (res.data.code === 200) {
                    szcompanyname = res.data.data;
                } else {
                    this.$req.showMessageModal(this, res, 1)
                }
            this.$http.get(`${this.lee}/ec/distributorShop/v1/getDistributorShopInfo`, {
                params: {
                    access_token: sessionStorage.getItem('name'),
                    url: window.location.hostname,
                    usid: sessionStorage.getItem('userName')
                }
            }).then(res => {
                if(res.data.code === 200) {
                    this.storeName = res.data.data.shopName;
                    this.formDatas = {
                        id: res.data.data.id,     //店铺id
                        usid: sessionStorage.getItem('userName'),     //分销商id
                        shopName: res.data.data.shopName || '易旅通',      //店铺名称
                        pcUrl: `http://${window.location.host}/#/index_home?fxsId=${sessionStorage.getItem('userName')}`,
                        mobileUrl: `http://${window.location.host}/webchat/?wxName=${szcompanyname}#/distributor?userId=${sessionStorage.getItem('userName')}`,
                    };
                    this.spinShow = false;
                } else {
                    this.$req.showMessageModal(this, res, 1)
                }
            })
        }
    }
</script>

<style scoped>
    #shop-link{
        position: absolute;
        top: 100px;
        left: 0;
        opacity: 0;
        z-index: -10;
    }
</style>
