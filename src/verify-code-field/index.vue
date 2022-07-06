<template>
  <van-field
    v-model="code"
    center
    clearable
    :label="label"
    :placeholder="placeholder || `请填写${label}`"
    @blur="onBlur"
  >
    <template #button>
      <van-button
        size="small"
        type="info"
        :disabled="showCountDown"
        @click="onClickSend"
      >
        <van-count-down
          v-if="showCountDown"
          :style="{color: countDownColor}"
          :time="resendTimeout"
          format="ss秒"
          @finish="onCountDownFinish"
        />
        <template v-else>
          {{ buttonText }}
        </template>
      </van-button>
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
  props: {
    value: {
      type: String,
      required: true,
    },
    label: {
      type: String,
      default: '短信验证码',
    },
    placeholder: String,
    sendButtonText: {
      type: String,
      default: '发送验证码',
    },
    resendButtonText: {
      type: String,
      default: '重新发送验证码',
    },
    resendTimeout: {
      type: Number,
      default: 60000,
    },
    countDownColor: {
      type: String,
      default: '#fff',
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

    onBlur() {
      this.$emit('blur', this.code.trim());
    },
  },
};
</script>

<style lang="less" scoped>
.van-button {
  min-width: 80px;
}
</style>
