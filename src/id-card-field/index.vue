<template>
  <div class="id-card-field van-cell">
    <van-field
      v-model="idCard"
      clearable
      :readonly="readonly"
      :label="label"
      :required="required"
      :placeholder="placeholder"
      :formatter="formatter"
      :rules="idCardRules"
      @click="onClick"
      @input="onChange"
      @blur="onBlur"
    />
  </div>
</template>

<script>
import { Field, Toast } from 'vant';
import { stringRemoveSpace, isIdCard } from '@gintangible/common-utils';

// 身份证输入框控件。

export default {
  name: 'id-card-field',
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
      default: '身份证号码',
    },
    placeholder: {                    // 姓名输入框提示文字
      type: String,
      default: '请填写身份证号码',
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
        return value && value.trim().toUpperCase();
      },
    },
    rules: {
      type: Array,
      default: () => [],
    }
  },
  data() {
    return {
      idCard: '',                       // 当前身份证号码
    };
  },
  computed: {
    idCardRules() {
      let rules = [];
      if (this.required) {
        rules = [{
          required: this.required,
          message: '请输入正确的身份证号码',
          validator: (value) => {
            return isIdCard(value);
          }
        }];
      }
      return rules.concat(this.rules);
    }
  },
  watch: {
    value(newValue) {
      this.idCard = newValue;
    },
  },
  created() {
    this.idCard = this.value;
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
      this.$emit('input', this.idCard);
      this.$emit('change', this.idCard);
    },

    // 当输入框失去输入焦点时触发此事件。
    onBlur() {
      if (!this.readonly) {
        this.$emit('input', this.idCard);
        // 触发 blur 事件
        this.$emit('blur', this.idCard);
      }
    },
  },
};
</script>
<style scoped lang="less">
.id-card-field {
  display: block;
  padding: 0;
}
</style>
