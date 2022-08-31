<template>
  <div class="calendar-range">
    <van-field
      :name="name"
      :model-value="text"
      :label="label"
      :placeholder="placeholder || `请选择${label}`"
      readonly
      clickable
      :disabled="disabled"
      :is-link="isLink"
      :input-align="inputAlign"
      :required="required"
      :rules="fieldRules"
      @click="onClick"
    />
    <van-calendar
      v-model:show="showCalendar"
      type="range"
      :row-height="rowHeight"
      :color="color"
      :formatter="formatter"
      :show-title="showTitle"
      :show-subtitle="showSubtitle"
      :max-range="maxRange"
      :min-date="minDate"
      :max-date="maxDate"
      @confirm="onConfirm"
    />
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import dayjs from 'dayjs';
import { Field as VanField, Calendar as VanCalendar } from 'vant';

const emit = defineEmits([
  'update:modelValue',
]);

const props = defineProps({
  name: String,
  modelValue: {
    type: Array,
    required: true,
  },
  label: {
    type: String,
    default: '时间区间'
  },
  displayFormat: {
    type: String,
    default: 'YYYY-MM-DD',
  },
  valueFormat: {
    type: String,
    default: 'YYYY-MM-DDTHH:mmZ',
  },
  placeholder: String,
  required: Boolean,
  isLink: Boolean,
  readonly: Boolean,
  disabled: Boolean,
  rules: Array,
  separator: {
    type: String,
    default: ' / ',
  },
  inputAlign: String,
  color: {
    type: String,
    default: '#1989fa',
  },
  showTitle: {
    type: Boolean,
    default: true,
  },
  showSubtitle: {
    type: Boolean,
    default: true,
  },
  rowHeight: [String, Number],
  maxRange: [Number, String],
  minDate: Date,
  maxDate: Date,
  formatter: Function,
});

const showCalendar = ref(false);
const text = ref('');

const fieldRules = computed(() => {
  let rules = [];
  if (props.required) {
    rules = [{
      required: true,
    }];
  }
  return rules.concat(props.rules || []);
});

watch(() => props.modelValue, () => {
  getAnalysisDate();
}, {
  deep: true,
  immediate: true,
});

function getAnalysisDate() {
  const displayFormat = props.modelValue.map((e) => {
    return dayjs(e).format(props.displayFormat);
  })
  text.value = displayFormat.join(props.separator);
}

function onClick() {
  if (props.readonly || props.disabled) {
    return;
  }
  showCalendar.value = true
}

function onConfirm(value) {
  showCalendar.value = false;
  const valueFormat = value.map((e) => {
    return dayjs(e).format(props.valueFormat);
  })
  emit('update:modelValue', valueFormat);
}
</script>

<style lang="less" scoped>
</style>
