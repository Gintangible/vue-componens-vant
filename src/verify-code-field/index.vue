<template>
  <van-field
    v-model="code"
    class="verify-code-field"
    center
    clearable
    :label="label"
    :placeholder="placeholder"
    @input="onInput"
    @blur="onBlur"
  >
    <template #button>
      <van-button
        v-if="!showCountDown"
        size="small"
        type="primary"
        @click="onClickSend"
      >
        {{ buttonText }}
      </van-button>
      <van-count-down
        v-if="showCountDown"
        :style="{color: countDownColor}"
        :time="resendTimeout"
        format="ss秒"
        @finish="onCountDownFinish"
      />
    </template>
  </van-field>
</template>

<script>
import { Field, Button, CountDown } from 'vant';

// 验证码输入框组件。
export default {
  name: 'VerifyCodeField',
  components: {
    [Field.name]: Field,
    [Button.name]: Button,
    [CountDown.name]: CountDown,
  },
  model: {
    prop: 'value',
  },
  props: {
    value: {                          // 绑定的验证码的值
      type: String,
      required: true,
    },
    label: {                          // 验证码输入框标签
      type: String,
      default: '短信验证码',
    },
    placeholder: {                    // 验证码输入框提示文字
      type: String,
      default: '请填写短信验证码',
    },
    sendButtonText: {                 // 发送验证码按钮文字
      type: String,
      default: '发送验证码',
    },
    resendButtonText: {               // 重新发送验证码按钮文字
      type: String,
      default: '重新发送验证码',
    },
    resendTimeout: {                  // 重新发送验证码间隔时间
      type: Number,
      default: 60000,
    },
    countDownColor: {                 //  倒计时文字的CSS颜色
      type: String,
      default: '#3d72e2',
    },
  },
  data() {
    return {
      buttonText: this.sendButtonText,
      code: '',
      showCountDown: false,
    };
  },
  watch: {
    value(newValue) {
      this.code = newValue;
    },
  },
  methods: {
    onClickSend() {
      this.$emit('send');
      this.showCountDown = true;
    },

    onCountDownFinish() {
      this.buttonText = this.resendButtonText;
      this.showCountDown = false;
    },

    onInput(value) {
      this.$emit('input', value);
    },

    onBlur() {
      this.$emit('change', this.code);
    },
  },
};
</script>

<style lang="less" scoped>
.verify-code-field {
  .van-button--small {
    height: 24px;
  }
}
</style>
