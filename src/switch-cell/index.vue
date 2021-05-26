<template>
  <van-cell
    center
    :title="title"
    :label="label"
  >
    <template #right-icon>
      <van-switch
        v-model="model"
        size="24"
        :disabled="readonly"
        @change="onChange"
      />
    </template>
  </van-cell>
</template>

<script>
import { Cell, Switch } from 'vant';

/**
 * 一个简单的组合{@link Cell}和{@link Switch}的控件。
 *
 * @property {Boolean} value
 *     以{@code v-mode}双向绑定的开关取值。
 * @property {String} title
 *     可选，该控件的标题。默认值为空字符串。
 * @property {String} label
 *     可选，该控件标题下方的描述信息。默认值为空字符串。
 * @property {Boolean} readonly
 *     可选，表示输入框中的信息是否只读。默认值为{@code false}。
 * @event {String} change
 *     当开关值被用户改变时，会触发此事件，并将新的开关值作为事件参数传递。
 * @author gintangible
 */
export default {
  name: 'switch-cell',
  components: {
    [Cell.name]: Cell,
    [Switch.name]: Switch,
  },
  model: {
    prop: 'value',
  },
  props: {
    value: {                        // 双向绑定的开关取值
      type: Boolean,
      required: true,
    },
    title: {                        // 标题
      type: String,
      default: '',
    },
    label: {                        // 标题下方的描述信息
      type: String,
      default: '',
    },
    readonly: {                     // 是否只读
      type: Boolean,
      required: false,
    },
  },
  data() {
    return {
      model: false,
    };
  },
  watch: {
    value(newValue) {
      this.model = newValue;
    },
  },
  mounted() {
    this.model = this.value;
  },
  methods: {
    // switch 切换时触发事件
    onChange(newValue) {
      this.$emit('input', newValue);
      this.$emit('change', newValue);
    },
  },
};
</script>
