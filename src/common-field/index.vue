<template>
  <van-field
    v-model="text"
    :name="name"
    :readonly="readonly"
    :label="label"
    :type="type"
    :placeholder="fieldPlaceholder"
    :required="required"
    :disabled="disabled"
    :error="error"
    :clickable="clickable"
    :formatter="fieldFormatter"
    :format-trigger="formatterTrigger"
    :clearable="clearable"
    :left-icon="leftIcon"
    :right-icon="rightIcon"
    :rules="fieldRules"
    @click="onClick"
    @input="onChange"
    @blur="onBlur"
  />
</template>

<script>
import { Field, Toast } from 'vant';
import removeSpace from '../utils/removeSpace';

// 通用输入框控件。
export default {
  name: 'CommonField',

  components: {
    [Field.name]: Field,
  },

  props: {
    value: {                          // 绑定的姓名值
      type: String,
      required: true,
    },
    // 字符串是否去除两端空格
    trim: {
      type: Boolean,
      default: true,
    },
    // 只读时点击 field 提示
    reaonlyTip: {
      type: Boolean,
      default: true,
    },
    // 字符串是否转大写
    upperCase: Boolean,
    // 是否移除lable中间的空格，placeholder 与 只读点击时有效
    removeSpace: {
      type: Boolean,
      default: true,
    },
    // 以下 prop 见： https://vant-contrib.gitee.io/vant/v2/#/zh-CN/field
    name: String,
    label: {
      type: String,
      default: '文 本',
    },
    type: String,
    placeholder: String,
    readonly: Boolean,
    disabled: Boolean,
    required: Boolean,
    clickable: Boolean,
    error: Boolean,
    leftIcon: String,
    rightIcon:String,
    formatter: Function,clearable: {
      type: Boolean,
      default: true,
    },
    formatterTrigger: {
      type: String,
      default: 'onBlur',
    },
    rules: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
      text: '',                       // 当前姓名
    };
  },

  computed: {
    fieldLabel() {
      return this.removeSpace ? removeSpace(this.label) : this.label;
    },
    fieldPlaceholder() {
      return this.placeholder || `请输入${this.fieldLabel}`;
    },
    fieldRules() {
      let rules = [];
      if (this.required) {
        rules = [{
          required: true,
          message: this.fieldPlaceholder,
        }];
      }
      return rules.concat(this.rules || []);
    },
  },

  watch: {
    value(newValue) {
      this.text = newValue;
    },
  },

  created() {
    this.text = this.value;
  },

  methods: {
    fieldFormatter(val) {
      if (this.formatter) {
        return this.formatter(val);
      }
      if (this.formatterTrigger === 'onBlur') {
        if (this.trim) {
          val = val.trim();
        }
      }
      if (this.upperCase) {
        val = val.toUpperCase()
      }
      return val;
    },

    // 用户点击输入框后触发此事件。
    onClick() {
      if (this.readonly && this.reaonlyTip) {
        Toast(`${this.fieldLabel}不可更改`);
      }
    },

    // 当姓名输入框被修改时触发此事件。
    onChange() {
      // 触发 input 事件
      this.$emit('input', this.text);
      this.$emit('change', this.text);
    },

    // 当输入框失去输入焦点时触发此事件。
    onBlur() {
      if (!this.readonly) {
        this.$emit('input', this.text);
        // 触发 blur 事件
        this.$emit('blur', this.text);
      }
    },
  },
};
</script>
<style scoped lang="less">
</style>
