<template>
  <div class="enum-cascader_field">
    <enum-select
      v-model="cascader[typeKey]"
      :name="typeName"
      :columns="columns"
      :label="typeLabel"
      :required="required"
      :placeholder="typePlaceholder || `请选择${typeLabel}`"
      :readonly="readonly || typeReadonly"
      :disabled="disabled"
      @confirm="onConfirmType"
      @change="onChangeType"
    />
    <common-field
      v-model="cascader[valueKey]"
      :name="valueName"
      :readonly="readonly || valueReadonly"
      :disabled="disabled"
      :label="valueLabel"
      :required="required"
      :placeholder="valuePlaceholder"
      clearable
      trim
      :rules="rules"
      @change="onChangeValue"
      @blur="onValueFieldBlur"
    />
  </div>
</template>

<script>
import { cloneDeep } from 'lodash';
import EnumSelect from '../enum-select';
import CommonField from '../common-field';

export default {
  name: 'EnumCascaderField',

  components: {
    [CommonField.name]: CommonField,
    [EnumSelect.name]: EnumSelect,
  },

  props: {
    value: {
      type: Object,
      required: true,
    },
    required: Boolean,
    readonly: Boolean,
    disabled: Boolean,
    columns: {
      type: Array,
      default: () => ([]),
    },
    typeName: String,
    typeLabel: {
      type: String,
      default: '类型',
    },
    typeKey: {
      type: String,
      default: 'type',
    },
    typePlaceholder: String,
    typeReadonly: {
      type: Boolean,
      default: false,
    },
    changeClear: {
      type: Boolean,
      default: true,
    },
    valueName: String,
    valueLabel: {
      type: String,
      default: '类型值',
    },
    valuePlaceholder: String,
    valueKey: {
      type: String,
      default: 'value',
    },
    rules: {
      type: Array,
      default: () => ([]),
    },
    valueReadonly: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      cascader: {
        [this.typeKey]: '',
        [this.valueKey]: '',
      },
    };
  },

  watch: {
    value: {
      deep: true,
      handler(newValue) {
        this.cascader = cloneDeep(newValue);
      },
    },
  },

  methods: {
    onConfirmType(type) {
      if (this.changeClear) {
        this.cascader[this.valueKey] = '';
      }
      this.$emit('confirm-type', type);
      const newValue = cloneDeep(this.cascader);
      this.$emit('input', newValue);
      this.$emit('confirm', newValue);
    },

    onChangeType(type) {
      this.$emit('change-type', type);
    },

    onChangeValue() {
      this.$emit('change-value', this.cascader.value);
    },

    onValueFieldBlur() {
      this.$emit('blur', cloneDeep(this.cascader));
    },
  },
};
</script>
<style scoped lang="less">

</style>
