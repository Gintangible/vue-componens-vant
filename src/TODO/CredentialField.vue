<template>
  <div class="credential-field">
    <enum-select
      v-model="credential.type"
      :columns="credentialTypes"
      :label="typeLabel"
      :required="required"
      :rules="typeRules"
      :placeholder="typePlaceholder"
      :readonly="readonly || typeReadonly"
      @confirm="onConfirmType"
      @change="onChangeType"
    />
    <van-field
      v-model.trim="credential.number"
      clearable
      :readonly="readonly || numberReadonly"
      :label="numberLabel"
      :placeholder="numberPlaceholder"
      :required="required"
      :rules="credentialNumberRule"
      :error-message-align="inputAlign"
      :input-align="inputAlign"
      @click="onNumberFieldClick"
      @input="onChangeNumber"
      @blur="onNumberFieldBlur"
    />
  </div>
</template>

<script>
import { Field, Toast } from 'vant';
import { Credential, CREDENTIAL_TYPES } from '@njzhyl/common-model';
import { removemidspace } from '@njzhyl/common-filter';
import EnumSelect from '@/components/EnumSelect';

export default {
  name: 'CredentialField',
  components: {
    [Field.name]: Field,
    [EnumSelect.name]: EnumSelect,
  },
  model: {
    prop: 'model',
  },
  props: {
    model: {                           // 双向绑定的证件对象
      type: Credential,
      required: true,
    },
    required: Boolean,
    errorMessage: {
      type: String,
      default: '证件号码错误',
    },
    typeRules: {
      type: Array,
      default: () => [],
    },
    numberRules: {
      type: Array,
      default: () => [],
    },
    typeLabel: {                      // 证件类型选项框标签
      type: String,
      default: '证件类型',
    },
    typePlaceholder: {                // 证件类型选项框提示文字
      type: String,
      default: '请选择证件类型',
    },
    credentialTypes: {                // 证件类型选项
      type: Array,
      default: () => CREDENTIAL_TYPES,
    },
    numberLabel: {                    // 证件号码输入框标签
      type: String,
      default: '证件号码',
    },
    numberPlaceholder: {              // 证件号码输入框提示文字
      type: String,
      default: '请填写证件号码',
    },
    readonly: Boolean,
    typeReadonly: Boolean,
    numberReadonly: Boolean,
    inputAlign: {
      type: String,
      default: 'right',
    },
  },
  data() {
    return {
      credential: Credential.create(this.model), // 当前证件对象
    };
  },
  computed: {
    credentialNumberRule() {
      return [{
        required: this.required,
        trigger: 'onBlur',
        message: this.errorMessage,
        validator: (val) => this.validate(val),
      }].concat(this.numberRules);
    },
  },
  watch: {
    model: {
      immediate: true,
      deep: true,
      handler(newValue) {
        this.credential.assign(newValue);
      },
    },
  },
  methods: {
    validate(val) {
      return /^[1-9]\d{5}(19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/.test(val);
    },
    onConfirmType(type) {
      // 修改证件类型，并将其号码清空
      this.credential.changeType(type);
      this.$emit('clear-error');
      this.$emit('confirm-type', type);
      this.$emit('input', Credential.create(this.credential));   // 注意传递对象必须clone()
      this.$emit('change', Credential.create(this.credential));   // 注意传递对象必须clone()
    },

    onChangeType(type) {
      this.$emit('change-type', type);
    },

    onChangeNumber(number) {
      number = number?.toUpperCase();
      this.credential.number = number;
      this.$emit('clear-error');
    },

    onNumberFieldClick() {
      if (this.readonly || this.numberReadonly) {
        // 注意标签可能含有空格，但提示信息中不应该有空格，此方案仅适用于中文标签，英文则不适合
        const label = removemidspace(this.numberLabel);
        Toast(`${label}不可更改`);
      }
    },

    onNumberFieldBlur() {
      if (this.readonly || this.numberReadonly) {
        return;
      }
      const result = this.validate(this.credential.number);
      if (!result) {
        this.$emit('error', this.errorMessage);
      } else {
        this.$emit('change-number', this.credential.number);
        this.$emit('input', Credential.create(this.credential));
        this.$emit('change', Credential.create(this.credential));
      }
    },
  },
};
</script>
<style scoped lang="less">
</style>
