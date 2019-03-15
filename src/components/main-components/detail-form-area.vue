<style scoped lang="less">
    @import '../../styles/ectrip.less';
    #selected-treenode .ivu-btn{
        margin: 5px;
    }
    .float-left {
        float: left;
    }
    #mixed-radio {
        overflow: hidden;
        .ivu-radio-wrapper:nth-child(7) {
            float: right;
            margin-left: 8px;
        }
    }

    .one-three-class{
        display: inline-table;
        width: 30%;
    }
    .defaultClass{
        display: inline-table;
        width: 50%;
    }
    .one-row-class{
        width: 100%;
    }

    .input-default {
        width:  200px;
    }
    .input-small {
        width : 100px;
    }
    .input-50 {
        width: 50%;
    }
    .input-large {
        width: 80%;
    }
    .demo-upload-list{
        display: inline-block;
        width: 200px;
        height: 150px;
        text-align: center;
        line-height: 150px;
        border: 1px solid transparent;
        border-radius: 4px;
        overflow: hidden;
        background: #fff;
        position: relative;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 100%;
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i {
        color: #fff;
        font-size: 30px;
        cursor: pointer;
        margin: 0 10px;
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
</style>
<template>
    <div>
        <Form
                :ref="formName"
                :model="formDatas"
                :rules="ruleDatas"
                :label-width="labelWidth">

            <!-- 非列表页的表单项 -->
            <Row>
                <div v-for="(oneTitle,oneDivIndex) in titleList" :key="oneDivIndex" class="form-item-area">
                    <span class="area-title">{{oneTitle.titleName}}</span>
                    <div v-if="item.divIndex === oneDivIndex && !item.noShow"
                         v-for="(item,index) in formItemList"
                         :key="index"
                         :class="item.class ? item.class : 'defaultClass'">
                        <FormItem
                                :label="item.label==''?'':item.label + '：'"
                                :prop="item.keyName"
                                :label-width="item.labelWidth"
                                :class="{'form-area-formItem':item.hasTitle}"
                                v-show="!item.isHidden">

                            <p v-if="item.hasTitle" class="form-area-title">{{item.titleName}}</p>

                            <!-- type为1 = 输入框 -->
                            <Input
                                    v-if="item.type===1"
                                    v-model="formDatas[item.keyName]"
                                    :disabled="item.disabled"
                                    :readonly="item.readonly"
                                    :type="item.inputType"
                                    :class="item.className ? item.className : 'input-default' ">
                            </Input>

                            <!-- type为2 = 单选框 -->
                            <RadioGroup v-if="item.type===2" v-model="formDatas[item.keyName]"><!--Object.keys(formDatas)[index]-->
                                <Radio
                                        v-for="(oneItem,oneIndex) in item.optionList"
                                        :label="oneItem.value"
                                        :key="oneIndex">
                                    {{ oneItem.labelName }}
                                </Radio>
                            </RadioGroup>

                            <!-- type为3 = 复选框 -->
                            <CheckboxGroup
                                    v-if="item.type===3"
                                    v-model="formDatas[item.keyName]"
                                    style="display:inline-block;">
                                <Checkbox
                                        v-for="(oneItem,oneIndex) in item.optionList"
                                        :label="oneItem.value"
                                        :key="oneIndex">
                                    {{ oneItem.labelName }}
                                </Checkbox>
                            </CheckboxGroup>

                            <!-- type为4 = 下拉框,selectEvent为是否需要onchange事件，布尔 -->
                            <Select
                                    v-if="item.type===4 && item.selectEvent"
                                    v-model="formDatas[item.keyName]"
                                    :key="index"
                                    :disabled="item.disabled"
                                    :transfer="true"
                                    @on-change = "selectedChange"
                                    style="width:200px">
                                <Option
                                        v-for="(oneItem,oneIndex) in item.optionList"
                                        :value="oneItem.value"
                                        :key="oneIndex">
                                    {{ oneItem.label }}
                                </Option>
                            </Select>

                            <Select
                                    v-if="item.type===4 && !item.selectEvent"
                                    v-model="formDatas[item.keyName]"
                                    :key="index"
                                    :transfer="true"
                                    :disabled="item.disabled"
                                    style="width:200px">
                                <Option
                                        v-for="(oneItem,oneIndex) in item.optionList"
                                        :value="oneItem.value"
                                        :key="oneIndex">
                                    {{ oneItem.label }}
                                </Option>
                            </Select>

                            <!-- type为5 = 文件上传 -->
                            <Upload
                                    v-if="item.type===5"
                                    :action="item.action"
                                    :data="item.data"
                                    :show-upload-list="false"
                                    :on-success="getFile">
                                <div style="width:200px">
                                    <img style="width:100%" :src="imgUrl1" alt="">
                                </div>
                                <Button type="primary" icon="ios-cloud-upload-outline">{{item.btnLabel}}</Button>
                            </Upload>



                            <!-- type为7 = 多行输入框 -->
                            <Input
                                    v-if="item.type===7"
                                    v-model="formDatas[item.keyName]"
                                    type="textarea" style="width:80%;"
                                    :rows="3"
                                    :placeholder="item.placeholder">
                            </Input>

                            <!-- type为8 = 树形控件 -->
                            <span v-if="item.type===8">
                                <div>
                                    <Input
                                            v-model="formDatas[item.keyName]"
                                            :readonly="true"
                                            type="textarea"
                                            style="width:80%;"
                                            :rows="3">
                                    </Input>
                                </div>
                                <div style="display: inline-block">
                                    <Button class="op-btns ok-btn" @click="showTreeModal(index,item.treeType)">{{item.btnLabel}}</Button>
                                </div>
                                <Modal
                                        v-model="item.treeModal"
                                        :mask-closable="false">
                                    <p slot="header" style="color:#5db2ff;">
                                        <span>{{item.title}}</span>
                                    </p>
                                    <div style="overflow-y: auto;height: 250px">
                                        <Tree
                                                v-if="item.treeData.length>0"
                                                :data="item.treeData"
                                                :multiple="item.multiple"
                                                :show-checkbox="item.multiple"
                                                :load-data="expandTree"
                                                @on-check-change="checkchange">
                                        </Tree>
                                    </div>
                                    <div v-if="item.treeType!==3" id="selected-treenode" style="border-top: 1px solid #dddee1">
                                        <div style="display:inline-block;padding: 12px 0 14px">已{{item.title}}:</div>
                                        <Button
                                                v-for="(oneItem,oneIndex) in hasSelected"
                                                :key="oneIndex"
                                                shape="circle">
                                            {{oneItem.title}}
                                            <Icon
                                                    type="close-round"
                                                    @click.native="deleteTreeNode(oneItem.nodeKey,oneIndex,index)">
                                            </Icon>
                                        </Button>
                                    </div>
                                    <div slot="footer" style="text-align:center" >
                                        <Button type="primary"  @click="sureEvent(index,item.treeType)">确定</Button>
                                        <Button class="op-btns cancel-btn" @click="cancelEvent(index)">取消</Button>
                                    </div>
                                </Modal>
                            </span>

                            <!-- type为9 = 普通文本文字 -->
                            <div v-if="item.type===9" style="display: inline-block">
                                <div>{{formDatas[item.keyName]}}</div>
                                <span v-if="item.text">{{item.text}}</span>
                            </div>

                            <!-- type为10  选择 -->
                            <Input
                                    v-if="item.type===10"
                                    v-model="formDatas[item.keyName]"
                                    readonly
                                    style="width:200px">
                            </Input>
                            <Button
                                    v-if="item.type===10"
                                    type="primary"
                                    @click="chooseBtnEvent">
                                {{item.btnLabel}}
                            </Button>
                            <div v-if="item.type===10" class="ivu-form-item-error-tip">{{item.errMsg}}</div>

                            <!-- type为11 = 日期选择 -->
                            <DatePicker
                                    v-if="item.type===11 && !item.double"
                                    :type="item.dateType"
                                    v-model="formDatas[item.keyName]"
                                    :options="startOptions"
                                    :transfer="true"
                                    :clearable="false"
                                    :editable="false"
                                    style="width: 200px">
                            </DatePicker>
                            <div v-if="item.type===11 && item.double" style="display: inline-block">
                                <DatePicker
                                        :type="item.dateType"
                                        v-model="formDatas[item.keyName]"
                                        :transfer="true"
                                        :clearable="false"
                                        :editable="false"
                                        :options="startOptions"
                                        style="width: 120px">
                                </DatePicker>
                                <span>&nbsp;&nbsp;至&nbsp;&nbsp;</span>
                                <DatePicker
                                        :type="item.dateType"
                                        v-model="formDatas[item.keyName1]"
                                        :transfer="true"
                                        :clearable="false"
                                        :editable="false"
                                        :options="endOptions"
                                        style="width: 120px">
                                </DatePicker>
                                <div class="ivu-form-item-error-tip">{{item.errMsg}}</div>
                            </div>

                            <!-- type为12 = 时间选择 -->
                            <TimePicker
                                    v-if="item.type===12 && !item.double"
                                    :type="item.timeType"
                                    :format="item.format || defaultFormat"
                                    v-model="formDatas[item.keyName]"
                                    :transfer="true"
                                    style="width: 200px">
                            </TimePicker>
                            <div v-if="item.type===12 && item.double" style="display: inline-block">
                                <TimePicker
                                        :type="item.timeType"
                                        :format="item.format || defaultFormat"
                                        v-model="formDatas[item.keyName]"
                                        :transfer="true"
                                        style="width: 200px">
                                </TimePicker>
                                至
                                <TimePicker
                                        :type="item.timeType"
                                        :format="item.format || defaultFormat"
                                        v-model="formDatas[item.keyName1]"
                                        :transfer="true"
                                        style="width: 200px">
                                </TimePicker>
                            </div>

                            <!-- type为13，单选文本输入框,一对一 -->
                            <div
                                    v-if="item.type===13"
                                    v-for="(oneItem,oneIndex) in item.optionList"
                                    :key="oneIndex"
                                    style="display: inline-block;margin-right: 10px">
                                <RadioGroup v-model="formDatas[item.keyName]">
                                    <Radio :label="oneItem.value">{{ oneItem.labelName }}</Radio>
                                    <Input v-model="formDatas[oneItem.keyName]" style="width:200px"></Input>
                                </RadioGroup>
                            </div>

                            <!-- type为14 = 单选文本框，多对一 -->
                            <RadioGroup v-if="item.type===14" v-model="formDatas[item.keyName]"><!--Object.keys(formDatas)[index]-->
                                <Radio
                                        v-for="(oneItem,oneIndex) in item.optionList"
                                        :label="oneItem.value"
                                        :key="oneIndex">
                                    {{ oneItem.labelName }}
                                </Radio>
                                <Input v-if="item.isChildShow" v-model="formDatas[item.keyName1]" style="width:200px"></Input>
                            </RadioGroup>

                            <!-- type为15 = 单行多列文本框,点击+可增加行 -->
                            <div v-if="item.type===15"
                                 style="border: 1px solid #dddee1; width: 80%; padding: 1% 3% 1% 1%; border-radius: 4px">
                                <div v-for="(oneItem,oneIndex) in item.colList"
                                     :key="oneIndex"
                                     style="margin-bottom: 20px">
                                    <div v-for="(twoItem,twoIndex) in oneItem.inputList"
                                         :key="twoIndex"
                                         style="display: inline-block; width: 500px">
                                        {{twoItem.label}}：
                                        <Input v-model="formDatas[item.keyName][oneIndex][twoItem.keyName]" style="width:200px; margin-left: 10px"></Input>
                                        <span v-if="twoItem.hasDec" style="color: red">*{{twoItem.hasDec}}</span>
                                    </div>
                                    <div v-if="(item.colList.length-1) == oneIndex" style="display: inline-block; cursor: pointer; margin-left: 30px" @click="addOrsubtractRow(1,oneIndex)">
                                        <Icon type="minus-circled" color="#5db2ff" size="20"></Icon>
                                    </div>
                                    <div style="display: inline-block; cursor: pointer; float: right" @click="addOrsubtractRow(2,oneIndex)">
                                        <Icon type="plus-circled" color="#5db2ff" size="20"></Icon>
                                    </div>
                                </div>
                                <div class="ivu-form-item-error-tip">{{item.errMsg}}</div>
                            </div>

                            <!-- type为16  文本+输入框  -->
                            <div v-if="item.type===16" style="display:inline-block;">
                                <span>{{item.textConBefore}}</span>
                                <Input
                                        v-model="formDatas[item.keyName]"
                                        style="width:150px">
                                </Input>
                                <span>{{item.textConAfter}}</span>
                            </div>

                            <!-- type为17 = 单行多列时间选择+文本框,点击+可增加行  -->
                            <div v-if="item.type===17"
                                 style="border: 1px solid #dddee1; width: 80%; padding: 1% 3% 1% 1%; border-radius: 4px">
                                <div v-for="(oneItem,oneIndex) in item.colList"
                                     :key="oneIndex"
                                     style="margin-bottom: 20px">
                                    <div v-for="(twoItem,twoIndex) in oneItem.inputList"
                                         :key="twoIndex"
                                         style="display: inline-block; width: 320px">
                                        {{twoItem.label}}：
                                        <Input v-if="twoItem.type==1"
                                               v-model="formDatas[item.keyName][oneIndex][twoItem.keyName]"
                                               style="width:200px; margin-left: 10px">
                                        </Input>
                                        <TimePicker v-if="twoItem.type==2"
                                                    v-model="formDatas[item.keyName][oneIndex][twoItem.keyName]"
                                                    :format="twoItem.format">
                                        </TimePicker>
                                        <span style="color: red">*{{twoItem.hasDec}}</span>
                                    </div>
                                    <div v-if="(item.colList.length-1) == oneIndex" style="display: inline-block; cursor: pointer; margin-left: 30px" @click="addOrsubtractRow(1,oneIndex)">
                                        <Icon type="minus-circled" color="#5db2ff" size="20"></Icon>
                                    </div>
                                    <div style="display: inline-block; cursor: pointer; float: right" @click="addOrsubtractRow(2,oneIndex)">
                                        <Icon type="plus-circled" color="#5db2ff" size="20"></Icon>
                                    </div>
                                </div>
                                <div class="ivu-form-item-error-tip">{{item.errMsg}}</div>
                            </div>

                            <!-- type为18 = 多图片上传 -->
                            <div v-if="item.type===18"
                                 style="border: 1px solid #dddee1; padding: 1%;width: 80%; height: 240px; border-radius: 4px">
                                <div style="width: 100%; height: 180px">
                                    <div v-for="(oneItem,oneIndex) in item.imgArr" :key="oneIndex"
                                         class="demo-upload-list">
                                        <template v-if="oneItem.status === 'finished'">
                                            <img :src="oneItem.url">
                                            <div class="demo-upload-list-cover">
                                                <Icon v-if="oneIndex != 0"
                                                      type="arrow-left-a" @click.native="handleMove(oneIndex,'left')">
                                                </Icon>
                                                <Icon v-if="oneIndex != (item.imgArr.length-1)"
                                                      type="arrow-right-a" @click.native="handleMove(oneIndex,'right')">
                                                </Icon>
                                                <Icon type="ios-trash-outline" @click.native="handleRemove(oneItem)"></Icon>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <Progress v-if="item.showProgress" :percent="item.percentage" hide-info></Progress>
                                        </template>
                                    </div>
                                </div>
                                <Upload ref="upload"
                                        :show-upload-list="false"
                                        :default-file-list="item.imgArr"
                                        :on-success="handleSuccess"
                                        :format="['jpg','jpeg','png']"
                                        :max-size="5120"
                                        :on-format-error="handleFormatError"
                                        :on-exceeded-size="handleMaxSize"
                                        :before-upload="handleBeforeUpload"
                                        multiple
                                        :data="item.data"
                                        :action="item.action">
                                    <Button type="primary" icon="ios-cloud-upload-outline">上传图片</Button>
                                    <span>最大可上传5MB的文件，一次性最多可选择5个文件上传</span>
                                </Upload>
                            </div>

                            <!-- type为19 = 颜色选择器 -->
                            <div v-if="item.type===19">
                                <ColorPicker v-model="defalutColor" recommend  @on-change="getColor" />
                            </div>

                            <!-- type为20 = 纵向多选框 -->
                            <div v-if="item.type===20" style="border: 1px solid #dddee1; width: 80%; border-radius: 4px; padding:6px 0">
                                <CheckboxGroup v-model="formDatas[item.keyName]"
                                               @on-change="checkAllGroupChange"
                                               style="display:inline-block; padding:0 0 6px 20px; overflow-y: auto;height: 350px; width: 100%">
                                    <div v-for="(oneItem,oneIndex) in item.optionList" :key="oneIndex">
                                        <Checkbox :label="oneItem.value">
                                            <span style="margin-right: 10px"></span>
                                            {{ oneItem.labelName }}
                                        </Checkbox>
                                    </div>
                                </CheckboxGroup>
                                <div style="border-top: 1px solid #dddee1; padding:6px 0 0 20px">
                                    <Checkbox
                                            :indeterminate="item.indeterminate"
                                            :value="item.checkAll"
                                            @click.prevent.native="handleCheckAll(item)">全选</Checkbox>
                                </div>
                            </div>

                            <!-- type为21 = 表格 -->
                            <Table v-if="item.type===21"
                                   :columns="item.colname"
                                   :data="item.tableData"
                                   :height="item.height"
                                   @on-select-all="selectAll"
                                   @on-select="selectOne"
                                   @on-select-cancel="cancelSelectOne">
                            </Table>

                            <!-- type为22 = 单行文本框树形控件 -->
                            <div v-if="item.type===22">
                                <Input
                                        v-model="formDatas[item.keyName]"
                                        :readonly="true"
                                        style="width: 200px">
                                </Input>
                                <Button type="primary"
                                        class="op-btns ok-btn"
                                        @click="showTreeModal(index,item.treeType)">
                                    {{item.btnLabel}}
                                </Button>
                                <Modal
                                        v-model="item.treeModal"
                                        :mask-closable="false">
                                    <p slot="header">
                                        <span>{{item.title}}</span>
                                    </p>
                                    <div style="overflow-y: auto;height: 250px" class="ivu-modal-body-div">
                                        <Tree v-if="item.treeData.length>0"
                                              :data="item.treeData"
                                              :multiple="item.multiple"
                                              :show-checkbox="item.multiple"
                                              :load-data="expandTree"
                                              @on-select-change="checkchange"
                                              @on-check-change="checkchange">
                                        </Tree>
                                    </div>
                                    <div slot="footer" style="text-align:center" >
                                        <Button type="primary" class="op-btns ok-btn" @click="cancelEvent(index)">关闭</Button>
                                    </div>
                                </Modal>
                            </div>

                            <span v-show="item.isRequired" class="message-title-red">*</span>
                            <span v-if="item.hasDec!='' && typeof(item.hasDec) == 'string'"
                                  :class="{'message-title-red':item.isRedDec,'message-title-gray':item.isGrayDec}">
                                {{item.hasDec}}
                            </span>
                        </FormItem>
                    </div>

                </div>
                <Col span="24">
                    <FormItem v-if="!isListPage" :label-width="1">
                        <div class="from-button-center">
                            <Button v-if="needSave" :loading="btnLoading" type="primary"  @click="handleSubmit(formName)" class="op-btns ok-btn">确定</Button>
                            <Button v-if="needReset"  @click="handleReset(formName)" class="op-btns resetbtn">重置</Button>
                            <Button @click="closePage" class="op-btns cancel-btn" >取消</Button>
                        </div>
                    </FormItem>
                </Col>
            </Row>
        </Form>
    </div>
</template>

<script>
    export default {
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
            ruleDatas : {
                type : Object
            },
            formItemList : {
                type : Array,
                required : true
            },
            isListPage : {
                type : Boolean,
            },
            isMixed : {
                type : Boolean,
                default : false
            },
            labelWidth : {
                type : Number,
                default : 140
            },
            rawData : {
                type : Object,
            },
            disabledStartDate : {   //禁用开始日期，[0]为之前，[1]为未来
                type : Array,
                default(){
                    return [9999,9999]
                }
            },
            disabledEndDate : {     //禁用结束日期
                type : Array,
                default(){
                    return [9999,9999]
                }
            },
            defalutColor : { //默认颜色
                type : String,
                default : ''
            },
            titleList : { //
                type : Array
            },
            btnLoading: {    //提交按钮点击后Loading效果
                type : Boolean,
                default : false
            },
            needSave: {    //新增修改是否需要确定按钮
                type : Boolean,
                default : true
            },
            needReset: {    //新增修改是否需要重置按钮
                type : Boolean,
                default : false
            },
            disabledStart: {   //从哪天开始禁用之前之后
                type : Number,
                required : false
            },
            disabledEnd: {   //从哪天开始禁用之前之后
                type : Number,
                required : false
            }
        },
        data(){
            return{
                currentPageName: this.$route.name,
                belongPageName: '',
                mixedValue: [],
                hasSelected: [],
                imgUrl: 'http://192.168.0.108:4869/8403bace7a66ce91b42592f42f54a86b',   //默认图片
                imgUrl1: '',
                areArr: [],
                areIdArr: [],
                inputArr: {}, //部分新增页专用
                startOptions:{
                    disabledDate:date => {
                        let start = this.disabledStart ? this.disabledStart : Date.now();
                        return date && date.valueOf() < start - (this.disabledStartDate[0]+1)*24*60*60*1000
                            || date.valueOf() > start + this.disabledStartDate[1]*24*60*60*1000;
                    }
                },
                endOptions:{
                    disabledDate:date => {
                        let end = this.disabledEnd ? this.disabledEnd : Date.now();
                        return date && date.valueOf() < end - (this.disabledEndDate[0]+1)*24*60*60*1000
                            || date.valueOf() > end + this.disabledEndDate[1]*24*60*60*1000;
                    }
                },
                // 默认时间选择器格式
                defaultFormat: 'HH:mm:ss',
            }
        },
        methods: {
            //提交表单
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        this.$emit('getFormData',this.formDatas);
                    } else {
                        this.$Modal.warning({
                            title: '温馨提示',
                            content: '验证失败！请根据提示完善输入信息后重试'
                        });
                    }
                })
            },
            //重置
            handleReset (name) {
                this.$refs[name].resetFields();
                if(this.isListPage){
                    this.$emit('clearFormData')
                }
            },
            //关闭当前页
            closePage () {
                if(!this.isClose) {
                    this.$emit('closeCurrentPage');
                    return;
                }
                this.$req.closePage(this)
            },
            //非列表页下拉列表选项改变时
            selectedChange (val) {
                this.$emit('selectedChange',val)
            },
            //获取上传文件
            getFile(res){
                this.imgUrl = res.data.info.url;
                this.formDatas['imageAddr'] = res.data.info.url
            },
            //递归遍历树形省，市等
            digui (treeData1,treeData2,key) {
                for(let data of treeData1){
                    if(data.title == key){
                        this.areArr.unshift(data.parent,data.title);
                        this.areIdArr.unshift(data.parentId,data.szregionalid);
                        if(data.level>2){
                            this.digui(treeData2,treeData2,data.parent)
                        }
                    } else {
                        if(data.children && data.children.length > 0){
                            this.digui(data.children,treeData2,key)
                        }
                    }
                }
            },
            //树形弹窗选择节点值赋到文本域中并关闭弹窗
            sureEvent (index,treeType) {
                let [arr,idArr] = [[],[]];
                if(treeType === 1){
                    for(let obj of this.hasSelected){
                        arr.push(obj.parent,obj.title);
                        idArr.push(obj.szregionalid)
                    }
                } else if(treeType === 2){
                    for(let obj of this.hasSelected){
                        this.digui(this.formItemList[index].treeData,this.formItemList[index].treeData,obj.title);
                        arr = this.areArr;
                        idArr = this.areIdArr;
                    }
                }

                arr = Array.from(new Set(arr));
                idArr = Array.from(new Set(idArr));

                for(let obj of this.formItemList){
                    if(obj.type === 8 && obj.treeType === treeType){
                        this.formDatas[obj.keyName] = arr.join();
                        this.formDatas[obj.keyName1] = idArr.join();
                        if(treeType === 1){
                            this.formDatas[obj.keyName1] = ','+this.formDatas[obj.keyName1] +','
                        }
                    }
                }
                this.formItemList[index].treeModal = false
            },
            //关闭弹窗
            cancelEvent (index) {
                this.formItemList[index].treeModal = false
            },
            //选择树形节点并过滤掉所有父节点
            checkchange (arr) {
                if (arr[0].type === 4) {
                    this.formDatas[this.formItemList[arr[0].formItemListIndex].keyName] = arr[0].szregionalname;
                    this.formDatas[this.formItemList[arr[0].formItemListIndex].keyName1] = arr[0].szregionalid;
                    this.formItemList[arr[0].formItemListIndex].treeModal = false
                } else {
                    let newArr = arr.filter((item)=>{
                        if(!item.children){
                            return item
                        }
                    });
                    // if (newArr.length > 1 && newArr[0].type > 2) {
                    //     newArr.map((item,index) => {
                    //         if (index !== newArr.length-1)
                    //         item.checked = false
                    //     });
                    //     newArr.splice(0, newArr.length-1)
                    // }
                    if (newArr.length === 1 && newArr[0].type > 2 && newArr[0].level === 4){
                        this.formDatas[this.formItemList[newArr[0].formItemListIndex].keyName] = newArr[0].name;
                        this.formDatas[this.formItemList[newArr[0].formItemListIndex].keyName1] = newArr[0].id;
                        this.formItemList[newArr[0].formItemListIndex].treeModal = false
                    } else {
                        this.hasSelected = newArr;
                    }
                }
            },
            //点击选中的树形列表进行删除
            deleteTreeNode (nodeKey,index1,index2) {
                this.hasSelected.splice(index1,1);
                this.changeTreeStatus(nodeKey,this.formItemList[index2].treeData);
            },
            //根据节点遍历树形，匹配后改变选中状态
            changeTreeStatus (nodeKey,data){
                for(let i in data){
                    if(data[i].nodeKey === nodeKey){
                        this.$set(data[i],'checked',false);
                        break;
                    } else {
                        this.changeTreeStatus (nodeKey,data[i].children)
                    }
                }
                // return data;
            },
            //点击出现树形弹窗并获取第一层结构数据
            showTreeModal(index,type){
                let type1 = 'is' + type + 0;
                this.$set(this.formItemList[index],'treeModal',true);
                if (type !== 3){
                    let params = {
                        iregionalid: 0
                    };
                    // if(this.$store.state.page.httpArr.indexOf(type1) === -1){
                    this.$req.chooseTreeNode('/sys/sourceRegion/v1/getLowerRegion', this, params)
                        .then(res =>{
                            let data = res.data.data;
                            for(let obj of data){
                                if(obj.hasnext){
                                    obj.title = obj.szregionalname;
                                    obj.loading = false;
                                    obj.children = [];
                                    obj.level = this.$store.state.page.level;
                                    obj.type = type;
                                    obj.formItemListIndex = index
                                }
                            }
                            this.$set(this.formItemList[index],'treeData',data);
                            this.$store.commit('saveHttpArr',type1)
                        })
                    // }
                } else if (type === 3){
                    this.$req.chooseTreeNode('/sys/company/v1/comapntTree',this)
                        .then(res =>{
                            let data = res.data.data;
                            for(let obj of data){
                                if(obj.hasnext){
                                    obj.title = obj.name;
                                    obj.loading = false;
                                    obj.children = [];
                                    obj.level = this.$store.state.page.level;
                                    obj.type = type;
                                    obj.formItemListIndex = index;
                                    obj.render = (h ,{}) => {
                                        return h('span', [
                                            h('Icon', {
                                                props: {
                                                    type: 'ios-home',
                                                    size: 16
                                                },
                                                style: {
                                                    marginRight: '8px'
                                                }
                                            }),
                                            h('span', obj.title)
                                        ])
                                    }
                                }
                            }
                            this.$set(this.formItemList[index],'treeData',data);
                            this.$store.commit('saveHttpArr',type1)
                        })
                }
            },
            //展开树形结构获取下一级数据
            expandTree(item,cb){
                if (item.type != 3) {
                    let type = 'is'+item.type+item.szregionalid;
                    // if(this.$store.state.page.httpArr.indexOf(item.szregionalid) === -1){
                    let url = '/sys/sourceRegion/v1/getLowerRegion';
                    if(item.level < 3){
                        let params = {
                            iregionalid: item.szregionalid
                        };
                        this.$req.chooseTreeNode(url,this,params)
                            .then(res =>{
                                let data = res.data.data;
                                for(let obj of data){
                                    if(obj.hasnext){
                                        obj.title = obj.szregionalname;
                                        obj.loading = false;
                                        obj.children = [];
                                        obj.level = item.level+1;
                                        obj.type = item.type;
                                        obj.formItemListIndex = item.formItemListIndex;
                                        obj.parent = item.title;
                                        obj.parentId = item.szregionalid
                                    }
                                }
                                cb(data);
                                this.$store.commit('saveHttpArr',type)
                            })
                    } else if(item.level === 3){
                        if(item.type === 1){
                            url = '/ticket/provider/v1/getScenicesByCityId/'+item.szregionalid+'?access_token='+sessionStorage.getItem('name');
                            this.$req.chooseTreeNode(url, this)
                                .then(res =>{
                                    let data = res.data.data;
                                    for(let obj of data){
                                        obj.title = obj.szregionalname;
                                        obj.parent = item.title;
                                    }
                                    cb(data);
                                    this.showCheckBox(item.formItemListIndex,type)
                                })
                        } else if (item.type === 2) {
                            let params = {
                                iregionalid: item.szregionalid
                            };
                            this.$req.chooseTreeNode(url, this, params)
                                .then(res =>{
                                    let data = res.data.data;
                                    for(let obj of data){
                                        obj.title = obj.szregionalname;
                                        obj.parent = item.title;
                                        obj.parentId = item.szregionalid;
                                        obj.level = item.level+1;
                                    }
                                    cb(data);
                                    this.showCheckBox(item.formItemListIndex,type)
                                });
                        } else if (item.type === 4) {
                            let params = {
                                iregionalid: item.szregionalid
                            };
                            this.$req.chooseTreeNode(url, this, params)
                                .then(res =>{
                                    let data = res.data.data;
                                    for(let obj of data){
                                        obj.title = obj.szregionalname;
                                        obj.parent = item.title;
                                        obj.type = item.type;
                                        obj.formItemListIndex = item.formItemListIndex;
                                        obj.parentId = item.szregionalid;
                                        obj.level = item.level+1;
                                    }
                                    cb(data);
                                    this.showCheckBox(item.formItemListIndex,type)
                                });
                        }
                    }
                    // }
                } else {
                    let type = 'is'+item.type+item.id;
                    let params = {};
                    switch (item.level) {
                        case 1:
                            params = {
                                id: item.id,
                                type: 0
                            };
                            break;
                        case 2:
                            params = {
                                id: item.id,
                                type: 1,
                                icompanyid: item.icompanyid,
                            };
                            break;
                        case 3:
                            params = {
                                id: item.id,
                                type: 3,
                                icompanyid: item.icompanyid,
                                deptid: item.deptid
                            };
                            break;
                        default: break;
                    }
                    this.$req.chooseTreeNode('/sys/company/v1/comapntTree',this,params)
                        .then (res => {
                            let data = res.data.data;
                            for(let obj of data){
                                if (obj.hasnext){
                                    obj.title = obj.name;
                                    obj.loading = false;
                                    obj.children = [];
                                    obj.level = item.level+1;
                                    obj.type = item.type;
                                    obj.formItemListIndex = item.formItemListIndex;
                                    obj.render = (h ,{}) => {
                                        return h('span', [
                                            h('Icon', {
                                                props: {
                                                    type: 'settings',
                                                    size: 16
                                                },
                                                style: {
                                                    marginRight: '8px'
                                                }
                                            }),
                                            h('span', obj.title)
                                        ])
                                    };
                                    cb(data);
                                    this.$store.commit('saveHttpArr',type)
                                } else {
                                    obj.title = obj.name;
                                    obj.formItemListIndex = item.formItemListIndex;
                                    obj.type = item.type;
                                    obj.level = item.level+1;
                                    obj.render = (h ,{}) => {
                                        return h('span', [
                                            h('Icon', {
                                                props: {
                                                    type: 'person',
                                                    size: 16
                                                },
                                                style: {
                                                    marginRight: '8px'
                                                }
                                            }),
                                            h('span', obj.title)
                                        ])
                                    };
                                    cb(data);
                                    this.showCheckBox(item.formItemListIndex,type)
                                }
                            }
                        })
                }
            },
            // 树形结构最后一层显示多选框
            showCheckBox (index,type) {
                if (type < 3) {
                    this.formItemList[index].multiple = true;
                    this.formItemList[index].showCheckBox = true;
                }
                this.$store.commit('saveHttpArr',type)
            },
            //增加或者减少文本输入行
            addOrsubtractRow (num,index) {
                this.$emit('addOrsubtractRow', num, index)
            },
            chooseBtnEvent () {
                this.$emit('chooseBtnEvent')
            },
            //移动图片位置
            handleMove (index,direction) {
                this.$emit('handleMove',index,direction)
            },
            //上传图片成功
            handleSuccess(res, file, fileList) {
                this.$emit('handleSuccess',fileList)
            },
            //纵向多选框全选
            handleCheckAll(item) {
                if (item.indeterminate) {
                    item.checkAll = false;
                } else {
                    item.checkAll = !item.checkAll;
                }
                item.indeterminate = false;
                if (item.checkAll) {
                    let arr = [];
                    for (let i = 0; i < item.optionList.length; i++) {
                        arr.push(item.optionList[i].value)
                    }
                    this.formDatas[item.keyName] = arr;
                } else {
                    this.formDatas[item.keyName] = [];
                }
            },
            //判断是否全选
            checkAllGroupChange (data) {
                let item = this.formItemList;
                for (let i = 0; i < item.length; i++) {
                    if (item[i].type == 20) {
                        if (data.length === item[i].optionList.length) {
                            item[i].indeterminate = false;
                            item[i].checkAll = true;
                        } else if (data.length > 0) {
                            item[i].indeterminate = true;
                            item[i].checkAll = false;
                        } else {
                            item[i].indeterminate = false;
                            item[i].checkAll = false;
                        }
                        break;
                    }
                }
            },
            //颜色选择器颜色变化
            getColor (color) {
                this.$emit('getSelectColor', color);
            },
            //多选表格选中某一项
            selectOne (arr, row) {
                this.$emit('selectOne', arr, row);
            },
            //多选表格取消选中某一项
            cancelSelectOne (arr, row) {
                this.$emit('cancelSelectOne', arr, row);
            },
            //多选表格全选
            selectAll (arr) {
                this.$emit('selectAll', arr);
            }
        },
        created () {

        },
    };
</script>
