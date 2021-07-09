<template>
  <div class="enum-select van-cell">
    <van-field
      ref="enumSelect"
      :required="required"
      :value="name"
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
        value-key="name"
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
/**
 * 枚举类型下拉选择框。
 *
 * @property {String} model
 *     以 v-model 双向绑定的选项取值，必须为指定的枚举中某个元素的值。
 * @property {Array} columns
 *     选项下拉框内容，是一个对象数组，每个元素包含name和value属性。
 * @property {String} label
 *     选项框标签。
 * @property {String} placeholder
 *     可选，选项框提示文字，默认值为''。
 * @property {Boolean} readonly
 *     可选，表示选项框中选择的选项是否只读。默认值为{@code false}。
 * @event {String} confirm
 *     当用户确认修改选择框中的选项时，会触发此事件，并将新选中的枚举值作为事件
 *     参数传递。
 * @event {String} change
 *     当用户打开选择列表并改变当前选择的选项时，会触发此事件，并将当前选项对应
 *     的枚举值作为事件参数进行传递。
 * @author gintangible
 */
export default {
  name: 'enum-select',
  components: {
    [Field.name]: Field,
    [Picker.name]: Picker,
    [Popup.name]: Popup,
  },
  model: {
    prop: 'model',
  },
  props: {
    model: {              // 当前选中的选项的数值，注意为了支持null此参数不限制类型
      required: true,
    },
    columns: {            // 选项下拉框内容，是一个对象数组，每个元素包含name和value属性
      type: Array,
      required: true,
    },
    label: {              // 选项输入框标签
      type: String,
      required: true,
    },
    required: {           // 见 vant field组件 required
      type: Boolean,
      default: false,
    },
    isLink: {             // 见 vant field组件 is-link
      type: Boolean,
      default: true,
    },
    rules: {              // 见 vant field组件 rules
      type: Array,
    },
    placeholder: {        // 选项输入框提示文字
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
      name: '',           //  当前选中的选项的名称
      defaultIndex: 0,    //  下拉选项框默认选中项的索引
    };
  },
  watch: {
    model(newValue) {
      // 更新界面元素
      this.$_updateUI(newValue);
    },
    columns() {
      // 更新界面元素
      this.$_updateUI(this.model);
    },
  },
  mounted() {
    // 更新界面元素
    this.$_updateUI(this.model);
  },
  methods: {
    // 用户点击选项输入框后触发此事件。
    onClick() {
      if (!this.readonly) {
        this.showPicker = true;
      } else {
        Toast(`${this.label}不可更改`);
      }
    },

    // 修改选项下拉框选项后触发的事件。

    onConfirm(item) {
      this.showPicker = false;
      // 注意：这里无需再调用 $_updateUI()，因为下面的语句触发了 input 事件，而
      // value 是作为 v-model 被绑定到本组件，因此 input 事件必然会自动
      // 更新 value 的值，而 value 更新后会触发对其的 watch 函数，
      // 该函数中会调用 $_updateUI() 方法。
      this.$emit('input', item.value);
      // 触发 confirm 事件
      this.$emit('confirm', item.value);
    },

    // 修改选项下拉框选项后触发的事件。
    onChange(picker, item) {
      this.$emit('change', item.value);
    },

    // 更新UI界面。
    $_updateUI(newValue) {
      if (newValue === null || newValue === '') {
        this.name = '';
        this.$_updatePicker(0);
      } else {
        // 查找枚举值对应的索引
        const index = this.columns.findIndex((e) => e.value === newValue);
        if (index < 0) {
          this.name = '';
          this.$_updatePicker(0);
        } else {
          this.name = this.columns[index].name;
          this.$_updatePicker(index);
        }
      }
    },

    /**
     * 更新下拉框选中项。
     *
     * @param {String} index
     *     新的选中项的索引。
     */
    $_updatePicker(index) {
      // 当 mounted() 函数调用 $_updateUI() 方法时，因为vant的Popup组件尚不可见，所以
      // vant的Picker组件尚未被渲染，this.$refs.picker 为undefined；
      // 此时只能通过绑定属性设置 Picker 的 defaultIndex 值
      this.defaultIndex = index;
      const {picker} = this.$refs;
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
