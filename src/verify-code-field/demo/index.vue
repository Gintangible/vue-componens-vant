<template>
  <div title="测试验证码输入框">
    <verify-code-field
      v-model="code"
      :label="label"
      :placeholder="placeholder"
      :send-button-text="sendButtonText"
      :resend-button-text="resendButtonText"
      :resend-timeout="Number(resendTimeout)"
      @send="onSend"
      @blur="onChange"
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

<script setup>
import { ref } from 'vue';
import { Form as VanForm, Field as VanField, List as VanList, Cell as VanCell } from 'vant';
import VerifyCodeField from '../index.vue';

const code = ref('');
const label = ref('短信验证码');
const placeholder = ref('请填写短信验证码');
const sendButtonText = ref('发送验证码');
const resendButtonText = ref('重新发送验证码');
const resendTimeout = ref(10000);
const count = ref(0);
const events = ref([]);

function onChange(value) {
  events.value.unshift({
    order: ++count.value,
    name: 'change',
    param: value,
  });
}

function onSend() {
  events.value.unshift({
    order: ++count.value,
    name: 'send',
    param: '',
  });
}
</script>
