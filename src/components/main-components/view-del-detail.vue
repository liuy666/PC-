<style scoped lang="less">
    @import '../../styles/ectrip.less';
    .view-form .ivu-form-item {
        margin-bottom: 10px !important;
    }

    .defaultClass{
        display: inline-table;
        width: 50%;
    }
    .one-row-class{
        width: 80%;
    }
    .input-default {
        width:  200px;
    }
    .form-item-area{
        position:relative;
        /*border:1px solid #5db2ff;*/
        margin-top:30px;
        padding:30px 0 10px 0;
    }
    .form-item-area:first-child {
        margin-top: 10px;
    }
    .area-title{
        display:inline-block;
        /*padding:0 10px;*/
        line-height:24px;
        background:#fff;
        position: absolute;
        top: -14px;
        left: 438px;
        font-size:16px;
        font-weight:bold;
        color:#4E81F0;
    }
    .font-size14{
        font-size: 14px
    }
</style>

<template>
     <!-- 不需要分两列摆放 -->
    <Form v-if="!showTwoCol"  :ref="formName" :model="formDatas"  :label-width="labelWidth" class="view-form">
        <Row>
            <Col :span="item.cols ? item.cols : 24"
                 v-for="(item,index) in formItemList"
                 :key="index"
                 v-if="!item.noShow">
                <FormItem
                        :label="item.label+'：'"
                        :class="{'form-area-formItem':item.hasTitle}">
                    <p  class="form-area-title" v-if="item.hasTitle">{{item.titleName}}</p>

                    <!-- cycle代表是否循环，不需要直接不传 -->
                    <span v-if="!item.showElement && !item.cycle">
                        <span v-if="item.html" v-html="formDatas[item.keyName]">{{formDatas[item.keyName]}}</span>
                        <span v-else style="font-size: 14px">{{formDatas[item.keyName]}}</span>
                    </span>

                    <span v-else-if="!item.showElement && item.cycle">
                        <div v-for="(oneItem,oneIndex) in item.cycle" :key="oneIndex">
                            <div v-for="(twoItem,twoIndex) in oneItem"
                                 :key="twoIndex"
                                 style="margin-right: 100px; display: inline-block">
                                <span>{{twoItem.label+'： '}}</span>
                                {{twoItem.keyName}}
                            </div>
                        </div>
                    </span>

                    <div v-else-if="item.showImage" style="width: 200px">
                        <img :src="formDatas[item.keyName]" alt="" style="width:100%">
                    </div>

                    <!--<qrcode-vue v-else-if="item.qrCode"-->
                            <!--:value="item.value"-->
                            <!--:size="item.size"-->
                            <!--level="Q">-->
                    <!--</qrcode-vue>-->

                    <div v-else-if="item.table"
                         :style="{width: item.width ? item.width : '100%'}">
                        <Table  :columns="item.colname"
                                :data="item.tableData"
                                :size="item.size"
                                :height="item.height"
                                :border="item.border">
                        </Table>
                    </div>

                    <CheckboxGroup v-else v-model="formDatas[item.keyName]" style="display:inline-block;">
                        <Checkbox v-for="(oneItem,oneIndex) in item.optionList" :label="oneItem.value" :key="oneIndex" disabled >{{ oneItem.labelName }}</Checkbox>
                    </CheckboxGroup>
                </FormItem>
            </Col>
            <Col span="24">
                <FormItem v-if="isShow" :label-width="1">
                    <div class="from-button-center">
                        <Button v-if="isDownload" @click="downloadCode" type="primary" class="op-btns searchbtn">下载</Button>
                        <Button @click="closePage" class="op-btns closebtn">关闭</Button>
                    </div>
                </FormItem>
            </Col>
        </Row>
    </Form>

    <!-- 需要分两列摆放 -->
    <Form v-else :ref="formName" :model="formDatas"  :label-width="labelWidth" class="view-form">
        <div v-for="(oneTitle,oneIndex) in titleList" :key="oneIndex" class="form-item-area">
            <span class="area-title">{{oneTitle.titleName}}</span>
            <div v-if="item.divIndex == oneIndex && !item.isHidden"
                 v-for="(item,index) in formItemList"
                 :key="index" :class="item.class ? item.class : 'defaultClass'">
                <FormItem :label="item.label+'：'">
                    <div v-if="!item.type&&item.html"
                         v-html="formDatas[item.keyName]">
                        {{formDatas[item.keyName]}}
                    </div>
                    <span v-if="!item.type&&!item.html" :style="{color: item.color}" class="font-size14">{{formDatas[item.keyName]}}</span>
                    <Input v-if="item.type === 1"
                           v-model="formDatas[item.keyName]"
                           :class="item.className ? item.className : 'input-default' ">
                    </Input>
                    <Select v-if="item.type === 4"
                            v-model="formDatas[item.keyName]"
                            :key="index"
                            style="width:200px">
                        <Option
                                v-for="(oneItem,oneIndex) in item.optionList"
                                :value="oneItem.value"
                                :key="oneIndex">
                            {{ oneItem.label }}
                        </Option>
                    </Select>
                    <span v-show="item.isRequired" class="message-title-red">*</span>
                    <span v-if="item.hasDec!='' && typeof(item.hasDec) == 'string'"
                          :class="{'message-title-red':item.isRedDec,'message-title-gray':item.isGrayDec}">
                            {{item.hasDec}}
                        </span>
                </FormItem>
            </div>
        </div>

        <FormItem v-if="isShow" :label-width="1">
            <div class="from-button-center">
                <Button v-for="(twoItem,twoIndex) in viewBtnList"
                        :key="twoIndex"
                        type="primary"
                        class="op-btns otherBtn"
                        @click="handleSubmit(twoItem.status)">
                    <span>{{twoItem.btnLabel}}</span>
                </Button>
                <Button @click="closePage" class="op-btns cancel-btn">关闭</Button>
            </div>
        </FormItem>
    </Form>

</template>

<script>
    // import QrcodeVue from 'qrcode.vue';
    export default {
    // components: {
    //     QrcodeVue
    // },
    props: {
        isClose: {
            type: Boolean,
            default: true
        },
        formName : {
            type : String,
            default : 'detailForm'
        },
        formDatas : {
            type : Object,
            required : true
        },
        formItemList : {
            type : Array,
            required : true
        },
        isView : {
            type : Boolean,
            default : false
        },
        isShow : {
            type : Boolean,
            default : true
        },
        isDownload : {
            type : Boolean,
            default : false
        },
        labelWidth : {
            type : Number,
            required : false,
            default : 140
        },
        btnList : { //自定义操作按钮
            type : Array,
            required : false
        },
        showTwoCol : { //是否分两列显示 默认false
            type : Boolean,
            default : false
        },
        titleList : { //
            type : Array
        },
        viewBtnList: {    //查看页面底部按钮(除开关闭)
            type : Array
        }
    },
    methods: {
        handleSubmit (status) {
            this.$emit('getFormData', this.formDatas, status);
        },
        closePage () {
            if(!this.isClose) {
                this.$emit('closeCurrentPage');
                return;
            }
            this.$common.closePage(this)
        },
        downloadCode () {
            this.$emit('downloadCode');
        }
    },
    created () {
        if(this.$route.params.belongRouterName){
            let data = {
                routerName: this.$route.name,
                belongRouterName: this.$route.params.belongRouterName
            };
            this.$store.commit('saveBelongRouter',data)
        }
    }
};
</script>
