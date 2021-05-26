<template>
  <div class="name-field van-cell">
    <van-field
      v-model="name"
      clearable
      :readonly="readonly"
      :label="label"
      :placeholder="placeholder"
      @click="onClick"
      @input="onChange"
      @blur="onBlur"
    />
  </div>
</template>

<script>
import { Field, Cell } from 'vant';

/**
 * 姓名输入框控件。
 *
 * @property {String} value
 *     以 v-model 双向绑定的姓名值。
 * @property {String} label
 *     姓名输入框标签，可选，默认值为'姓　　名'。
 * @property {String} placeholder
 *     姓名输入框提示文字，可选，默认值为'请填写姓名'。
 * @property {Boolean} readonly
 *     可选，表示输入框中的信息是否只读。默认值为{@code false}。
 * @event clear-error
 *     当输入框中内容变化时，会触发此事件；此事件通知外部系统清除旧的错误提示；
 *     此事件无参数。
 * @event {String} change
 *     当输入焦点离开输入框时，会触发此事件，并将输入框中新的文本作为事件参数传递。
 * @event {String} error
 *     当输入焦点离开输入框时，组件会检查输入框中的文字是否是合法的中文/英文姓名；
 *     若不合法，则会触发{@code error}事件，并将错误消息作为事件参数传递。
 * @author gintangible
 */

export default {
  name: 'name-field',
  components: {
    [Field.name]: Field,
    [Cell.name]: Cell,
  },
  model: {
    prop: 'value',
  },
  props: {
    value: {                          // 绑定的姓名值
      type: String,
      required: true,
    },
    label: {                          // 姓名输入框标签
      type: String,
      default: '姓　　名',
    },
    placeholder: {                    // 姓名输入框提示文字
      type: String,
      default: '请填写姓名',
    },
    readonly: {                       // 输入框中的信息是否只读
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      name: '',                       // 当前姓名
    };
  },
  watch: {
    value(newValue) {
      this.name = newValue;
    },
  },
  created() {
    this.name = this.value;
  },
  methods: {
    // 用户点击输入框后触发此事件。
    onClick() {
      if (this.readonly) {
        const {label} = this;//  removemidspace(this.label);
        Toast(`${label}不可更改`);
      }
    },

    // 当姓名输入框被修改时触发此事件。
    onChange(value) {
      // 转换为大写，但不能删除头尾空格，否则就无法输入中间带空格的字符串
      this.name = value; // uppercaseString(value);
      // 触发 clear-error 事件
      this.$emit('clear-error');
      // 触发 input 事件
      this.$emit('input', this.name);
    },

    // 当姓名输入框失去输入焦点时触发此事件。
    onBlur(e) {
      if (!this.readonly) {
        // 去除头尾空格并转换为大写
        this.name = this.name; // trimUppercaseString(this.name);
        this.$emit('input', this.name);
        // 触发 change 事件
        this.$emit('change', this.name);
        // 验证输入框内容是否合法
        // const result = Name.validate(this.name);
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
.name-field {
  display: block;
  padding: 0;
}
</style>
