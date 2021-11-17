<template>
  <div class="enum-select van-cell">
    <van-field
      ref="enumSelect"
      :required="required"
      :value="text"
      :label="label"
      :placeholder="placeholder"
      readonly
      :is-link="isLink"
      :rules="rules"
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
        show-toolbar
        @cancel="showPicker = false"
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
import {
  Field, Picker, Popup, Toast,
} from 'vant';
import { stringRemoveSpace } from '@gintangible/common-utils'

// 枚举类型下拉选择框。
export default {
  name: 'enum-select',
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
    columns: {            // 同vant-picker columns
      type: Array,
      required: true,
    },
    valueKey: {           // 同vant-picker value-key
      type: String,
      default: 'name',
    },
    label: {              // 同 vant-field label
      type: String,
      required: true,
    },
    required: {           // 同 vant-field required
      type: Boolean,
      default: false,
    },
    isLink: {             // 同 vant-field is-link
      type: Boolean,
      default: true,
    },
    rules: {              // 同 vant-field rules
      type: Array,
    },
    placeholder: {        // 选项框提示文字
      type: String,
      default: '',
    },
    readonly: {           // 选项框中选择的选项是否只读
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      showPicker: false,  //  是否显示选项下拉框
      text: '',           //  当前选中的选项的名称
      defaultIndex: 0,    //  下拉选项框默认选中项的索引
    };
  },
  watch: {
    value(newValue) {
      this.$_updateUI(newValue);
    },
    columns() {
      this.$_updateUI(this.value);
    },
  },
  mounted() {
    this.$_updateUI(this.value);
  },
  methods: {
    // 用户点击选项输入框后触发此事件。
    onClick() {
      if (this.readonly) {
        Toast(`${stringRemoveSpace(this.label)}不可更改`);
        return;
      }
      this.showPicker = true;
    },

    // 修改选项下拉框选项后触发的事件。
    onConfirm(item) {
      this.showPicker = false;
      this.$emit('input', item.value);
      this.$emit('confirm', item);
    },

    // 修改选项下拉框选项后触发的事件。
    onChange(picker, item) {
      this.$emit('change', item);
    },

    // 更新UI界面。
    $_updateUI(newValue) {
      if (newValue === null || newValue === '') {
        this.text = '';
        this.$_updatePicker(0);
      } else {
        // 查找枚举值对应的索引
        const index = this.columns.findIndex((e) => e.value === newValue);
        if (index < 0) {
          this.text = '';
          this.$_updatePicker(0);
        } else {
          this.text = this.columns[index][this.valueKey];
          this.$_updatePicker(index);
        }
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
.enum-select {
  display: block;
  padding: 0;
  .van-cell::after {
    display: none;
  }
}
</style>
