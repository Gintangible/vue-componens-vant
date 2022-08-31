<template>
  <div class="datetime-select">
    <van-field
      :name="name"
      :model-value="text"
      :label="label"
      :placeholder="placeholder || `请选择${label}`"
      readonly
      clickable
      :is-link="isLink"
      :input-align="inputAlign"
      :required="required"
      :rules="rules"
      @click="onClick"
    />
    <van-popup
      v-model:show="showPicker"
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
        :filter="filter"
        :min-minute="minMinute"
        :max-minute="maxMinute"
        :formatter="formatter"
        @cancel="showPicker = false"
        @confirm="onConfirm"
      />
    </van-popup>
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
import dayjs from 'dayjs';
import {
  Field as VanField,
  DatetimePicker as VanDatetimePicker,
  Popup as VanPopup,
  Toast,
} from 'vant';

const emit = defineEmits([
  'update:modelValue',
  'confirm',
]);

const props = defineProps({
  modelValue: {              // 当前选中的日期时间的数值，注意为了支持null此参数不限制类型
    type: null,
    required: true,
  },
  readonlyToast: {
    type: Boolean,
    default: true,
  },
  // 见 vant field https://vant-contrib.gitee.io/vant/v2/#/zh-CN/datetime-picker
  type: {
    type: String,
    default: 'datetime',
  },
  name: String,
  required: Boolean,
  isLink: Boolean,
  disabled: Boolean,
  rules: Array,
  inputAlign: String,
  // type为time时，valueFormat无效，固定为：HH:mm
  valueFormat: {
    type: String,
    default: 'YYYY-MM-DDTHH:mmZ',
  },
  // 见 dayjs https://dayjs.gitee.io/docs/zh-CN/display/format
  displayFormat: {
    type: String,
    default: 'YYYY-MM-DD HH:mm',
  },
  // 默认选中的日期时间
  defaultSelected: String,
  label: {
    type: String,
    default: '日期时间',
  },
  placeholder: String,
  minDate: Date,
  maxDate: Date,
  minHour: [Number, String],
  maxHour: [Number, String],
  minMinute: [Number, String],
  maxMinute: [Number, String],
  filter: Function,
});

const showPicker = ref(false);  //  是否显示选项下拉框
const text = ref('');           //  当前选中的日期时间的显示名称
const selected = ref(null);     //  当前选中的日期时间值

watch(() => props.modelValue, (newValue) => {
  $_updateUI(newValue);
}, { immediate: true })

function onClick() {
  if (props.disabled) {
    if (props.readonlyToast) {
      Toast(`${props.label}不可更改`);
    }
    return;
  }
  showPicker.value = true;
}

// 修改选项下拉框选项后触发的事件。
function onConfirm(e) {
  showPicker.value = false;
  let newValue;
  if (props.type === 'time') {
    newValue = e;
  } else {
    newValue = dayjs(e).format(props.valueFormat);
  }
  emit('update:modelValue', newValue);
  emit('confirm', newValue);
}

// 日期时间字段单位格式化函数。
function formatter(type, value) {
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
}

// 更新UI界面
function $_updateUI(newValue) {
  if (!newValue) {
    text.value = '';
    if (props.defaultSelected) {
      if (props.type === 'time') {
        selected.value = newValue;
      } else {
        const time = dayjs(props.defaultSelected, props.valueFormat);
        selected.value = time.toDate();
      }
    } else {
      selected.value = null;
    }
  } else {
    if (props.type === 'time') {
      const nowTime = dayjs().format('YYYY-MM-DD');
      selected.value = newValue;
      const time = dayjs(`${nowTime} ${newValue}`);
      text.value = time.format(props.displayFormat);
    } else {
      const time = dayjs(newValue, props.valueFormat);
      selected.value = time.toDate();
      text.value = time.format(props.displayFormat);
    }
  }
}
</script>
<style scoped lang="less">
</style>
