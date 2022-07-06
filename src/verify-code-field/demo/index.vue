<template>
  <div title="测试验证码输入框">
    <verify-code-field
      v-model="code"
      :label="label"
      :placeholder="placeholder"
      :send-button-text="sendButtonText"
      :resend-button-text="resendButtonText"
      :resend-timeout="Number(resendTimeout)"
      :count-down-color="countDownColor"
      @send="onSend"
      @change="onChange"
    />
    <van-field
      v-model="code"
      label="验证码"
      clearable
    />
    <van-field
      v-model="label"
      label="标签"
      clearable
    />
    <van-field
      v-model="placeholder"
      label="提示"
      clearable
    />
    <van-field
      v-model="sendButtonText"
      label="发送按钮"
      clearable
    />
    <van-field
      v-model="resendButtonText"
      label="重新发送按钮"
      clearable
    />
    <van-field
      v-model="countDownColor"
      label="倒计时文本颜色"
      clearable
    />
    <van-field
      v-model="resendTimeout"
      label="重新发送延时"
      clearable
    />
    <van-cell title="事件" />
    <van-list>
      <van-cell
        v-for="(e, i) in events"
        :key="i"
        :title="e.order + ': ' + e.name"
        :value="e.param"
      />
    </van-list>
  </div>
</template>

<script>
import { Form, Field, List, Cell } from 'vant';
import VerifyCodeField from '../index';

/**
 * {@link VerifyCodeField}的使用例子。
 */
export default {
  name: 'VerifyCodeFieldDemo',
  components: {
    [Form.name]: Form,
    [Field.name]: Field,
    [List.name]: List,
    [Cell.name]: Cell,
    [VerifyCodeField.name]: VerifyCodeField,
  },
  data() {
    return {
      code: '',
      label: '短信验证码',
      placeholder: '请填写短信验证码',
      sendButtonText: '发送验证码',
      resendButtonText: '重新发送验证码',
      countDownColor: '#fff',
      resendTimeout: 60000,
      count: 0,
      events: [],
    };
  },
  methods: {
    onChange(value) {
      this.events.unshift({
        order: ++this.count,
        name: 'change',
        param: value,
      });
    },
    onSend() {
      this.events.unshift({
        order: ++this.count,
        name: 'send',
        param: '',
      });
    },
  },
};
</script>
