<template>
  <div class="datetime-select van-cell">
    <van-field
      :required="required"
      :value="text"
      :label="label"
      :placeholder="placeholder"
      readonly
      :is-link="isLink"
      :input-align="inputAlign"
      :rules="rules"
      :right-icon="rightIcon"
      @click="onClick"
    />
    <van-popup
      v-model="showPicker"
      position="bottom"
    >
      <van-datetime-picker
        ref="picker"
        v-model="selected"
        :type="type"
        :title="label"
        :min-date="minDate"
        :max-date="maxDate"
        :min-hour="minHour"
        :max-hour="maxHour"
        :min-minute="minMinute"
        :max-minute="maxMinute"
        :formatter="formatter"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>
<script>
import {
  Field, DatetimePicker, Popup, Toast,
} from 'vant';
import dayjs from 'dayjs';
import { stringRemoveSpace } from '@gintangible/common-utils'

/**
 * Vant的{@link DatetimePicker}组件的时间格式。
 */

// 枚举类型下拉选择框。
export default {
  name: 'datetime-select',
  components: {
    [Field.name]: Field,
    [DatetimePicker.name]: DatetimePicker,
    [Popup.name]: Popup,
  },
  model: {
    prop: 'value',
  },
  props: {
    value: {              // 当前选中的日期时间的数值，注意为了支持null此参数不限制类型
      type: null,
      required: true,
    },
    type: {               // 选择类型
      type: String,
      default: 'datetime',
    },
    required: {           // 见 vant field组件 required
      type: Boolean,
      default: false,
    },
    isLink: {             // 见 vant field组件 is-link
      type: Boolean,
      default: true,
    },
    rules: {              // 见 vant field组件 rules
      type: Array,
    },
    inputAlign: {         // 见 vant field组件 input-align
      type: String,
      default: '',
    },
    // 右侧图片
    rightIcon: {          // 见 van-field right-icon
      type: String,
      default: '',
    },
    valueFormat: {        // 选中的日期时间数值的格式
      type: String,
      default: 'YYYY-MM-DDTHH:mmZ',
    },
    displayFormat: {      // 选中的日期时间在选择框中显示的格式
      type: String,
      default: 'YYYY年MM月DD日HH时mm分',
    },
    label: {              // 日期时间选择框标签
      type: String,
      default: '日期时间',
    },
    placeholder: {        // 日期时间选择框提示文字
      type: String,
      default: '请选择日期时间',
    },
    minDate: {            // 可选的最小日期时间
      type: Date,
      default: () => dayjs().subtract(10, 'year').toDate(),
    },
    maxDate: {            // 可选的最大日期时间
      type: Date,
      default: () => dayjs().add(10, 'year').toDate(),
    },
    minHour: {            // 可选的最小小时数
      type: Number,
      default: 0,
    },
    maxHour: {            // 可选的最大小时数
      type: Number,
      default: 23,
    },
    minMinute: {          // 可选的最小分钟数
      type: Number,
      default: 0,
    },
    maxMinute: {          // 可选的最大分钟数
      type: Number,
      default: 59,
    },
    defaultSelected: {    // 默认选中的日期时间
      type: String,
      default: '',
    },
    readonly: {           // 选项框中选择的日期时间是否不可更改
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showPicker: false,  //  是否显示选项下拉框
      text: '',           //  当前选中的日期时间的显示名称
      selected: null,     //  当前选中的日期时间值
    };
  },
  watch: {
    value(newValue) {
      this.$_updateUI(newValue);
    },
  },
  mounted() {
    this.$nextTick(() => {
      this.$_updateUI(this.value);
    });
  },
  methods: {
    // 用户点击选项输入框后触发此事件。
    onClick() {
      if (this.readonly) {
        Toast(`${stringRemoveSpace(this.label)}不可更改`);
        return;
      }
      this.showPicker = true;
    },

    // 修改选项下拉框选项后触发的事件。
    onConfirm(e) {
      this.showPicker = false;
      let newValue;
      if (this.type === 'time') {
        newValue = e;
      } else {
        newValue = dayjs(e).format(this.valueFormat);
      }
      this.$emit('input', newValue);
      this.$emit('confirm', newValue);
    },

    // 日期时间字段单位格式化函数。
    formatter(type, value) {
      switch (type) {
        case 'year':
          return `${value}年`;
        case 'month':
          return `${value}月`;
        case 'day':
          return `${value}日`;
        case 'hour':
          return `${value}时`;
        case 'minute':
          return `${value}分`;
        case 'second':
          return `${value}秒`;
        default:
          return value;
      }
    },

    // 更新UI界面
    $_updateUI(newValue) {
      if (!newValue) {
        this.text = '';
        if (this.defaultSelected) {
          const time = dayjs(this.defaultSelected, this.valueFormat);
          if (this.type === 'time') {
            this.selected = newValue;
          } else {
            this.selected = time.toDate();
          }
        } else {
          this.selected = null;
        }
      } else {
        const time = dayjs(newValue, this.valueFormat);
        if (this.type === 'time') {
          this.selected = newValue;
          this.text = this.formatTimeText(newValue);
        } else {
          this.selected = time.toDate();
          this.text = time.format(this.displayFormat);
        }
      }
    },

    // 格式化时间
    formatTimeText(newValue) {
      return newValue.replace(/^(.*):(.*)/g, '$1时$2分');
    },
  },
};
</script>
<style scoped lang="less">
.datetime-select {
  display: block;
  padding: 0;
  .van-cell::after {
    display: none;
  }
}
</style>
