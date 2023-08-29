<template>
  <van-field
    v-model="text"
    :name="name"
    clearable
    :readonly="readonly"
    :label="label"
    :placeholder="placeholder"
    :required="required"
    :error-message-align="inputAlign"
    :rules="nameRule"
    :input-align="inputAlign"
    @click="onClick"
    @input="onChange"
    @blur="onBlur"
  />
</template>

<script>
import { Field, Toast } from 'vant';
import { removemidspace } from '@njzhyl/common-filter';

const CHINESE_NAME_REGEXP = /^[\u{4E00}-\u{9FEF}\u{3400}-\u{4DBF}\u{20000}-\u{2A6D6}\u{2A700}-\u{2B734}\u{2B740}-\u{2B81D}\u{2B820}-\u{2CEA1}\u{2CEB0}-\u{2EBE0}\u{F900}-\u{FAD9}\u{2F800}-\u{2FA1F}][\u{4E00}-\u{9FEF}\u{3400}-\u{4DBF}\u{20000}-\u{2A6D6}\u{2A700}-\u{2B734}\u{2B740}-\u{2B81D}\u{2B820}-\u{2CEA1}\u{2CEB0}-\u{2EBE0}\u{F900}-\u{FAD9}\u{2F800}-\u{2FA1F}·.]{0,28}[\u{4E00}-\u{9FEF}\u{3400}-\u{4DBF}\u{20000}-\u{2A6D6}\u{2A700}-\u{2B734}\u{2B740}-\u{2B81D}\u{2B820}-\u{2CEA1}\u{2CEB0}-\u{2EBE0}\u{F900}-\u{FAD9}\u{2F800}-\u{2FA1F}]$/u;

const ENGLISH_NAME_REGEXP = /^[a-zA-Z][a-zA-Z .]{0,58}[a-zA-Z]$/;

export default {
  name: 'NameField',
  components: {
    [Field.name]: Field,
  },
  model: {
    prop: 'value',
  },
  props: {
    name: {
      type: String,
      default: 'name',
    },
    value: {
      type: String,
      required: true,
    },
    required: Boolean,
    errorMessage: {
      type: String,
      default: '姓名错误',
    },
    rules: {
      type: Array,
      default: () => [],
    },
    label: {
      type: String,
      default: '姓　　名',
    },
    placeholder: {
      type: String,
      default: '请填写姓名',
    },
    inputAlign: {
      type: String,
      default: 'right',
    },
    readonly: Boolean,
  },
  data() {
    return {
      text: '',
    };
  },
  computed: {
    nameRule() {
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
      this.text = newValue;
    },
  },
  mounted() {
    this.text = this.value;
  },
  methods: {
    validate(val) {
      return CHINESE_NAME_REGEXP.test(val) || ENGLISH_NAME_REGEXP.test(val);
    },
    onClick() {
      if (this.readonly) {
        const label = removemidspace(this.label);
        Toast(`${label}不可更改`);
      }
    },

    onChange(value) {
      this.text = value?.toUpperCase();
      this.$emit('clear-error');
      this.$emit('input', this.text);
    },

    onBlur() {
      const result = this.validate(this.text);
      this.$emit('input', this.text);
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
