<template>
  <div class="name-field van-cell">
    <van-field
      v-model="name"
      clearable
      :readonly="readonly"
      :label="label"
      :required="required"
      :placeholder="placeholder"
      :formatter="formatter"
      :rules="nameRules"
      @click="onClick"
      @input="onChange"
      @blur="onBlur"
    />
  </div>
</template>

<script>
import { Field, Toast } from 'vant';

// 姓名输入框控件。

export default {
  name: 'name-field',
  components: {
    [Field.name]: Field,
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
    required: {
      type: Boolean,
    },
    formatter: {
      type: Function,
      default: (value) => {
        return value.trim();
      },
    },
    rules: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
      name: '',                       // 当前姓名
    };
  },
  computed: {
    nameRules() {
      let rules = [];
      if (this.required) {
        rules = [{
          required: this.required,
          message: '请输入正确的姓名',
          validator: (value) => {
            return isCnName(value);
          }
        }];
      }
      return rules.concat(this.rules);
    }
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
        Toast(`${this.label}不可更改`);
      }
    },

    // 当姓名输入框被修改时触发此事件。
    onChange() {
      // 触发 clear-error 事件
      this.$emit('clear-error');
      // 触发 input 事件
      this.$emit('input', this.name);
      this.$emit('change', this.name);
    },

    // 当输入框失去输入焦点时触发此事件。
    onBlur() {
      if (!this.readonly) {
        this.$emit('input', this.name);
        // 触发 blur 事件
        this.$emit('blur', this.name);
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
