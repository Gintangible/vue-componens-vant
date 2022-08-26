<template>
  <div class="signature-container">
    <div slot="title" class="signature-title">
      {{ title }}
    </div>
    <div
      class="signature-content"
      :style="canvasStyle"
    >
      <canvas
        ref="canvas"
        class="signature-canvas"
      />
      <van-image
        v-if="signSrc || readonly"
        :src="signSrc"
        fit="fill"
        class="signature-blank"
      />
    </div>
    <div v-if="tipText" class="signature-hint">
      {{ tipText }}
    </div>
    <div
      v-if="!readonly"
      class="signature-btn-group"
    >
      <van-button
        :text="clearText"
        size="mini"
        round
        plain
        color="#007bf6"
        @click="handleRemove"
      />
      <van-button
        :text="confirmText"
        round
        size="mini"
        color="#007bf6"
        @click="confirm"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch, reactive, onMounted } from 'vue';
import { Button as VanButton, Image as VanImage, Dialog } from 'vant';
import SignaturePad from 'signature_pad';

const emit = defineEmits([
  'clear',
  'confirm',
]);

const props = defineProps({
  name: {
    type: String,
    default: '',
  },
  // 签名的title
  title: {
    type: String,
    default: '签名区域',
  },
  // 已有签名
  signUrl: String,
  readonly: Boolean,
  height: {
    type: [String, Number],
    default: '150',
  },
  // 签名板背景色
  background: {
    type: String,
    default: '#dedede',
  },
  // 清屏的文字内容
  clearText: {
    type: String,
    default: '重签',
  },
  // 确定的文字内容
  confirmText: {
    type: String,
    default: '确定'
  },
  // 提示文字
  tipText: {
    type: String,
    default: '请使用正楷清晰地写上个人签名',
  },

  // eslint-disable-next-line
  beforeRemove: Function,
});
const state = reactive({
  signaturePad: {},
})
const signSrc = ref('');            // 已有签名地址
const canvas = ref(null);

// 画布大小
const canvasStyle = computed(() => {
  return `height: ${props.height}px; background: ${props.background};`;
})

watch(() => props.signUrl, (val) => {
  if (val) {
    signSrc.value = val;
  }
})

onMounted(() => {
  resizeCanvas();
  state.signaturePad = new SignaturePad(canvas.value);
  signSrc.value = props.signUrl;
});

// 画布区域自适应
function resizeCanvas() {
  const ratio = Math.max(window.devicePixelRatio || 1, 1); // 清除画布
  canvas.value.width = canvas.value.offsetWidth * ratio;
  canvas.value.height = canvas.value.offsetHeight * ratio;
  canvas.value.getContext('2d').scale(ratio, ratio);
}

// 清空签名
function handleRemove() {
  if (!props.beforeRemove) {
    return clear();
  }
  const beforeRemove = props.beforeRemove(props.name);
  if (beforeRemove && beforeRemove.then) {
    beforeRemove.then(() => {
      clear();
    });
  }
}

function clear() {
  signSrc.value = '';
  state.signaturePad.clear();
  emit('clear', props.name);
}

// 完成签名
function confirm() {
  if (signSrc.value) {
    Dialog.alert({
      title: '提示',
      message: '请删除之前的签名'
    });
    return;
  }
  if (state.signaturePad.isEmpty()) {
    Dialog.alert({
      title: '提示',
      message: '签名不能为空'
    });
    return;
  }
  const IMAGE_URL = state.signaturePad.toDataURL();
  emit('confirm', IMAGE_URL, props.name);
}
</script>

<style lang="less" scoped>
.signature-container {
  padding: 10px;
  border: 1px solid #e8e8e8;
  border-radius: 4px;
  background-color: #fff;
}

.signature-title {
  font-size: 16px;
  line-height: 24px;
}

.signature-content {
  position: relative;
  border: 1px solid #f4f4f4;
  border-radius: 4px;
  height: 160px;
  overflow: hidden;
  .signature-canvas {
    width: 100%;
    height: 100%;
  }
  .signature-blank {
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
  }
}

.signature-hint {
  margin-top: 6px;
  font-size: 12px;
  color: #666;
  text-align: center;
}

.signature-btn-group {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  .van-button {
    padding: 0 16px;
  }
  .van-button + .van-button {
    margin-left: 30px;
  }
}
</style>
