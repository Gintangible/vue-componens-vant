<template>
  <div :class="['datetime-range',
    inline ? 'datetime-range_inline' : ''
  ]">
    <div class="datetime-range_item">
      <datetime-select
        v-model="startDate"
        :type="type"
        :name="startName"
        :label="startLabel"
        :placeholder="startPlaceholder"
        :display-format="displayFormat"
        :is-link="isLink"
        :rules="rules"
        :input-align="inputAlign"
        :value-format="valueFormat"
        :min-date="minDate"
        :max-date="startMaxDate"
        @confirm="onConfirm"
      />
    </div>
    <slot
      v-if="separator"
      name="separator"
    >
      <span class="separator-wrap">
        {{ separator }}
      </span>
    </slot>
    <div class="datetime-range_item">
      <datetime-select
        v-model="endDate"
        :name="endName"
        :type="type"
        :label="endLabel"
        :placeholder="endPlaceholder"
        :is-link="isLink"
        :input-align="inputAlign"
        :display-format="displayFormat"
        :value-format="valueFormat"
        :min-date="endMinDate"
        :max-date="maxDate"
        :rules="rules"
        @confirm="onConfirm"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from 'vue';
import DatetimeSelect from '../datetime-select/index.vue';
import dayjs from 'dayjs';

const emit = defineEmits([
  'update:modelValue',
]);

const props = defineProps({
  // 时间区间
  modelValue: {
    type: Array,
    required: true,
  },
  startName: String,
  endName: String,
  // 选中的日期时间数值的格式
  valueFormat: {
    type: String,
    default: 'YYYY-MM-DD',
  },
  startLabel: {
    type: String,
    default: '',
  },
  startPlaceholder: {
    type: String,
    default: '开始时间',
  },
  endLabel: {
    type: String,
    default: '',
  },
  endPlaceholder: {
    type: String,
    default: '结束时间',
  },
  displayFormat: {
    type: String,
    default: 'YYYY-MM-DD',
  },
  // 时间类型
  type: {
    type: String,
    default: 'date',
  },
  // 时间验证规则
  rules: {
    type: Array,
    default: () => [],
  },
  separator: {
    type: String,
    default: '/',
  },
  inline: {
    type: Boolean,
    default: true,
  },
  isLink: Boolean,
  inputAlign: {
    type: String,
    default: 'center',
  },
  minDate: Date,
  maxDate: Date,
});

const startDate = ref('');
const endDate = ref('');

const endMinDate = computed(() => {
  const startTime = startDate.value || props.minDate;
  return dayjs(startTime).toDate();
});
const startMaxDate = computed(() => {
  const endTime = endDate.value || props.maxDate;
  return dayjs(endTime).toDate();
})

watch(() => props.modelValue, () => {
  getAnalysisDate();
}, { deep: true, immediate: true });

function getAnalysisDate() {
  startDate.value = props.modelValue[0];
  endDate.value = props.modelValue[1];
}

function onConfirm() {
  emit('update:modelValue', [startDate.value, endDate.value]);
}
</script>

<style lang="less" scoped>
.datetime-range {
  font-size: 14px;
  background: #fff;
  &.datetime-range_inline {
    display: flex;
    align-items: center;
    justify-content: space-evenly;
    :deep(.van-field) {
      flex-direction: column;
    }
    .datetime-range_item {
      width: 110px;
    }
  }
  .separator-wrap {
    width: 30px;
    text-align: center;
  }
}
</style>
