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

// 一个简单的组合{@link Cell}和{@link Switch}的控件示例
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
