<template>
  <div class="datetime-select van-cell">
    <van-field
      :required="required"
      :value="name"
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

/**
 * Vant的{@link DatetimePicker}组件的时间格式。
 */
const DATETIME_PICKER_TIME_FORMAT = 'HH:mm';

/**
 * 枚举类型下拉选择框。
 *
 * @property {String} value
 *     以{@code v-model}双向绑定的日期时间的数值，以字符串形式表示，格式为
 *     {@link #valueFormat}。
 * @property {String} type
 *     可选，选择类型，可能值为'datetime'(选择完整日期时间，包括年、月、日、小时、分钟)，
 *     'date'(选择年、月、日), 'time'(选择时间，即小时、分钟), 'year-month'
 *     (选择年、月), 'month-day'(选择月、日), 'datehour'(选择年、月、日、小时)。
 *     默认值为'datetime'。
 * @property {String} valueFormat
 *     可选，选中的日期时间数值的格式。默认值为'YYYY-MM-DDTHH:mmZ'。
 * @property {String} displayFormat
 *     可选，选中的日期时间在选择框中显示的格式。默认值为'YYYY年MM月DD日HH时mm分'。
 * @property {String} label
 *     可选，日期时间选择框标签。默认值为'日期时间'。
 * @property {String} placeholder
 *     可选，日期时间选择框提示文字。默认值为'请选择日期时间'。
 * @property {Date} minDate
 *     可选，当类型{@link #type}为'date'、'datetime'、'year-month'、'month-day'时，支
 *     持此参数，表示可选的最小时间，精确到分钟。默认值为十年前。
 * @property {Date} maxDate
 *     可选，当类型{@link #type}为'date'、'datetime'、'year-month'、'month-day'时，支
 *     持此参数，表示可选的最大时间，精确到分钟。默认值为十年后。
 * @property {Number} minHour
 *     可选，当类型{@link #type}为'time'或'datehour'时，支持此参数，表示可选的最小小时
 *     数，默认值为{@code 0}。
 * @property {Number} maxHour
 *     可选，当类型{@link #type}为'time'或'datehour'时，支持此参数，表示可选的最大小时
 *     数，默认值为{@code 23}。
 * @property {Number} minMinute
 *     可选，当类型{@link #type}为'time'或'datehour'时，支持此参数，表示可选的最小分钟
 *     数，默认值为{@code 0}。
 * @property {Number} maxMinute
 *     可选，当类型{@link #type}为'time'或'datehour'时，支持此参数，表示可选的最大分钟
 *     数，默认值为{@code 59}。
 * @property {String} defaultSelected
 *     可选，默认选择的日期时间。若{@code v-model}双向绑定的{@link #value}为null或空字
 *     符串，点开日期时间选择框后，默认选择的日期时间为此参数值。此参数以字符串
 *     形式表示日期时间，格式为{@link #valueFormat}。此参数可选，默认值为空。
 * @property {Boolean} readonly
 *     可选，表示选项框中选择的日期时间是否不可更改。默认值为{@code false}。
 * @author gintangible
 */
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
    rightIcon: {               // 见 van-field right-icon
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
      name: '',           //  当前选中的日期时间的显示名称
      selected: null,     //  当前选中的日期时间值
    };
  },
  watch: {
    value(newValue) {
      this.$_updateUI(newValue);
    },
  },
  mounted() {
    const me = this;
    this.$nextTick(() => {
      me.$_updateUI(this.value);
    });
  },
  methods: {
    // 用户点击选项输入框后触发此事件。
    onClick() {
      if (!this.readonly) {
        this.showPicker = true;
      } else {
        // 注意标签可能含有空格，但提示信息中不应该有空格，此方案仅适用于中文标签，英文则不适合
        const { label } = this;
        Toast(`${label}不可更改`);
      }
    },

    // 修改选项下拉框选项后触发的事件。
    onConfirm(e) {
      this.showPicker = false;
      // 注意：这里无需再调用 $_updateUI()，因为下面的语句触发了 input 事件，而
      // value 是作为 v-model 被绑定到本组件，因此 input 事件必然会自动
      // 更新 value 的值，而 value 更新后会触发对其的 watch 函数，
      // 该函数中会调用 $_updateUI() 方法。
      let newValue;
      if (this.type === 'time') {
        newValue = dayjs(e, DATETIME_PICKER_TIME_FORMAT).format(this.valueFormat);
      } else {
        newValue = dayjs(e).format(this.valueFormat);
      }
      this.$emit('input', newValue);
      this.$emit('change', newValue);
    },

    // 日期时间字段单位格式化函数。
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      }
      if (type === 'month') {
        return `${value}月`;
      }
      if (type === 'day') {
        return `${value}日`;
      }
      if (type === 'hour') {
        return `${value}时`;
      }
      if (type === 'minute') {
        return `${value}分`;
      }
      if (type === 'second') {
        return `${value}秒`;
      }
      return value;
    },

    // 更新UI界面
    $_updateUI(newValue) {
      if (newValue === null || newValue === '') {
        this.name = '';
        if (this.defaultSelected) {
          const time = dayjs(this.defaultSelected, this.valueFormat);
          if (this.type === 'time') {
            this.selected = time.format(DATETIME_PICKER_TIME_FORMAT);
          } else {
            this.selected = time.toDate();
          }
        } else {
          this.selected = null;
        }
      } else {
        const time = dayjs(newValue, this.valueFormat);
        this.name = time.format(this.displayFormat);
        if (this.type === 'time') {
          this.selected = time.format(DATETIME_PICKER_TIME_FORMAT);
        } else {
          this.selected = time.toDate();
        }
      }
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
