<template>
  <div class="enum-select">
    <van-field
      :name="name"
      :model-value="text"
      :label="label"
      :placeholder="fieldPlaceholder"
      readonly
      :disabled="disabled"
      :is-link="isLink"
      :required="required"
      :rules="fieldRules"
      @click="onClick"
    />
    <van-popup
      v-model:show="showPicker"
      round
      position="bottom"
    >
      <van-picker
        ref="picker"
        :columns="columns"
        :title="label"
        :default-index="defaultIndex"
        :columns-field-names="pickerOptions"
        :item-height="itemHeight"
        @cancel="onCancel"
        @confirm="onConfirm"
        @change="onChange"
      />
    </van-popup>
  </div>
</template>
<script setup>
import { ref, computed, watch } from 'vue';
import { cloneDeep } from 'lodash';
import {
  Field as VanField,
  Picker as VanPicker,
  Popup as VanPopup,
  Toast,
} from 'vant';
import removeSpace from '../utils/removeSpace';
import { pick } from 'vant/lib/utils';

const emit = defineEmits([
  'update:modelValue',
  'cancel',
  'confirm',
  'change',
]);

const props = defineProps({
  modelValue: {              // 当前选中的选项的数值
    type: null,
    required: true,
  },
  // 是否移除lable中间的空格，placeholder 与 只读点击时有效
  removeSpace: {
    type: Boolean,
    default: true,
  },
  readonly: Boolean,
  // 只读时点击反馈
  reaonlyToast: {
    type: Boolean,
    default: true,
  },
  // 见： https://vant-contrib.gitee.io/vant/v2/#/zh-CN/field
  name: String,
  label: {
    type: String,
    required: true,
  },
  required: Boolean,
  disabled: Boolean,
  isLink: {
    type: Boolean,
    default: true,
  },
  rules: {
    type: Array,
    default: () => [],
  },
  placeholder: String,
  // 见 https://vant-contrib.gitee.io/vant/v2/#/zh-CN/picker
  columns: {
    type: Array,
    required: true,
  },
  columnsFieldNames: {
    type: Object,
    default: () => ({
      text: 'text',
      value: 'value',
      values: 'values',
      children: 'children',
    }),
  },
  itemHeight: {
    type: [String, Number],
    default: 36,
  },
});

const showPicker = ref(false);
const text = ref('');
const defaultIndex = ref(0);
const picker = ref(null);

const fieldLabel = computed(() => {
  return props.removeSpace ? removeSpace(props.label) : props.label;
});
const fieldPlaceholder = computed(() => {
  return props.placeholder || `请输入${fieldLabel.value}`;
});
const fieldRules = computed(() => {
  let rules = [];
  if (props.required) {
    rules = [{
      required: true,
      message: fieldPlaceholder.value,
    }];
  }
  return rules.concat(props.rules || []);
});

const pickerOptions = computed(() => {
  return Object.assign({
    text: 'text',
    value: 'value',
    values: 'values',
    children: 'children',
  }, props.columnsFieldNames);
});

const pickerValue = computed(() => {
  const firstColumn = props.columns[0];
  if (typeof firstColumn === 'string') {
    return '';
  }
  return pickerOptions.value.value;
});

// 数据类型
const dataType = computed(() => {
  const firstColumn = props.columns[0];
  if (typeof firstColumn === 'string') {
    return 'string';
  }
  if (firstColumn[pickerOptions.value.children]) {
    return 'cascade';
  }
  if (firstColumn[pickerOptions.value.values]) {
    return 'multi';
  }
  return 'object';
});

watch(() => props.modelValue, (newValue) => {
  $_updateUI(newValue);
}, {
  immediate: true,
});
watch(() => props.columns, format, { deep: true });

function format() {
  $_updateUI(props.modelValue);
}
  // 用户点击选项输入框后触发此事件。
function onClick() {
  if (props.disabled || props.readonly) {
    if (props.reaonlyToast) {
      Toast(`${fieldLabel.value}不可更改`);
    }
    return;
  }
  showPicker.value = true;
}

function getPickerValue(item) {
  let updateValue;
  if (dataType.value === 'cascade') {
    item.forEach((i) => {
      (updateValue || (updateValue = [])).push(i[pickerValue.value]);
    })
  } else if (dataType.value === 'object') {
    updateValue = item[pickerValue.value];
  } else {
    updateValue = item;
  }
  return updateValue;
}

function onCancel() {
  showPicker.value = false;
  emit('cancel');
}

// 修改选项下拉框选项后触发的事件。
function onConfirm(item, index) {
  const updateValue = getPickerValue(item);
  emit('update:modelValue', updateValue);
  emit('confirm', updateValue, index);
  showPicker.value = false;
}

// 修改选项下拉框选项后触发的事件。
function onChange(item, index) {
  emit('change', getPickerValue(item), index);
}

function $_updateMultiUI(value) {
  if (!value.length) {
    return;
  }
  let texts = [];
  let indexs = [];
  if (dataType.value === 'cascade') {
    let currentColumn = props.columns;
    value.forEach((item) => {
      const index = currentColumn.findIndex((e) => {
        return (pickerValue.value ? e[pickerValue.value] : e) === item;
      });
      const currentData = currentColumn[index];
      indexs.push(index);
      texts.push(currentData[pickerOptions.value.text]);
      currentColumn = currentData[pickerOptions.value.children];
    });
  } else {
    props.columns.forEach((item, i) => {
      const text = value[i];
      const index = item[pickerOptions.value.values].findIndex((e) => e === text);
      indexs.push(index);
      texts.push(text);
    });
  }
  text.value = texts.join('');
  $_updatePicker(indexs);
}

// 更新UI界面。
function $_updateUI(newValue) {
  if (['cascade','multi'].includes(dataType.value)) {
    $_updateMultiUI(newValue);
    return;
  }
  if (newValue || +newValue === 0) {
    const index = props.columns.findIndex((e) => {
      return (pickerValue.value ? e[pickerValue.value] : e) === newValue;
    });
    if (index < 0) {
      text.value = '';
      $_updatePicker(0);
    } else {
      text.value = pickerValue.value ? props.columns[index][pickerOptions.value.text] : props.columns[index];
      $_updatePicker(index);
    }
  } else {
    text.value = '';
    $_updatePicker(0);
  }
}

// 更新下拉框选中项。
function $_updatePicker(index) {
  if (Array.isArray(index)) {
    if (picker.value) {
      picker.value.setIndexes = index;
    }
    return;
  }
  defaultIndex.value = index;
  if(picker.value) {
    picker.value.setIndexes = [index];
  }
}
</script>

<style scoped lang="less">
</style>
