<template>
  <div class="calendar-range">
    <van-field
      :name="name"
      :value="text"
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
      v-model="showCalendar"
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

<script>
import dayjs from 'dayjs';
import { Field, Calendar } from 'vant';

export default {
  name: 'CalendarField',

  components: {
    [Field.name]: Field,
    [Calendar.name]: Calendar,
  },
  props: {
    name: String,
    value: {
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
  },
  data() {
    return {
      showCalendar: false,
      text: '',
    };
  },

  computed: {
    // form 表单只能检测field的值，field不支持数组。
    fieldRules() {
      let rules = [];
      if (this.required) {
        rules = [{
          required: true,
        }];
      }
      return rules.concat(this.rules || []);
    },
  },

  watch: {
    value: {
      deep: true,
      immediate: true,
      handler() {
        this.getAnalysisDate();
      },
    },
  },

  methods: {
    getAnalysisDate() {
      const displayFormat = this.value.map((e) => {
        return dayjs(e).format(this.displayFormat);
      })
      this.text = displayFormat.join(this.separator);
    },

    onClick() {
      if (this.readonly || this.disabled) {
        return;
      }
      this.showCalendar = true
    },

    onConfirm(value) {
      this.showCalendar = false;
      const valueFormat = value.map((e) => {
        return dayjs(e).format(this.valueFormat);
      })
      this.$emit('input', valueFormat);
    },
  },
};
</script>

<style lang="less" scoped>
</style>
