<style scoped lang="less">
    @import '../../styles/ectrip.less';

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
</style>

<template>
    <div>
        <Form
            ref="formName"
            :model="formDatas"
            :rules="ruleDatas"
            :label-width="labelWidth"
            :label-position="labelPosition">

            <!-- 非表格表单（横向排列） -->
            <div class="main_picker" v-if="isHasTable">
                <div :class="!item.class ? 'float_option' : item.class"
                     v-for="(item,index) in formItemList"
                     style="height: 58px"
                     :key="index">
                    <FormItem
                        :label="!item.label ? '' : item.label + '：'"
                        :prop="item.keyName"
                        :label-width="item.labelWidth">

                        <!-- type为1 输入框 -->
                        <Input
                            v-if="item.type === 1"
                            v-model="formDatas[item.keyName]"
                            :disabled="item.disabled"
                            style="width:200px;"
                            :type="item.inputType"
                            :placeholder = "item.placeholder"></Input>

                        <!-- type为2 单选框 -->
                        <RadioGroup v-if="item.type === 2" v-model="formDatas[item.keyName]">
                            <Radio
                                v-for="oneItem in item.optionList"
                                :label="oneItem.value"
                                :key="oneItem.value">
                                {{ oneItem.label }}
                            </Radio>
                        </RadioGroup>

                        <!-- type为3 复选框 -->
                        <CheckboxGroup v-if="item.type === 3" v-model="formDatas[item.keyName]">
                            <Checkbox
                                v-for="oneItem in item.optionList"
                                :label="oneItem.value"
                                :key="oneItem.value">
                                {{ oneItem.label }}
                            </Checkbox>
                        </CheckboxGroup>

                        <!-- type为4 下拉框,isSelect 为是否需要onchange事件，布尔值 -->
                        <!-- 需要下拉选择时触发事件 -->
                        <Select
                            v-if="item.type === 4 && item.selectEvent"
                            v-model="formDatas[item.keyName]"
                            style="width:200px"
                            :transfer = "true"
                            @on-change = "onchange">
                            <Option
                                v-for="oneItem in item.optionList"
                                :value="oneItem.value"
                                :key="oneItem.value">
                                {{ oneItem.label }}
                            </Option>
                        </Select>

                        <!-- 不需要 -->
                        <Select
                            v-if="item.type === 4 && !item.selectEvent"
                            v-model="formDatas[item.keyName]"
                            style="width:200px"
                            :transfer = "true">
                            <Option
                                v-for="oneItem in item.optionList"
                                :value="oneItem.value"
                                :key="oneItem.value">
                                {{ oneItem.label }}
                            </Option>
                        </Select>

                        <!-- type为5 日期选择 -->
                        <DatePicker
                            v-if="item.type === 5 && !item.double"
                            v-model="formDatas[item.keyName]"
                            :type="item.dateType"
                            :options="item.startOptions"
                            :transfer="false"
                            :clearable="false"
                            :editable="false"
                            style="width: 200px">
                        </DatePicker>

                        <!-- 如果double为true，则需要 keyNameEnd 作为结束日期选择组件的v-model -->
                        <div v-if="item.type === 5 && item.double" style="display: inline-block">
                            <DatePicker
                                v-model="formDatas[item.keyNameStart]"
                                :type="item.dateType"
                                :transfer="true"
                                :options="item.startOptions"
                                :clearable="false"
                                :editable="false"
                                style="width: 150px">
                            </DatePicker>
                            <span style="margin: 0 5px">至</span>
                            <DatePicker
                                v-model="formDatas[item.keyNameEnd]"
                                :type="item.dateType"
                                :transfer="true"
                                :options="item.endOptions"
                                :clearable="false"
                                :editable="false"
                                style="width: 150px">
                            </DatePicker>
                            <!-- isShowOptions 是否显示自定义日期快捷配置 Boolean -->
                            <template v-if="item.isShowOptions">
                                <a class="float a-underline" style="margin-left: 10px" @click="setDay">【近三天】</a>
                                <a class="float a-underline" style="margin-left: 10px" @click="setWeek">【近一周】</a>
                                <a class="float a-underline" style="margin-left: 10px" @click="setMonth">【近一月】</a>
                                <a class="float a-underline" style="margin-left: 10px" @click="setTriduum">【未来三天】</a>
                                <a class="float a-underline" style="margin-left: 10px" @click="setHebdomad">【未来一周】</a>
                            </template>
                            <template v-if="item.isShowDate">
                                <a class="float a-underline" style="margin-left: 10px" @click="setDay">【近三天】</a>
                                <a class="float a-underline" style="margin-left: 10px" @click="setWeek">【近一周】</a>
                                <a class="float a-underline" style="margin-left: 10px" @click="setMonth">【近一月】</a>
                            </template>

                        </div>

                        <!-- type为6 时间选择 -->
                        <!-- 一个时间选择器 -->
                        <TimePicker
                            v-if="item.type === 6 && !item.double"
                            v-model="formDatas[item.keyName]"
                            :type="item.timeType"
                            :transfer="true"
                            style="width: 200px">
                        </TimePicker>

                        <!-- 两个时间选择器 -->
                        <div v-if="item.type === 6 && item.double" style="display: inline-block">
                            <TimePicker
                                v-model="formDatas[item.keyNameStart]"
                                :type="item.timeType"
                                :transfer="true"
                                style="width: 150px">
                            </TimePicker>
                            <span>至</span>
                            <TimePicker
                                v-model="formDatas[item.keyNameEnd]"
                                :type="item.timeType"
                                :transfer="true"
                                style="width: 150px">
                            </TimePicker>
                        </div>

                        <!-- type为7 单选文本下拉混合框 -->
                        <RadioGroup
                            v-if="item.type === 7"
                            v-model="formDatas[item.keyName]"
                            @on-change="checkedChange">
                            <div
                                v-for="oneItem in item.optionList"
                                :key="oneItem.value"
                                style="display: inline-block;">
                                <Radio :label="oneItem.value">
                                    {{ oneItem.label }}
                                </Radio>

                                <!-- 子元素type为1 = 文本框 -->
                                <Input
                                    v-if="oneItem.type === 1"
                                    v-model="formDatas[oneItem.keyName]"
                                    @on-focus = "focusInput(oneItem.value)"
                                    style="width:200px;"></Input>

                                <!-- 子元素type为2 = 下拉框 -->
                                <Select
                                    v-if="oneItem.type === 2"
                                    v-model="formDatas[oneItem.keyName]"
                                    @on-open-change = "selectOpenChange"
                                    style="width:200px">
                                    <Option
                                        v-for="twoItem in oneItem.optionList"
                                        :value="twoItem.value"
                                        :key="twoItem.value">
                                        {{ twoItem.label }}
                                    </Option>
                                </Select>
                            </div>
                        </RadioGroup>

                        <!-- type为8 普通文本 -->
                        <span v-if="item.type === 8">
                            <span style="width:200px;">{{ formDatas[item.keyName] }}</span>
                        </span>

                        <!-- type为8.1 普通文本 + 按钮 -->
                        <div v-if="item.type === 8.1">
                            <span style="width:200px;margin-right:25px;display:inline-block;">{{ formDatas[item.keyName] }}</span>
                            <Button type="info">{{ item.btnName }}</Button>
                        </div>
                    </FormItem>
                </div>

                <div class="float_option" v-if="isBtn">
                    <FormItem :label-width="btnWidth">
                        <Button
                            type="primary"
                            shape="circle"
                            @click="handleSubmit"
                            class="op-btns ok-btn">{{ btnName }}</Button>
                    </FormItem>
                </div>
            </div>

            <!-- 非表格表单（纵向排列） -->
            <div class="main_picker" v-if="!isHasTable">
                <div v-for="(item,index) in formItemList" :key="index" style="width: 100%;">
                    <FormItem
                        :label="!item.label ? '' : item.label + '：'"
                        :prop="item.keyName"
                        :label-width="item.labelWidth">

                        <!-- type为1 输入框 -->
                        <Input
                            v-if="item.type === 1"
                            v-model="formDatas[item.keyName]"
                            :disabled="item.disabled"
                            style="width:200px;"
                            :type="item.inputType"
                            :placeholder = "item.placeholder"></Input>

                        <!-- type为2 单选框 -->
                        <RadioGroup v-if="item.type === 2" v-model="formDatas[item.keyName]">
                            <Radio
                                v-for="oneItem in item.optionList"
                                :label="oneItem.value"
                                :key="oneItem.value">
                                {{ oneItem.label }}
                            </Radio>
                        </RadioGroup>

                        <!-- type为3 复选框 -->
                        <CheckboxGroup v-if="item.type === 3" v-model="formDatas[item.keyName]">
                            <Checkbox
                                v-for="oneItem in item.optionList"
                                :label="oneItem.value"
                                :key="oneItem.value">
                                {{ oneItem.label }}
                            </Checkbox>
                        </CheckboxGroup>

                        <!-- type为4 下拉框,isSelect 为是否需要onchange事件，布尔值 -->
                        <!-- 需要下拉选择时触发事件 -->
                        <Select
                            v-if="item.type === 4 && item.selectEvent"
                            v-model="formDatas[item.keyName]"
                            style="width:200px"
                            :transfer = "true"
                            @on-change = "onchange">
                            <Option
                                v-for="oneItem in item.optionList"
                                :value="oneItem.value"
                                :key="oneItem.value">
                                {{ oneItem.label }}
                            </Option>
                        </Select>

                        <!-- 不需要 -->
                        <Select
                            v-if="item.type === 4 && !item.selectEvent"
                            v-model="formDatas[item.keyName]"
                            style="width:200px"
                            :transfer = "true">
                            <Option
                                v-for="oneItem in item.optionList"
                                :value="oneItem.value"
                                :key="oneItem.value">
                                {{ oneItem.label }}
                            </Option>
                        </Select>

                        <!-- type为5 日期选择 -->
                        <DatePicker
                            v-if="item.type === 5 && !item.double"
                            v-model="formDatas[item.keyName]"
                            :type="item.dateType"
                            :options="item.startOptions"
                            :transfer="!item.noTransfer"
                            :clearable="false"
                            :editable="false"
                            style="width: 200px">
                        </DatePicker>

                        <!-- 如果double为true，则需要 keyNameEnd 作为结束日期选择组件的v-model -->
                        <div v-if="item.type === 5 && item.double" style="display: inline-block">
                            <DatePicker
                                v-model="formDatas[item.keyNameStart]"
                                :type="item.dateType"
                                :transfer="true"
                                :options="item.startOptions"
                                :clearable="false"
                                :editable="false"
                                style="width: 150px">
                            </DatePicker>
                            <span style="margin: 0 5px">至</span>
                            <DatePicker
                                v-model="formDatas[item.keyNameEnd]"
                                :type="item.dateType"
                                :transfer="true"
                                :options="item.endOptions"
                                :clearable="false"
                                :editable="false"
                                style="width: 150px">
                            </DatePicker>
                            <!-- isShowOptions 是否显示自定义日期快捷配置 Boolean -->
                            <template v-if="item.isShowOptions">
                                <a class="float a-underline" @click="setDay">【近三天】</a>
                                <a class="float a-underline" @click="setWeek">【近一周】</a>
                                <a class="float a-underline" @click="setMonth">【近一月】</a>
                            </template>


                        </div>

                        <!-- type为6 时间选择 -->
                        <!-- 一个时间选择器 -->
                        <TimePicker
                            v-if="item.type === 6 && !item.double"
                            v-model="formDatas[item.keyName]"
                            :type="item.timeType"
                            :transfer="true"
                            :clearable="false"
                            :editable="false"
                            style="width: 200px">
                        </TimePicker>

                        <!-- 两个时间选择器 -->
                        <div v-if="item.type === 6 && item.double" style="display: inline-block">
                            <TimePicker
                                v-model="formDatas[item.keyNameStart]"
                                :type="item.timeType"
                                :transfer="true"
                                :clearable="false"
                                :editable="false"
                                style="width: 150px">
                            </TimePicker>
                            <span style="margin: 0 5px">至</span>
                            <TimePicker
                                v-model="formDatas[item.keyNameEnd]"
                                :type="item.timeType"
                                :transfer="true"
                                :clearable="false"
                                :editable="false"
                                style="width: 150px">
                            </TimePicker>
                        </div>

                        <!-- type为7 单选文本下拉混合框 -->
                        <RadioGroup
                            v-if="item.type === 7"
                            v-model="formDatas[item.keyName]"
                            @on-change="checkedChange">
                            <div
                                v-for="oneItem in item.optionList"
                                :key="oneItem.value"
                                style="display: inline-block;">
                                <Radio :label="oneItem.value">
                                    {{ oneItem.label }}
                                </Radio>

                                <!-- 子元素type为1 = 文本框 -->
                                <Input
                                    v-if="oneItem.type === 1"
                                    v-model="formDatas[oneItem.keyName]"
                                    @on-focus = "focusInput(oneItem.value)"
                                    style="width:200px;"></Input>

                                <!-- 子元素type为2 = 下拉框 -->
                                <Select
                                    v-if="oneItem.type === 2"
                                    v-model="formDatas[oneItem.keyName]"
                                    @on-open-change = "selectOpenChange"
                                    style="width:200px">
                                    <Option
                                        v-for="twoItem in oneItem.optionList"
                                        :value="twoItem.value"
                                        :key="twoItem.value">
                                        {{ twoItem.label }}
                                    </Option>
                                </Select>
                            </div>
                        </RadioGroup>

                        <!-- type为8 普通文本 -->
                        <div v-if="item.type === 8">
                            <span style="width:200px;">{{ formDatas[item.keyName] }}</span>
                        </div>

                        <!-- type为8.1 普通文本 + 按钮 -->
                        <div v-if="item.type === 8.1">
                            <span style="width:200px;margin-right:25px;display:inline-block;">{{ formDatas[item.keyName] }}</span>
                            <Button type="info" @click="gotoEdit">{{ item.btnName }}</Button>
                        </div>

                        <!-- type为8.2 普通文本 + 外链 -->
                        <div v-if="item.type === 8.2">
                            <span style="width:200px;color:red;margin-right:10px;">{{ formDatas[item.keyName] }}</span>
                            <a :href="item.href" style="color:#00a0e9;">{{ item.aText }}</a>
                        </div>

                        <!-- type为9 树菜单 -->
                        <div v-if="item.type === 9">
                            <Input v-model="formDatas[item.keyName]" style="width: 200px;" readonly ></Input>
                            <Button type="primary" class="op-btns ok-btn" @click="showTreeModal">{{ item.btnLabel }}</Button>
                            <Modal v-model="isShowTree" :mask-closable="false" :closable="false">
                                <p slot="header">
                                    <span>{{ item.title }}</span>
                                </p>
                                <div style="overflow-y: auto;height: 250px" class="ivu-modal-body-div">
                                    <Tree
                                        v-if="item.treeData.length"
                                        :data="item.treeData"
                                        :load-data="expandTree"
                                        @on-select-change="clickTreeNode">
                                    </Tree>
                                    <span v-else>暂无数据</span>
                                </div>
                                <div slot="footer" style="text-align:center" >
                                    <Button type="primary" @click="closeTree">关闭</Button>
                                </div>
                            </Modal>
                        </div>
                        <!-- type为10 数字输入框 -->

                        <span v-if="item.isAddTips" style="color:red;margin-left:10px;">{{ item.tips }}</span>
                    </FormItem>
                </div>

                <div class="float_option" v-if="isBtn">
                    <FormItem :label-width="btnLabelWidth">
                        <Button
                            type="primary"
                            shape="circle"
                            @click="handleSubmit"
                            class="op-btns ok-btn">{{ btnName }}</Button>
                    </FormItem>
                </div>
            </div>
        </Form>
    </div>
