<template>
  <div class="enum-select">
    <van-field
      :name="name"
      :value="text"
      :label="label"
      :placeholder="fieldPlaceholder"
      readonly
      :disabled="disabled"
      :is-link="isLink"
      :required="required"
      :rules="fieldRules"
      @click="onClick"
    />
    <van-popup
      v-model="showPicker"
      position="bottom"
    >
      <van-picker
        ref="picker"
        :columns="columns"
        :title="label"
        :default-index="defaultIndex"
        :value-key="valueKey"
        :item-height="itemHeight"
        show-toolbar
        @cancel="onCancel"
        @confirm="onConfirm"
        @change="onChange"
      >
        <template #default>
          <slot />
        </template>
        <template #title>
          <slot name="title" />
        </template>
      </van-picker>
    </van-popup>
  </div>
</template>
<script>
import { cloneDeep } from 'lodash';
import {
  Field, Picker, Popup, Toast,
} from 'vant';
import removeSpace from '../utils/removeSpace';

// 枚举类型下拉选择框。
export default {
  name: 'EnumSelect',

  components: {
    [Field.name]: Field,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
  },
  props: {
    value: {              // 当前选中的选项的数值
      type: null,
      required: true,
    },
    // 是否移除lable中间的空格，placeholder 与 只读点击时有效
    removeSpace: {
      type: Boolean,
      default: true,
    },
    readonly: Boolean,
    // 只读时点击反馈
    reaonlyToast: {
      type: Boolean,
      default: true,
    },
    // 见： https://vant-contrib.gitee.io/vant/v2/#/zh-CN/field
    name: String,
    label: {
      type: String,
      required: true,
    },
    required: Boolean,
    disabled: Boolean,
    isLink: {
      type: Boolean,
      default: true,
    },
    rules: {
      type: Array,
      default: () => [],
    },
    placeholder: String,

    // 见 https://vant-contrib.gitee.io/vant/v2/#/zh-CN/picker
    columns: {
      type: Array,
      required: true,
    },
    valueKey: {
      type: String,
      default: 'name',
    },
    pickerValue: {
      type: String,
      default: 'value'
    },
    itemHeight: {
      type: [String, Number],
      default: 36,
    },
  },

  data() {
    return {
      showPicker: false,  //  是否显示选项下拉框
      text: '',           //  当前选中的选项的名称
      defaultIndex: 0,    //  下拉选项框默认选中项的索引
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
    dataType() {
      const columns = this.columns;
      const firstColumn = columns[0] || {};
      if (firstColumn[this.pickerValue]) {
        return this.pickerValue;
      }
      return '';
    },
  },

  watch: {
    value(newValue) {
      this.$_updateUI(newValue);
    },
    columns: {
      handler: 'format',
      immediate: true
    }
  },

  methods: {
    format() {
      this.$_updateUI(this.value);
    },
    // 用户点击选项输入框后触发此事件。
    onClick() {
      if (this.disabled || this.readonly) {
        if (this.reaonlyToast) {
          Toast(`${this.fieldLabel}不可更改`);
        }
        return;
      }
      this.showPicker = true;
    },

    onCancel() {
      this.showPicker = false;
      this.$emit('cancel');
    },

    // 修改选项下拉框选项后触发的事件。
    onConfirm(item, index) {
      this.showPicker = false;
      this.$emit('input', this.dataType ? item[this.dataType] : item);
      this.$emit('confirm', cloneDeep(item), index);
    },

    // 修改选项下拉框选项后触发的事件。
    onChange(picker, item, index) {
      this.$emit('change', cloneDeep(item), index);
    },

    // 更新UI界面。
    $_updateUI(newValue) {
      if (newValue || +newValue === 0) {
        // 查找枚举值对应的索引
        const index = this.columns.findIndex((e) => {
          return (this.dataType ? e[this.dataType] : e) === newValue
        });
        if (index < 0) {
          this.text = '';
          this.$_updatePicker(0);
        } else {
          this.text = this.dataType ? this.columns[index][this.valueKey] : this.columns[index];
          this.$_updatePicker(index);
        }
      } else {
        this.text = '';
        this.$_updatePicker(0);
      }
    },

    // 更新下拉框选中项。
    $_updatePicker(index) {
      this.defaultIndex = index;
      const { picker } = this.$refs;
      if (picker) {
        picker.setIndexes = [index];
      }
    },
  },
};
</script>

<style scoped lang="less">
</style>
