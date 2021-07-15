<template>
  <div class="datetime-range">
    <div class="datetime-range-select">
      <datetime-select
        v-model="startDate"
        :label="startDateLabel"
        :display-format="displayFormat"
        :type="type"
        :is-link="isLink"
        :rules="rules"
        :readonly="readonly"
        :value-format="valueFormat"
        :min-date="rangeMinDate"
        :max-date="maxDate"
        :placeholder="startDatePlaceholder"
        :right-icon="rightIcon"
        @confirm="onConfirm"
      />
    </div>
    <slot
      v-if="separatorShow"
      name="separator"
    >
      <span class="separator-wrap">
        {{ separator }}
      </span>
    </slot>
    <div class="datetime-range-select">
      <datetime-select
        v-model="endDate"
        :label="endDateLabel"
        :display-format="displayFormat"
        :placeholder="endDatePlaceholder"
        :value-format="valueFormat"
        :type="type"
        :readonly="readonly"
        :min-date="minDate"
        :max-date="rangeMaxDate"
        :rules="rules"
        :is-link="isLink"
        :right-icon="rightIcon"
        @confirm="onConfirm"
      />
    </div>
  </div>
</template>

<script>
import DatettimeSelect from '../datetime-select';
import dayjs from 'dayjs';

export default {
  name: 'datetime-range',
  components: {
    [DatettimeSelect.name]: DatettimeSelect,
  },
  props: {
    // 时间区间
    value: {
      type: Array,
      required: true,
    },
    // 开始时间的label
    startDateLabel: {
      type: String,
      default: '开始时间',
    },
    // 结束时间的label
    endDateLabel: {
      type: String,
      default: '结束时间',
    },
    // 选中的日期时间数值的格式
    valueFormat: {
      type: String,
      default: 'YYYY-MM-DD',
    },
    // 开始时间默认placeholder
    startDatePlaceholder: {
      type: String,
      default: '开始时间',
    },
    // 结束时间默认placeholder
    endDatePlaceholder: {
      type: String,
      default: '结束时间',
    },
    // 选中的日期时间在选择框中显示的格式
    displayFormat: {
      type: String,
      default: 'YYYY-MM-DD',
    },
    isLink: {
      type: Boolean,
      default: true,
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
    // 是否显示分隔符
    separatorShow: {
      type: Boolean,
    },
    // 分隔符
    separator: {
      type: String,
      default: '--',
    },
    // 右侧图片
    rightIcon: {               // 见 van-field right-icon
      type: String,
      default: '',
    },
    rangeMinDate: {            // 可选的最小日期时间
      type: Date,
      default: () => dayjs().subtract(10, 'year').toDate(),
    },
    rangeMaxDate: {            // 可选的最大日期时间
      type: Date,
      default: () => dayjs().add(10, 'year').toDate(),
    },
    readonly: {
      type: Boolean,
    },
  },
  data() {
    return {
      startDate: '',
      endDate: '',
    };
  },
  computed: {
    minDate() {
      const startTime = this.startDate || dayjs();
      return dayjs(startTime).toDate();
    },
    maxDate() {
      const endTime = this.endDate || dayjs().add(10, 'year');
      return dayjs(endTime).toDate();
    },
  },
  watch: {
    value: {
      deep: true,
      handler(newValue) {
        this.startDate = newValue[0];
        this.endDate = newValue[1];
      },
    },
  },
  methods: {
    // 更新时间
    onConfirm() {
      console.log('gxw ', [this.startDate, this.endDate])
      this.$emit('input', [this.startDate, this.endDate]);
    }
  },
};
</script>

