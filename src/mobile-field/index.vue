<template>
  <div class="mobile-field van-cell">
    <van-field
      v-model="mobile"
      clearable
      type="tel"
      :readonly="readonly"
      :label="label"
      :placeholder="placeholder"
    />
  </div>
</template>

<script>
import { Field, Cell, Toast } from 'vant';

/**
 * 手机号码输入框控件。
 *
 * @property {String} mobile
 *     以 v-model 双向绑定的手机号码值。
 * @property {String} label
 *     姓名输入框标签，可选，默认值为'手机号码'。
 * @property {String} placeholder
 *     姓名输入框提示文字，可选，默认值为'请填写手机号码'。
 * @property {Boolean} readonly
 *     可选，表示输入框中的信息是否只读。默认值为{@code false}。
 * @event clear-error
 *     当输入框中内容变化时，会触发此事件；此事件通知外部系统清除旧的错误提示；
 *     此事件无参数。
 * @event {String} change
 *     当输入焦点离开输入框时，会触发此事件，并将输入框中新的文本作为事件参数传递。
 * @event {String} error
 *     当输入焦点离开输入框时，组件会检查输入框中的文字是否是合法的(中国大陆)手
 *     机号码；若不合法，则会触发{@code error}事件，并将错误消息作为事件参数传递。
 * @author gintangible
 */

export default {
  name: 'MobileField',
  components: {
    [Field.name]: Field,
    [Cell.name]: Cell,
  },
  model: {
    prop: 'value',
  },
  props: {
    value: {                          // 绑定的手机号码值
      type: String,
      required: true,
    },
    label: {                          // 手机号码输入框标签
      type: String,
      default: '手机号码',
    },
    placeholder: {                    // 手机号码输入框提示文字
      type: String,
      default: '请填写手机号码',
    },
    readonly: {                       // 输入框中的信息是否只读
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      mobile: '',                     // 当前手机号码
    };
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
    // 用户点击输入框后触发此事件。
    onClick() {
      if (this.readonly) {
        // 注意标签可能含有空格，但提示信息中不应该有空格，此方案仅适用于中文标签，英文则不适合
        const label = this.label; // removemidspace(this.label);
        Toast(`${label}不可更改`);
      }
    },

    // 当姓名输入框被修改时触发此事件。
    onChange(value) {
      logger.debug('MobileField.onChange: {0}', value);
      // 去除手机号码前后空格，并转换为大写
      this.mobile = value; // trimUppercaseString(value);
      this.$emit('clear-error');
      // 触发 input 事件
      this.$emit('input', this.mobile);
      // 不需要触发 change 事件，在 @blur 事件中触发 change 事件
    },

    // 当姓名输入框失去输入焦点时触发此事件。
    onBlur(e) {
      if (!this.readonly) {
        // 触发 change 事件，无需触发 input 事件
        this.$emit('change', this.mobile);
        // 验证输入框内容是否合法
        // const result = Mobile.validate(this.mobile);
        // if (!result.success) {
        //   // 触发 error 事件
        //   this.$emit('error', result.description);
        // }
      }
    },
  },
};
</script>
<style scoped lang="less">
.mobile-field {
  display: block;
  padding: 0;
}
</style>
