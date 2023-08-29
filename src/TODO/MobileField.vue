<template>
  <van-field
    v-model.trim="mobile"
    :name="name"
    clearable
    type="tel"
    :readonly="readonly"
    :label="label"
    :placeholder="placeholder"
    :required="required"
    :error-message-align="inputAlign"
    :rules="mobileRule"
    :input-align="inputAlign"
    @click="onClick"
    @input="onChange"
    @blur="onBlur"
  />
</template>

<script>
import { Field, Toast } from 'vant';
import { removemidspace } from '@njzhyl/common-filter';

export default {
  name: 'MobileField',
  components: {
    [Field.name]: Field,
  },
  model: {
    prop: 'value',
  },
  props: {
    name: {
      type: String,
      default: 'mobile',
    },
    value: {                          // 绑定的手机号码值
      type: String,
      required: true,
    },
    required: Boolean,
    errorMessage: {
      type: String,
      default: '手机号错误',
    },
    rules: {
      type: Array,
      default: () => [],
    },
    label: {                          // 手机号码输入框标签
      type: String,
      default: '手机号码',
    },
    placeholder: {                    // 手机号码输入框提示文字
      type: String,
      default: '请填写手机号码',
    },
    inputAlign: {
      type: String,
      default: 'right',
    },
    readonly: Boolean,
  },
  data() {
    return {
      mobile: '',                     // 当前手机号码
    };
  },
  computed: {
    mobileRule() {
      return [{
        required: this.required,
        trigger: 'onBlur',
        message: this.errorMessage,
        validator: (val) => this.validate(val),
      }].concat(this.rules);
    },
  },
  watch: {
    value(newValue) {
      this.mobile = newValue;
    },
  },
  mounted() {
    this.mobile = this.value;
  },
  methods: {
    onClick() {
      if (this.readonly) {
        const label = removemidspace(this.label);
        Toast(`${label}不可更改`);
      }
    },
    validate(val) {
      return /^(0|86|17951)?(1[3-9])[0-9]{9}$/.test(val);
    },
    onChange(value) {
      this.mobile = value?.toUpperCase();
      this.$emit('clear-error');
      this.$emit('input', this.mobile);
    },
    onBlur() {
      const result = this.validate(this.mobile);
      this.$emit('input', this.mobile);
      this.$emit('change', this.mobile);
      if (!result) {
        this.$emit('error', this.errorMessage);
      }
    },
  },
};
</script>
<style scoped lang="less">
</style>
