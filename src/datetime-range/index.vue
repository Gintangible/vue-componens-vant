<template>
  <div class="datetime-range">
    <div class="datetime-range-select">
      <date-select
        v-model="datetimeRange.startDate"
        :label="startDateLabel"
        :display-format="displayFormat"
        :type="type"
        :is-link="false"
        :rules="rules"
        :value-format="valueFormat"
        :min-date="rangeMinDate"
        :max-date="maxDate"
        :placeholder="startDatePlaceholder"
        :right-icon="rightIcon"
        @change="change"
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
      <date-select
        v-model="datetimeRange.endDate"
        :label="endDateLabel"
        :display-format="displayFormat"
        :placeholder="endDatePlaceholder"
        :value-format="valueFormat"
        :type="type"
        :min-date="minDate"
        :max-date="rangeMaxDate"
        :rules="rules"
        :is-link="false"
        :right-icon="rightIcon"
        @change="change"
      />
    </div>
  </div>
</template>

<script>
import DatetSelect from '../datetime-select';
import clone from '../utils/clone';
import dayjs from 'dayjs';

export default {
  name: 'datetime-range',
  components: {
    [DatetSelect.name]: DatetSelect,
  },
  props: {
    // 时间区间
    value: {
      type: Object,
      required: true,
    },
    // 开始时间的label
    startDateLabel: {
      type: String,
      default: '',
    },
    // 结束时间的label
    endDateLabel: {
      type: String,
      default: '',
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
      default: true,
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
  },
  data() {
    return {
      datetimeRange: {
        startDate: '',
        endDate: '',
      }
    };
  },
  computed: {
    minDate() {
      const startTime = this.datetimeRange.startDate || dayjs();
      return dayjs(startTime).toDate();
    },
    maxDate() {
      const endTime = this.datetimeRange.endDate || dayjs().add(10, 'year');
      return dayjs(endTime).toDate();
    },
  },
  watch: {
    value: {
      deep: true,
      handler(newValue) {
        this.datetimeRange = clone(newValue);
      },
    },
  },
  methods: {
    // 更新时间
    change() {
      this.$emit('input', clone(this.datetimeRange));
    }
  },
};
</script>

<style lang="less" scoped>
.datetime-range {
  display: flex;
  font-size: 12px;
  .datetime-range-select  {
    width: 120px;
  }
  /deep/ .van-cell {
    padding: 0;
    flex-direction:column;
  }
  /deep/ .van-field__label {
    color: #999;
  }
  /deep/ .van-field__value {
    padding: 0 12px;
    color: #666;
    font-size: 12px;
    line-height: 30px;
    text-align: center;
    border-radius: 5px;
    background: #eff0f4;
  }
  .separator-wrap {
    margin: 0 16px;
    display: flex;
    align-items: center;
  }
}
</style>
