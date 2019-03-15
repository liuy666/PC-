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
        .ivu-radio-wrapper:nth-child(5) {
            float: right;
            margin-left: 30px;
        }
    }
    .input-default {
        width:  200px;
    }
    .input-small {
        width : 100px;
    }
    .input-tiny {
        width : 70px;
    }
    .input-300 {
        width : 300px;
    }
    .input-middle {
        width : 450px;
    }
    .input-large {
        width: 80%;
    }
    .form-option-input{
        width:  200px;
    }
    .demo-upload-list{
        display: inline-block;
        width: 200px;
        height: 180px;
        text-align: center;
        line-height: 180px;
        /*border: 1px solid transparent;*/
        overflow: hidden;
        background: #fff;
        position: relative;
        /*box-shadow: 0 1px 1px rgba(0,0,0,.2);*/
        margin-right: 4px;
    }
    .demo-upload-list img{
        width: 100%;
        height: 150px;
        display: block;
        border-radius: 4px;
        box-shadow: 0 1px 1px rgba(0,0,0,.2);
    }
    .demo-upload-list-cover{
        display: none;
        position: absolute;
        height: 150px;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        background: rgba(0,0,0,.6);
    }
    .demo-upload-list:hover .demo-upload-list-cover{
        display: block;
    }
    .demo-upload-list-cover i{
        color: #fff;
        font-size: 30px;
        cursor: pointer;
        margin: 0 10px;
    }

    .single-img{
        width:150px;
        height: 150px;
        line-height: 165px;
        text-align: center;
        position: relative;
        &-cover{
            width: 100%;
            display: none;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0,0,0,.6);
        }
        &:hover &-cover{
            display: block;
            i{
                color: #fff;
                font-size: 30px;
                cursor: pointer;
                margin: 0 10px;
            }
        }
    }

    /* 单选框自定义宽度 */
    .custom-width {
        width: 200px;
    }

    /* 图片上传框样式 */
    .uploadStyle {
        line-height: 200px;
        position: relative;
        text-align: center;
        width: 200px;
        border: 1px solid #ccc;
        border-radius: 4px;
        overflow: hidden;
        padding: 2px;
        background-color: #f5f5f5;
        margin-bottom: 10px;
        .single-img-cover{
            width: 100%;
            display: none;
            position: absolute;
            top: 0;
            bottom: 0;
            left: 0;
            right: 0;
            background: rgba(0,0,0,.6);
        }
        &:hover .single-img-cover{
            display: block;
            i{
                color: #fff;
                font-size: 30px;
                cursor: pointer;
                margin: 0 10px;
            }
        }
    }
    .uploadDefaultStyle {
        width: 200px;
        height: 200px;
        background-color: #f5f5f5;
        border: 1px solid #ccc;
        border-radius: 4px;
        overflow: hidden;
        margin-bottom: 10px;
    }
    .manyRowCheckBox .ivu-checkbox-wrapper{
        margin-right: 30px;
    }

    #map{
        height: 350px
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
                <Col v-if="!isListPage && !item.noShow"
                     v-for="(item,index) in formItemList"
                     :key="index"
                     :span="item.cols ? item.cols : 24">
                    <FormItem
                            :label="item.label==''?'':item.label + '：'"
                            :prop="item.keyName"
                            :class="{'form-area-formItem':item.hasTitle}"
                            v-show="!item.isHidden"
                            :label-width="item.labelWidth">

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
                                    :disabled="oneItem.disabled"
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
                                @on-change = "selectedChange"
                                :style="{ width: item.customeWidth || '200px' }">
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
                                :disabled="item.disabled"
                                :style="{ width: item.customeWidth || '200px' }">
                            <Option
                                    v-for="(oneItem,oneIndex) in item.optionList"
                                    :value="oneItem.value"
                                    :key="oneIndex">
                                {{ oneItem.label }}
                            </Option>
                        </Select>

                        <!-- type为5 = 单图片上传显示缩略图 -->
                        <div v-if="item.type===5">
                            <div v-if="formDatas[item.keyName]"
                                 class="single-img">
                                <img style="width: 100%; height: 100%; display: block" :src="formDatas[item.keyName]" alt="">
                                <div class="single-img-cover">
                                    <Icon type="ios-trash-outline"
                                          @click.native="removeImage(item.keyName)"></Icon>
                                </div>
                            </div>
                            <div v-else style="width:150px; height:150px; background-color: #f2f2f2; border: 1px solid #d1dae1"></div>

                            <Upload
                                    v-if="item.type===5"
                                    :action="item.action"
                                    :data="item.data"
                                    :show-upload-list="false"
                                    :on-success="getFile">
                                <Button type="primary" icon="ios-cloud-upload-outline">{{item.btnLabel}}</Button>
                            </Upload>
                        </div>

                        <!-- 2018-7-21 添加 -->
                        <!-- type为5.1 文件上传2 -->
                        <div v-if="item.type==='5.1'" style="display:inline-block;">
                            <Upload
                                    :action="item.action"
                                    :show-upload-list="false"
                                    :on-success="hook_before"
                                    :data="item.params"
                                    style="display:inline-block;margin-right:15px;">
                                <p style="float:left;margin-right:10px;">（点击前）</p>
                                <div style="float:left;">
                                    <template v-if="formDatas[item.keyName_before]">
                                        <div class="uploadStyle">
                                            <img style="width: 100%;display:block" :src="formDatas[item.keyName_before]" alt="" />
                                            <div class="single-img-cover">
                                                <Icon type="ios-trash-outline"
                                                      @click.native="removeImage(item.keyName_before)"></Icon>
                                            </div>
                                        </div>
                                    </template>
                                    <div v-else class="uploadDefaultStyle"></div>
                                    <Button type="primary" icon="ios-cloud-upload-outline">点击上传</Button>
                                </div>
                            </Upload>
                            <Upload
                                    :action="item.action"
                                    :show-upload-list="false"
                                    :on-success="hook_after"
                                    :data="item.params"
                                    style="display:inline-block;margin-right:15px;">
                                <p style="float:left;margin-right:10px;">（点击后）</p>
                                <div style="float:left;">
                                    <template v-if="formDatas[item.keyName_after]">
                                        <div class="uploadStyle">
                                            <img style="width: 100%;display:block" :src="formDatas[item.keyName_after]" alt="" />
                                            <div class="single-img-cover">
                                                <Icon type="ios-trash-outline"
                                                      @click.native="removeImage(item.keyName_after)"></Icon>
                                            </div>
                                        </div>
                                    </template>
                                    <div v-else class="uploadDefaultStyle"></div>
                                    <Button type="primary" icon="ios-cloud-upload-outline">点击上传</Button>
                                </div>
                            </Upload>
                        </div>

                        <!-- type为5.2 文件上传3-->
                        <Upload
                                v-if="item.type==='5.2'"
                                :action="item.action_single"
                                :show-upload-list="false"
                                :on-success="hook_single"
                                :data="item.params"
                                style="display:inline-block;">
                            <template v-if="formDatas[item.keyName]">
                                <div class="uploadStyle">
                                    <img style="width: 100%;display:block" :src="formDatas[item.keyName]" alt="" />
                                    <div class="single-img-cover">
                                        <Icon type="ios-trash-outline"
                                              @click.native="removeImage(item.keyName)"></Icon>
                                    </div>
                                </div>
                            </template>
                            <template v-else>
                                <div class="uploadDefaultStyle"></div>
                            </template>
                            <Button type="primary" icon="ios-cloud-upload-outline">{{item.btnLabel}}</Button>
                        </Upload>



                        <!-- type为7 = 多行输入框 -->
                        <Input
                                v-if="item.type===7"
                                v-model="formDatas[item.keyName]"
                                type="textarea" style="width:70%;"
                                :disabled="item.disabled"
                                :rows="3"
                                :placeholder="item.placeholder">
                        </Input>

                        <!-- type为8 = 多行输入框型树形控件 -->
                        <span v-if="item.type===8">
                            <div>
                                <Input
                                        v-model="formDatas[item.keyName]"
                                        :readonly="true"
                                        type="textarea"
                                        style="width:70%;"
                                        :rows="3">
                                </Input>
                            </div>
                            <div style="display: inline-block">
                                <Button type="primary" @click="showTreeModal(index,item.treeType)">{{item.btnLabel}}</Button>
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
                                <div v-if="item.treeType!==3" id="selected-treenode"
                                     style="border-top: 1px solid #e9eaec; margin: 0 -16px; padding: 0 16px">
                                    <div style="display:inline-block;padding: 12px 0 14px">已{{item.title}}:</div>
                                    <Button
                                            v-for="(oneItem,oneIndex) in item.hasSelected"
                                            :key="oneIndex"
                                            type="ghost"
                                            shape="circle">
                                        {{oneItem.title}}
                                        <Icon type="close-round"
                                              @click.native="deleteTreeNode(oneItem.nodeKey,oneIndex,index)">
                                        </Icon>
                                    </Button>
                                </div>
                                <div slot="footer" style="text-align:center" >
                                    <Button type="primary"  @click="sureEvent(index,item.treeType)">确定</Button>
                                    <Button type="ghost" @click="cancelEvent(index)">取消</Button>
                                </div>
                            </Modal>
                        </span>

                        <!-- type为9 = 普通文本文字 -->
                        <span v-if="item.type===9">
                            <div>{{formDatas[item.keyName]}}</div>
                            <span v-if="item.text">{{item.text}}</span>
                        </span>

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
                                class="op-btns ok-btn"
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
                                    style="width: 200px">
                            </DatePicker>
                            <span>至</span>
                            <DatePicker
                                    :type="item.dateType"
                                    v-model="formDatas[item.keyName1]"
                                    :transfer="true"
                                    :clearable="false"
                                    :editable="false"
                                    :options="endOptions"
                                    style="width: 200px">
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
                                :clearable="false"
                                :editable="false"
                                style="width: 200px">
                        </TimePicker>
                        <div v-if="item.type===12 && item.double" style="display: inline-block">
                            <TimePicker
                                    :type="item.timeType"
                                    :format="item.format || defaultFormat"
                                    v-model="formDatas[item.keyName]"
                                    :transfer="true"
                                    :clearable="false"
                                    :editable="false"
                                    style="width: 200px">
                            </TimePicker>
                            至
                            <TimePicker
                                    :type="item.timeType"
                                    :format="item.format || defaultFormat"
                                    v-model="formDatas[item.keyName1]"
                                    :transfer="true"
                                    :clearable="false"
                                    :editable="false"
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
                                <Input v-model="formDatas[oneItem.keyName]"
                                       @on-focus = "focusInput(oneItem.value)"
                                       :class="oneItem.className ? oneItem.className : 'input-default'">
                                </Input>
                                <span v-if="oneItem.dec">{{oneItem.dec}}</span>
                            </RadioGroup>
                        </div>
                        <div v-if="item.type===13" class="ivu-form-item-error-tip">{{item.errMsg}}</div>

                        <!-- type为14 = 单选文本框，多对一 -->
                        <RadioGroup v-if="item.type===14" v-model="formDatas[item.keyName]"><!--Object.keys(formDatas)[index]-->
                            <Radio
                                    v-for="(oneItem,oneIndex) in item.optionList"
                                    :label="oneItem.value"
                                    :key="oneIndex">
                                {{ oneItem.labelName }}
                            </Radio>
                            <Input v-if="item.isChildShow"
                                   v-model="formDatas[item.keyName1]"
                                   :class="item.className ? item.className : 'input-default'">
                            </Input>
                            <span v-if="item.dec">{{item.dec}}</span>
                        </RadioGroup>

                        <!-- type为15 = 单行多列文本框,点击+可增加行 -->
                        <div v-if="item.type===15"
                             style="border: 1px solid #dddee1; width: 70%; padding: 20px 3% 0 1%; border-radius: 4px">
                            <div v-for="(oneItem,oneIndex) in item.colList"
                                 :key="oneIndex"
                                 style="margin-bottom: 20px">
                                <div v-for="(twoItem,twoIndex) in oneItem.inputList"
                                     :key="twoIndex"
                                     style="display: inline-block; width: 40%">
                                    {{twoItem.label}}：
                                    <Input v-model="formDatas[item.keyName][oneIndex][twoItem.keyName]" style="width:100px; margin-left: 10px"></Input>
                                    <span v-if="twoItem.hasDec" style="color: red">*{{twoItem.hasDec}}</span>
                                </div>
                                <div style="display: inline-block">
                                    <div v-if="(item.colList.length-1) == oneIndex" style="display: inline-block; cursor: pointer; margin-right: 30px" @click="addOrsubtractRow(1,oneIndex)">
                                        <Icon type="minus-circled" color="#5db2ff" size="20"></Icon>
                                    </div>
                                    <div v-else style="display: inline-block; cursor: pointer; margin-right: 30px; visibility: hidden">
                                        <Icon type="minus-circled" color="#5db2ff" size="20"></Icon>
                                    </div>
                                    <div style="display: inline-block; cursor: pointer; float: right" @click="addOrsubtractRow(2,oneIndex)">
                                        <Icon type="plus-circled" color="#5db2ff" size="20"></Icon>
                                    </div>
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
                             style="border: 1px solid #dddee1; width: 80%; padding: 20px 3% 0 1%; border-radius: 4px">
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
                                                :clearable="false"
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
                             style="border: 1px solid #dddee1; padding: 1%;
                                    width: 80%; height: 270px; border-radius: 4px">
                            <div style="height: 210px; overflow-x: auto; white-space:nowrap">
                                <div v-for="(oneItem,oneIndex) in formDatas[item.keyName]"
                                     :key="oneIndex"
                                     class="demo-upload-list">
                                    <template v-if="oneItem.status === 'finished'">
                                        <img :src="oneItem.response.data.info.url">
                                        <div style="height: 30px; line-height: 30px">{{oneItem.name}}</div>
                                        <div class="demo-upload-list-cover">
                                            <Icon v-if="oneIndex !== 0"
                                                  type="arrow-left-a" @click.native="handleMove(oneIndex,'left')">
                                            </Icon>
                                            <Icon v-if="oneIndex !== (formDatas[item.keyName].length-1)"
                                                  type="arrow-right-a" @click.native="handleMove(oneIndex,'right')">
                                            </Icon>
                                            <Icon type="ios-trash-outline" @click.native="handleImgRemove(oneIndex,oneItem)"></Icon>
                                        </div>
                                    </template>
                                    <template v-else>
                                        <Progress v-if="oneItem.showProgress" :percent="oneItem.percentage"></Progress>
                                    </template>
                                </div>
                            </div>
                            <Upload ref="uploadImg"
                                    :show-upload-list="false"
                                    :default-file-list="item.imgArr"
                                    :on-success="getFiles"
                                    :on-format-error="handleFormatError"
                                    :on-exceeded-size="handleMaxSize"
                                    :format="['jpg','jpeg','png']"
                                    :max-size="5120"
                                    multiple
                                    :data="item.data"
                                    :action="item.action">
                                <Button type="primary" icon="ios-cloud-upload-outline">上传图片</Button>
                                <span>最大可上传5MB的文件</span>
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
                        <div v-if="item.type===21"
                             :style="{width: item.width ? item.width : '100%'}">
                            <Table
                                    :columns="item.colname"
                                    :data="item.tableData"
                                    :height="item.height"
                                    :size="item.size"
                                    :border="item.border"
                                    stripe
                                    @on-select-all="selectAll"
                                    @on-select="selectOne"
                                    @on-select-cancel="cancelSelectOne"
                                    @on-selection-change="selectHasChanged">
                            </Table>
                        </div>

                        <!-- type为22 = 单选树形控件 -->
                        <div v-if="item.type===22">
                            <Input
                                    v-model="formDatas[item.keyName]"
                                    :readonly="true"
                                    style="width: 200px">
                            </Input>
                            <Button type="primary" @click="showTreeModal(index,item.treeType)">{{item.btnLabel}}</Button>
                            <Modal
                                    v-model="item.treeModal"
                                    :mask-closable="false">
                                <p slot="header" style="color:#5db2ff;">
                                    <span>{{item.title}}</span>
                                </p>
                                <div style="overflow-y: auto;height: 250px">
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
                                    <Button type="ghost" @click="cancelEvent(index)">关闭</Button>
                                </div>
                            </Modal>
                        </div>

                        <!-- type为23 = 多选组 可增减行 -->
                        <div v-if="item.type===23" class="manyRowCheckBox" style="border:1px solid #dddee1;padding:20px 30px ;box-sizing:border-box;">
                            <div v-for="(firstItem,firstIndex) in item.divList " :key="firstIndex" style="height:50px;line-height:50px;position:relative;">
                                <div v-if="item.numWordArr" style="display:inline-block;width:5%;min-width:65px;position:absolute;">
                                    <span>{{item.wordDec}}{{item.numWordArr[firstIndex]}}：</span>
                                </div>
                                <div v-if="formDatas[item.keyName]" style="display:inline-block;width:80%;margin-left:5%;">
                                    <CheckboxGroup v-if="formDatas[item.keyName][firstIndex]['step']" v-model="formDatas[item.keyName][firstIndex]['step']" >
                                        <Checkbox v-for="(oneCheckBox,secondIndex) in firstItem.optionList" :key="secondIndex" :label="oneCheckBox.value"
                                                  v-if="oneCheckBox.value!=''">{{oneCheckBox.label}}</Checkbox>
                                        <span v-else>{{oneCheckBox.label}}</span>
                                    </CheckboxGroup>
                                </div>
                                <div style="display:inline-block;position:absolute;width:100px;text-align:right;">
                                    <div v-if="firstIndex!=0" style="display: inline-block; cursor: pointer;margin-right:30px;" @click="addOrsubtractRow(1,firstIndex)">
                                        <Icon type="minus-circled" color="#5db2ff" size="20"></Icon>
                                    </div>
                                    <div style="display: inline-block; cursor: pointer;" @click="addOrsubtractRow(2,firstIndex)">
                                        <Icon type="plus-circled" color="#5db2ff" size="20"></Icon>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- type为24 = 权限树形 -->
                        <div v-if="item.type===24" style="border: 1px solid #dddee1; width: 80%; border-radius: 4px; padding:6px 0">
                            <Tree style="display:inline-block; padding:0 0 6px 20px; overflow-y: auto;height: 335px; width: 100%"
                                  :data="item.treeData"
                                  :ref="item.treeName"
                                  :multiple="true"
                                  :show-checkbox="true">
                            </Tree>
                            <div style="border-top: 1px solid #dddee1; padding:6px 0 0 20px">
                                <Checkbox
                                        :indeterminate="item.indeterminate"
                                        :value="item.checkAll"
                                        @click.prevent.native="selectTreeAllData(item.checkAll)">
                                    <span>全选</span>
                                </Checkbox>
                            </div>
                        </div>

                        <!-- type为26 = 单图片上传显示缩略图 -->
                        <Upload
                                v-if="item.type===26"
                                :action="item.action"
                                :data="item.data"
                                :show-upload-list="false"
                                :on-success="getFile1">
                            <Button type="primary" icon="ios-cloud-upload-outline">{{item.btnLabel}}</Button>
                        </Upload>

                        <!-- type为27 = excel文件上传 -->
                        <Input v-if="item.type===27"
                               :readonly="true"
                               class="input-default"
                               v-model="formDatas[item.keyName]">
                        </Input>
                        <div v-if="item.type===27" style="display: inline-block">
                            <Upload ref="excel"
                                    :action="item.action"
                                    :data="item.data"
                                    :show-upload-list="false"
                                    :format="['xls','xlsx']"
                                    :before-upload="handleBeforeUpload"
                                    :on-format-error="handleFormatError"
                                    :on-success="getFile1">
                                <Button type="primary" icon="ios-cloud-upload-outline">{{item.btnLabel}}</Button>
                            </Upload>
                        </div>

                        <!-- 检票设置管理新增页-入园预案可增减下拉列表组-->
                        <div v-if="item.type === 'selectGroup'" style="overflow:hidden;">
                            <Select
                                    v-for="(cItem,idx) in item.configList"
                                    v-model="formDatas.selectGroup[idx][cItem.keyName]"
                                    :key="idx"
                                    style="width:200px; margin-right:15px;float:left;">
                                <Option
                                        v-for="sItem in cItem.optionList"
                                        :value="sItem.value"
                                        :key="sItem.value">{{ sItem.label }}</Option>
                            </Select>
                            <Icon
                                    type="android-remove-circle"
                                    color="#2d8cf0"
                                    size="20"
                                    style="margin:5px 15px 0;float:left;cursor:pointer;"
                                    @click="reduceSelect"></Icon>
                            <Icon
                                    type="android-add-circle"
                                    color="#2d8cf0"
                                    size="20"
                                    style="float:left;margin-top:5px;cursor:pointer;"
                                    @click="increaseSelect"></Icon>
                        </div>

                        <span v-show="item.isRequired" class="message-title-red">*</span>
                        <span v-if="item.hasDec!='' && typeof(item.hasDec) == 'string'"
                              :class="{'message-title-red':item.isRedDec,'message-title-gray':item.isGrayDec}">
                            {{item.hasDec}}
                        </span>
                    </FormItem>
                </Col>
                <Col span="24">
                    <FormItem v-if="!isListPage" :label-width="1">
                        <div class="from-button-center">
                            <Button :loading="btnLoading"
                                    type="primary"
                                    @click="handleSubmit(formName)"
                                    class="op-btns ok-btn">
                                确定
                            </Button>
                            <Button v-if="needReset" @click="handleReset(formName)"
                                    class="op-btns">
                                重置
                            </Button>
                            <Button @click="closePage" class="op-btns cancel-btn" >
                                取消
                            </Button>
                        </div>
                    </FormItem>
                </Col>
            </Row>

            <!-- 列表页的查询表单项 -->
            <div class="main_picker">
                <div :class="item.class==undefined?'float_option':item.class"
                     v-if="isListPage && !isMixed"
                     v-for="(item,index) in formItemList"
                     :key="index">
                    <FormItem
                            :label="item.label==''?'':item.label + '：'"
                            :prop="item.keyName"
                            :label-width="item.labelWidth">

                        <!-- type为1 = 输入框 -->
                        <Input
                                v-if="item.type===1"
                                v-model="formDatas[item.keyName]"
                                :disabled="item.disabled"
                                class="form-option-input"
                                :placeholder = "item.placeholder">
                        </Input>

                        <!-- type为2 = 单选框 -->
                        <RadioGroup v-if="item.type===2" v-model="formDatas[item.keyName]">
                            <Radio
                                    v-for="(oneItem,oneIndex) in item.optionList"
                                    :label="oneItem.value"
                                    :key="oneIndex">
                                {{ oneItem.labelName }}
                            </Radio>
                        </RadioGroup>

                        <!-- type为3 = 复选框 -->
                        <CheckboxGroup v-if="item.type===3" v-model="formDatas[item.keyName]">
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
                                style="width:200px"
                                @on-change = "listPageSelectedChange"
                                :transfer = "true">
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
                                style="width:200px"
                                :transfer = "true">
                            <Option
                                    v-for="(oneItem,oneIndex) in item.optionList"
                                    :value="oneItem.value"
                                    :key="oneIndex">
                                {{ oneItem.label }}
                            </Option>
                        </Select>

                        <!-- type为5 = 文件上传 -->
                        <Upload v-if="item.type===5" :action="item.action">
                            <Button type="primary" icon="ios-cloud-upload-outline">{{item.btnLabel}}</Button>
                        </Upload>

                        <!-- type为6 = 自定义render树形控件 -->
                        <div v-if="item.type===6">
                            <Input
                                    v-model="formDatas[item.keyName]"
                                    :readonly="true"
                                    class="form-option-input">
                            </Input>
                            <Button type="primary" @click="showTreeModal(index,item.treeType)">{{item.btnLabel}}</Button>
                            <Modal
                                    v-model="item.treeModal"
                                    :mask-closable="false">
                                <p slot="header" style="color:#5db2ff;">
                                    <span>{{item.title}}</span>
                                </p>
                                <div style="overflow-y: auto;height: 250px">
                                    <Tree v-if="item.treeData.length>0"
                                          :data="item.treeData"
                                          :multiple="item.multiple"
                                          :show-checkbox="item.multiple"
                                          :load-data="expandTree"
                                          @on-check-change="checkchange">
                                    </Tree>
                                </div>
                                <div slot="footer" style="text-align:center" >
                                    <Button type="ghost" @click="cancelEvent(index)">关闭</Button>
                                </div>
                            </Modal>
                        </div>

                        <!-- type为9 = 普通文本文字 -->
                        <span v-if="item.type===9" style="font-size: 14px">
                            {{formDatas[item.keyName]}}
                        </span>

                        <!-- type为11 = 日期选择 -->
                        <DatePicker
                                v-if="item.type===11 && !item.double"
                                :type="item.dateType"
                                v-model="formDatas[item.keyName]"
                                :options="startOptions"
                                :editable="false"
                                :transfer="true"
                                :clearable="false"
                                style="width: 200px">
                        </DatePicker>

                        <!-- 如果double为true，则需要keyName1作为结束日期选择组件的v-model -->
                        <div v-if="item.type===11 && item.double" style="display: inline-block">
                            <DatePicker
                                    :type="item.dateType"
                                    v-model="formDatas[item.keyName]"
                                    :transfer="true"
                                    :options="startOptions"
                                    :editable="false"
                                    :clearable="false"
                                    style="width: 150px">
                            </DatePicker>
                            <span style="margin: 0 12px">至</span>
                            <DatePicker
                                    :type="item.dateType"
                                    v-model="formDatas[item.keyName1]"
                                    :transfer="true"
                                    :options="endOptions"
                                    :editable="false"
                                    :clearable="false"
                                    style="width: 150px">
                            </DatePicker>
                            <!-- isShowOptions 是否显示自定义日期快捷配置 Boolean -->
                            <template v-if="item.isShowOptions">
                                <a class="float" @click="setDay">[近三天]</a>
                                <a class="float" @click="setWeek">[近一周]</a>
                                <a class="float" @click="setMonth">[近一月]</a>
                            </template>
                            <template v-if="item.isShowFiveOptions">
                                <span class="hover_span" style="margin-left: 10px" @click="setFastDay(-3)">[近三天]</span>
                                <span class="hover_span" style="margin-left: 10px" @click="setFastDay(-7)">[近一周]</span>
                                <span class="hover_span" style="margin-left: 10px" @click="setFastDay(-30)">[近一月]</span>
                                <span class="hover_span" style="margin-left: 10px" @click="setFastDay(3)">[未来三天]</span>
                                <span class="hover_span" style="margin-left: 10px" @click="setFastDay(7)">[未来一周]</span>
                            </template>
                            <template v-if="item.isShowSecondOptions">
                                <a class="float a-underline" style="margin-left: 10px" @click="setFastDay(0)">今天</a>
                                <a class="float a-underline" style="margin-left: 10px" @click="setFastDay(-1)">本周</a>
                                <a class="float a-underline" style="margin-left: 10px" @click="setFastDay(-2)">本月</a>
                            </template>
                        </div>

                        <!-- type为12 = 时间选择 -->
                        <TimePicker
                                v-if="item.type===12 && !item.double"
                                :type="item.timeType"
                                v-model="formDatas[item.keyName]"
                                :transfer="true"
                                style="width: 200px">
                        </TimePicker>
                        <div v-if="item.type===12 && item.double" style="display: inline-block">
                            <TimePicker
                                    :type="item.timeType"
                                    v-model="formDatas[item.keyName]"
                                    :transfer="true"
                                    style="width: 150px">
                            </TimePicker>
                            至
                            <TimePicker
                                    :type="item.timeType"
                                    v-model="formDatas[item.keyName1]"
                                    :transfer="true"
                                    style="width: 150px">
                            </TimePicker>
                        </div>

                        <!-- type为13 = 单选文本下拉混合框 -->
                        <!-- Radio 添加了在选项状态发生改变时触发事件【可选】2018-7-18 -->
                        <RadioGroup style="margin-bottom: -20px"
                                    v-if="item.type===13"
                                    v-model="formDatas[item.keyName]"
                                    @on-change="checkedChange">
                            <div
                                    v-for="(oneItem,oneIndex) in item.optionList"
                                    :key="oneIndex"
                                    style="display: inline-block; margin: 0 10px 20px 0">
                                <Radio
                                        :label="oneItem.value"
                                        :class="{'custom-width': item.isCustomWidth}">
                                    {{ oneItem.labelName }}
                                </Radio>

                                <!-- 子元素type为1 = 文本框 -->
                                <Input
                                        v-if="oneItem.type===1"
                                        v-model="formDatas[oneItem.keyName]"
                                        class="form-option-input"
                                        @on-focus = "focusInput(oneItem.value)"
                                        style="margin-right: 8px;">
                                </Input>

                                <!-- 子元素type为2 = 下拉框 -->
                                <Select
                                        v-if="oneItem.type===2"
                                        v-model="formDatas[oneItem.keyName]"
                                        :transfer = "true"
                                        @on-open-change = "selectOpenChange"
                                        style="width:200px">
                                    <Option
                                            v-for="(twoItem,twoIndex) in oneItem.optionList"
                                            :value="twoItem.value"
                                            :key="twoIndex">
                                        {{ twoItem.label }}
                                    </Option>
                                </Select>
                            </div>
                        </RadioGroup>

                        <!-- type为14 = 单选文本下拉混合框 2018-05-30 -->
                        <div id="mixed-radio" v-if="item.type===14" >
                            <RadioGroup v-if="item.type===14" v-model="formDatas[item.keyName]">
                                <!-- isAddSelect 添加下拉框 -->
                                <Select
                                        v-if="item.isAddSelect"
                                        v-model="formDatas[item.selectKeyName]"
                                        :transfer = "true"
                                        style="width:200px; float: right;">
                                    <Option
                                            v-for="(sItem,sIdx) in item.selectOptionList"
                                            :value="sItem.value"
                                            :key="sIdx">
                                        {{ sItem.label }}
                                    </Option>
                                </Select>

                                <Radio
                                        :label="oneItem.value"
                                        :key="oneIndex"
                                        v-for="(oneItem,oneIndex) in item.optionList"
                                        class="float-left">
                                    {{ oneItem.labelName }}
                                </Radio>

                                <!-- isAddInput 添加文本框 -->
                                <Input
                                        v-if="item.isAddInput"
                                        v-model="formDatas[item.inputKeyName]"
                                        class="form-option-input float-left">
                                </Input>
                            </RadioGroup>
                        </div>
                        <span v-show="item.isRequired"
                              class="message-title-red">*
                        </span>
                        <span v-if="item.hasDec!='' && typeof(item.hasDec) == 'string'"
                              :class="{'message-title-red':item.isRedDec, 'message-title-gray':item.isGrayDec}">
                            {{item.hasDec}}
                        </span>
                    </FormItem>
                </div>

                <div style="float: left" v-if="isListPage && !isMixed &&needListBtn" >
                    <FormItem :label-width="btnLabelWidth">
                        <Button
                                shape="circle"
                                type="primary"
                                @click="handleSubmit(formName)"
                                class="op-btns ok-btn">
                            查询
                        </Button>
                        <Button
                                v-if="needListReset"
                                shape="circle"
                                @click="handleReset(formName)"
                                class="op-btns resetbtn">
                            重置
                        </Button>
                        <span v-if="tipMsg"
                              class="message-title-red"
                              style="margin-left: 10px">
                            <Icon size="14" type="ios-information-outline"></Icon>
                            <span>{{tipMsg}}</span>
                        </span>
                    </FormItem>
                </div>

                <!--  注意：如果是单选文本混合型 把单选的值放在formdata的第一个 -->
                <RadioGroup
                        v-if="isListPage && isMixed"
                        v-model="formDatas[Object.keys(formDatas)[0]]"
                        style="width:100%;">
                    <div
                            class="float_option"
                            v-for="(item,index) in formItemList"
                            :key="index">
                        <FormItem
                                :label="item.label==''?'':item.label + '：'"
                                :prop="item.keyName"
                                :label-width="item.labelWidth?item.labelWidth:labelWidth">

                            <!-- type为1 = 输入框 -->
                            <Input
                                    v-if="item.type===1"
                                    v-model="formDatas[item.keyName]"
                                    class="form-option-input">
                            </Input>

                            <!-- type为2 = 单选框 -->
                            <RadioGroup v-if="item.type===2" v-model="formDatas[item.keyName]">
                                <Radio
                                        v-for="(oneItem,oneIndex) in item.optionList"
                                        :label="oneItem.value"
                                        :key="oneIndex">
                                    {{ oneItem.labelName }}
                                </Radio>
                            </RadioGroup>

                            <!-- type为3 = 复选框 -->
                            <CheckboxGroup v-if="item.type===3" v-model="formDatas[item.keyName]">
                                <Checkbox
                                        v-for="(oneItem,oneIndex) in item.optionList"
                                        :label="oneItem.value"
                                        :key="oneIndex">
                                </Checkbox>
                            </CheckboxGroup>

                            <!-- type为4 = 下拉框 -->
                            <Select
                                    v-if="item.type===4"
                                    v-model="formDatas[item.keyName]"
                                    style="width:200px">
                                <Option
                                        v-for="(oneItem,oneIndex) in item.optionList"
                                        :value="oneItem.value"
                                        :key="oneIndex">
                                    {{ oneItem.label }}
                                </Option>
                            </Select>

                            <!-- type为5 = 文件上传 -->
                            <Upload v-if="item.type===5" :action="item.action">
                                <Button type="ghost" icon="ios-cloud-upload-outline">{{item.btnLabel}}</Button>
                            </Upload>

                            <!-- type为6 = 单选与文本框的组合 -->
                            <Radio
                                    v-if="item.type===6"
                                    :label="item.radioValue">
                                {{ item.radioLabel }}
                            </Radio>
                            <Input
                                    v-if="item.type===6"
                                    v-model="formDatas[item.keyName]"
                                    style="width: 200px">
                            </Input>

                            <span v-show="item.isRequired" class="message-title-red">*</span>
                        </FormItem>
                    </div>
                    <div class="float_option" >
                        <FormItem :label-width="10">
                            <Button
                                    type="primary"
                                    shape="circle"
                                    @click="handleSubmit(formName)"
                                    class="op-btns searchbtn">
                                查询
                            </Button>
                            <Button
                                    type="ghost"
                                    shape="circle"
                                    @click="handleReset(formName)"
                                    class="op-btns resetbtn">
                                重置
                            </Button>
                        </FormItem>
                    </div>
                </RadioGroup>

            </div>
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
            tipMsg : {  //列表页查询表单小提示
                type : String,
                required : false
            },
            btnLabelWidth: {
                type : Number,
                default : 10
            },
            needReset: {    //新增修改是否需要重置按钮
                type : Boolean,
                default : false
            },
            needListReset: {    //列表页是否需要重置按钮
                type : Boolean,
                default : false
            },
            mFlag:{
                type : Boolean,
                required : false
            },
            needListBtn: {     //列表页表单是否需要按钮
                type : Boolean,
                default : true
            },
            btnLoading: {    //提交按钮点击后Loading效果
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
            },
            uploadImgList: {   //图片已上传列表
                type : Array,
                default () {
                    return []
                }
            }
        },
        data(){
            return{
                currentPageName: this.$route.name,
                belongPageName: '',
                mixedValue: [],
                // hasSelected: [],
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
                        let end1 = Date.now();
                        if(!this.mFlag){
                            return date && date.valueOf() < end - (this.disabledEndDate[0]+1)*24*60*60*1000
                                || date.valueOf() > end + this.disabledEndDate[1]*24*60*60*1000;
                        }else{
                            return date && date.valueOf() < end - (this.disabledEndDate[0]+1)*24*60*60*1000
                                || date.valueOf() > end1 + this.disabledEndDate[1]*24*60*60*1000;
                        }
                    }
                },
                // 默认时间选择器格式
                defaultFormat: 'HH:mm:ss',
                numWordArr : ['一','二','三','四','五','六','七','八','九'],

                address_detail: null, //详细地址
                userlocation: {lng: "", lat: ""},
                uploadList: [],
                imgPages: []
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
                        // this.$Message.error('表单验证失败!');
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
                } else {
                    this.$emit('backBeforePage')
                }
                // this.$common.closePage(this)
            },
            //非列表页下拉列表选项改变时
            selectedChange (val) {
                this.$emit('selectedChange',val)
            },
            //列表页下拉列表选项改变时
            listPageSelectedChange (val) {
                this.$emit('listPageSelectedChange',val)
            },
            //获取上传文件(单图显示缩略图)
            getFile(res){
                if (res.code === 200) {
                    this.$emit('getFile', res.data.info)
                }
            },
            //获取上传文件(单图不显示缩略图)
            getFile1(res){
                if (res.code === 200) {
                    this.$emit('getFile1', res.data.info)
                }
            },
            //删除图片
            removeImage (keyName) {
                this.$emit('removeImage', keyName)
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
                    for(let obj of this.formItemList[index].hasSelected){
                        arr.push(obj.parent,obj.title);
                        idArr.push(obj.szregionalid)
                    }
                } else if(treeType === 2){
                    for(let obj of this.formItemList[index].hasSelected){
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
                        this.formItemList[newArr[0].formItemListIndex].hasSelected = newArr;
                    }
                }
            },
            //点击选中的树形列表进行删除
            deleteTreeNode (nodeKey,index1,index2) {
                this.formItemList[index2].hasSelected.splice(index1,1);
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
                    this.$common.chooseTreeNode('/sys/sourceRegion/v1/getLowerRegion', this, params)
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
                    this.$common.chooseTreeNode('/sys/company/v1/comapntTree',this)
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
                        this.$common.chooseTreeNode(url,this,params)
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
                            url = '/ticket/provider/v1/getScenicesByCityId/'+item.szregionalid+'?access_token='+this.Cookies.get('token');
                            this.$common.chooseTreeNode(url, this, {})
                                .then(res =>{
                                    let data = res.data.data;
                                    for(let obj of data){
                                        obj.title = obj.szregionalname;
                                        obj.parent = item.title;
                                        obj.formItemListIndex = item.formItemListIndex;
                                    }
                                    cb(data);
                                    this.showCheckBox(item.formItemListIndex, item.type)
                                })
                        } else if (item.type === 2) {
                            let params = {
                                iregionalid: item.szregionalid
                            };
                            this.$common.chooseTreeNode(url, this, params)
                                .then(res =>{
                                    let data = res.data.data;
                                    for(let obj of data){
                                        obj.title = obj.szregionalname;
                                        obj.parent = item.title;
                                        obj.parentId = item.szregionalid;
                                        obj.level = item.level+1;
                                        obj.formItemListIndex = item.formItemListIndex;
                                    }
                                    cb(data);
                                    this.showCheckBox(item.formItemListIndex, item.type)
                                });
                        } else if (item.type === 4) {
                            let params = {
                                iregionalid: item.szregionalid
                            };
                            this.$common.chooseTreeNode(url, this, params)
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
                    this.$common.chooseTreeNode('/sys/company/v1/comapntTree',this,params)
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
            // beforeUpload (file) {
            //     // console.log(file);
            //     this.$emit('beforeUpload',file);
            //     return false
            // },
            //互换数组元素位置
            swapArray(arr, index1, index2) {
                arr[index1] = arr.splice(index2, 1, arr[index1])[0];
                return arr;
            },
            //移动图片位置
            handleMove (index,direction) {
                if (direction === 'left') {
                    this.swapArray(this.$refs.uploadImg[0].fileList, index, index-1)
                } else {
                    this.swapArray(this.$refs.uploadImg[0].fileList, index, index+1);
                }
                this.$emit('handleMove',index,direction)
            },
            //移除图片
            handleImgRemove (index, item) {
                this.uploadList.splice(index,1);
                this.$emit('handleImgRemove', index)
            },
            //上传多图片成功
            getFiles (res, file, fileList) {
                this.$emit('getFiles',fileList)
            },
            //图片格式验证提醒
            handleFormatError (file) {
                this.$common.showMessageModal(this, `${file.name}格式不正确`, 2)
            },
            //图片尺寸验证
            handleMaxSize (file) {
                this.$common.showMessageModal(this, `${file.name}超出5M限制`, 2)
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
            //判断纵向多选框是否全选
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
            },
            selectHasChanged (arr) {
                this.$emit('selectHasChanged', arr);
            },
            //树形结构全选
            selectTreeAllData (checkAll) {
                this.$emit('selectTreeAllData', checkAll)
            },
            //type13的输入框聚焦
            focusInput (val) {
                this.$emit('focusInput', val)
            },
            //type13的下拉框展开
            selectOpenChange (val) {
                if (val) {
                    this.$emit('selectOpenChange')
                }
            },
            /*
             * type13的单选框组添加了触发事件 2018-7-18
             * 选项状态发生改变时触发，返回当前选中的项。通过修改外部的数据改变时不会触发
             */
            checkedChange(currentItem) {
                this.$emit('checkedChange',currentItem);
            },
            // 图片上传成功后的钩子函数
            hook_before(res, file, fileList) {
                if(res.code === 200) {
                    this.$emit('hookBefore', {
                        res,
                        file,
                        fileList,
                        status: 'success'
                    });
                } else {
                    this.$emit('hookBefore');
                }
            },
            hook_after(res, file, fileList) {
                if(res.code === 200) {
                    this.$emit('hookAfter', {
                        res,
                        file,
                        fileList,
                        status: 'success'
                    });
                } else {
                    this.$emit('hookAfter');
                }
            },
            hook_single(res, file, fileList) {
                if(res.code === 200) {
                    this.$emit('hookSingle', {
                        res,
                        file,
                        fileList,
                        status: 'success'
                    });
                } else {
                    this.$emit('hookSingle');
                }
            },
            // 设置近三天
            setDay(e) {
                e.preventDefault();
                this.$emit('setDay');
            },
            // 设置近一周
            setWeek(e) {
                e.preventDefault();
                this.$emit('setWeek');
            },
            // 设置近一月
            setMonth(e) {
                e.preventDefault();
                this.$emit('setMonth');
            },
            setFastDay (day) {
                this.$emit('setFastDay', day);
            },
            // type: selectGroup 的增加/减少一项
            reduceSelect() {
                this.$emit('reduceSelect');
            },
            increaseSelect() {
                this.$emit('increaseSelect');
            },
            //显示地图
            showMapModal (index) {
                this.formItemList[index].isIf = true;
                this.formItemList[index].mapModal = true;
            },
            cancelMap () {
                this.$emit('cancelMap');
                for (let i = 0; i < this.formItemList.length; i++) {
                    if (this.formItemList[i].type === 25) {
                        this.formItemList[i].mapModal = false
                    }
                }
            },
            confirmMap (center) {
                this.$emit('confirmMap',center);
                for (let i = 0; i < this.formItemList.length; i++) {
                    if (this.formItemList[i].type === 25) {
                        this.formItemList[i].mapModal = false
                    }
                }
            },
            handleBeforeUpload (file) {
                this.$emit('handleBeforeUpload', file);
                return false;
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
            // if (!this.formDatas.imageAddr && this.$route.name.indexOf('new') != -1) {
            //     this.formItemList.forEach(obj => {
            //         if (obj.type == 5) {
            //             this.formDatas['imageAddr'] = this.imgUrl;
            //             this.imgUrl1 = this.imgUrl;
            //         }
            //     })
            // }
        },
        mounted () {
            for (let i = 0; i < this.formItemList.length; i++) {
                if (this.formItemList[i].type === 18) {
                    this.uploadList = this.$refs.uploadImg[0].fileList;
                    break;
                }
            }

        },
        watch: {
            uploadList: {
                handler (fileList) {
                    this.$emit('getUploadList', fileList);
                },
                deep: true
            },
            uploadImgList (val) {
                this.$refs.uploadImg[0].fileList = val;
                this.uploadList = this.$refs.uploadImg[0].fileList;
            }
        }
    };
</script>
