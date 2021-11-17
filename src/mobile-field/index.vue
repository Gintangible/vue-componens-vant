<template>
  <div class="mobile-field van-cell">
    <van-field
      v-model="mobile"
      clearable
      :readonly="readonly"
      :label="label"
      :required="required"
      :placeholder="placeholder"
      :formatter="formatter"
      :rules="mobileRules"
      @click="onClick"
      @input="onChange"
      @blur="onBlur"
    />
  </div>
</template>

<script>
import { Field, Toast } from 'vant';
import { stringRemoveSpace, isMobile } from '@gintangible/common-utils';

// 手机号码输入框控件。

export default {
  name: 'mobile-field',
  components: {
    [Field.name]: Field,
  },
  model: {
    prop: 'value',
  },
  props: {
    value: {                          // 绑定的手机号码
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
    required: {
      type: Boolean,
    },
    formatter: {
      type: Function,
      default: (value) => {
        return value.trim();
      }
    },
    rules: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      mobile: '',                       // 当前手机号码
    };
  },
  computed: {
    mobileRules() {
      let rules = [];
      if (this.required) {
        rules = [{
          required: this.required,
          message: '请输入正确的手机号码',
          validator: (value) => {
            console.log('gxw get ', isMobile);
            return isMobile(value);
          },
        }];
      }
      return rules.concat(this.rules);
    }
  },
  watch: {
    value(newValue) {
      this.mobile = newValue;
    },
  },
  created() {
    this.mobile = this.value;
  },
  methods: {
    // 用户点击输入框后触发此事件。
    onClick() {
      if (this.readonly) {
        Toast(`${stringRemoveSpace(this.label)}不可更改`);
      }
    },

    // 当姓名输入框被修改时触发此事件。
    onChange() {
      // 触发 clear-error 事件
      this.$emit('clear-error');
      // 触发 input 事件
      this.$emit('input', this.mobile);
    },

    // 当输入框失去输入焦点时触发此事件。
    onBlur() {
      if (!this.readonly) {
        this.$emit('input', this.mobile);
        // 触发 change 事件
        this.$emit('blur', this.mobile);
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