</template>

<script>
    export default {
        name: 'detailForm',
        data() {
            return {
                // 默认时间选择器格式
                defaultFormat: 'HH:mm:ss',
            }
        },
        computed: {
            isShowTree() {
                return this.$store.state.distributorOrder.isShowTree;
            }
        },
        props: {
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
            labelWidth : {
                type : Number,
                default : 140
            },
            btnName: {
                type: String,
                default: '查询'
            },
            isBtn: {
                type: Boolean,
                default: true
            },
            isHasTable: {
                type: Boolean,
                default: true
            },
            // 按钮label宽度
            btnLabelWidth: {
                type : Number,
                default : 10
            },
            // 表单域标签的位置，可选值为 left、right、top
            labelPosition: {
                type : String,
                default : 'right'
            },
            btnWidth: {
                type: Number,
                default:1
            }
        },
        methods: {
            //提交表单
            handleSubmit () {
                this.$refs.formName.validate(valid => {
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
            //关闭当前页
            closePage () {
                this.$emit('closeCurrentPage');
            },
            //非列表页下拉列表选项改变时
            selectedChange (val) {
                this.$emit('selectedChange',val)
            },
            //列表页下拉列表选项改变时
            listPageSelectedChange (val) {
                this.$emit('listPageSelectedChange',val)
            },
            //获取上传文件
            getFile(res){
                if (res.code === 200) {
                    this.$emit('getFile', res.data.info)
                }
            },
            //删除图片
            removeImage (keyName) {
                this.$emit('removeImage', keyName)
            },
            //移动图片位置
            handleMove (index,direction) {
                this.$emit('handleMove',index,direction)
            },
            //上传多图片成功
            handleSuccess(res, file, fileList) {
                this.$emit('handleSuccess',fileList)
            },
            //颜色选择器颜色变化
            getColor (color) {
                this.$emit('getSelectColor', color);
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
            //未来三天
            setTriduum(e) {
                e.preventDefault();
                this.$emit('setTriduum')
            },
            //未来一周
            setHebdomad(e) {
                e.preventDefault();
                this.$emit('setHebdomad')
            },
            // type: selectGroup 的减少一项
            reduceSelect() {
                this.$emit('reduceSelect');
            },
            // type: selectGroup 的增加一项
            increaseSelect() {
                this.$emit('increaseSelect');
            },
            // 验证邮箱或手机号码
            gotoEdit() {
                this.$emit('validateSome');
            },

            /*
             * 树菜单
             * isShowTree 字段存在vuex中
             */
            // 显示树菜单
            showTreeModal() {
                this.$emit('showTreeModal');
            },
            // 点击树节点触发
            clickTreeNode(nodeArray) {
                this.$emit('clickTreeNode',nodeArray);
            },
            // 关闭树菜单
            closeTree() {
                this.$store.commit('changeTreeStatus',false);
            },
            // 展开下一级树节点
            expandTree(itemInfo, callback) {
                this.$emit('expandTree',{
                    itemInfo,
                    callback
                });
            }
        }
    };
</script>
