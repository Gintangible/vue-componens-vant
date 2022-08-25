<template>
  <van-field
    v-model.trim="code"
    center
    clearable
    :label="label"
    :placeholder="placeholder || `请填写${label}`"
    @blur="onBlur"
  >
    <template #button>
      <van-button
        size="small"
        type="primary"
        :disabled="showCountDown"
        @click="onClickSend"
      >
        <template v-if="showCountDown">
          {{ countDownTime }} 秒
        </template>
        <template v-else>
          {{ buttonText }}
        </template>
      </van-button>
    </template>
  </van-field>
</template>

<script setup>
import { ref, watch } from 'vue';
import { Field as VanField, Button as VanButton, CountDown } from 'vant';
import { useCountDown } from '@vant/use';

const emit = defineEmits([
  'send',
  'blur',
]);

const props = defineProps({
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
});

const buttonText = ref(props.sendButtonText);
const code = ref('');
const showCountDown = ref(false);
const countDownTime = ref(0);
const countDown = useCountDown({
  time: props.resendTimeout,
  onChange: (time) => {
    countDownTime.value = time.seconds;
  },
  onFinish: () => {
    buttonText.value = props.resendButtonText;
    showCountDown.value = false;
  }
});

watch(() => props.value, (newValue) => {
  code.value = newValue;
});

function onClickSend() {
  emit('send');
  countDown.start();
  showCountDown.value = true;
}

function onBlur() {
  emit('blur', code.value);
}
</script>

<style lang="less" scoped>
.van-button {
  min-width: 80px;
}
</style>
