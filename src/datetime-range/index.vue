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

<script>
import DatetimeSelect from '../datetime-select';
import dayjs from 'dayjs';

export default {
  name: 'DatetimeRange',
  components: {
    [DatetimeSelect.name]: DatetimeSelect,
  },
  props: {
    // 时间区间
    value: {
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
  },
  data() {
    return {
      startDate: '',
      endDate: '',
    };
  },
  computed: {
    endMinDate() {
      const startTime = this.startDate || dayjs();
      return dayjs(startTime).toDate();
    },
    startMaxDate() {
      const endTime = this.endDate || this.rangeMaxDate;
      return dayjs(endTime).toDate();
    },
  },
  watch: {
    value: {
      deep: true,
      handler() {
        this.getAnalysisDate();
      },
    },
  },
  created() {
    this.getAnalysisDate();
  },
  methods: {
    getAnalysisDate() {
      this.startDate = this.value[0];
      this.endDate = this.value[1];
    },

    onConfirm() {
      this.$emit('input', [this.startDate, this.endDate]);
    },
  },
};
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
